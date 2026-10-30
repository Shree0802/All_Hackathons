from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile
from ..storage.json_storage import get_storage
from ..bedrock_service import get_bedrock_service

def generate_learning_roadmap(
    student_profile: StudentProfile,
    target_role: Optional[str] = None,
    weeks: int = 6,
) -> Dict[str, Any]:
    """Generates an action-oriented weekly learning roadmap customized to the student's profile."""
    storage = get_storage()
    bedrock = get_bedrock_service()

    role = target_role or student_profile.target_role

    # Deterministic roadmap structure tailored to the target role
    if "AI" in role or "ML" in role:
        stages = [
            {
                "week": 1,
                "title": "Foundation: API Frameworks & LLM Primitives",
                "focus": "FastAPI, Pydantic, and Amazon Bedrock Converse API",
                "tasks": [
                    "Implement a typed REST endpoint using FastAPI and Pydantic validation",
                    "Configure AWS credentials and call Amazon Bedrock Claude 3.5 Sonnet",
                    "Handle rate limits, timeouts, and structured JSON output parsing"
                ],
                "mini_project": "Bedrock AI Summarizer Microservice",
                "checkpoint": "Pass all automated API test cases with 100% coverage",
                "completed": True
            },
            {
                "week": 2,
                "title": "Decision Routing: Strands Decider 2B",
                "focus": "System One wire protocol (/v1/systemone) and calibrated confidence",
                "tasks": [
                    "Study Strands Decider 2B architecture (torso + generic pointer head)",
                    "Build a choice question schema with criteria descriptions",
                    "Implement confidence thresholding: (N*p_max - 1)/(N - 1) >= 0.70"
                ],
                "mini_project": "Sub-50ms Intent Classifier & Tool Router",
                "checkpoint": "Benchmark routing latency vs full LLM invocations",
                "completed": False
            },
            {
                "week": 3,
                "title": "Orchestration & Interventions: Strands Agents SDK",
                "focus": "Agent harness, tool registries, and InterventionHandler",
                "tasks": [
                    "Define typed agent tools using @tool decorator",
                    "Implement BeforeToolCall and AfterToolCall lifecycle hooks",
                    "Add guardrails to prevent unsafe or malformed tool invocations"
                ],
                "mini_project": "Multi-Tool Career Agent Harness",
                "checkpoint": "Agent autonomously routes and executes appropriate tools",
                "completed": False
            },
            {
                "week": 4,
                "title": "Frontend Experience: React & Vite Dashboard",
                "focus": "React components, Tailwind CSS, and Lucide icons",
                "tasks": [
                    "Build responsive dark-mode dashboard with modern card hierarchy",
                    "Create interactive Decision Trace visualization panel",
                    "Implement Recharts radar and bar visualizers for skill metrics"
                ],
                "mini_project": "SkillPilot Interactive UI",
                "checkpoint": "Zero console errors and clean mobile responsiveness",
                "completed": False
            },
            {
                "week": 5,
                "title": "Cloud Architecture & Containerization: Docker & AWS",
                "focus": "Dockerfile, AWS App Runner, and ECS deployment patterns",
                "tasks": [
                    "Write multi-stage Dockerfiles for backend FastAPI and frontend Vite",
                    "Configure AWS IAM roles following least-privilege principles",
                    "Set up environment variables and health check probes"
                ],
                "mini_project": "AWS App Runner Cloud Deployment",
                "checkpoint": "Public health check returns 200 OK with live telemetry",
                "completed": False
            },
            {
                "week": 6,
                "title": "Portfolio Showcase & Interview Readiness",
                "focus": "GitHub repository polish, video demo, and architecture documentation",
                "tasks": [
                    "Write professional README.md with architecture diagrams and setup guide",
                    "Record concise <3 min video walkthrough demonstrating decision flow",
                    "Draft AWS Builder Center article explaining reusable decision pattern"
                ],
                "mini_project": "Public Portfolio Release",
                "checkpoint": "Complete Hackathon Submission Checklist verified",
                "completed": False
            }
        ]
    else:
        # General Software Engineering Roadmap
        stages = [
            {
                "week": 1,
                "title": "Core Languages & Data Structures",
                "focus": "Algorithms, time complexity, and clean code principles",
                "tasks": ["Solve 15 LeetCode medium questions", "Implement hash maps and trees"],
                "mini_project": "CLI Task Manager",
                "checkpoint": "Pass all algorithm tests",
                "completed": True
            },
            {
                "week": 2,
                "title": "Backend Services & Databases",
                "focus": "REST APIs, SQL schema design, and Docker basics",
                "tasks": ["Design relational schema with indexing", "Build CRUD API with FastAPI"],
                "mini_project": "E-Commerce Catalog API",
                "checkpoint": "Docker container boots without errors",
                "completed": False
            },
            {
                "week": 3,
                "title": "Cloud Infrastructure & Testing",
                "focus": "AWS Lambda, API Gateway, and Pytest suites",
                "tasks": ["Write integration tests with TestClient", "Deploy serverless endpoint"],
                "mini_project": "Serverless Auth Gateway",
                "checkpoint": "CI pipeline passes all tests",
                "completed": False
            }
        ]

    roadmap_data = {
        "student_id": student_profile.id,
        "target_role": role,
        "total_weeks": len(stages),
        "stages": stages,
        "recommended_next_action": "Begin Week 2: Implement Strands Decider 2B System One wire protocol integration",
        "estimated_hours_per_week": 12,
    }

    # Save to storage for persistence
    storage.save_roadmap(student_profile.id, roadmap_data)

    return roadmap_data
