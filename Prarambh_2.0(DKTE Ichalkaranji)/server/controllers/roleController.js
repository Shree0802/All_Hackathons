import { demoExpandedRoles, demoStudentSkillScores } from '../seed/seedData.js';
import { aiService } from '../services/aiService.js';

export const getRoles = async (req, res) => {
  return res.json(demoExpandedRoles);
};

export const getRoleById = async (req, res) => {
  const { id } = req.params;
  const role = demoExpandedRoles.find(r => r.roleId === id || r._id === id);
  if (role) return res.json(role);
  return res.status(404).json({ message: 'Role not found' });
};

export const compareRoles = async (req, res) => {
  try {
    const roleComparisons = await Promise.all(demoExpandedRoles.map(async (role) => {
      const gapResult = await aiService.analyzeSkillGap(demoStudentSkillScores, role.requiredSkills);
      return {
        roleId: role.roleId,
        title: role.title,
        category: role.category,
        avgSalary: role.avgSalary,
        demandLevel: role.demandLevel,
        readinessPct: gapResult.readinessPct,
        matchedSkillsCount: gapResult.matchedSkillsCount,
        totalRequiredSkills: gapResult.totalRequiredSkills,
        skillGapCount: gapResult.skillGapCount,
        gaps: gapResult.gaps
      };
    }));

    return res.json({
      studentName: 'Prathamesh Patil',
      comparisons: roleComparisons
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
