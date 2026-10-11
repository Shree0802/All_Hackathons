import { demoStudentSkillScores, demoEvidenceList, demoProjects } from '../seed/seedData.js';
import { mapScoreToLevel, calculateEvidenceStrength, calculateDetailedSkillScore } from '../services/competencyEngine.js';

export const getSkillGraph = async (req, res) => {
  try {
    const graphNodes = demoStudentSkillScores.map(sk => {
      const levelInfo = mapScoreToLevel(sk.scorePercentage);
      const strengthInfo = calculateEvidenceStrength(sk.evidenceList || [], sk.scorePercentage);
      const detailedCalculation = calculateDetailedSkillScore({
        assessmentScore: sk.scorePercentage,
        codingScore: Math.min(95, sk.scorePercentage + 5),
        projectScore: Math.max(70, sk.scorePercentage - 2),
        portfolioScore: 75,
        certificationScore: 80
      });

      return {
        id: sk.skillName.toLowerCase(),
        skillName: sk.skillName,
        scorePercentage: sk.scorePercentage,
        competencyLevel: levelInfo.level,
        competencyLevelLabel: levelInfo.label,
        badgeStyle: levelInfo.badgeStyle,
        evidenceStrength: strengthInfo.strength,
        evidenceStrengthReason: strengthInfo.reason,
        evidenceCount: sk.evidenceCount || 3,
        evidenceList: sk.evidenceList || [],
        calculationBreakdown: detailedCalculation.breakdown
      };
    });

    return res.json({
      studentName: req.user.name || 'Prathamesh Patil',
      totalNodes: graphNodes.length,
      skills: graphNodes
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
