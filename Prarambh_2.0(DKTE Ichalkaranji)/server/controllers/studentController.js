import StudentProfile from '../models/StudentProfile.js';
import SkillScore from '../models/SkillScore.js';
import Evidence from '../models/Evidence.js';
import Project from '../models/Project.js';
import { calculateReadinessScore } from '../services/readinessEngine.js';
import { mapScoreToLevel, calculateEvidenceStrength } from '../services/competencyEngine.js';
import { logAuditEvent } from '../services/integrityService.js';

import {
  demoStudentProfile,
  demoStudentSkillScores,
  demoEvidenceList,
  demoProjects,
  demoCompetencyGrowthHistory
} from '../seed/seedData.js';

export const getStudentDashboard = async (req, res) => {
  try {
    let profile = demoStudentProfile;
    let skillScores = demoStudentSkillScores;
    let evidenceList = demoEvidenceList;
    let projects = demoProjects;

    // Dynamic Readiness Calculation
    const readinessDetails = calculateReadinessScore({
      technicalCompetency: profile.breakdown?.technicalCompetency || 82,
      practicalEvidence: profile.breakdown?.practicalEvidence || 76,
      assessments: profile.breakdown?.assessments || 81,
      projectVerification: profile.breakdown?.projectVerification || 74,
      roleAlignment: profile.breakdown?.roleAlignment || 78
    });

    const levelInfo = mapScoreToLevel(readinessDetails.overallScore);

    // Dynamic Next Best Action generator
    const statsSkill = skillScores.find(s => s.skillName === 'Statistics') || { scorePercentage: 51 };
    const nextBestAction = {
      title: 'Complete Applied Statistics & Hypothesis Testing Module',
      skillName: 'Statistics',
      currentScore: statsSkill.scorePercentage,
      requiredScore: 70,
      reason: `Your Statistics competency is currently ${statsSkill.scorePercentage}%, while Machine Learning Engineer requires 70%. Closing this gap is your highest leverage action to reach 86%+ readiness.`
    };

    return res.json({
      studentName: req.user.name || 'Prathamesh Patil',
      targetRoleTitle: profile.targetRoleTitle || 'Machine Learning Engineer',
      targetRoleId: profile.targetRoleId || 'role_ml_engineer',
      branch: profile.branch || 'Computer Science (AI & ML)',
      year: profile.year || 'Third Year',
      readinessScore: readinessDetails.overallScore,
      competencyLevelLabel: levelInfo.label,
      competencyLevelNumber: levelInfo.level,
      badgeStyle: levelInfo.badgeStyle,
      breakdown: readinessDetails.breakdown,
      weightsExplanation: readinessDetails.weightsExplanation,
      skills: skillScores.map(s => ({
        ...s,
        levelInfo: mapScoreToLevel(s.scorePercentage),
        evidenceStrengthInfo: calculateEvidenceStrength(s.evidenceList || [], s.scorePercentage)
      })),
      competencyGrowthHistory: demoCompetencyGrowthHistory,
      nextBestAction,
      evidenceSummary: {
        totalVerified: evidenceList.filter(e => e.verificationStatus === 'Verified').length,
        totalUnderReview: evidenceList.filter(e => e.verificationStatus === 'Under Review').length,
        projectsCount: projects.length,
        certificationsCount: evidenceList.filter(e => e.evidenceType === 'Certifications').length,
        assessmentsCount: evidenceList.filter(e => e.evidenceType === 'Assessments').length
      },
      recentEvidence: evidenceList.slice(0, 5)
    });
  } catch (error) {
    console.error('[Student Controller Error]', error);
    return res.status(500).json({ message: error.message });
  }
};

export const runReassessment = async (req, res) => {
  const { skillName = 'Statistics' } = req.body;

  const targetSkill = demoStudentSkillScores.find(s => s.skillName.toLowerCase() === skillName.toLowerCase());
  if (!targetSkill) {
    return res.status(404).json({ message: 'Skill not found' });
  }

  const oldScore = targetSkill.scorePercentage;
  const newScore = Math.min(95, oldScore + 15);
  targetSkill.scorePercentage = newScore;
  targetSkill.lastAssessed = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  targetSkill.evidenceCount += 1;
  targetSkill.evidenceList.push({
    title: `${skillName} Post-Learning Re-assessment`,
    type: 'Assessment',
    score: newScore
  });

  // Update growth history
  const lastGrowth = demoCompetencyGrowthHistory[demoCompetencyGrowthHistory.length - 1];
  if (lastGrowth) {
    lastGrowth.Statistics = newScore;
    lastGrowth.Readiness = 86;
  }

  // Update readiness score
  demoStudentProfile.readinessScore = 86;
  demoStudentProfile.breakdown.technicalCompetency = 88;

  await logAuditEvent({
    userId: req.user._id,
    userName: req.user.name,
    action: 'Re-assessment Completed',
    details: `Re-assessed ${skillName}: Score improved from ${oldScore}% to ${newScore}%.`
  });

  return res.json({
    message: `Re-assessment complete! ${skillName} score improved from ${oldScore}% to ${newScore}%. Industry Readiness increased to 86%!`,
    oldScore,
    newScore,
    skillName,
    newReadinessScore: 86
  });
};

export const updateTargetRole = async (req, res) => {
  const { roleId, roleTitle } = req.body;
  demoStudentProfile.targetRoleId = roleId;
  demoStudentProfile.targetRoleTitle = roleTitle;

  return res.json({
    message: `Target role updated to ${roleTitle}`,
    targetRoleId: roleId,
    targetRoleTitle: roleTitle
  });
};

export const getSkillEvidenceDetail = async (req, res) => {
  const { skillName } = req.params;
  const skillObj = demoStudentSkillScores.find(s => s.skillName.toLowerCase() === skillName.toLowerCase());
  return res.json(skillObj || { skillName, scorePercentage: 75, evidenceList: [] });
};
