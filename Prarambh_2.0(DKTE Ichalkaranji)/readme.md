# EDUTECH | AI-Powered Evidence-Based Competency & Industry Readiness Ecosystem

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-EDUTECH_Vercel_App-0c8de9?style=for-the-badge&logo=vercel)](https://edutech-axvercel.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Prarambh--2.0--Hackathon-181717?style=for-the-badge&logo=github)](https://github.com/Shree0802/Prarambh-2.0-Hackthaon)

🌐 **Live Deployed Prototype**: https://edutech-axvercel.vercel.app/

> **From Self-Declared Skills to Verified Competency.**
> *Learn. Practice. Demonstrate. Verify. Analyze. Improve. Connect.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-EDUTECH_Vercel_App-0c8de9?style=for-the-badge&logo=vercel)](https://edutech-axvercel.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Prarambh--2.0--Hackathon-181717?style=for-the-badge&logo=github)](https://github.com/Shree0802/Prarambh-2.0-Hackthaon)

🌐 **Live Deployed Prototype**: [https://edutech-axvercel.vercel.app/](https://edutech-axvercel.vercel.app/)

---

## 1. Product Vision & Ecosystem Architecture
EDUTECH is an **AI-powered evidence-based skill intelligence and industry readiness platform**. Instead of relying solely on self-declared resumes or CGPAs, EDUTECH verifies practical competency, identifies industry skill gaps against target roles, generates personalized multi-phase learning paths, and provides evidence-backed candidate evaluation for employers and institutional analytics for colleges.

```text
LEARN → PRACTICE → DEMONSTRATE → VERIFY → MEASURE → ANALYZE → IDENTIFY GAPS → PERSONALIZE LEARNING → RE-ASSESS → BUILD VERIFIED PORTFOLIO → CONNECT WITH INDUSTRY
```

---

## 2. Jury Showcase Control Panel (1-Click Presets)
EDUTECH features a sticky top **Jury Control Panel** (`JuryShowcaseBanner.jsx`) designed specifically for rapid hackathon evaluation. Judges can launch 5 complete end-to-end user journeys with a single click:

1. 🚀 **Scenario 1: Skill Gap & AI Remediation**: Switches to Student profile → runs gap analysis (51% gap in Statistics) → auto-assigns remedial micro-course → updates readiness score to 86%.
2. 🛡️ **Scenario 2: AI Code & Anti-Fraud Engine**: Switches to Admin → triggers Github Repo Parser on "AI Resume Analyzer" → checks commit depth (28 commits), author identity, originality score (89%), and issue audit hash.
3. 💻 **Scenario 3: Monaco Code Sandbox**: Launches Monaco Code Editor → executes Python Kadane's algorithm & SQL queries with automated test suite runners.
4. 🎓 **Scenario 4: Faculty Curriculum Alignment**: Switches to Faculty → analyzes CS department heatmaps → flags 58% Cloud gap → launches 1-click curriculum intervention builder for 42 affected students.
5. 💼 **Scenario 5: Employer Precision Search & Dossier**: Switches to Recruiter → filters candidates by Python >= 80% & verified evidence → inspects code dossier → sends formal interview invitation modal.

---

## 3. Comprehensive Feature Breakdown

### A. Academic Profile & Learning Record (`AcademicProfilePage.jsx`)
* **CGPA vs Practical Competency Separation**: Academic CGPA (8.6/10.0) is tracked separately from demonstrated practical competency (78%) so coursework grades do not artificially skew industry readiness.
* **Interactive Marks Editor**: Interactive subject marks slider/editor with real-time CGPA recalculation and subject-to-skill mapping.

### B. Personalized Skill Graph & Evidence Strength (`SkillGraphPage.jsx`)
* **Dynamic Connected Graph**: Connected nodes linking `Student → Skills → Evidence → Projects → Assessments → Target Roles`.
* **Evidence Strength Indicators**: Displays `HIGH`, `MEDIUM`, or `LOW` evidence strength badges accompanied by hover explanations detailing why.

### C. Standardized Competency Level System (0 to 5) (`CompetencyLevelBadge.jsx`)
* **Level 0 (0-20%)**: No Evidence
* **Level 1 (21-40%)**: Beginner
* **Level 2 (41-60%)**: Developing
* **Level 3 (61-75%)**: Intermediate
* **Level 4 (76-90%)**: Advanced
* **Level 5 (91-100%)**: Industry Ready

### D. Skill Evidence 5-Source Weighting (`competencyEngine.js`)
* **5-Source Formula**: Technical Assessment (30%), Practical Coding Runner (25%), Verified GitHub Projects (25%), Portfolio Evidence (10%), and Certification Verification (10%).

### E. Re-Assessment Loop & Competency Growth (`StudentDashboard.jsx`)
* **Closed Feedback Loop**: `Initial Assessment (51%) → Gap Identified → Learning Module Completed → Re-assessment → Score Improved (68%) → Gap Reduced`.
* **Growth History Chart**: Recharts line visualization illustrating month-over-month competency growth (Sept 51% → Oct 64% → Nov 73%).

### F. Learning Management Hub & 30-Day AI Roadmap (`LearningHubPage.jsx`)
* **Time Commitment Selector**: Toggle daily learning commitment (`1 Hour / Day` vs `2 Hours / Day`).
* **30-Day Intensive ML Roadmap**: Paced 4-week daily task sequence with status toggles (`Start Learning`, `Mark Complete`).

### G. AI Mock Interview Module (`MockInterviewPage.jsx`)
* **Real-time AI Interview**: Interactive question generator and response evaluator across Technical, HR, and Mixed interview formats.
* **Structured Evaluation**: Feedback breakdown assessing Technical Relevance, Completeness, and Structure with concrete improvement suggestions.

### H. Faculty Intervention Builder (`CurriculumGaps.jsx`)
* **Institutional Gap Alert**: Institutional heatmap highlighting skill deficits (e.g. 58% Cloud Computing deficit).
* **Curriculum Intervention Modal**: 1-click workshop & bridge course deployment auto-enrolling affected cohort students.

### I. Employer Precision Discovery & Direct Invitation (`CandidateDiscovery.jsx`)
* **Evidence-First Ranking**: Ranks candidates by verified role fit & GitHub code evidence.
* **Verified Candidate Dossier**: View candidate code commits, project verification score, and verified certifications.
* **Formal Interview Invitation Modal**: Sends customized interview invitations linking candidate verification proof.

### J. Public Verified Digital Portfolio & QR Code (`PublicPortfolioPage.jsx`)
* **Public/Private Toggle**: Student-controlled portfolio privacy settings.
* **Shareable URL**: `/portfolio/:userId` showing student bio, verified skills, code repos, and trust badges.
* **Portfolio QR Code**: SVG QR code generator for instant mobile scanning by recruiters.

### K. Anti-Fraud & Evidence Integrity Layer (`AdminVerificationCenter.jsx`)
* **System Audit Log**: Real-time logging of all verification, submission, and role changes.
* **Neutral Integrity Flags**: Assigns `Clean`, `Requires Review`, `Potential Inconsistency`, or `Insufficient Evidence` to trigger faculty/admin reviews.

---

## 4. Technology Stack

* **Frontend**: React.js, Vite, Tailwind CSS, Lucide React icons, Recharts, Framer Motion, Monaco Editor.
* **Backend**: Node.js, Express.js REST API.
* **Database**: MongoDB & Mongoose schemas with an automatic in-memory fallback store for offline/demo environments.
* **AI Engine**: Google Gemini API (`@google/generative-ai`) with deterministic fallback engines.
* **Auth**: JWT, bcryptjs, Role-Based Access Control (`student`, `faculty`, `employer`, `admin`).
* **Deployment**: Deployed on Vercel at [https://edutech-axvercel.vercel.app/](https://edutech-axvercel.vercel.app/)

---

## 5. Requirements Traceability Matrix

| Problem Statement Requirement | EDUTECH Ecosystem Feature | Implementation Component | Verification Proof |
| :--- | :--- | :--- | :--- |
| **Academic Profile & Course Mapping** | Subject-to-Skill Mapper & Marks Editor | `AcademicProfilePage.jsx` + `/api/academic` | CGPA 8.6 kept separate from Practical 78%; interactive marks editor |
| **Personalized Skill Graph** | Connected Tree & Evidence Strength | `SkillGraphPage.jsx` + `/api/skill-graph` | Student → Skill → Evidence tree with `HIGH` evidence strength badge |
| **Competency Level System (0-5)** | Standardized Levels | `CompetencyLevelBadge.jsx` + `competencyEngine.js` | Level 4 (76-90% Advanced) vs Level 5 (91-100% Industry Ready) |
| **5-Source Score Weighting** | 30/25/25/10/10 Formula | `SkillGraphPage.jsx` + `competencyEngine.js` | Transparent 5-source breakdown for every skill score |
| **Re-assessment Loop & Growth** | Closed Loop & Growth History | `StudentDashboard.jsx` + `/api/students/reassessment` | Re-assessment button increases Stats score 51% → 68%; line chart rises |
| **Faculty Intervention Builder** | Institutional Gap & Auto-Enrollment | `CurriculumGaps.jsx` + `/api/faculty/interventions` | 1-click workshop builder auto-enrolling 42 affected students |
| **Employer Candidate Discovery** | Verified Code Dossier & Invitation | `CandidateDiscovery.jsx` + `/api/employer/candidates` | Candidate ranking with verified code audit & interview invitation modal |
| **Jury Showcase Control Panel** | 5 Preset Scenario Runners | `JuryShowcaseBanner.jsx` | Sticky top banner running 1-click end-to-end user journeys |
| **Public Portfolio & QR Code** | Shareable Profile & SVG QR | `PublicPortfolioPage.jsx` + `QRCodeGenerator.jsx` | Portfolio at `/portfolio/:userId` with QR payload |
| **Anti-Fraud Integrity Layer** | Audit Log & Neutral Flags | `AdminVerificationCenter.jsx` + `/api/integrity/flags` | Neutral flags (`Requires Review`, `Potential Inconsistency`) & Audit trail |

---

## 6. Live App & Local Setup

### Live Deployment
* **Live App URL**: [https://edutech-axvercel.vercel.app/](https://edutech-axvercel.vercel.app/)

### Local Execution

#### Backend
```bash
cd C:\Users\Prathamesh\.gemini\antigravity\scratch\edutech\server
node index.js
```

#### Frontend
```bash
cd C:\Users\Prathamesh\.gemini\antigravity\scratch\edutech\client
npm run dev
```
*App launches on `http://localhost:5173`*

---

## 7. Demo Accounts (1-Click Switcher in Navbar)

| Role | Email | Password | Pre-seeded Context |
| :--- | :--- | :--- | :--- |
| **Student** | `student@edutech.demo` | `password123` | **Prathamesh Patil**, ML Engineer Target, 78% Readiness |
| **Faculty** | `faculty@edutech.demo` | `password123` | **Dr. Aris Thorne**, HOD CS Dept, Institutional Heatmap |
| **Employer** | `employer@edutech.demo` | `password123` | **TechNova Labs**, Requisitions, Candidate Dossiers |
| **Admin** | `admin@edutech.demo` | `password123` | System Administrator, Audit Trail & Anti-Fraud Queue |
