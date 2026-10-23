from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile

def request_clarification(
    user_request: str,
    student_profile: StudentProfile,
    missing_context: Optional[str] = None,
) -> Dict[str, Any]:
    """Generates structured clarification questions to safely disambiguate user requests."""
    req = user_request.lower().strip()

    clarification_options: List[Dict[str, str]] = []
    clarification_message = ""

    if not student_profile.target_role or student_profile.target_role.lower() in ["unspecified", "none", ""]:
        clarification_message = "To give you the most tailored career recommendation, what is your primary target role?"
        clarification_options = [
            {"label": "Full-Stack AI Engineer", "action": "set_role", "value": "Full-Stack AI Engineer"},
            {"label": "Data Scientist / ML Engineer", "action": "set_role", "value": "Data Scientist / ML Engineer"},
            {"label": "Backend Cloud Engineer", "action": "set_role", "value": "Backend Cloud Engineer"},
            {"label": "Frontend Web Developer", "action": "set_role", "value": "Frontend Web Developer"},
        ]
    elif len(req) < 10:
        clarification_message = (
            f"Hello {student_profile.name}! I'm SkillPilot AI. I can guide your preparation for "
            f"**{student_profile.target_role}**. Which of these would you like to explore next?"
        )
        clarification_options = [
            {"label": "Evaluate My Skill Gaps", "action": "assess_skill_gaps", "prompt": "Assess my skill gaps for " + student_profile.target_role},
            {"label": "Recommend a Capstone Project", "action": "recommend_project", "prompt": "Recommend a capstone project for my skills"},
            {"label": "Generate 6-Week Study Roadmap", "action": "generate_learning_roadmap", "prompt": "Create a 6-week study roadmap"},
            {"label": "Find Matching Internships", "action": "search_internships", "prompt": "Search internships matching my skills"},
            {"label": "Prepare for Technical Interviews", "action": "prepare_interview", "prompt": "Prepare interview plan and DSA topics"},
        ]
    else:
        clarification_message = (
            f"Your request '{user_request}' can be approached from several angles. "
            f"Please select the exact workflow you would like me to execute:"
        )
        clarification_options = [
            {"label": "Skill Matrix Assessment", "action": "assess_skill_gaps", "prompt": "Assess my skills against " + student_profile.target_role},
            {"label": "Practical Project Recommendation", "action": "recommend_project", "prompt": "Suggest portfolio projects"},
            {"label": "Structured Learning Curriculum", "action": "generate_learning_roadmap", "prompt": "Generate a weekly learning roadmap"},
            {"label": "Interview Prep Plan", "action": "prepare_interview", "prompt": "Create an interview prep plan"},
        ]

    return {
        "status": "clarification_needed",
        "user_query": user_request,
        "clarification_message": clarification_message,
        "suggested_options": clarification_options,
        "is_safe_guardrail": True,
    }
