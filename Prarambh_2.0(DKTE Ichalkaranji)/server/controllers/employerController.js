import { demoCompany, demoJobs, demoCandidates, demoStudentSkillScores, demoEvidenceList, demoProjects } from '../seed/seedData.js';

export const getEmployerDashboard = async (req, res) => {
  return res.json({
    company: demoCompany,
    openJobs: demoJobs,
    candidateCount: demoCandidates.length,
    recentCandidates: demoCandidates
  });
};

export const createJob = async (req, res) => {
  const { title, description, location, jobType, stipendOrSalary, requiredSkills } = req.body;

  const newJob = {
    _id: 'job_' + Date.now(),
    companyName: demoCompany.name,
    title,
    description,
    location: location || 'Bengaluru / Remote',
    jobType: jobType || 'Internship',
    stipendOrSalary: stipendOrSalary || '₹45,000 / month',
    requiredSkills: requiredSkills || [
      { skillName: 'Python', minScore: 75 },
      { skillName: 'Machine Learning', minScore: 70 }
    ],
    applicantCount: 0,
    status: 'Active',
    createdAt: new Date()
  };

  demoJobs.unshift(newJob);

  return res.status(201).json({
    message: 'Job posting created successfully with minimum skill competency requirements!',
    job: newJob
  });
};

export const getCandidates = async (req, res) => {
  return res.json(demoCandidates);
};

export const getCandidateProfile = async (req, res) => {
  const { id } = req.params;
  const candidate = demoCandidates.find(c => c.studentId === id || c._id === id) || demoCandidates[0];

  return res.json({
    ...candidate,
    branch: 'Computer Science (AI & ML)',
    institution: 'National Institute of Technology',
    year: 'Third Year',
    skillScores: demoStudentSkillScores,
    evidenceList: demoEvidenceList,
    projects: demoProjects,
    verificationSummary: {
      verifiedProjectsCount: 4,
      verifiedAssessmentsCount: 6,
      verifiedCertificatesCount: 3,
      githubVerified: true,
      credentialCheckPassed: true
    }
  });
};
