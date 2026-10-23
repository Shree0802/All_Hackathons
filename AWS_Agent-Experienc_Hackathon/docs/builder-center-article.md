# Building SkillPilot AI: Decoupling Fast Intent Routing with Strands Decider 2B and Amazon Bedrock

*Author: AWS Agent Experience Hackathon Team*  
*Tags:* `#strands-decider-2b` `#tool-selection` `Amazon Bedrock` `FastAPI` `React`  

---

## Introduction: Why Most Career Chatbots Fall Short

Engineering and computer science students face an overwhelming career landscape. Should they learn distributed systems, study vector search, build a capstone project, or prepare for technical interviews? Traditional generative chatbots often answer with a wall of text, yet fail to execute any meaningful workflow.

More critically from an architectural standpoint, traditional AI agents rely on 70B+ parameter LLMs for *every single decision* in the loop. Asking a multi-billion parameter model to parse a greeting or select a tool adds 800ms–2,500ms of latency, incurs high token costs, and offers zero calibrated confidence metrics over the action space.

To solve this, we built **SkillPilot AI** for the AWS Agent Experience Hackathon. SkillPilot AI pairs **Strands Decider 2B**—a specialized System One decision model—with **Amazon Bedrock** for high-quality generative synthesis.

---

## Architectural Philosophy: System 1 vs. System 2 in AI Agents

Cognitive science describes human cognition in two modes:
- **System 1:** Fast, instinctive, discrete classification (evaluating options in milliseconds).
- **System 2:** Deliberative, slow, rich logical synthesis.

In SkillPilot AI:
- **Strands Decider 2B is System 1**: In a single forward pass (<50ms), it evaluates the student's request and profile against typed candidate actions and returns a calibrated confidence score.
- **Amazon Bedrock is System 2**: Once the appropriate tool is selected and executed deterministically, Amazon Bedrock (Claude 3.5 Sonnet / Amazon Nova) synthesizes personalized guidance, resume impact tips, and interview coaching.

---

## The Core Decision Pattern: `#tool-selection`

The agent defines a typed decision question:

```text
"Given the student's current request, relevant profile, available tools, and current application state, which action should the agent take next?"
```

Candidate options are strictly bounded to 7 whitelisted actions:
1. `assess_skill_gaps`
2. `recommend_project`
3. `generate_learning_roadmap`
4. `search_internships`
5. `prepare_interview`
6. `answer_general_question`
7. `request_clarification`

### Wire Protocol Integration
SkillPilot AI communicates with Strands Decider via the `/v1/systemone` wire protocol:

```python
payload = {
    "model": "StrandsAgents/strands-decider-2B-hobson-v19",
    "state": {
        "user_request": user_request,
        "target_role": student_profile.target_role,
        "skills_count": len(student_profile.skills),
    },
    "questions": {
        "tool_selection": {
            "type": "choice",
            "instructions": DECISION_QUESTION,
            "criteria": ACTION_DESCRIPTIONS,
        }
    },
}
```

### Calibrated Confidence Guardrails
Unlike generative models that generate confidence arbitrarily, Decider 2B outputs probability distributions over options. We apply the calibrated formula:

$$\text{Confidence} = \frac{N \times p_{\max} - 1}{N - 1}$$

If confidence falls below the threshold ($\ge 0.65$) or the request is ambiguous (e.g. "hi"), the agent intervention guard intercepts the workflow and routes to `request_clarification`, ensuring safe agent behavior.

---

## The Strands Agents SDK Orchestration

We integrate the **Strands Agents SDK** (`strands-agents`) to manage agent lifecycle hooks:
- **Before Tool Call**: Verifies that the Decider choice exists in the immutable tool whitelist.
- **After Tool Call**: Formats tool outputs and feeds enriched context into the Bedrock service.

---

## Key Implementation Lessons

1. **Decoupled Architecture Delivers Responsiveness**: Moving intent classification to a small 2B model cuts routing latency to a fraction of traditional LLM chains.
2. **Transparent Fallbacks are Crucial**: If local model weights or AWS credentials are not yet configured during development, the application should honestly report fallback status rather than fabricating success.
3. **Strict Whitelisting Protects Tools**: Never execute arbitrary string function names returned by a model. Enforcing an immutable dictionary registry prevents prompt injection or drift.

---

## Quickstart: Running SkillPilot AI

### 1. Clone & Setup Backend
```bash
git clone https://github.com/your-username/skillpilot-ai.git
cd skillpilot-ai/backend

python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
python -m pytest tests/ -v
python ../scripts/run_backend.py
```

### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run build
npm run dev
```

Visit `http://localhost:5173` to explore the live dashboard, AI career workspace, and Decision Lab!
