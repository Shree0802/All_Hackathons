import pytest
from app.schemas import ActionOption, DecisionSource
from app.decision_engine import DecisionEngine, derive_confidence

def test_derive_confidence_math():
    # Single option: forced 1.0
    assert derive_confidence([1.0]) == 1.0

    # Perfectly uniform distribution across 4 options: (4 * 0.25 - 1) / (4 - 1) = 0.0
    uniform_probs = [0.25, 0.25, 0.25, 0.25]
    assert abs(derive_confidence(uniform_probs) - 0.0) < 1e-4

    # One-hot distribution across 4 options: (4 * 1.0 - 1) / (4 - 1) = 1.0
    one_hot = [1.0, 0.0, 0.0, 0.0]
    assert abs(derive_confidence(one_hot) - 1.0) < 1e-4

    # High confidence: [0.85, 0.05, 0.05, 0.05]
    high_conf = [0.85, 0.05, 0.05, 0.05]
    calculated = derive_confidence(high_conf)
    assert 0.70 < calculated < 1.0

def test_decision_engine_demo_heuristic_routing():
    engine = DecisionEngine()

    # Skill gaps test
    trace_gap = engine.select_next_action("Assess my skill gaps and evaluate what I need to learn", mode="demo")
    assert trace_gap.selected_action == ActionOption.ASSESS_SKILL_GAPS
    assert trace_gap.source == DecisionSource.DEMO_HEURISTIC_STUB
    assert trace_gap.confidence is not None
    assert trace_gap.is_live_decider is False

    # Projects test
    trace_proj = engine.select_next_action("What portfolio project should I build with FastAPI and React?", mode="demo")
    assert trace_proj.selected_action == ActionOption.RECOMMEND_PROJECT

    # Roadmap test
    trace_road = engine.select_next_action("Generate a 6-week study learning roadmap for me", mode="demo")
    assert trace_road.selected_action == ActionOption.GENERATE_LEARNING_ROADMAP

    # Internship test
    trace_intern = engine.select_next_action("Search for remote AI engineering internships", mode="demo")
    assert trace_intern.selected_action == ActionOption.SEARCH_INTERNSHIPS

    # Interview test
    trace_interview = engine.select_next_action("Help me prepare for technical coding interview and DSA", mode="demo")
    assert trace_interview.selected_action == ActionOption.PREPARE_INTERVIEW

    # Clarification test for short/ambiguous queries
    trace_clarify = engine.select_next_action("hi", mode="demo")
    assert trace_clarify.selected_action == ActionOption.REQUEST_CLARIFICATION

def test_real_mode_unreachable_endpoint_graceful_handling():
    # Point to nonexistent port
    engine = DecisionEngine(decider_url="http://127.0.0.1:59999/v1/systemone", timeout_seconds=0.5)
    trace = engine.select_next_action("Assess my skills", mode="real")
    
    # Real mode must NOT falsely claim success if model server is down
    assert trace.is_live_decider is False
    assert trace.source == DecisionSource.SAFE_FALLBACK
    assert trace.selected_action == ActionOption.REQUEST_CLARIFICATION
