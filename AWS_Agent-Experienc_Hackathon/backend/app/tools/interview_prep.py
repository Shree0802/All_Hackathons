from typing import Any, Dict, List, Optional
from ..schemas import StudentProfile
from ..bedrock_service import get_bedrock_service

def prepare_interview(
    student_profile: StudentProfile,
    target_role: Optional[str] = None,
    focus_area: Optional[str] = None,
) -> Dict[str, Any]:
    """Generates a complete interview preparation guide tailored to the role and student skills."""
    role = target_role or student_profile.target_role
    bedrock = get_bedrock_service()

    technical_topics = [
        "System Architecture: Decoupled Decision Models (Strands Decider) vs Generative LLMs (Bedrock)",
        "REST API Design: FastAPI dependency injection, Pydantic data validation, async request lifecycle",
        "Cloud Fundamentals: AWS App Runner, ECS container hosting, IAM role principle of least privilege",
        "Data Modeling: Relational schemas, indexing strategies, vector embeddings vs relational queries"
    ]

    dsa_topics = [
        {"topic": "Sliding Window & Two Pointers", "frequency": "Very High", "sample": "Longest Substring Without Repeating Characters"},
        {"topic": "Graph BFS/DFS & Topological Sort", "frequency": "High", "sample": "Course Schedule II / Dependency Resolution"},
        {"topic": "Dynamic Programming", "frequency": "Medium", "sample": "Coin Change / 0-1 Knapsack"},
        {"topic": "Heaps & Priority Queues", "frequency": "High", "sample": "Top K Frequent Elements / Task Scheduler"}
    ]

    core_subject_questions = [
        "Explain the difference between classification latency in small specialized models (e.g. 2B parameters) versus 70B+ parameter generative LLMs.",
        "How do you calibrate confidence scores in a discrete choice classification head?",
        "What are the trade-offs between asynchronous event loops in FastAPI and synchronous blocking worker threads?",
        "How would you architect a fault-tolerant agent workflow that gracefully degrades when cloud LLM endpoints hit rate limits?"
    ]

    project_discussion_questions = [
        f"Walk me through the architecture of your {role} capstone. How did you choose your technology stack?",
        "How did you implement your tool selection logic, and how did you verify that the model did not execute unauthorized functions?",
        "What was the most challenging latency or concurrency bottleneck you resolved?"
    ]

    behavioral_questions = [
        "Describe a time you had to adapt quickly to an unfamiliar library or SDK during a tight deadline.",
        "How do you prioritize competing engineering requirements between low latency and rich generative features?",
        "Tell me about a project where you balanced automated heuristics with machine learning models."
    ]

    prep_schedule = [
        {"day": "Day 1-2", "focus": "Core Language (Python/JS) & DSA Patterns (Sliding Window, Trees)"},
        {"day": "Day 3-4", "focus": "Backend Frameworks & Agent Architecture (FastAPI, Strands, Bedrock)"},
        {"day": "Day 5", "focus": "System Design: Microservices, Caching, and AWS Cloud Fundamentals"},
        {"day": "Day 6", "focus": "Project Deep-Dive: Prepare STAR-format answers for portfolio items"},
        {"day": "Day 7", "focus": "Mock Interview Simulation: Timed coding and behavioral questions"}
    ]

    # Optional Bedrock personalized question
    prompt = (
        f"Candidate aiming for '{role}' with skills {[s.name for s in student_profile.skills]}.\n"
        f"Generate 2 realistic, tough technical interview questions specifically testing how they handle "
        f"production AI agent failure modes and latency optimization."
    )
    bedrock_resp = bedrock.invoke_model(
        prompt=prompt,
        system_instruction="You are a principal engineer conducting a technical screen."
    )

    if bedrock_resp["invoked"] and bedrock_resp["text"]:
        custom_question = bedrock_resp["text"]
    else:
        custom_question = (
            "1. If Strands Decider 2B returns a confidence score below 0.65 for a tool selection decision, "
            "how should your agent orchestrator react to maintain safety without degrading user experience?\n"
            "2. How would you design a caching and connection-pooling strategy for Amazon Bedrock API calls "
            "under a sudden 10x traffic spike?"
        )

    return {
        "target_role": role,
        "technical_topics": technical_topics,
        "dsa_topics": dsa_topics,
        "core_subject_questions": core_subject_questions,
        "project_discussion_questions": project_discussion_questions,
        "behavioral_questions": behavioral_questions,
        "custom_interviewer_questions": custom_question,
        "prep_schedule": prep_schedule,
        "bedrock_invoked": bedrock_resp["invoked"],
        "is_fallback": bedrock_resp["is_fallback"],
    }
