import { demoLearningModules, demoIndustryIntelligence } from '../seed/seedData.js';

export const getLearningModules = async (req, res) => {
  return res.json({
    modules: demoLearningModules,
    marketIntelligence: demoIndustryIntelligence
  });
};

export const updateModuleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const mod = demoLearningModules.find(m => m._id === id);
  if (mod) {
    mod.status = status;
    return res.json({ message: `Module updated to ${status}`, module: mod });
  }

  return res.status(404).json({ message: 'Module not found' });
};
