# SkillPilot AI - Hackathon Demo Video Script

**Target Duration:** < 3 minutes (Approx. 2 minutes 45 seconds)  
**Hackathon:** AWS Agent Experience Hackathon  
**Key Features Highlighted:** Strands Decider 2B `#tool-selection`, Amazon Bedrock, Decision Trace Panel, Live Decision Lab  

---

### [00:00 - 00:30] Introduction & Problem Statement
- **Screen:** SkillPilot AI Landing Page (`http://localhost:5173`).
- **Speaker:**  
  *"Hello hackathon judges! Engineering and CS students often struggle to determine what to learn, build, or prepare next for placements. Traditional chatbots just return generic text.*  
  *We built **SkillPilot AI**: an intelligent career copilot that makes real architectural decisions using **Strands Decider 2B** and executes tailored workflows enriched with **Amazon Bedrock**.*  
  *Let’s launch the application!"*
- **Action:** Click **"Launch SkillPilot Agent"** on the hero banner.

---

### [00:30 - 01:15] AI Career Agent Workspace & Live Decision Trace
- **Screen:** Workspace Page (`/workspace`).
- **Speaker:**  
  *"Here in the AI Career Agent Workspace, we interact directly with our career copilot. Let’s click a suggested prompt: 'Assess my skill gaps for Full-Stack AI Engineer'."*
- **Action:** Click prompt button and submit.
- **Speaker:**  
  *"Notice the right panel: this is the **Decision Trace**.  
  Instead of an LLM spending seconds generating tokens, **Strands Decider 2B** evaluated our typed choice question in a single forward pass.  
  It selected the `assess_skill_gaps` tool with a calibrated confidence score of 89%, achieving sub-50ms decision latency.  
  The tool deterministically evaluated our curriculum match index at 65%, identified critical missing skills like Docker and Bedrock integration, and Amazon Bedrock generated tailored next-step recommendations."*

---

### [01:15 - 01:50] Recommending Capstone Projects & Generating Roadmaps
- **Screen:** Click quick action: *"Recommend a portfolio project using Strands Decider and Bedrock"*.
- **Speaker:**  
  *"Now let's ask for a project. Decider 2B immediately shifts its probability mass and routes execution to `recommend_project`.*  
  *The agent pulls our curated project catalog and Bedrock explains how building a Decider-Assisted Agentic API Gateway will make our resume stand out to hiring managers.*  
  *If we navigate to the **Roadmap** tab, we see a personalized 6-week curriculum with weekly goals, practice checkpoints, and automated progress tracking."*
- **Action:** Navigate briefly to **Roadmap** tab and back to **Workspace**.

---

### [01:50 - 02:25] The Decision Lab: Proving the Decision Pattern
- **Screen:** Click **"Decision Lab"** tab (`/decision-lab`).
- **Speaker:**  
  *"To prove that Strands Decider 2B is making real decisions, we built the **Decision Lab**.*  
  *Here we can test any request across the 7 typed actions.  
  Watch what happens when we send an ambiguous query like 'hey'.  
  Decider 2B recognizes the missing context, its guardrail triggers, and it safely routes to `request_clarification`.*  
  *And when we run an internship query, probability mass immediately shifts to `search_internships`, showing the full softmax distribution chart live!"*
- **Action:** Click test case 7 ("hey"), then test case 4 ("Internship Search") and observe probability bars animating.

---

### [02:25 - 02:45] Conclusion & Reusable Recipe
- **Screen:** Show System Status page and the GitHub repo structure (`decision_patterns/tool_selection/`).
- **Speaker:**  
  *"SkillPilot AI provides a production-ready, public reusable decision pattern in `decision_patterns/tool_selection/` with 100% automated test coverage.*  
  *Your Skills. Your Goals. Your Next Move.  
  Thank you for watching!"*
