import { aiService } from '../services/aiService.js';
import { demoStudentProfile, demoStudentSkillScores, demoRoles } from '../seed/seedData.js';

export const handleMentorChat = async (req, res) => {
  const { question, targetRoleId } = req.body;

  try {
    const role = demoRoles.find(r => r.roleId === targetRoleId) || demoRoles[0];
    const gapResult = await aiService.analyzeSkillGap(demoStudentSkillScores, role.requiredSkills);

    const answer = await aiService.generateMentorResponse({
      question,
      studentProfile: demoStudentProfile,
      skills: demoStudentSkillScores,
      targetRole: role.title,
      skillGaps: gapResult.gaps
    });

    return res.json({
      question,
      answer,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('[AI Mentor Error]', error);
    return res.status(500).json({ message: error.message });
  }
};
