import { aiService } from '../services/aiService.js';
import { demoRoles, demoStudentSkillScores, demoStudentProfile } from '../seed/seedData.js';

export const getLearningPath = async (req, res) => {
  try {
    const roleId = req.query.roleId || demoStudentProfile.targetRoleId || 'role_ml_engineer';
    const role = demoRoles.find(r => r.roleId === roleId) || demoRoles[0];

    const gapResult = await aiService.analyzeSkillGap(demoStudentSkillScores, role.requiredSkills);
    const learningPathPhases = await aiService.generateLearningPath(gapResult.gaps, role.title);

    return res.json({
      targetRoleTitle: role.title,
      totalPhases: learningPathPhases.length,
      estimatedCompletionDays: learningPathPhases.reduce((acc, p) => acc + p.durationDays, 0),
      phases: learningPathPhases
    });
  } catch (error) {
    console.error('[LearningPath Controller Error]', error);
    return res.status(500).json({ message: error.message });
  }
};
