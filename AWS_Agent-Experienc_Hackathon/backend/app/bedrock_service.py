import json
import logging
import os
from typing import Any, Dict, List, Optional
import boto3
from botocore.exceptions import ClientError, BotoCoreError

from .config import settings

logger = logging.getLogger("skillpilot.bedrock")

class BedrockService:
    def __init__(
        self,
        region_name: Optional[str] = None,
        model_id: Optional[str] = None,
    ):
        self.region_name = region_name or settings.AWS_REGION
        self.model_id = model_id or settings.BEDROCK_MODEL_ID
        self._client = None
        self._is_available: Optional[bool] = None

    def _get_client(self):
        if self._client is None:
            session_kwargs: Dict[str, Any] = {"region_name": self.region_name}
            if settings.AWS_ACCESS_KEY_ID and settings.AWS_SECRET_ACCESS_KEY:
                session_kwargs["aws_access_key_id"] = settings.AWS_ACCESS_KEY_ID
                session_kwargs["aws_secret_access_key"] = settings.AWS_SECRET_ACCESS_KEY
                if settings.AWS_SESSION_TOKEN:
                    session_kwargs["aws_session_token"] = settings.AWS_SESSION_TOKEN
            
            session = boto3.Session(**session_kwargs)
            try:
                self._client = session.client("bedrock-runtime", region_name=self.region_name)
            except Exception as e:
                logger.warning("Failed to initialize boto3 bedrock-runtime client: %s", e)
                self._client = None
        return self._client

    def is_configured(self) -> bool:
        """Checks if AWS credentials or environment are present for Bedrock."""
        has_env_creds = bool(
            os.getenv("AWS_ACCESS_KEY_ID")
            or settings.AWS_ACCESS_KEY_ID
            or os.getenv("AWS_PROFILE")
            or os.path.exists(os.path.expanduser("~/.aws/credentials"))
        )
        return has_env_creds

    def invoke_model(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        max_tokens: int = 1000,
        temperature: float = 0.3,
    ) -> Dict[str, Any]:
        """Calls Amazon Bedrock Converse API or invoke_model.
        Returns a dict:
        {
          "text": str,
          "invoked": bool,
          "is_fallback": bool,
          "model_id": str,
          "provider": str,
          "error": Optional[str]
        }
        """
        client = self._get_client()
        if not client or not self.is_configured():
            logger.info("Bedrock is unconfigured; providing honest demo fallback.")
            return {
                "text": "",
                "invoked": False,
                "is_fallback": True,
                "model_id": self.model_id,
                "provider": "demo-fallback",
                "error": "Amazon Bedrock credentials or permissions not detected in environment.",
            }

        try:
            # Using Bedrock Converse API (supported across Claude, Nova, Llama)
            messages = [{"role": "user", "content": [{"text": prompt}]}]
            system_list = [{"text": system_instruction}] if system_instruction else []

            response = client.converse(
                modelId=self.model_id,
                messages=messages,
                system=system_list,
                inferenceConfig={"maxTokens": max_tokens, "temperature": temperature},
            )

            output_message = response.get("output", {}).get("message", {})
            content_blocks = output_message.get("content", [])
            text_result = "".join(b.get("text", "") for b in content_blocks if "text" in b)

            return {
                "text": text_result,
                "invoked": True,
                "is_fallback": False,
                "model_id": self.model_id,
                "provider": "amazon-bedrock",
                "error": None,
            }

        except ClientError as e:
            error_code = e.response.get("Error", {}).get("Code", "ClientError")
            error_msg = e.response.get("Error", {}).get("Message", str(e))
            logger.warning("Bedrock invocation ClientError [%s]: %s", error_code, error_msg)
            return {
                "text": "",
                "invoked": False,
                "is_fallback": True,
                "model_id": self.model_id,
                "provider": "demo-fallback",
                "error": f"Bedrock API error ({error_code}): {error_msg}",
            }
        except Exception as e:
            logger.warning("Unexpected Bedrock invocation failure: %s", e)
            return {
                "text": "",
                "invoked": False,
                "is_fallback": True,
                "model_id": self.model_id,
                "provider": "demo-fallback",
                "error": f"Bedrock invocation exception: {str(e)}",
            }

_bedrock_service_instance: Optional[BedrockService] = None

def get_bedrock_service() -> BedrockService:
    global _bedrock_service_instance
    if _bedrock_service_instance is None:
        _bedrock_service_instance = BedrockService()
    return _bedrock_service_instance
