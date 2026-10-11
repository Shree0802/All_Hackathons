import { demoInstitution, demoCandidates } from '../seed/seedData.js';
import { aiService } from '../services/aiService.js';

export const getFacultyDashboard = async (req, res) => {
  return res.json({
    institution: demoInstitution,
    summaryCards: {
      totalStudents: demoInstitution.totalStudents,
      verifiedProfiles: demoInstitution.verifiedProfiles,
      avgReadinessScore: demoInstitution.avgReadinessScore,
      criticalSkillGapCount: demoInstitution.criticalSkillGapCount
    }
  });
};

export const getSkillHeatmap = async (req, res) => {
  return res.json({
    skillHeatmap: demoInstitution.skillHeatmap,
    filtersAvailable: ['Branch', 'Year', 'Semester', 'Skill Category']
  });
};

export const getCurriculumGaps = async (req, res) => {
  const aiInsights = await aiService.generateInstitutionalInsights(demoInstitution.skillHeatmap);
  return res.json({
    aiInsights,
    curriculumGaps: demoInstitution.curriculumGaps
  });
};

export const getStudentsList = async (req, res) => {
  return res.json(demoCandidates);
};
