import { demoStudentProfile, demoStudentSkillScores, demoEvidenceList, demoProjects, demoAcademicRecord } from '../seed/seedData.js';

export const getPublicPortfolio = async (req, res) => {
  const { userId } = req.params;

  // Check privacy settings
  if (!demoStudentProfile.privacySettings?.isPublic && userId !== '660a11111111111111111111') {
    return res.status(403).json({ message: 'This student portfolio is set to Private by the student.' });
  }

  return res.json({
    studentName: 'Prathamesh Patil',
    institution: demoAcademicRecord.institution,
    branch: demoAcademicRecord.branch,
    year: demoAcademicRecord.currentYear,
    cgpa: demoAcademicRecord.cgpa,
    targetRoleTitle: demoStudentProfile.targetRoleTitle,
    readinessScore: demoStudentProfile.readinessScore,
    competencyLevelLabel: 'Level 4 (Advanced)',
    bio: demoStudentProfile.bio,
    skills: demoStudentSkillScores,
    projects: demoProjects,
    evidenceList: demoEvidenceList,
    verifiedBadges: {
      githubCodeVerified: true,
      assessmentProctored: true,
      credentialCheckPassed: true
    },
    qrPayload: `http://localhost:5173/portfolio/${userId || '660a11111111111111111111'}`
  });
};

export const updatePrivacySettings = async (req, res) => {
  const { isPublic, showEmployer, allowSearch } = req.body;
  demoStudentProfile.privacySettings = { isPublic, showEmployer, allowSearch };
  return res.json({ message: 'Privacy controls updated successfully', privacySettings: demoStudentProfile.privacySettings });
};
