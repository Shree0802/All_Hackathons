from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile
from ..storage.json_storage import get_storage
from ..bedrock_service import get_bedrock_service

def recommend_project(
    student_profile: StudentProfile,
    target_role: Optional[str] = None,
    preferred_difficulty: Optional[str] = None,
) -> Dict[str, Any]:
    """Recommends practical, high-impact projects matching student skills and target role."""
    storage = get_storage()
    bedrock = get_bedrock_service()

    role = target_role or student_profile.target_role
    projects = storage.get_projects(domain_filter=role, difficulty_filter=preferred_difficulty)

    if not projects:
        # Fallback to all available projects
        projects = storage.get_projects()

    # Find the top project match
    selected_project = projects[0] if projects else {
        "id": "proj_custom",
        "title": "Full-Stack AI Agent Dashboard",
        "domain": role,
        "difficulty": "Intermediate",
        "estimated_effort": "3 Weeks",
        "portfolio_value": "High",
        "tech_stack": ["React", "FastAPI", "Amazon Bedrock", "Strands Decider 2B"],
        "problem_statement": "Students lack automated tools to guide their learning journeys. Create an intelligent copilot using decision models.",
        "key_features": ["Sub-50ms tool selection", "Interactive chat", "Visual decision traces"],
        "implementation_milestones": ["Milestone 1: Backend API", "Milestone 2: Agent integration", "Milestone 3: React UI"]
    }

    # Enhance with Bedrock for personalized tailoring
    prompt = (
        f"A student with skills {[s.name for s in student_profile.skills]} aiming to be a '{role}' is building the project:\n"
        f"Title: {selected_project.get('title')}\n"
        f"Tech Stack: {selected_project.get('tech_stack')}\n"
        f"Problem: {selected_project.get('problem_statement')}\n"
        f"Explain in 2-3 concise bullet points why this specific project dramatically strengthens their resume and which architectural concept they should highlight to recruiters."
    )
    bedrock_resp = bedrock.invoke_model(
        prompt=prompt,
        system_instruction="You are a senior tech hiring manager giving precise resume advice."
    )

    if bedrock_resp["invoked"] and bedrock_resp["text"]:
        resume_tip = bedrock_resp["text"]
    else:
        resume_tip = (
            "• Highlights modern AI architectural patterns by decoupling fast classification (Strands Decider 2B) from generative synthesis (Amazon Bedrock).\n"
            "• Demonstrates full-stack fluency across responsive React frontends, robust FastAPI microservices, and AWS infrastructure."
        )

    return {
        "target_role": role,
        "recommended_project": selected_project,
        "all_recommendations": projects,
        "resume_impact_tip": resume_tip,
        "fit_rationale": (
            f"Tailored for {student_profile.name} to bridge key competency gaps in {role} while leveraging "
            f"existing strengths in {', '.join([s.name for s in student_profile.skills[:3]])}."
        ),
        "bedrock_invoked": bedrock_resp["invoked"],
        "is_fallback": bedrock_resp["is_fallback"],
    }
