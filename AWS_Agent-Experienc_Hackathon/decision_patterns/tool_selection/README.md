# Adaptive Tool Selection Pattern for Strands Decider 2B

**Pattern Identifier:** `#tool-selection`  
**Model Family:** `#strands-decider-2b`  
**Ecosystem:** Strands Agents SDK + Amazon Bedrock  

---

## 1. Problem Statement
In production agentic architectures, delegating every tool selection decision to a heavyweight Large Language Model (e.g. 70B+ parameters) introduces significant drawbacks:
1. **High Ingestion & Generation Latency:** Token-by-token decoding takes 800ms to 3,000ms just to decide which function to execute.
2. **Lack of Calibrated Confidence:** Generative models do not output mathematically reliable uncertainty metrics over discrete action spaces.
3. **Execution Safety Risks:** Generative LLMs can hallucinate function names, parameters, or drift outside permitted tools.

## 2. Decision Concept
Instead of generating free-form text, the agent uses **Strands Decider 2B** as a fast "System One" decision model. 

Strands Decider 2B evaluates the current state against a typed question and a discrete set of option criteria in a **single forward pass** (sub-50ms), returning the optimal action alongside a calibrated confidence metric.

---

## 3. Typed Decision Schema

### Decision Question
```text
"Given the student's current request, relevant profile, available tools, and current application state, which action should the agent take next?"
```

### Action Options & Criteria Schema
| Action Option | Criteria Description |
|---|---|
| `assess_skill_gaps` | Compare existing skills against target role requirements and identify missing competencies. |
| `recommend_project` | Recommend portfolio-grade, practical software projects tailored to student skills and goals. |
| `generate_learning_roadmap` | Generate a structured weekly study roadmap, milestones, and assessment checkpoints. |
| `search_internships` | Search and filter matching internship opportunities based on skills, role, and location. |
| `prepare_interview` | Generate technical questions, DSA topics, behavioral prompts, and prep timetable. |
| `answer_general_question` | Provide advisory responses to general career advice, tech questions, or academic guidance. |
| `request_clarification` | Ask the student for clarification when the request is ambiguous or key info is missing. |

---

## 4. Mathematical Confidence Calibration

Unlike generative text heuristics, Strands Decider normalizes probabilities using the formula:

$$\text{Confidence} = \frac{N \times p_{\max} - 1}{N - 1}$$

- For a uniform distribution across $N$ options, confidence equals $0.0$.
- For a confident one-hot distribution, confidence equals $1.0$.
- This metric is independent of $N$, meaning that confidence thresholds (e.g., $\ge 0.65$) mean the exact same certainty level whether choosing between 3 or 10 options.

---

## 5. Wiring Into the Agent Execution Path

```
  [User Request] + [Student Profile State]
                     │
                     ▼
       ┌───────────────────────────────┐
       │   Strands Decider 2B Engine   │
       │     (POST /v1/systemone)      │
       └──────────────┬────────────────┘
                      │ Returns: (ActionOption, Confidence, Probabilities)
                      ▼
       ┌───────────────────────────────┐
       │  Tool Selection Intervention  │
       │    Guard (Confidence Check)   │
       └──────────────┬────────────────┘
                      │ Verified Whitelisted Tool
                      ▼
       ┌───────────────────────────────┐
       │     Registered Tool Logic     │
       │ (e.g. assess_skill_gaps)      │
       └──────────────┬────────────────┘
                      │ Tool Result
                      ▼
       ┌───────────────────────────────┐
       │    Amazon Bedrock Converse    │
       │ (Personalized Synthesis)      │
       └──────────────┬────────────────┘
                      │
                      ▼
          [Frontend Decision Trace]
```

---

## 6. How Developers Can Reuse This Recipe

To adapt this pattern for your own application (e.g. e-commerce support, DevOps triage, clinical assistant):

1. **Define Your Domain Options**:
   ```python
   OPTIONS = {
       "create_ticket": "Customer reports a bug or billing discrepancy",
       "check_order_status": "Customer asks for tracking number or shipping status",
       "escalate_to_human": "Customer expresses anger or legal escalation",
   }
   ```
2. **Instantiate `AdaptiveToolSelector`**:
   ```python
   from recipe import AdaptiveToolSelector

   selector = AdaptiveToolSelector(
       decision_question="Which support tool should handle this customer message?",
       options_criteria=OPTIONS,
       decider_url="http://127.0.0.1:8000/v1/systemone",
       confidence_threshold=0.70,
   )
   ```
3. **Register Your Functions**:
   ```python
   selector.register_tool("create_ticket", my_ticket_function)
   selector.register_tool("check_order_status", my_tracking_function)
   selector.register_tool("escalate_to_human", my_escalate_function)
   ```
4. **Select & Dispatch**:
   ```python
   decision = selector.select({"user_request": "Where is my package #9821?"})
   output = selector.dispatch(decision, user_id=123)
   ```

---

## 7. Running Pattern Tests & Standalone Example

```bash
# Run standalone usage demo
python decision_patterns/tool_selection/example.py

# Run unit tests
python -m pytest decision_patterns/tool_selection/tests/test_recipe.py -v
```
