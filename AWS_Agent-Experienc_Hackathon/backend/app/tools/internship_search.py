from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile
from ..storage.json_storage import get_storage

def search_internships(
    student_profile: StudentProfile,
    role_filter: Optional[str] = None,
    location_filter: Optional[str] = None,
    keyword_filter: Optional[str] = None,
) -> Dict[str, Any]:
    """Searches sample internship opportunities and computes eligibility and match affinity."""
    storage = get_storage()
    student_skills = {s.name.lower() for s in student_profile.skills}

    target = role_filter or student_profile.target_role
    all_internships = storage.get_internships()

    matched_results = []

    for item in all_internships:
        req_skills = item.get("required_skills", [])
        matched_skills = [s for s in req_skills if s.lower() in student_skills]
        missing_skills = [s for s in req_skills if s.lower() not in student_skills]

        match_score = (
            round((len(matched_skills) / len(req_skills)) * 100, 1)
            if req_skills
            else 50.0
        )

        # Eligibility criteria check
        is_eligible = match_score >= 40.0
        matching_reason = (
            f"You possess {len(matched_skills)} of {len(req_skills)} required competencies "
            f"({', '.join(matched_skills) if matched_skills else 'foundation in progress'})."
        )

        matched_results.append({
            **item,
            "match_score": match_score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "is_eligible": is_eligible,
            "matching_reason": matching_reason,
            "disclaimer": "SAMPLE HACKATHON DATASET - NOT LIVE VACANCIES",
        })

    # Sort by match score descending
    matched_results.sort(key=lambda x: x["match_score"], reverse=True)

    return {
        "dataset_notice": "Initial Prototype: All results are curated sample listings for testing and hackathon demonstration.",
        "is_sample_data": True,
        "query_target_role": target,
        "total_found": len(matched_results),
        "results": matched_results,
        "recommended_application": matched_results[0] if matched_results else None,
    }
