"""Adaptive Tool Selection Pattern for Strands Decider 2B.

Tags: #strands-decider-2b #tool-selection
Problem:
    How can an agent choose an appropriate tool for a user's request without
    relying exclusively on an expensive, multi-second generative LLM for each routing decision?

Solution:
    A fast, single-forward-pass classification using Strands Decider 2B adhering to the
    System One (/v1/systemone) wire protocol with mathematical confidence calibration
    and strict dispatch whitelisting.
"""

from __future__ import annotations

import logging
import time
from typing import Any, Callable, Dict, List, Optional, Tuple
from enum import Enum
import httpx
from pydantic import BaseModel, Field

logger = logging.getLogger("decision_pattern.tool_selection")


def derive_confidence(probabilities: List[float]) -> float:
    """Normalised max-probability formula from Strands Decider schema:
        (N * p_max - 1) / (N - 1)
    Uniform -> 0.0, one-hot -> 1.0, independent of N.
    """
    n = len(probabilities)
    if n <= 1:
        return 1.0
    p_max = max(probabilities)
    return float(max(0.0, min(1.0, (n * p_max - 1.0) / (n - 1.0))))


class DecisionOutput(BaseModel):
    selected_option: str
    confidence: Optional[float]
    probabilities: Optional[Dict[str, float]]
    source: str
    latency_ms: float
    is_live: bool


class AdaptiveToolSelector:
    """Reusable Decider 2B Tool Selector.

    Developers can configure their own custom decision question, criteria mappings,
    and tool callables while keeping the robust routing and guardrails intact.
    """

    def __init__(
        self,
        decision_question: str,
        options_criteria: Dict[str, str],
        decider_url: str = "http://127.0.0.1:8000/v1/systemone",
        model_name: str = "StrandsAgents/strands-decider-2B-hobson-v19",
        confidence_threshold: float = 0.65,
        timeout_seconds: float = 3.0,
        fallback_option: Optional[str] = None,
    ):
        if len(options_criteria) < 2:
            raise ValueError("Choice selection requires at least 2 candidate options.")

        self.decision_question = decision_question
        self.options_criteria = options_criteria
        self.decider_url = decider_url
        self.model_name = model_name
        self.confidence_threshold = confidence_threshold
        self.timeout_seconds = timeout_seconds
        self.fallback_option = fallback_option or list(options_criteria.keys())[-1]
        self._tool_registry: Dict[str, Callable[..., Any]] = {}

    def register_tool(self, option_name: str, func: Callable[..., Any]) -> None:
        """Binds a decision option to an executable callable."""
        if option_name not in self.options_criteria:
            raise ValueError(f"Option '{option_name}' not present in defined criteria schema.")
        self._tool_registry[option_name] = func

    def build_payload(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Formats the payload according to the Strands Decider /v1/systemone specification."""
        return {
            "model": self.model_name,
            "state": state,
            "questions": {
                "tool_selection": {
                    "type": "choice",
                    "instructions": self.decision_question,
                    "criteria": self.options_criteria,
                }
            },
        }

    def select(self, state: Dict[str, Any], mode: str = "auto") -> DecisionOutput:
        """Selects the best tool option using Decider 2B or deterministic fallback."""
        start = time.perf_counter()
        payload = self.build_payload(state)

        # 1. Attempt Live Model Call
        if mode in ["real", "auto"]:
            try:
                with httpx.Client(timeout=self.timeout_seconds) as client:
                    resp = client.post(self.decider_url, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        ans = data.get("answers", {}).get("tool_selection", {})
                        if ans.get("type") == "choice":
                            choice = ans.get("choice")
                            probs = ans.get("probabilities", {})
                            conf = ans.get("confidence")
                            if conf is None and probs:
                                conf = derive_confidence(list(probs.values()))
                            
                            latency = round((time.perf_counter() - start) * 1000, 2)
                            return DecisionOutput(
                                selected_option=choice,
                                confidence=conf,
                                probabilities=probs,
                                source="strands_decider_2b_live",
                                latency_ms=latency,
                                is_live=True,
                            )
            except Exception as e:
                logger.info("Live Decider 2B server not available: %s", e)
                if mode == "real":
                    latency = round((time.perf_counter() - start) * 1000, 2)
                    return DecisionOutput(
                        selected_option=self.fallback_option,
                        confidence=None,
                        probabilities=None,
                        source="real_mode_unreachable_fallback",
                        latency_ms=latency,
                        is_live=False,
                    )

        # 2. Deterministic Fallback Mode (Keyword/State Matching)
        query = str(state.get("user_request", "")).lower()
        matched_choice = self.fallback_option
        for opt in self.options_criteria:
            if opt in query:
                matched_choice = opt
                break

        latency = round((time.perf_counter() - start) * 1000, 2)
        n = len(self.options_criteria)
        probs = {k: 0.1 for k in self.options_criteria}
        probs[matched_choice] = 0.70
        conf = derive_confidence(list(probs.values()))

        return DecisionOutput(
            selected_option=matched_choice,
            confidence=conf,
            probabilities=probs,
            source="demo_fallback",
            latency_ms=latency,
            is_live=False,
        )

    def dispatch(self, decision: DecisionOutput, *args: Any, **kwargs: Any) -> Any:
        """Safely dispatches execution to the registered tool, enforcing authorization."""
        action = decision.selected_option
        if action not in self._tool_registry:
            raise RuntimeError(f"No executable tool registered for action: {action}")

        # Check confidence guardrail
        if decision.confidence is not None and decision.confidence < self.confidence_threshold:
            logger.warning("Low decision confidence (%.2f < %.2f)", decision.confidence, self.confidence_threshold)

        return self._tool_registry[action](*args, **kwargs)
