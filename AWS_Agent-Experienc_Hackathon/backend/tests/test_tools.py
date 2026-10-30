from app.schemas import StudentProfile, SkillItem
from app.tools.skill_assessment import assess_skill_gaps
from app.tools.project_recommendation import recommend_project
from app.tools.learning_roadmap import generate_learning_roadmap
from app.tools.internship_search import search_internships
from app.tools.interview_prep import prepare_interview
from app.tools.clarification import request_clarification
from app.tools.general_qa import answer_general_question

def test_assess_skill_gaps_calculation():
    # Student with only Python and Git
    student = StudentProfile(
        name="Test Student",
        target_role="Full-Stack AI Engineer",
        skills=[
            SkillItem(name="Python", proficiency=4),
            SkillItem(name="Git", proficiency=3),
        ]
    )
    result = assess_skill_gaps(student)
    assert 0 <= result["readiness_score"] <= 100
    assert len(result["missing_skills"]) > 0
    assert result["matching_skills_count"] >= 1
    assert "readiness_explanation" in result

def test_project_recommendation_structure():
    student = StudentProfile(target_role="Full-Stack AI Engineer")
    result = recommend_project(student)
    proj = result["recommended_project"]
    assert "title" in proj
    assert "problem_statement" in proj
    assert "tech_stack" in proj
    assert "implementation_milestones" in proj

def test_learning_roadmap_structure():
    student = StudentProfile(target_role="Full-Stack AI Engineer")
    result = generate_learning_roadmap(student, weeks=6)
    assert result["total_weeks"] >= 3
    assert len(result["stages"]) >= 3
    assert "recommended_next_action" in result

def test_internship_search_with_sample_dataset():
    student = StudentProfile(
        target_role="Full-Stack AI Engineer",
        skills=[SkillItem(name="Python", proficiency=4), SkillItem(name="React", proficiency=3)]
    )
    result = search_internships(student)
    assert result["is_sample_data"] is True
    assert result["total_found"] > 0
    top = result["recommended_application"]
    assert top is not None
    assert "match_score" in top
    assert "SAMPLE HACKATHON DATASET" in top["disclaimer"]

def test_interview_prep_structure():
    student = StudentProfile(target_role="Full-Stack AI Engineer")
    result = prepare_interview(student)
    assert len(result["technical_topics"]) > 0
    assert len(result["dsa_topics"]) > 0
    assert len(result["prep_schedule"]) == 5

def test_clarification_ambiguous_query():
    student = StudentProfile()
    result = request_clarification("hey", student)
    assert result["status"] == "clarification_needed"
    assert len(result["suggested_options"]) >= 3

def test_general_qa():
    student = StudentProfile()
    result = answer_general_question("How should I prepare for system design?", student)
    assert len(result["answer"]) > 20
