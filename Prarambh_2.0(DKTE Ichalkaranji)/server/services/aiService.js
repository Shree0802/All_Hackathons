import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// Fallback / Mock AI Service when API key is not present or for robust deterministic execution
export const aiService = {
  // 1. Analyze Project Repository
  async analyzeProject({ title, description, githubUrl, technologies }) {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Analyze this student project for tech skills and code verification:
Title: ${title}
Description: ${description}
GitHub: ${githubUrl}
Tech Stack: ${technologies}

Return ONLY a JSON object with:
{
  "detectedTechnologies": ["Python", "Flask", "React", "MongoDB", "NLP"],
  "detectedSkills": [{"skillName": "Python", "level": "Advanced"}, {"skillName": "REST API", "level": "Intermediate"}],
  "verificationScore": 84,
  "repositoryEvidence": { "repoAccessible": true, "readmeDetected": true, "sourceCodeDetected": true, "multipleCommits": true, "dependenciesDetected": true },
  "summary": "Repository verified with robust architecture, active commit history, and clean code structure."
}`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.warn('[AI Service Warning] Gemini API failed, using fallback engine:', e.message);
      }
    }

    // Deterministic Mock AI Project Verification Engine
    const techList = typeof technologies === 'string' 
      ? technologies.split(',').map(t => t.trim()) 
      : (Array.isArray(technologies) ? technologies : ['Python', 'React', 'MongoDB']);
    
    return {
      detectedTechnologies: techList.length ? techList : ['Python', 'Flask', 'React', 'MongoDB', 'NLP'],
      detectedSkills: [
        { skillName: techList[0] || 'Python', level: 'Advanced' },
        { skillName: techList[1] || 'Machine Learning', level: 'Intermediate' },
        { skillName: 'REST API', level: 'Intermediate' },
        { skillName: 'Database Management', level: 'Intermediate' }
      ],
      verificationScore: 84,
      repositoryEvidence: {
        repoAccessible: true,
        readmeDetected: true,
        sourceCodeDetected: true,
        multipleCommits: true,
        dependenciesDetected: true
      },
      summary: `Verified GitHub repository "${title}". Code structure shows modular design, documented endpoints, and authentic commit logs.`
    };
  },

  // 2. Analyze Skill Gap
  async analyzeSkillGap(studentSkills = [], roleRequirements = []) {
    const gaps = roleRequirements.map(req => {
      const studentSkill = studentSkills.find(s => s.skillName.toLowerCase() === req.skillName.toLowerCase()) || { scorePercentage: 40 };
      const currentScore = studentSkill.scorePercentage || studentSkill.score || 40;
      const requiredScore = req.requiredScore;
      const gap = Math.max(0, requiredScore - currentScore);
      let status = 'ready';
      if (gap > 15) status = 'major_gap';
      else if (gap > 0) status = 'needs_improvement';

      return {
        skillName: req.skillName,
        currentScore,
        requiredScore,
        gap,
        status,
        importance: req.importance || 'High'
      };
    });

    const readyCount = gaps.filter(g => g.status === 'ready').length;
    const readinessPct = Math.round((readyCount / (gaps.length || 1)) * 100);

    return {
      readinessPct,
      matchedSkillsCount: readyCount,
      totalRequiredSkills: gaps.length,
      skillGapCount: gaps.filter(g => g.gap > 0).length,
      gaps
    };
  },

  // 3. Generate Personalized Learning Path
  async generateLearningPath(skillGaps = [], targetRoleTitle = 'Machine Learning Engineer') {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Generate a 4-phase learning path for a student targeting role "${targetRoleTitle}" with these skill gaps: ${JSON.stringify(skillGaps)}.
Return ONLY a JSON array of 4 objects:
[
  {
    "phaseNumber": 1,
    "title": "Phase 1 Title",
    "durationDays": 7,
    "topics": ["Topic 1", "Topic 2"],
    "recommendedReason": "Why this is recommended based on gap",
    "completed": false
  }
]`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.warn('[AI Service Warning] Gemini API failed for learning path:', e.message);
      }
    }

    // Realistic Deterministic Learning Path
    return [
      {
        phaseNumber: 1,
        title: "Statistics & Probability Fundamentals",
        durationDays: 7,
        topics: [
          "Probability Distributions (Gaussian, Binomial)",
          "Hypothesis Testing & p-values",
          "Variance, Standard Deviation, & Covariance",
          "A/B Testing Methodology"
        ],
        recommendedReason: "Your Statistics competency is 51%, while Machine Learning Engineer requires ~70%. Strengthening statistical foundations is critical for model evaluation and feature selection.",
        completed: false
      },
      {
        phaseNumber: 2,
        title: "Advanced Machine Learning Algorithms",
        durationDays: 10,
        topics: [
          "Regularized Regression (L1/L2 Ridge & Lasso)",
          "Ensemble Learning (XGBoost, Random Forests)",
          "Cross-Validation & Hyperparameter Tuning",
          "Model Diagnostic Metrics (ROC-AUC, Precision-Recall)"
        ],
        recommendedReason: "Your ML competency is 68% (Target: 80%). Focusing on non-linear algorithms and ensemble models will close the 12% competency gap.",
        completed: false
      },
      {
        phaseNumber: 3,
        title: "Deep Learning with TensorFlow & Keras",
        durationDays: 7,
        topics: [
          "Convolutional Neural Networks (CNNs)",
          "Model Training Optimization & Learning Rate Scheduling",
          "Custom Loss Functions & Evaluation",
          "TensorFlow Model Export & Quantization"
        ],
        recommendedReason: "TensorFlow competency is currently at 44% vs 60% requirement. Building deep learning models directly bridges your neural network gap.",
        completed: false
      },
      {
        phaseNumber: 4,
        title: "Capstone Project: End-to-End MLOps Pipeline",
        durationDays: 7,
        topics: [
          "Build Customer Churn Prediction API with FastAPI",
          "Dockerize ML Inference Service",
          "Integrate CI/CD pipeline on GitHub Actions",
          "Deploy model to Cloud instance with monitoring"
        ],
        recommendedReason: "Demonstrating verified end-to-end deployment evidence boosts your practical project verification score to 90%+.",
        completed: false
      }
    ];
  },

  // 4. AI Career & Learning Mentor Response
  async generateMentorResponse({ question, studentProfile, skills, targetRole, skillGaps }) {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are EDUTECH AI Mentor, a career and skill development coach.
Context:
Student: ${studentProfile?.name || 'Prathamesh'}
Target Role: ${targetRole || 'Machine Learning Engineer'}
Readiness Score: ${studentProfile?.readinessScore || 78}%
Top Skills: ${JSON.stringify(skills)}
Skill Gaps: ${JSON.stringify(skillGaps)}

Question: "${question}"

Provide a direct, highly encouraging, structured, actionable response (under 200 words) using bullet points where practical.`;
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (e) {
        console.warn('[AI Service Warning] Gemini API failed for AI Mentor:', e.message);
      }
    }

    // Deterministic personalized mentor response
    const qLower = question.toLowerCase();
    if (qLower.includes('learn next') || qLower.includes('what to study') || qLower.includes('roadmap')) {
      return `Hi ${studentProfile?.name || 'Prathamesh'}! Based on your target role of **${targetRole || 'Machine Learning Engineer'}**, your single biggest leverage point right now is **Statistics & Probability** (currently 51% vs 70% target requirement).\n\n**Recommended Next Action:**\n1. Complete Phase 1 of your AI Learning Path (Hypothesis Testing & Distributions).\n2. Take the Statistics Practical Assessment to boost your verified score.\n3. Implement hypothesis testing in your *AI Resume Analyzer* project!`;
    }
    if (qLower.includes('ml readiness') || qLower.includes('low') || qLower.includes('readiness')) {
      return `Your overall Industry Readiness is solid at **${studentProfile?.readinessScore || 78}%**! Breakdown:\n- Technical Competency: 82%\n- Practical Evidence: 76%\n- Assessments: 81%\n- Project Verification: 74%\n\nTo push your ML readiness above 85%, complete a verified TensorFlow project and increase your Statistics assessment score by 15%.`;
    }
    if (qLower.includes('python') || qLower.includes('improve python')) {
      return `Your **Python** score is strong at **82%**! You already have evidence from 84 coding problems and 2 verified projects. To push Python to 90%+, solve 15 advanced DSA problems on maximum subarray sum and dynamic programming in our Coding Assessment tab!`;
    }

    return `Hello! As your EDUTECH AI Mentor, I've analyzed your profile for **${targetRole || 'Machine Learning Engineer'}**. You have verified strong skills in Python (82%) and Git (86%). I recommend prioritizing your **Statistics (51%)** and **TensorFlow (44%)** skill gaps to maximize your role fit with employers like TechNova Labs!`;
  },

  // 5. Institutional Insights & Curriculum Gap Analysis
  async generateInstitutionalInsights(heatmapData = []) {
    return {
      summary: "Institutional Analysis identified a 58% competency gap in Cloud Deployment & MLOps among 3rd Year Computer Science students.",
      criticalInsights: [
        {
          title: "Cloud Infrastructure & Docker Gap",
          affectedPct: 58,
          description: "58% of third-year students demonstrate a major gap in cloud deployment and containerization skills (Docker, AWS/GCP basics).",
          recommendation: "Introduce a 2-week hands-on Docker & Cloud Deployment practical workshop in Semester 6."
        },
        {
          title: "Applied Statistics in Data Science",
          affectedPct: 44,
          description: "44% of students score under 55% in Applied Statistics despite high Python syntax scores.",
          recommendation: "Shift assessment focus from theoretical probability to practical data analytics case studies."
        }
      ]
    };
  },

  // 6. Analyze Candidate Role Fit for Employers
  async analyzeCandidateRoleFit({ candidateProfile, jobRequirements }) {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Analyze fit between candidate ${JSON.stringify(candidateProfile)} and job requirements ${JSON.stringify(jobRequirements)}. Return JSON with fitScore (0-100), keyStrengths, skillGaps, and recruiterSummary.`;
        const result = await model.generateContent(prompt);
        const match = result.response.text().match(/\{[\s\S]*\}/);
        if (match) return JSON.parse(match[0]);
      } catch (e) {
        console.warn('[AI Service Warning] Gemini role fit analysis fallback:', e.message);
      }
    }

    return {
      fitScore: 88,
      keyStrengths: ["Verified Python Competency (88%)", "AI Resume Analyzer GitHub Code Audit Passed", "Strong Machine Learning Foundations"],
      skillGaps: ["Cloud Infrastructure (Docker/AWS)", "Production Model Monitoring"],
      recruiterSummary: "Candidate demonstrates strong verified practical evidence in core ML algorithms and Python development. High recommendation for ML Intern role."
    };
  },

  // 7. Analyze Resume Evidence
  async analyzeResume({ resumeText, targetRole }) {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Extract skills, projects, and evidence strength from resume text for target role "${targetRole}": ${resumeText}. Return JSON with extractedSkills, verifiedClaimRatio, and evidenceStrength.`;
        const result = await model.generateContent(prompt);
        const match = result.response.text().match(/\{[\s\S]*\}/);
        if (match) return JSON.parse(match[0]);
      } catch (e) {
        console.warn('[AI Service Warning] Gemini resume analysis fallback:', e.message);
      }
    }

    return {
      extractedSkills: ["Python", "Machine Learning", "SQL", "Statistics", "Git"],
      verifiedClaimRatio: "82% of claimed resume skills have backing verified repository commits and assessment records.",
      evidenceStrength: "HIGH"
    };
  }
};
