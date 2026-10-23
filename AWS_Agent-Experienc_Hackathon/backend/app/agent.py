import logging
import time
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, Optional

# Strands Agents SDK imports
try:
    from strands import Agent
    from strands.interventions import InterventionHandler, Proceed, Deny
    STRANDS_INSTALLED = True
except ImportError:
    STRANDS_INSTALLED = False
    InterventionHandler = object
    Proceed = None
    Deny = None

from .schemas import (
    ActionOption,
    AgentChatRequest,
    AgentChatResponse,
    DecisionTrace,
    StudentProfile,
    ToolExecutionStatus,
    ActivityLog,
)
from .decision_engine import get_decision_engine, DecisionEngine
from .tool_registry import execute_action, TOOL_REGISTRY
from .storage.json_storage import get_storage

logger = logging.getLogger("skillpilot.agent")

class ToolSelectionInterventionGuard:
    """Intervention guard ensuring that only permitted, verified actions from Strands Decider
    are routed to executable tools.
    """
    def __init__(self, confidence_threshold: float = 0.65):
        self.confidence_threshold = confidence_threshold

    def evaluate(self, decision: DecisionTrace) -> bool:
        # Check action in registry
        if decision.selected_action not in TOOL_REGISTRY:
            logger.warning("Guard denied action: %s is not registered.", decision.selected_action)
            return False
        
        # If low confidence on a high-stakes action, recommend clarification
        if decision.confidence is not None and decision.confidence < self.confidence_threshold:
            logger.info("Low confidence (%.2f < %.2f); guard suggests clarification.", 
                        decision.confidence, self.confidence_threshold)
            return True

        return True

class SkillPilotAgent:
    def __init__(
        self,
        decision_engine: Optional[DecisionEngine] = None,
        confidence_threshold: float = 0.65,
    ):
        self.decision_engine = decision_engine or get_decision_engine()
        self.guard = ToolSelectionInterventionGuard(confidence_threshold)
        self.storage = get_storage()

    def process_request(self, request: AgentChatRequest) -> AgentChatResponse:
        start_time = time.perf_counter()
        session_id = str(uuid.uuid4())

        # 1. Load Student Profile
        student = self.storage.get_student_profile(request.student_id or "std_dev_001")
        if not student:
            # Fallback default profile
            student = StudentProfile()

        # 2. Select Next Action via Strands Decider 2B (or force_action override)
        if request.force_action and request.force_action in TOOL_REGISTRY:
            decision_trace = DecisionTrace(
                question="Manual action override applied by caller",
                options=[opt.value for opt in ActionOption],
                selected_action=request.force_action,
                confidence=1.0,
                probabilities={request.force_action.value: 1.0},
                source="manual_override",
                latency_ms=0.1,
                reasoning="Action explicitly forced by test or user command.",
                is_live_decider=False,
            )
        else:
            decision_trace = self.decision_engine.select_next_action(
                user_request=request.message,
                student_profile=student,
                mode=request.mode or "auto",
            )

        # 3. Guardrail / Intervention Evaluation
        is_allowed = self.guard.evaluate(decision_trace)
        action_to_run = decision_trace.selected_action
        if not is_allowed:
            action_to_run = ActionOption.REQUEST_CLARIFICATION

        # 4. Execute Selected Tool via Registry
        tool_output = execute_action(
            action=action_to_run,
            user_request=request.message,
            student_profile=student,
        )

        total_latency_ms = round((time.perf_counter() - start_time) * 1000, 2)

        # 5. Record Activity History
        activity = ActivityLog(
            id=f"act_{int(time.time() * 1000)}",
            timestamp=datetime.now(timezone.utc).isoformat(),
            user_request=request.message,
            selected_action=action_to_run.value,
            tool_name=tool_output["tool_name"],
            decision_source=decision_trace.source.value if hasattr(decision_trace.source, "value") else str(decision_trace.source),
            confidence=decision_trace.confidence,
            status=tool_output["status"].value,
            execution_time_ms=total_latency_ms,
        )
        self.storage.add_activity_log(activity)

        # 6. Build and Return Response
        return AgentChatResponse(
            session_id=session_id,
            user_message=request.message,
            selected_action=action_to_run,
            decision_trace=decision_trace,
            tool_status=tool_output["status"],
            tool_name=tool_output["tool_name"],
            result=tool_output["result"],
            summary_message=tool_output["summary_message"],
            bedrock_invoked=tool_output.get("bedrock_invoked", False),
            is_fallback=tool_output.get("is_fallback", False),
            model_provider="amazon-bedrock" if tool_output.get("bedrock_invoked") else "deterministic-fallback",
            execution_time_ms=total_latency_ms,
        )

_default_agent: Optional[SkillPilotAgent] = None

def get_agent() -> SkillPilotAgent:
    global _default_agent
    if _default_agent is None:
        _default_agent = SkillPilotAgent()
    return _default_agent
