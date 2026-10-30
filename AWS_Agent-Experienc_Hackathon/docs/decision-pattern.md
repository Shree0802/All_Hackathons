# Decision Pattern: Adaptive Tool Selection for Career Agents

**Tag:** `#tool-selection`  
**Model:** `#strands-decider-2b`  
**Pattern Directory:** `decision_patterns/tool_selection/`  

---

## 1. Pattern Overview
The **Adaptive Tool Selection** pattern decouples intent classification and tool dispatch from generative text synthesis in AI agents. 

Rather than prompting an LLM to generate JSON or text containing tool names, the agent uses **Strands Decider 2B** to perform a fast, single forward pass over typed criteria, returning the chosen action and a calibrated confidence score.

---

## 2. Decision Specification

### Typed Decision Question
```text
"Given the student's current request, relevant profile, available tools, and current application state, which action should the agent take next?"
```

### Action Options (7 Whitelisted Actions)
1. `assess_skill_gaps`: Compare existing skills against target role requirements and identify missing competencies.
2. `recommend_project`: Recommend portfolio-grade, practical software projects tailored to student skills and goals.
3. `generate_learning_roadmap`: Generate a structured weekly study roadmap, milestones, and assessment checkpoints.
4. `search_internships`: Search and filter matching internship opportunities based on skills, role, and location.
5. `prepare_interview`: Generate technical questions, DSA topics, behavioral prompts, and prep timetable.
6. `answer_general_question`: Provide advisory responses to general career advice, tech questions, or academic guidance.
7. `request_clarification`: Ask the student for clarification when the request is ambiguous or key info is missing.

---

## 3. Wire Protocol & Schema

SkillPilot AI implements the official Strands Decider `/v1/systemone` wire protocol:

```json
{
  "model": "StrandsAgents/strands-decider-2B-hobson-v19",
  "state": {
    "user_request": "What project should I build to learn LLM agents?",
    "target_role": "Full-Stack AI Engineer",
    "skills_count": 8,
    "skills_list": ["Python", "FastAPI", "React", "SQL"]
  },
  "questions": {
    "tool_selection": {
      "type": "choice",
      "instructions": "Given the student's current request, relevant profile, available tools, and current application state, which action should the agent take next?",
      "criteria": {
        "assess_skill_gaps": "Compare existing skills against target role requirements...",
        "recommend_project": "Recommend portfolio-grade, practical software projects...",
        "generate_learning_roadmap": "Generate a structured weekly study roadmap...",
        "search_internships": "Search and filter matching internship opportunities...",
        "prepare_interview": "Generate technical questions and prep timetable...",
        "answer_general_question": "Provide advisory responses to general career advice...",
        "request_clarification": "Ask the student for clarification when request is ambiguous..."
      }
    }
  }
}
```

---

## 4. Confidence Thresholding & Intervention Guard

Confidence is calculated using the normalized max-probability formula:

$$\text{Confidence} = \frac{N \times p_{\max} - 1}{N - 1}$$

- $\text{Confidence} \ge 0.65$: The selected tool executes immediately.
- $\text{Confidence} < 0.65$: The agent intervention guard intercepts the execution and routes to `request_clarification` to prevent unauthorized actions.

---

## 5. Standalone Reuse

Developers can import and reuse this recipe directly:

```python
from decision_patterns.tool_selection.recipe import AdaptiveToolSelector

selector = AdaptiveToolSelector(
    decision_question="Which tool should handle this user request?",
    options_criteria={
        "action_a": "Description for action A",
        "action_b": "Description for action B",
    }
)

selector.register_tool("action_a", my_tool_a_function)
selector.register_tool("action_b", my_tool_b_function)

decision = selector.select({"user_request": "Run tool A"})
output = selector.dispatch(decision)
```
