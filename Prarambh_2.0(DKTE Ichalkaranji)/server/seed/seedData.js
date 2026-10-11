export const demoUsers = [
  {
    _id: '660a11111111111111111111',
    name: 'Prathamesh Patil',
    email: 'student@edutech.demo',
    password: 'password123',
    role: 'student',
    institution: 'National Institute of Technology',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
  },
  {
    _id: '660a22222222222222222222',
    name: 'Dr. Ramesh Kulkarni',
    email: 'faculty@edutech.demo',
    password: 'password123',
    role: 'faculty',
    institution: 'National Institute of Technology',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80'
  },
  {
    _id: '660a33333333333333333333',
    name: 'TechNova Labs Recruiter',
    email: 'employer@edutech.demo',
    password: 'password123',
    role: 'employer',
    company: 'TechNova Labs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
  },
  {
    _id: '660a44444444444444444444',
    name: 'EDUTECH Admin',
    email: 'admin@edutech.demo',
    password: 'password123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80'
  }
];

export const demoStudentProfile = {
  userId: '660a11111111111111111111',
  branch: 'Computer Science (AI & ML)',
  year: 'Third Year',
  semester: 6,
  targetRoleId: 'role_ml_engineer',
  targetRoleTitle: 'Machine Learning Engineer',
  readinessScore: 78,
  competencyLevelLabel: 'Advanced',
  competencyLevelNumber: 4,
  breakdown: {
    technicalCompetency: 82,
    practicalEvidence: 76,
    assessments: 81,
    projectVerification: 74,
    roleAlignment: 78
  },
  privacySettings: {
    isPublic: true,
    showEmployer: true,
    allowSearch: true
  },
  bio: 'Computer Science student specializing in Machine Learning, Computer Vision, and NLP pipelines.'
};

export const demoAcademicRecord = {
  institution: 'National Institute of Technology',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science & Engineering (AI & ML)',
  academicYear: '2023 - 2027',
  currentYear: 'Third Year',
  semester: 6,
  cgpa: 8.6,
  semesterScores: [
    { semester: 1, gpa: 8.2 },
    { semester: 2, gpa: 8.4 },
    { semester: 3, gpa: 8.5 },
    { semester: 4, gpa: 8.7 },
    { semester: 5, gpa: 8.8 },
    { semester: 6, gpa: 8.6 }
  ],
  subjects: [
    { code: 'CS301', name: 'Database Management Systems', marks: 88, maxMarks: 100, grade: 'A+', mappedSkills: ['SQL', 'Database Design', 'PostgreSQL'] },
    { code: 'CS302', name: 'Machine Learning & Pattern Recognition', marks: 82, maxMarks: 100, grade: 'A', mappedSkills: ['Python', 'Machine Learning', 'Statistics', 'Model Evaluation'] },
    { code: 'CS303', name: 'Data Structures & Algorithms', marks: 85, maxMarks: 100, grade: 'A', mappedSkills: ['Data Structures', 'Python', 'Algorithm Design'] },
    { code: 'CS304', name: 'Cloud Computing & Distributed Systems', marks: 68, maxMarks: 100, grade: 'B', mappedSkills: ['Cloud Infrastructure', 'Docker', 'Git'] },
    { code: 'CS305', name: 'Applied Probability & Statistics', marks: 74, maxMarks: 100, grade: 'B+', mappedSkills: ['Statistics', 'NumPy', 'Pandas'] }
  ],
  academicAchievements: [
    'Dean\'s Honor Roll - Semester 4 & 5',
    'Class Representative - CSE AI & ML Department',
    'Published undergraduate paper on Medical Image Segmentation'
  ]
};

export const demoCompetencyGrowthHistory = [
  { month: 'Jul 2026', Statistics: 40, MachineLearning: 55, Python: 72, Readiness: 62 },
  { month: 'Aug 2026', Statistics: 46, MachineLearning: 62, Python: 78, Readiness: 69 },
  { month: 'Sep 2026', Statistics: 51, MachineLearning: 68, Python: 82, Readiness: 78 },
  { month: 'Oct 2026 (Target)', Statistics: 68, MachineLearning: 78, Python: 88, Readiness: 86 }
];

export const demoSkills = [
  { skillId: 'sk_python', name: 'Python', category: 'Core Programming', icon: 'Terminal' },
  { skillId: 'sk_sql', name: 'SQL', category: 'Data & Analytics', icon: 'Database' },
  { skillId: 'sk_ml', name: 'Machine Learning', category: 'AI & ML', icon: 'Cpu' },
  { skillId: 'sk_stats', name: 'Statistics', category: 'Data & Analytics', icon: 'BarChart' },
  { skillId: 'sk_tf', name: 'TensorFlow', category: 'AI & ML', icon: 'Layers' },
  { skillId: 'sk_git', name: 'Git', category: 'DevOps & Cloud', icon: 'GitBranch' },
  { skillId: 'sk_pandas', name: 'Pandas', category: 'Data & Analytics', icon: 'Table' },
  { skillId: 'sk_numpy', name: 'NumPy', category: 'Data & Analytics', icon: 'Grid' },
  { skillId: 'sk_react', name: 'React', category: 'Web & Software', icon: 'Code' },
  { skillId: 'sk_dsa', name: 'Data Structures', category: 'Core Programming', icon: 'Binary' }
];

export const demoStudentSkillScores = [
  {
    skillName: 'Python',
    scorePercentage: 82,
    evidenceCount: 5,
    evidenceStrength: 'HIGH',
    evidenceStrengthReason: 'Backed by 2 verified projects, 1 practical assessment, 87% coding assessment, and active GitHub commit logs.',
    competencyLevelNumber: 4,
    competencyLevelLabel: 'Advanced',
    lastAssessed: '15 Sep 2026',
    evidenceList: [
      { title: 'Python Assessment', type: 'Assessment', score: 87 },
      { title: 'AI Resume Analyzer', type: 'Project', score: 85 },
      { title: 'E-commerce Backend', type: 'Project', score: 80 },
      { title: 'Python Certification', type: 'Certification', score: 90 },
      { title: '84 Coding Problems Solved', type: 'Achievement', score: 88 }
    ]
  },
  {
    skillName: 'SQL',
    scorePercentage: 76,
    evidenceCount: 3,
    evidenceStrength: 'HIGH',
    evidenceStrengthReason: 'Backed by DBMS course grade (88%), SQL Assessment (78%), and Student Database project.',
    competencyLevelNumber: 4,
    competencyLevelLabel: 'Advanced',
    lastAssessed: '12 Sep 2026',
    evidenceList: [
      { title: 'SQL Database Assessment', type: 'Assessment', score: 78 },
      { title: 'Student Database Portal', type: 'Project', score: 75 },
      { title: 'PostgreSQL Query Optimization', type: 'Achievement', score: 75 }
    ]
  },
  {
    skillName: 'Machine Learning',
    scorePercentage: 68,
    evidenceCount: 3,
    evidenceStrength: 'MEDIUM',
    evidenceStrengthReason: 'Backed by 1 project and 1 quiz. Completing deep learning model deployment will upgrade strength to HIGH.',
    competencyLevelNumber: 3,
    competencyLevelLabel: 'Intermediate',
    lastAssessed: '10 Sep 2026',
    evidenceList: [
      { title: 'ML Foundations Assessment', type: 'Assessment', score: 70 },
      { title: 'Customer Churn Predictor', type: 'Project', score: 72 },
      { title: 'Coursera ML Specialization', type: 'Certification', score: 65 }
    ]
  },
  {
    skillName: 'Statistics',
    scorePercentage: 51,
    evidenceCount: 2,
    evidenceStrength: 'LOW',
    evidenceStrengthReason: 'Only 2 evidence items found. Target role requires 70% proficiency in hypothesis testing and probability.',
    competencyLevelNumber: 2,
    competencyLevelLabel: 'Developing',
    lastAssessed: '05 Sep 2026',
    evidenceList: [
      { title: 'Statistics & Probability Quiz', type: 'Assessment', score: 52 },
      { title: 'Data Analytics Dashboard', type: 'Project', score: 50 }
    ]
  },
  {
    skillName: 'TensorFlow',
    scorePercentage: 44,
    evidenceCount: 2,
    evidenceStrength: 'LOW',
    evidenceStrengthReason: 'Limited project evidence. Build a neural network capstone to boost score to 60%+.',
    competencyLevelNumber: 2,
    competencyLevelLabel: 'Developing',
    lastAssessed: '01 Sep 2026',
    evidenceList: [
      { title: 'Deep Learning Basics', type: 'Assessment', score: 45 },
      { title: 'Digit Recognizer CNN', type: 'Project', score: 43 }
    ]
  },
  {
    skillName: 'Git',
    scorePercentage: 86,
    evidenceCount: 4,
    evidenceStrength: 'HIGH',
    evidenceStrengthReason: 'Active GitHub repository history and open-source contribution evidence.',
    competencyLevelNumber: 4,
    competencyLevelLabel: 'Advanced',
    lastAssessed: '18 Sep 2026',
    evidenceList: [
      { title: 'GitHub Active Contributor', type: 'Achievement', score: 90 },
      { title: 'Open Source PR Merged', type: 'Hackathon', score: 85 },
      { title: 'Git & Version Control Exam', type: 'Assessment', score: 85 }
    ]
  }
];

export const demoExpandedRoles = [
  {
    roleId: 'role_ml_engineer',
    title: 'Machine Learning Engineer',
    category: 'AI & Data Science',
    description: 'Design, build, and deploy production machine learning models and data pipelines.',
    avgSalary: '₹14 - 22 LPA',
    demandLevel: 'Very High',
    matchPercentage: 78,
    requiredSkills: [
      { skillName: 'Python', requiredScore: 80, importance: 'Critical' },
      { skillName: 'Machine Learning', requiredScore: 80, importance: 'Critical' },
      { skillName: 'SQL', requiredScore: 65, importance: 'High' },
      { skillName: 'Statistics', requiredScore: 70, importance: 'Critical' },
      { skillName: 'TensorFlow', requiredScore: 60, importance: 'High' },
      { skillName: 'Git', requiredScore: 60, importance: 'High' }
    ]
  },
  {
    roleId: 'role_ai_engineer',
    title: 'AI & LLM Engineer',
    category: 'AI & Data Science',
    description: 'Build Generative AI, RAG pipelines, fine-tune LLMs, and integrate AI microservices.',
    avgSalary: '₹16 - 28 LPA',
    demandLevel: 'Explosive Demand',
    matchPercentage: 81,
    requiredSkills: [
      { skillName: 'Python', requiredScore: 85, importance: 'Critical' },
      { skillName: 'Machine Learning', requiredScore: 75, importance: 'Critical' },
      { skillName: 'TensorFlow', requiredScore: 65, importance: 'High' },
      { skillName: 'Git', requiredScore: 70, importance: 'High' }
    ]
  },
  {
    roleId: 'role_data_analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    description: 'Extract actionable insights from complex datasets using SQL, Python, and BI dashboards.',
    avgSalary: '₹8 - 14 LPA',
    demandLevel: 'High',
    matchPercentage: 84,
    requiredSkills: [
      { skillName: 'SQL', requiredScore: 80, importance: 'Critical' },
      { skillName: 'Python', requiredScore: 70, importance: 'High' },
      { skillName: 'Statistics', requiredScore: 65, importance: 'Critical' },
      { skillName: 'Pandas', requiredScore: 75, importance: 'High' }
    ]
  },
  {
    roleId: 'role_data_scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    description: 'Perform predictive modeling, hypothesis testing, and advanced statistical inference.',
    avgSalary: '₹12 - 20 LPA',
    demandLevel: 'High',
    matchPercentage: 74,
    requiredSkills: [
      { skillName: 'Python', requiredScore: 85, importance: 'Critical' },
      { skillName: 'Statistics', requiredScore: 80, importance: 'Critical' },
      { skillName: 'Machine Learning', requiredScore: 75, importance: 'Critical' },
      { skillName: 'SQL', requiredScore: 75, importance: 'High' }
    ]
  },
  {
    roleId: 'role_fullstack_dev',
    title: 'Full Stack Developer',
    category: 'Software Engineering',
    description: 'Build complete web applications with React frontend, Node backend, and database storage.',
    avgSalary: '₹10 - 18 LPA',
    demandLevel: 'Very High',
    matchPercentage: 79,
    requiredSkills: [
      { skillName: 'React', requiredScore: 80, importance: 'Critical' },
      { skillName: 'Python', requiredScore: 75, importance: 'High' },
      { skillName: 'SQL', requiredScore: 75, importance: 'High' },
      { skillName: 'Git', requiredScore: 80, importance: 'Critical' }
    ]
  },
  {
    roleId: 'role_cloud_engineer',
    title: 'Cloud & MLOps Engineer',
    category: 'DevOps & Infrastructure',
    description: 'Deploy containerized ML pipelines on Kubernetes, AWS, and GCP with automated monitoring.',
    avgSalary: '₹14 - 24 LPA',
    demandLevel: 'Very High',
    matchPercentage: 66,
    requiredSkills: [
      { skillName: 'Git', requiredScore: 85, importance: 'Critical' },
      { skillName: 'Python', requiredScore: 75, importance: 'High' },
      { skillName: 'SQL', requiredScore: 65, importance: 'Medium' }
    ]
  }
];

export const demoRoles = demoExpandedRoles;

export const demoAssessments = [
  {
    assessmentId: 'asm_python',
    title: 'Python Technical Assessment',
    category: 'Core Programming',
    difficulty: 'Intermediate',
    questionCount: 5,
    timeLimitMinutes: 15,
    skillsEvaluated: ['Python', 'Data Structures'],
    questions: [
      {
        questionId: 'q1',
        text: 'What is the time complexity of searching for an element in a Python dictionary?',
        options: ['O(n)', 'O(log n)', 'O(1) average', 'O(n^2)'],
        correctOptionIndex: 2,
        skillName: 'Python',
        explanation: 'Python dictionaries use hash tables, giving them O(1) average time complexity for key lookups.'
      },
      {
        questionId: 'q2',
        text: 'Which decorator in Python is used to define a class method that operates on the class itself rather than an instance?',
        options: ['@staticmethod', '@classmethod', '@property', '@abstractmethod'],
        correctOptionIndex: 1,
        skillName: 'Python',
        explanation: '@classmethod receives the class `cls` as the first argument.'
      },
      {
        questionId: 'q3',
        text: 'What does the `list.sort()` method return in Python?',
        options: ['A new sorted list', 'None (sorts in-place)', 'The length of the list', 'A tuple'],
        correctOptionIndex: 1,
        skillName: 'Python',
        explanation: 'list.sort() modifies the list in-place and returns None.'
      }
    ],
    codingChallenge: {
      title: 'Maximum Subarray Sum (Kadane\'s Algorithm)',
      problemStatement: 'Given an integer array `nums`, find the contiguous subarray with the largest sum and return its sum.',
      initialTemplate: {
        python: 'def maxSubArray(nums):\n    max_so_far = nums[0]\n    curr_max = nums[0]\n    for i in range(1, len(nums)):\n        curr_max = max(nums[i], curr_max + nums[i])\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far\n\nprint(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))',
        javascript: 'function maxSubArray(nums) {\n    let maxSoFar = nums[0];\n    let currMax = nums[0];\n    for(let i=1; i<nums.length; i++) {\n        currMax = Math.max(nums[i], currMax + nums[i]);\n        maxSoFar = Math.max(maxSoFar, currMax);\n    }\n    return maxSoFar;\n}\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));',
        java: 'public class Solution {\n    public static int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0], currMax = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currMax = Math.max(nums[i], currMax + nums[i]);\n            maxSoFar = Math.max(maxSoFar, currMax);\n        }\n        return maxSoFar;\n    }\n}'
      },
      testCases: [
        { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
        { input: '[1]', expectedOutput: '1' },
        { input: '[5,4,-1,7,8]', expectedOutput: '23' }
      ]
    }
  },
  {
    assessmentId: 'asm_ml',
    title: 'Machine Learning Fundamentals',
    category: 'AI & ML',
    difficulty: 'Intermediate',
    questionCount: 5,
    timeLimitMinutes: 20,
    skillsEvaluated: ['Machine Learning', 'Statistics'],
    questions: [
      {
        questionId: 'qml1',
        text: 'What problem does L1 regularization (Lasso) address by setting some coefficients to zero?',
        options: ['Feature selection & sparsity', 'Underfitting', 'Vanishing gradients', 'Data imbalance'],
        correctOptionIndex: 0,
        skillName: 'Machine Learning',
        explanation: 'L1 regularization adds absolute magnitude of coefficient as penalty, driving irrelevant feature weights to zero.'
      }
    ]
  }
];

export const demoLearningModules = [
  {
    _id: 'mod_stats_1',
    title: 'Applied Statistics & Hypothesis Testing for ML',
    skillName: 'Statistics',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    reason: 'Your Statistics competency is 51% (Target: 70%). Strengthening p-values and A/B testing bridges your largest gap.',
    status: 'In Progress',
    topics: ['Probability Distributions', 'Null Hypothesis & p-values', 'Confidence Intervals', 'A/B Testing']
  },
  {
    _id: 'mod_tf_1',
    title: 'Deep Learning & Neural Networks with TensorFlow',
    skillName: 'TensorFlow',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    reason: 'TensorFlow competency is 44% vs 60% requirement. Building a CNN will upgrade TensorFlow to Level 3 Intermediate.',
    status: 'Not Started',
    topics: ['Keras Sequential API', 'Convolutional Layers', 'Dropout & Batch Normalization', 'Model Export']
  },
  {
    _id: 'mod_mlops_1',
    title: 'MLOps: Model Deployment with FastAPI & Docker',
    skillName: 'Machine Learning',
    difficulty: 'Advanced',
    estimatedHours: 5,
    reason: 'Demonstrating containerized model deployment boosts practical project verification score to 90%+.',
    status: 'Completed',
    topics: ['FastAPI Inference Server', 'Docker Containerization', 'GitHub Actions CI/CD']
  }
];

export const demoIndustryIntelligence = {
  marketSummary: 'Demand for Generative AI, RAG architecture, MLOps, and LLM Engineering has surged 45% YoY in Indian tech hubs.',
  trendingSkills: [
    { name: 'Generative AI & RAG', growthRate: '+65% YoY', category: 'AI & ML', demandLevel: 'Explosive', description: 'Retrieval-Augmented Generation for enterprise knowledge retrieval.' },
    { name: 'LLM Engineering', growthRate: '+58% YoY', category: 'AI & ML', demandLevel: 'Very High', description: 'Prompt engineering, fine-tuning Llama/Gemini models.' },
    { name: 'MLOps & Model Monitoring', growthRate: '+42% YoY', category: 'DevOps & Cloud', demandLevel: 'Very High', description: 'Automating model retraining and drift detection pipelines.' },
    { name: 'Cloud AI Services (AWS/GCP)', growthRate: '+38% YoY', category: 'DevOps & Cloud', demandLevel: 'High', description: 'Deploying foundation models on cloud serverless endpoints.' }
  ]
};

export const demoAuditLogs = [
  {
    _id: 'aud_1',
    userId: '660a11111111111111111111',
    userName: 'Prathamesh Patil',
    action: 'Project Verified',
    details: 'AI analyzed GitHub repository "ai-resume-analyzer". Score: 84/100.',
    integrityFlag: 'Clean',
    timestamp: '2026-09-15T10:04:00Z'
  },
  {
    _id: 'aud_2',
    userId: '660a11111111111111111111',
    userName: 'Prathamesh Patil',
    action: 'Assessment Completed',
    details: 'Completed Python Assessment. Score: 87% (Level 4 Advanced).',
    integrityFlag: 'Clean',
    timestamp: '2026-09-15T11:20:00Z'
  },
  {
    _id: 'aud_3',
    userId: '660cand22222222222222222',
    userName: 'Ananya Deshmukh',
    action: 'Certificate Uploaded',
    details: 'Credential ID check passed for SQL Specialist certification.',
    integrityFlag: 'Clean',
    timestamp: '2026-09-16T14:10:00Z'
  },
  {
    _id: 'aud_4',
    userId: '660cand33333333333333333',
    userName: 'Rohan Mehta',
    action: 'Project Submission Review',
    details: 'Repository commit history shows single batch commit. Flagged for review.',
    integrityFlag: 'Requires Review',
    timestamp: '2026-09-18T09:15:00Z'
  }
];

export const demoEvidenceList = [
  {
    userId: '660a11111111111111111111',
    title: 'AI Resume Analyzer',
    evidenceType: 'Projects',
    source: 'GitHub Repository',
    verificationStatus: 'Verified',
    verificationMethod: 'AI Code Analysis & Commit Log',
    verificationScore: 84,
    linkedSkills: ['Python', 'Flask', 'React', 'MongoDB', 'NLP'],
    date: '15 Sep 2026'
  },
  {
    userId: '660a11111111111111111111',
    title: 'Customer Churn Prediction System',
    evidenceType: 'Projects',
    source: 'GitHub Repository',
    verificationStatus: 'Verified',
    verificationMethod: 'AI Code Analysis',
    verificationScore: 88,
    linkedSkills: ['Python', 'Machine Learning', 'Pandas', 'Scikit-Learn'],
    date: '02 Sep 2026'
  },
  {
    userId: '660a11111111111111111111',
    title: 'Python for Data Science & AI',
    evidenceType: 'Certifications',
    source: 'IBM / Coursera (Credential ID: IBM-99241)',
    verificationStatus: 'Verified',
    verificationMethod: 'Credential URL Check',
    verificationScore: 92,
    linkedSkills: ['Python', 'Pandas', 'NumPy'],
    date: '20 Aug 2026'
  },
  {
    userId: '660a11111111111111111111',
    title: 'Python Practical Skill Assessment',
    evidenceType: 'Assessments',
    source: 'EDUTECH Assessment Engine',
    verificationStatus: 'Verified',
    verificationMethod: 'Proctored MCQ & Coding Runner',
    verificationScore: 87,
    linkedSkills: ['Python', 'OOP', 'Functions', 'Data Structures'],
    date: '15 Sep 2026'
  }
];

export const demoProjects = [
  {
    userId: '660a11111111111111111111',
    title: 'AI Resume Analyzer',
    description: 'An AI-powered application that parses resumes using NLP, extracts core competencies, and scores job description alignment.',
    githubUrl: 'https://github.com/prathamesh/ai-resume-analyzer',
    demoUrl: 'https://resume-analyzer-demo.vercel.app',
    technologies: ['Python', 'Flask', 'React', 'MongoDB', 'NLP'],
    projectCategory: 'AI/ML',
    verificationStatus: 'Verified',
    verificationScore: 84,
    detectedSkills: [
      { skillName: 'Python', level: 'Advanced' },
      { skillName: 'REST API', level: 'Intermediate' },
      { skillName: 'NLP', level: 'Intermediate' }
    ]
  }
];

export const demoCompany = {
  name: 'TechNova Labs',
  industry: 'Artificial Intelligence & Enterprise SaaS',
  location: 'Bengaluru, India',
  openPositionsCount: 3,
  totalCandidates: 128,
  verifiedProfilesCount: 96
};

export const demoJobs = [
  {
    _id: '660a99999999999999999999',
    companyName: 'TechNova Labs',
    title: 'Machine Learning Intern',
    description: 'Looking for a ML Intern to build statistical models, feature extraction pipelines, and evaluate neural network metrics.',
    location: 'Bengaluru / Hybrid',
    jobType: 'Internship',
    stipendOrSalary: '₹45,000 / month',
    applicantCount: 18,
    requiredSkills: [
      { skillName: 'Python', minScore: 75 },
      { skillName: 'Machine Learning', minScore: 70 },
      { skillName: 'SQL', minScore: 60 },
      { skillName: 'Statistics', minScore: 65 }
    ]
  }
];

export const demoCandidates = [
  {
    studentId: '660a11111111111111111111',
    name: 'Prathamesh Patil',
    targetRole: 'Machine Learning Engineer',
    roleFitPercentage: 86,
    skills: [
      { skillName: 'Python', score: 91, verified: true },
      { skillName: 'ML', score: 84, verified: true },
      { skillName: 'SQL', score: 72, verified: true },
      { skillName: 'Statistics', score: 69, verified: true }
    ],
    verifiedProjectsCount: 4,
    verifiedAssessmentsCount: 6,
    verifiedCertificatesCount: 3,
    status: 'Shortlisted'
  }
];

export const demoInstitution = {
  name: 'National Institute of Technology',
  totalStudents: 2450,
  verifiedProfiles: 1920,
  avgReadinessScore: 68,
  criticalSkillGapCount: 742,
  skillHeatmap: [
    { skillName: 'Python', fy: 61, sy: 72, ty: 78, ly: 84 },
    { skillName: 'SQL', fy: 48, sy: 62, ty: 71, ly: 79 },
    { skillName: 'DSA', fy: 42, sy: 54, ty: 67, ly: 73 },
    { skillName: 'Machine Learning', fy: 28, sy: 41, ty: 59, ly: 71 },
    { skillName: 'Cloud', fy: 18, sy: 29, ty: 43, ly: 58 },
    { skillName: 'Git', fy: 52, sy: 65, ty: 76, ly: 83 }
  ],
  curriculumGaps: [
    {
      title: 'Cloud Infrastructure & Docker Gap',
      affectedStudentsPct: 58,
      insight: '58% of third-year students demonstrate a major gap in cloud deployment and containerization skills (Docker, AWS/GCP basics).',
      recommendation: 'Consider adding practical cloud deployment workshops and project-based assessments in Semester 6.'
    }
  ]
};
