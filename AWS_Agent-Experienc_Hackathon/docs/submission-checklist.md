# AWS Agent Experience Hackathon - Submission Checklist

Use this checklist to ensure all deliverables are prepared before submitting your project to Devpost or the hackathon portal.

---

## 1. Required Tags
- [x] `#strands-decider-2b` (Included in documentation, codebase, and API metadata)
- [x] `#tool-selection` (Demonstrated decision pattern)

---

## 2. Core Architectural Deliverables
- [x] **Strands Decider 2B Integration**: Implemented via the official `/v1/systemone` wire protocol and choice question schema with mathematical confidence calibration: `(N*p_max - 1)/(N - 1)`.
- [x] **Amazon Bedrock Integration**: Implemented via Boto3 Converse API (`bedrock-runtime`) with support for Claude 3.5 Sonnet / Nova Lite.
- [x] **Strands Agents SDK**: Orchestrated with `strands-agents` (v1.62.0) and intervention guardrails.
- [x] **Tool Selection Decision Pattern**: Located in `decision_patterns/tool_selection/` with typed question, option criteria, standalone example, and tests.
- [x] **7 Executable Tools Whitelisted**:
  1. `assess_skill_gaps`
  2. `recommend_project`
  3. `generate_learning_roadmap`
  4. `search_internships` (with sample dataset disclaimer)
  5. `prepare_interview`
  6. `answer_general_question`
  7. `request_clarification`
- [x] **Frontend User Interface**: Built with React, Vite, Tailwind CSS, Lucide icons, and Recharts.
- [x] **Backend API**: Built with FastAPI, Pydantic v2, and Uvicorn.
- [x] **Automated Test Suite**: 21 backend unit & integration tests passing with 100% success rate (`pytest`).

---

## 3. Hackathon Documentation Deliverables
- [x] Root `README.md` with complete installation, architecture, and running instructions.
- [x] System Architecture document (`docs/architecture.md`).
- [x] AWS & Bedrock Setup Guide (`docs/aws-setup.md`).
- [x] Decision Pattern Deep-Dive (`docs/decision-pattern.md`).
- [x] AWS Deployment Guide (`docs/deployment.md`).
- [x] Draft for AWS Builder Center Article (`docs/builder-center-article.md`) *(Prepared for developer to publish)*.
- [x] Demo Video Script (`docs/demo-video-script.md`) *(Under 3 minutes, ready for developer to record)*.

---

## 4. Submission Next Steps for the Developer
1. **Push to Public GitHub Repository**:
   ```bash
   git add .
   git commit -m "feat: complete SkillPilot AI implementation for AWS Agent Hackathon"
   git push origin main
   ```
2. **Record Demo Video**:
   Follow `docs/demo-video-script.md` to record the screen demonstration (<3 minutes), upload to YouTube / Loom, and paste the URL into your submission.
3. **Publish Builder Center Article**:
   Use `docs/builder-center-article.md` as the article draft to post on AWS Builder Center / Dev.to.
4. **Submit on Hackathon Portal**:
   Include repository link, demo video link, and required tags `#strands-decider-2b` and `#tool-selection`.
