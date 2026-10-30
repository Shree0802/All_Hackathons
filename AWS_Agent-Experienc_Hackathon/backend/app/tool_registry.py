import logging
import time
from typing import Any, Callable, Dict, Optional

from .schemas import ActionOption, StudentProfile, ToolExecutionStatus
from .tools.skill_assessment import assess_skill_gaps
from .tools.project_recommendation import recommend_project
from .tools.learning_roadmap import generate_learning_roadmap
from .tools.internship_search import search_internships
from .tools.interview_prep import prepare_interview
from .tools.general_qa import answer_general_question
from .tools.clarification import request_clarification

logger = logging.getLogger("skillpilot.tool_registry")

# Strict immutable whitelist mapping permitted decision options to callables
TOOL_REGISTRY: Dict[ActionOption, Callable[..., Dict[str, Any]]] = {
    ActionOption.ASSESS_SKILL_GAPS: assess_skill_gaps,
    ActionOption.RECOMMEND_PROJECT: recommend_project,
    ActionOption.GENERATE_LEARNING_ROADMAP: generate_learning_roadmap,
    ActionOption.SEARCH_INTERNSHIPS: search_internships,
    ActionOption.PREPARE_INTERVIEW: prepare_interview,
    ActionOption.ANSWER_GENERAL_QUESTION: answer_general_question,
    ActionOption.REQUEST_CLARIFICATION: request_clarification,
}

def execute_action(
    action: ActionOption,
    user_request: str,
    student_profile: StudentProfile,
    extra_params: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Safely dispatches execution to the strictly registered tool."""
    if action not in TOOL_REGISTRY:
        raise ValueError(f"Unauthorized or unknown action attempted: {action}")

    tool_func = TOOL_REGISTRY[action]
    start_time = time.perf_counter()

    try:
        if action == ActionOption.ASSESS_SKILL_GAPS:
            result = tool_func(student_profile=student_profile)
            summary = (
                f"Skill Gap Assessment Complete: You have a {result.get('readiness_score', 0)}% curriculum match "
                f"for {result.get('target_role')}. {len(result.get('missing_skills', []))} areas identified for improvement."
            )
        elif action == ActionOption.RECOMMEND_PROJECT:
            result = tool_func(student_profile=student_profile)
            proj = result.get("recommended_project", {})
            summary = (
                f"Recommended Project: '{proj.get('title')}' ({proj.get('difficulty')} difficulty, "
                f"Est: {proj.get('estimated_effort')})."
            )
        elif action == ActionOption.GENERATE_LEARNING_ROADMAP:
            result = tool_func(student_profile=student_profile)
            summary = (
                f"Generated {result.get('total_weeks')}-week Learning Roadmap for {result.get('target_role')}. "
                f"Next step: {result.get('recommended_next_action')}."
            )
        elif action == ActionOption.SEARCH_INTERNSHIPS:
            result = tool_func(student_profile=student_profile)
            top = result.get("recommended_application")
            summary = (
                f"Found {result.get('total_found')} sample internship opportunities. "
                f"Top Match: {top.get('title') if top else 'N/A'} at {top.get('company') if top else 'N/A'} "
                f"({top.get('match_score') if top else 0}% match)."
            )
        elif action == ActionOption.PREPARE_INTERVIEW:
            result = tool_func(student_profile=student_profile)
            summary = (
                f"Interview Preparation Plan created for {result.get('target_role')}: "
                f"{len(result.get('dsa_topics', []))} high-frequency coding patterns and 7-day timetable ready."
            )
        elif action == ActionOption.ANSWER_GENERAL_QUESTION:
            result = tool_func(user_request=user_request, student_profile=student_profile)
            summary = result.get("answer", "")
        elif action == ActionOption.REQUEST_CLARIFICATION:
            result = tool_func(user_request=user_request, student_profile=student_profile)
            summary = result.get("clarification_message", "")
        else:
            raise ValueError(f"Unhandled registered action: {action}")

        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        return {
            "status": ToolExecutionStatus.SUCCESS,
            "tool_name": action.value,
            "result": result,
            "summary_message": summary,
            "execution_time_ms": latency_ms,
            "bedrock_invoked": result.get("bedrock_invoked", False),
            "is_fallback": result.get("is_fallback", False),
        }

    except Exception as e:
        logger.error("Error executing tool %s: %s", action, e, exc_info=True)
        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        return {
            "status": ToolExecutionStatus.ERROR,
            "tool_name": action.value,
            "result": {"error": str(e)},
            "summary_message": f"Error executing tool {action.value}: {str(e)}",
            "execution_time_ms": latency_ms,
            "bedrock_invoked": False,
            "is_fallback": True,
        }
