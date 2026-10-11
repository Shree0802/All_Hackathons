import { demoStudentProfile, demoAcademicRecord, demoStudentSkillScores, demoEvidenceList, demoProjects } from '../seed/seedData.js';

export const getPlacementReport = async (req, res) => {
  return res.json({
    generatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    reportId: 'RPT_EDUTECH_' + Date.now(),
    studentInfo: {
      name: 'Prathamesh Patil',
      email: 'student@edutech.demo',
      institution: demoAcademicRecord.institution,
      degree: demoAcademicRecord.degree,
      branch: demoAcademicRecord.branch,
      currentYear: demoAcademicRecord.currentYear,
      cgpa: demoAcademicRecord.cgpa
    },
    readinessMetrics: {
      targetRoleTitle: demoStudentProfile.targetRoleTitle,
      readinessScore: demoStudentProfile.readinessScore,
      competencyLevelLabel: 'Level 4 (Advanced)',
      breakdown: demoStudentProfile.breakdown
    },
    skills: demoStudentSkillScores,
    verifiedEvidence: demoEvidenceList,
    verifiedProjects: demoProjects,
    recommendedActions: [
      'Complete Phase 1 Statistics Fundamentals learning module (7 days).',
      'Take Statistics Practical Assessment to upgrade competency from 51% to 68%.',
      'Build containerized FastAPI model inference capstone project.'
    ]
  });
};
