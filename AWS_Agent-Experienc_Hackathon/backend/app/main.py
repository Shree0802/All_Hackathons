import logging
import time
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .schemas import (
    AgentChatRequest,
    AgentChatResponse,
    DecisionTestRequest,
    DecisionTestResponse,
    StudentProfile,
    SystemStatusResponse,
    ActivityLog,
    ACTION_DESCRIPTIONS,
    ActionOption,
)
from .agent import get_agent
from .decision_engine import get_decision_engine
from .bedrock_service import get_bedrock_service
from .storage.json_storage import get_storage

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("skillpilot.api")

app = FastAPI(
    title="SkillPilot AI Backend API",
    description="Intelligent Career Agent powered by Strands Decider 2B & Amazon Bedrock",
    version="1.0.0",
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health", tags=["System"])
def health_check() -> Dict[str, Any]:
    """Health check endpoint reporting API status and timestamp."""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "app_name": settings.APP_NAME,
        "environment": settings.APP_ENV,
    }

@app.get("/api/status", response_model=SystemStatusResponse, tags=["System"])
def get_system_status() -> SystemStatusResponse:
    """Returns integration status for Strands Decider 2B and Amazon Bedrock."""
    import strands
    bedrock = get_bedrock_service()
    decider = get_decision_engine()
    storage = get_storage()
    student = storage.get_student_profile("std_dev_001")

    # Probe decider live endpoint
    decider_available = False
    try:
        import httpx
        with httpx.Client(timeout=1.0) as client:
            r = client.get(decider.decider_url.replace("/v1/systemone", "/health"), follow_redirects=True)
            decider_available = (r.status_code < 500)
    except Exception:
        decider_available = False

    bedrock_configured = bedrock.is_configured()

    return SystemStatusResponse(
        app_name=settings.APP_NAME,
        app_env=settings.APP_ENV,
        strands_agents_version=getattr(strands, "__version__", "1.62.0"),
        decider_2b_available=decider_available,
        decider_endpoint=settings.STRANDS_DECIDER_URL or "Not Configured",
        decider_model=settings.STRANDS_DECIDER_MODEL,
        bedrock_configured=bedrock_configured,
        bedrock_region=settings.AWS_REGION,
        bedrock_model_id=settings.BEDROCK_MODEL_ID,
        storage_type=settings.STORAGE_TYPE,
        active_profile_id=student.id if student else "none",
        demo_mode_only=not (decider_available and bedrock_configured),
    )

@app.post("/api/agent/chat", response_model=AgentChatResponse, tags=["Agent"])
def chat_with_agent(request: AgentChatRequest) -> AgentChatResponse:
    """Processes a user message through the SkillPilot Agent with Strands Decider 2B."""
    try:
        agent = get_agent()
        response = agent.process_request(request)
        return response
    except Exception as e:
        logger.error("Chat agent error: %s", e, exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Agent workflow error: {str(e)}",
        )

@app.post("/api/agent/decision-test", response_model=DecisionTestResponse, tags=["Decision Lab"])
def test_decision(request: DecisionTestRequest) -> DecisionTestResponse:
    """Runs a dedicated decision test against Strands Decider 2B."""
    decider = get_decision_engine()
    storage = get_storage()
    student = storage.get_student_profile("std_dev_001")

    if request.override_profile:
        try:
            student = StudentProfile(**request.override_profile)
        except Exception as e:
            logger.warning("Could not parse override profile: %s", e)

    trace = decider.select_next_action(
        user_request=request.test_prompt,
        student_profile=student,
        mode=request.mode or "auto",
    )

    action_name = trace.selected_action.value
    matched_criteria = ACTION_DESCRIPTIONS.get(trace.selected_action, "General guidance")

    return DecisionTestResponse(
        test_prompt=request.test_prompt,
        decision_trace=trace,
        recommended_tool=action_name,
        matched_criteria=matched_criteria,
        raw_response={
            "source": trace.source,
            "confidence": trace.confidence,
            "probabilities": trace.probabilities,
            "latency_ms": trace.latency_ms,
        },
    )

@app.get("/api/student/profile", response_model=StudentProfile, tags=["Student"])
def get_profile() -> StudentProfile:
    """Returns the current active student profile."""
    storage = get_storage()
    profile = storage.get_student_profile("std_dev_001")
    if not profile:
        profile = StudentProfile()
        storage.update_student_profile(profile)
    return profile

@app.put("/api/student/profile", response_model=StudentProfile, tags=["Student"])
def update_profile(profile: StudentProfile) -> StudentProfile:
    """Updates the active student profile."""
    storage = get_storage()
    updated = storage.update_student_profile(profile)
    return updated

@app.get("/api/activities", response_model=List[ActivityLog], tags=["Activities"])
def get_activities(limit: int = Query(default=15, ge=1, le=50)) -> List[ActivityLog]:
    """Returns recent agent activities and decision records."""
    storage = get_storage()
    return storage.get_recent_activities(limit=limit)

@app.get("/api/roadmap", tags=["Career Development"])
def get_roadmap() -> Dict[str, Any]:
    """Returns the saved or dynamically generated learning roadmap."""
    storage = get_storage()
    student = storage.get_student_profile("std_dev_001") or StudentProfile()
    existing = storage.get_roadmap(student.id)
    if existing:
        return existing
    from .tools.learning_roadmap import generate_learning_roadmap
    return generate_learning_roadmap(student)

@app.get("/api/internships", tags=["Career Development"])
def list_internships(
    role: Optional[str] = None,
    location: Optional[str] = None,
) -> Dict[str, Any]:
    """Returns matching internships from the sample dataset."""
    storage = get_storage()
    student = storage.get_student_profile("std_dev_001") or StudentProfile()
    from .tools.internship_search import search_internships
    return search_internships(student_profile=student, role_filter=role, location_filter=location)

@app.get("/api/projects", tags=["Career Development"])
def list_projects(
    difficulty: Optional[str] = None,
) -> Dict[str, Any]:
    """Returns recommended projects from catalog."""
    storage = get_storage()
    student = storage.get_student_profile("std_dev_001") or StudentProfile()
    from .tools.project_recommendation import recommend_project
    return recommend_project(student_profile=student, preferred_difficulty=difficulty)

@app.get("/api/roles", tags=["Career Development"])
def list_roles() -> List[str]:
    """Lists available target career roles."""
    storage = get_storage()
    return storage.get_all_roles()

@app.get("/api/interview-prep", tags=["Career Development"])
def get_interview_prep(role: Optional[str] = None) -> Dict[str, Any]:
    """Generates an interview preparation guide for the role."""
    storage = get_storage()
    student = storage.get_student_profile("std_dev_001") or StudentProfile()
    from .tools.interview_prep import prepare_interview
    return prepare_interview(student_profile=student, target_role=role)
