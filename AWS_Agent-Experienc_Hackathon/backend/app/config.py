import os
from pathlib import Path
from typing import List, Optional
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    APP_NAME: str = "SkillPilot AI"
    APP_ENV: str = Field(default="development")
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS
    FRONTEND_ORIGIN: str = "http://localhost:5173"
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8000",
    ]
    
    # Amazon Bedrock Configuration
    AWS_REGION: str = "us-east-1"
    BEDROCK_MODEL_ID: str = "anthropic.claude-3-5-sonnet-20241022-v2:0"
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_SESSION_TOKEN: Optional[str] = None
    
    # Strands Decider 2B Configuration
    STRANDS_DECIDER_URL: Optional[str] = "http://127.0.0.1:8000/v1/systemone"
    STRANDS_DECIDER_MODEL: str = "StrandsAgents/strands-decider-2B-hobson-v19"
    DECIDER_CONFIDENCE_THRESHOLD: float = 0.65
    DECIDER_TIMEOUT_SECONDS: float = 4.0
    
    # Storage Configuration
    STORAGE_TYPE: str = "json"  # "json", "sqlite", extensible to "mongodb"
    DATA_DIR: str = str(BASE_DIR / "app" / "data")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
