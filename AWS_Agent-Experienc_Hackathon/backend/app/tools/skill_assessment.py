from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile
from ..storage.json_storage import get_storage
from ..bedrock_service import get_bedrock_service

def assess_skill_gaps(
    student_profile: StudentProfile,
    target_role: Optional[str] = None,
    specific_skills: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """Compares existing student skills against target role curriculum requirements."""
    storage = get_storage()
    bedrock = get_bedrock_service()

    role = target_role or student_profile.target_role
    role_data = storage.get_role_requirements(role)
    required_skills = role_data.get("required_skills", [])

    student_skill_map = {s.name.lower(): s.proficiency for s in student_profile.skills}

    matching_skills = []
    missing_skills = []
    proficient_count = 0
    total_weight = 0.0
    earned_weight = 0.0

    weight_map = {"critical": 3.0, "high": 2.0, "medium": 1.0}

    for req in required_skills:
        req_name = req["name"]
        min_prof = req.get("min_proficiency", 3)
        importance = req.get("importance", "medium")
        weight = weight_map.get(importance, 1.0)
        total_weight += weight

        current_prof = student_skill_map.get(req_name.lower())

        if current_prof is not None:
            if current_prof >= min_prof:
                proficient_count += 1
                earned_weight += weight
                matching_skills.append({
                    "name": req_name,
                    "student_proficiency": current_prof,
                    "required_proficiency": min_prof,
                    "importance": importance,
                    "status": "proficient",
                })
            else:
                earned_weight += weight * (current_prof / min_prof)
                missing_skills.append({
                    "name": req_name,
                    "student_proficiency": current_prof,
                    "required_proficiency": min_prof,
                    "importance": importance,
                    "gap": min_prof - current_prof,
                    "status": "needs_improvement",
                    "priority": "High" if importance in ["critical", "high"] else "Medium"
                })
        else:
            missing_skills.append({
                "name": req_name,
                "student_proficiency": 0,
                "required_proficiency": min_prof,
                "importance": importance,
                "gap": min_prof,
                "status": "missing",
                "priority": "Critical" if importance == "critical" else ("High" if importance == "high" else "Medium")
            })

    # Sort missing skills by priority
    priority_order = {"Critical": 0, "High": 1, "Medium": 2}
    missing_skills.sort(key=lambda x: priority_order.get(x["priority"], 3))

    readiness_percentage = round((earned_weight / total_weight) * 100, 1) if total_weight > 0 else 0.0

    # Bedrock explanation or transparent fallback
    prompt = (
        f"A student with target role '{role}' has the following skill profile:\n"
        f"Matching skills: {[m['name'] for m in matching_skills]}\n"
        f"Missing/weak skills: {[m['name'] + ' (Priority: ' + m['priority'] + ')' for m in missing_skills]}\n"
        f"Overall readiness score: {readiness_percentage}%\n"
        f"Provide 3 actionable, encouraging, high-impact recommendations for what they should prioritize next."
    )
    bedrock_resp = bedrock.invoke_model(
        prompt=prompt,
        system_instruction="You are an expert AI career coach. Be concise, actionable, and encouraging."
    )

    if bedrock_resp["invoked"] and bedrock_resp["text"]:
        advice = bedrock_resp["text"]
        explanation_source = "Amazon Bedrock"
    else:
        # Transparent fallback explanation
        top_missing = [m["name"] for m in missing_skills[:3]]
        advice = (
            f"Based on your goal of becoming a {role}, your foundation is solid ({readiness_percentage}% match). "
            f"Focus next on mastering: {', '.join(top_missing) if top_missing else 'advanced portfolio projects'}. "
            "Building an end-to-end project integrating these skills will significantly elevate your profile."
        )
        explanation_source = "Deterministic Skill Matrix Engine (Fallback)"

    return {
        "target_role": role,
        "readiness_score": readiness_percentage,
        "readiness_explanation": (
            "Readiness score is an educational metric calculated from weighted requirement matrices; "
            "it represents curriculum alignment rather than an absolute employment guarantee."
        ),
        "total_required_skills": len(required_skills),
        "matching_skills_count": len(matching_skills),
        "missing_skills_count": len(missing_skills),
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "recommended_priorities": [
            f"Learn {m['name']} to reach proficiency {m['required_proficiency']}/5"
            for m in missing_skills[:4]
        ],
        "career_advice": advice,
        "advice_source": explanation_source,
        "bedrock_invoked": bedrock_resp["invoked"],
        "is_fallback": bedrock_resp["is_fallback"],
    }
