import { aiService } from '../services/aiService.js';
import { demoRoles, demoStudentSkillScores, demoStudentProfile } from '../seed/seedData.js';

export const getSkillGapAnalysis = async (req, res) => {
  try {
    const roleId = req.query.roleId || demoStudentProfile.targetRoleId || 'role_ml_engineer';
    const role = demoRoles.find(r => r.roleId === roleId) || demoRoles[0];

    const gapResult = await aiService.analyzeSkillGap(demoStudentSkillScores, role.requiredSkills);

    return res.json({
      targetRoleTitle: role.title,
      targetRoleId: role.roleId,
      readinessPct: gapResult.readinessPct,
      matchedSkillsCount: gapResult.matchedSkillsCount,
      totalRequiredSkills: gapResult.totalRequiredSkills,
      skillGapCount: gapResult.skillGapCount,
      gaps: gapResult.gaps
    });
  } catch (error) {
    console.error('[Gap Controller Error]', error);
    return res.status(500).json({ message: error.message });
  }
};
