import pytest
from app.schemas import ActionOption, StudentProfile, ToolExecutionStatus
from app.tool_registry import TOOL_REGISTRY, execute_action

def test_registry_has_all_seven_permitted_actions():
    expected_actions = {
        ActionOption.ASSESS_SKILL_GAPS,
        ActionOption.RECOMMEND_PROJECT,
        ActionOption.GENERATE_LEARNING_ROADMAP,
        ActionOption.SEARCH_INTERNSHIPS,
        ActionOption.PREPARE_INTERVIEW,
        ActionOption.ANSWER_GENERAL_QUESTION,
        ActionOption.REQUEST_CLARIFICATION,
    }
    assert set(TOOL_REGISTRY.keys()) == expected_actions

def test_execute_action_disallows_arbitrary_string():
    profile = StudentProfile()
    with pytest.raises(ValueError) as exc:
        # Pass invalid action
        execute_action(
            action="unauthorized_delete_database",  # type: ignore
            user_request="hack",
            student_profile=profile,
        )
    assert "Unauthorized or unknown action" in str(exc.value)

def test_execute_skill_gaps_success():
    profile = StudentProfile()
    result = execute_action(
        action=ActionOption.ASSESS_SKILL_GAPS,
        user_request="Assess my skill gaps",
        student_profile=profile,
    )
    assert result["status"] == ToolExecutionStatus.SUCCESS
    assert result["tool_name"] == "assess_skill_gaps"
    assert "readiness_score" in result["result"]
    assert "missing_skills" in result["result"]

def test_execute_project_recommendation_success():
    profile = StudentProfile()
    result = execute_action(
        action=ActionOption.RECOMMEND_PROJECT,
        user_request="Recommend project",
        student_profile=profile,
    )
    assert result["status"] == ToolExecutionStatus.SUCCESS
    assert "recommended_project" in result["result"]
