from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class ActionOption(str, Enum):
    ASSESS_SKILL_GAPS = "assess_skill_gaps"
    RECOMMEND_PROJECT = "recommend_project"
    GENERATE_LEARNING_ROADMAP = "generate_learning_roadmap"
    SEARCH_INTERNSHIPS = "search_internships"
    PREPARE_INTERVIEW = "prepare_interview"
    ANSWER_GENERAL_QUESTION = "answer_general_question"
    REQUEST_CLARIFICATION = "request_clarification"

ACTION_DESCRIPTIONS: Dict[ActionOption, str] = {
    ActionOption.ASSESS_SKILL_GAPS: (
        "Compare existing skills against target role requirements, detect missing competencies, "
        "and calculate readiness indicators."
    ),
    ActionOption.RECOMMEND_PROJECT: (
        "Recommend portfolio-grade, practical software projects tailored to student skills and target career goal."
    ),
    ActionOption.GENERATE_LEARNING_ROADMAP: (
        "Generate a structured weekly study roadmap, milestones, and assessment checkpoints for the career path."
    ),
    ActionOption.SEARCH_INTERNSHIPS: (
        "Search and filter matching internship opportunities based on student skills, target role, and location."
    ),
    ActionOption.PREPARE_INTERVIEW: (
        "Generate technical questions, data structures & algorithms topics, behavioral prompts, and prep timetable."
    ),
    ActionOption.ANSWER_GENERAL_QUESTION: (
        "Provide direct advisory responses to career advice, tech questions, or academic guidance."
    ),
    ActionOption.REQUEST_CLARIFICATION: (
        "Ask the student for clarification when the request is ambiguous, unspecific, or key information is missing."
    )
}

class SkillItem(BaseModel):
    name: str
    category: str = "technical"  # technical, framework, tool, soft_skill
    proficiency: int = Field(default=3, ge=1, le=5)  # 1 to 5 scale

class StudentProfile(BaseModel):
    id: str = "std_dev_001"
    name: str = "Alex Sharma"
    email: str = "alex.sharma@campus.edu"
    academic_branch: str = "Computer Science & Engineering"
    graduation_year: int = 2026
    target_role: str = "Full-Stack AI Engineer"
    current_experience_level: str = "Intermediate"  # Beginner, Intermediate, Advanced
    skills: List[SkillItem] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    preferred_locations: List[str] = Field(default_factory=list)
    github_url: Optional[str] = "https://github.com/alex-sharma"
    linkedin_url: Optional[str] = "https://linkedin.com/in/alex-sharma"

class DecisionSource(str, Enum):
    STRANDS_DECIDER_2B_LIVE = "strands_decider_2b_live"
    STRANDS_DECIDER_2B_LOCAL = "strands_decider_2b_local"
    DEMO_HEURISTIC_STUB = "demo_heuristic_stub"
    SAFE_FALLBACK = "safe_fallback"

class DecisionTrace(BaseModel):
    question: str
    options: List[str]
    selected_action: ActionOption
    confidence: Optional[float] = None
    probabilities: Optional[Dict[str, float]] = None
    source: DecisionSource
    latency_ms: float
    reasoning: Optional[str] = None
    is_live_decider: bool = False

class AgentChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1500)
    student_id: Optional[str] = "std_dev_001"
    force_action: Optional[ActionOption] = None
    mode: Optional[str] = "auto"  # "auto", "real", "demo"

class ToolExecutionStatus(str, Enum):
    SUCCESS = "success"
    WARNING = "warning"
    ERROR = "error"
    FALLBACK = "fallback"

class AgentChatResponse(BaseModel):
    session_id: str
    user_message: str
    selected_action: ActionOption
    decision_trace: DecisionTrace
    tool_status: ToolExecutionStatus
    tool_name: str
    result: Dict[str, Any]
    summary_message: str
    bedrock_invoked: bool = False
    is_fallback: bool = False
    model_provider: str = "amazon-bedrock"
    execution_time_ms: float

class DecisionTestRequest(BaseModel):
    test_prompt: str = Field(..., min_length=2, max_length=1000)
    override_profile: Optional[Dict[str, Any]] = None
    mode: Optional[str] = "auto"

class DecisionTestResponse(BaseModel):
    test_prompt: str
    decision_trace: DecisionTrace
    recommended_tool: str
    matched_criteria: str
    raw_response: Optional[Dict[str, Any]] = None

class SystemStatusResponse(BaseModel):
    app_name: str
    app_env: str
    strands_agents_version: str
    decider_2b_available: bool
    decider_endpoint: str
    decider_model: str
    bedrock_configured: bool
    bedrock_region: str
    bedrock_model_id: str
    storage_type: str
    active_profile_id: str
    demo_mode_only: bool

class ActivityLog(BaseModel):
    id: str
    timestamp: str
    user_request: str
    selected_action: str
    tool_name: str
    decision_source: str
    confidence: Optional[float]
    status: str
    execution_time_ms: float
