import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_api_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "app_name" in data

def test_api_status():
    response = client.get("/api/status")
    assert response.status_code == 200
    data = response.json()
    assert "decider_2b_available" in data
    assert "bedrock_configured" in data
    assert "strands_agents_version" in data
    assert data["decider_model"] == "StrandsAgents/strands-decider-2B-hobson-v19"

def test_student_profile_get_and_update():
    # GET
    res_get = client.get("/api/student/profile")
    assert res_get.status_code == 200
    profile = res_get.json()
    assert profile["id"] == "std_dev_001"
    assert "skills" in profile

    # PUT
    profile["target_role"] = "Full-Stack AI Engineer"
    res_put = client.put("/api/student/profile", json=profile)
    assert res_put.status_code == 200
    updated = res_put.json()
    assert updated["target_role"] == "Full-Stack AI Engineer"

def test_agent_chat_workflow():
    payload = {
        "message": "Assess my skill gaps for Full-Stack AI Engineer",
        "mode": "demo"
    }
    response = client.post("/api/agent/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["selected_action"] == "assess_skill_gaps"
    assert data["tool_name"] == "assess_skill_gaps"
    assert "decision_trace" in data
    assert "result" in data
    assert "summary_message" in data

def test_decision_lab_endpoint():
    payload = {
        "test_prompt": "What project should I build to showcase Strands Decider and Bedrock?",
        "mode": "demo"
    }
    response = client.post("/api/agent/decision-test", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["recommended_tool"] == "recommend_project"
    assert data["decision_trace"]["selected_action"] == "recommend_project"

def test_activities_endpoint():
    response = client.get("/api/activities?limit=5")
    assert response.status_code == 200
    activities = response.json()
    assert isinstance(activities, list)

def test_internships_endpoint():
    response = client.get("/api/internships")
    assert response.status_code == 200
    data = response.json()
    assert data["is_sample_data"] is True
    assert data["total_found"] > 0
