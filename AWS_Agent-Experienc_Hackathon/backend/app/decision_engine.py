import time
import json
import logging
from typing import Any, Dict, List, Optional, Tuple
import httpx

from .schemas import (
    ActionOption,
    ACTION_DESCRIPTIONS,
    DecisionSource,
    DecisionTrace,
    StudentProfile,
)
from .config import settings

logger = logging.getLogger("skillpilot.decision_engine")

DECISION_QUESTION = (
    "Given the student's current request, relevant profile, available tools, "
    "and current application state, which action should the agent take next?"
)

def derive_confidence(probabilities: List[float]) -> float:
    """Normalised max-probability formula from Strands Decider schema:
    (N * p_max - 1) / (N - 1).
    Independent of N so threshold meaning remains stable across choice spaces.
    """
    n = len(probabilities)
    if n <= 1:
        return 1.0
    p_max = max(probabilities)
    return float(max(0.0, min(1.0, (n * p_max - 1.0) / (n - 1.0))))

class DecisionEngine:
    def __init__(
        self,
        decider_url: Optional[str] = None,
        model_name: Optional[str] = None,
        timeout_seconds: Optional[float] = None,
        confidence_threshold: Optional[float] = None,
    ):
        self.decider_url = decider_url or settings.STRANDS_DECIDER_URL
        self.model_name = model_name or settings.STRANDS_DECIDER_MODEL
        self.timeout_seconds = timeout_seconds or settings.DECIDER_TIMEOUT_SECONDS
        self.confidence_threshold = confidence_threshold or settings.DECIDER_CONFIDENCE_THRESHOLD

    def build_systemone_payload(
        self,
        user_request: str,
        student_profile: Optional[StudentProfile] = None,
        conversation_state: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Constructs a compliant Strands Decider /v1/systemone request payload."""
        state_repr = {
            "user_request": user_request,
            "target_role": student_profile.target_role if student_profile else "Unspecified",
            "experience_level": student_profile.current_experience_level if student_profile else "Intermediate",
            "skills_count": len(student_profile.skills) if student_profile else 0,
            "skills_list": [s.name for s in student_profile.skills[:8]] if student_profile else [],
            "conversation_turn": conversation_state.get("turn", 1) if conversation_state else 1,
        }

        criteria = {
            opt.value: desc for opt, desc in ACTION_DESCRIPTIONS.items()
        }

        payload = {
            "model": self.model_name,
            "state": state_repr,
            "questions": {
                "tool_selection": {
                    "type": "choice",
                    "instructions": DECISION_QUESTION,
                    "criteria": criteria,
                }
            },
        }
        return payload

    def query_live_decider(
        self, payload: Dict[str, Any]
    ) -> Optional[Tuple[ActionOption, float, Dict[str, float]]]:
        """Queries the running Strands Decider 2B endpoint via HTTP."""
        if not self.decider_url:
            return None

        try:
            with httpx.Client(timeout=self.timeout_seconds) as client:
                resp = client.post(self.decider_url, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    answers = data.get("answers", {})
                    ts_answer = answers.get("tool_selection")
                    if ts_answer and ts_answer.get("type") == "choice":
                        choice_raw = ts_answer.get("choice")
                        probs = ts_answer.get("probabilities", {})
                        conf = ts_answer.get("confidence")
                        if conf is None and probs:
                            conf = derive_confidence(list(probs.values()))
                        
                        # Validate choice belongs to ActionOption
                        valid_choice = ActionOption(choice_raw)
                        return valid_choice, float(conf if conf is not None else 0.8), probs
        except Exception as e:
            logger.info("Strands Decider 2B live endpoint unreachable or errored: %s", e)
            return None

        return None

    def evaluate_demo_heuristic(
        self,
        user_request: str,
        student_profile: Optional[StudentProfile] = None,
    ) -> Tuple[ActionOption, float, Dict[str, float], str]:
        """Deterministic evaluation for Demo / Fallback Mode.
        Clearly labeled as demo heuristic and reports honest calibrated probabilities.
        """
        req = user_request.lower().strip()

        # Check for ambiguity / missing profile
        if len(req) < 6 or req in ["hi", "hello", "hey", "help", "guide me", "what next", "tell me"]:
            probs = {opt.value: 0.05 for opt in ActionOption}
            probs[ActionOption.REQUEST_CLARIFICATION.value] = 0.70
            conf = derive_confidence(list(probs.values()))
            return (
                ActionOption.REQUEST_CLARIFICATION,
                conf,
                probs,
                "Request is brief or ambiguous; clarification requested.",
            )

        # Keyword mapping for heuristic triage
        scores: Dict[ActionOption, float] = {opt: 0.05 for opt in ActionOption}

        # Gap analysis
        if any(w in req for w in ["gap", "missing", "assess", "evaluate my skill", "readiness", "score my skills", "compare"]):
            scores[ActionOption.ASSESS_SKILL_GAPS] += 0.85
        # Projects
        elif any(w in req for w in ["project", "build", "portfolio", "what to make", "hands-on", "create an app"]):
            scores[ActionOption.RECOMMEND_PROJECT] += 0.85
        # Roadmap
        elif any(w in req for w in ["roadmap", "curriculum", "learning plan", "week", "schedule to learn", "how to learn", "path"]):
            scores[ActionOption.GENERATE_LEARNING_ROADMAP] += 0.85
        # Internships
        elif any(w in req for w in ["internship", "intern", "job", "opening", "hiring", "apply", "stipend"]):
            scores[ActionOption.SEARCH_INTERNSHIPS] += 0.85
        # Interview
        elif any(w in req for w in ["interview", "dsa", "coding round", "behavioral", "mock", "technical question", "prep"]):
            scores[ActionOption.PREPARE_INTERVIEW] += 0.85
        else:
            scores[ActionOption.ANSWER_GENERAL_QUESTION] += 0.70

        # Softmax normalization
        import math
        exp_scores = {k: math.exp(v * 3.0) for k, v in scores.items()}
        total_exp = sum(exp_scores.values())
        norm_probs = {k.value: round(v / total_exp, 4) for k, v in exp_scores.items()}

        top_choice = max(norm_probs.items(), key=lambda x: x[1])[0]
        conf = derive_confidence(list(norm_probs.values()))

        return (
            ActionOption(top_choice),
            conf,
            norm_probs,
            f"Heuristic classifier matched pattern for '{top_choice}' with score distribution.",
        )

    def select_next_action(
        self,
        user_request: str,
        student_profile: Optional[StudentProfile] = None,
        conversation_state: Optional[Dict[str, Any]] = None,
        mode: str = "auto",  # "auto", "real", "demo"
    ) -> DecisionTrace:
        """Core public method: selects next action using Strands Decider 2B or honest demo fallback."""
        start_time = time.perf_counter()
        options_list = [opt.value for opt in ActionOption]

        payload = self.build_systemone_payload(
            user_request=user_request,
            student_profile=student_profile,
            conversation_state=conversation_state,
        )

        # 1. Real Mode or Auto Mode: Attempt live Strands Decider 2B invocation
        if mode in ["real", "auto"]:
            live_result = self.query_live_decider(payload)
            if live_result:
                chosen_opt, conf, probs = live_result
                latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
                return DecisionTrace(
                    question=DECISION_QUESTION,
                    options=options_list,
                    selected_action=chosen_opt,
                    confidence=round(conf, 4),
                    probabilities=probs,
                    source=DecisionSource.STRANDS_DECIDER_2B_LIVE,
                    latency_ms=latency_ms,
                    reasoning=f"Strands Decider 2B model '{self.model_name}' evaluated options via /v1/systemone.",
                    is_live_decider=True,
                )
            elif mode == "real":
                # Real mode strictly requested but decider is unavailable
                latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
                return DecisionTrace(
                    question=DECISION_QUESTION,
                    options=options_list,
                    selected_action=ActionOption.REQUEST_CLARIFICATION,
                    confidence=None,
                    probabilities=None,
                    source=DecisionSource.SAFE_FALLBACK,
                    latency_ms=latency_ms,
                    reasoning="Strands Decider 2B service at configured endpoint is unreachable. Real mode halted safely.",
                    is_live_decider=False,
                )

        # 2. Demo Mode or Auto Fallback
        heuristic_choice, conf, probs, reason = self.evaluate_demo_heuristic(
            user_request, student_profile
        )
        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)

        return DecisionTrace(
            question=DECISION_QUESTION,
            options=options_list,
            selected_action=heuristic_choice,
            confidence=round(conf, 4),
            probabilities=probs,
            source=DecisionSource.DEMO_HEURISTIC_STUB,
            latency_ms=latency_ms,
            reasoning=f"Demo Mode: {reason} (Strands Decider 2B live server not active).",
            is_live_decider=False,
        )

_default_engine: Optional[DecisionEngine] = None

def get_decision_engine() -> DecisionEngine:
    global _default_engine
    if _default_engine is None:
        _default_engine = DecisionEngine()
    return _default_engine
