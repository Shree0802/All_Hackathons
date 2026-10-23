from typing import Any, Dict, Optional
from ..schemas import StudentProfile
from ..bedrock_service import get_bedrock_service

def answer_general_question(
    user_request: str,
    student_profile: StudentProfile,
) -> Dict[str, Any]:
    """Provides career guidance or general technical explanations using Amazon Bedrock or honest fallback."""
    bedrock = get_bedrock_service()

    system_prompt = (
        f"You are SkillPilot AI, a knowledgeable and encouraging career copilot for engineering and CS students. "
        f"Student Name: {student_profile.name}. Academic Branch: {student_profile.academic_branch}. "
        f"Target Role: {student_profile.target_role}. Provide concise, practical, actionable advice."
    )

    bedrock_resp = bedrock.invoke_model(
        prompt=user_request,
        system_instruction=system_prompt,
        max_tokens=600,
    )

    if bedrock_resp["invoked"] and bedrock_resp["text"]:
        answer_text = bedrock_resp["text"]
        source = "Amazon Bedrock"
    else:
        # Transparent fallback answer
        answer_text = (
            f"Here is career guidance regarding your question '{user_request}':\n\n"
            f"As a student preparing for **{student_profile.target_role}**, building demonstrable engineering "
            f"artifacts is your biggest differentiator. Pair foundational theoretical knowledge with hands-on "
            f"full-stack or ML projects, write clean modular code, document your design choices in a GitHub README, "
            f"and practice explaining your trade-offs in mock interviews."
        )
        source = "Knowledge Base & Heuristic Assistant (Fallback)"

    return {
        "user_query": user_request,
        "answer": answer_text,
        "answer_source": source,
        "bedrock_invoked": bedrock_resp["invoked"],
        "is_fallback": bedrock_resp["is_fallback"],
        "model_id": bedrock_resp.get("model_id"),
    }
