import mongoose from 'mongoose';

const trendingSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  growthRate: { type: String, default: '+45% YoY' },
  category: { type: String, default: 'Emerging Tech' },
  demandLevel: { type: String, default: 'Very High' },
  description: { type: String }
});

const industryIntelligenceSchema = new mongoose.Schema({
  trendingSkills: [trendingSkillSchema],
  marketSummary: { type: String, default: 'Generative AI, MLOps, and Cloud AI show the highest YoY hiring growth across tier-1 technology firms.' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('IndustryIntelligence', industryIntelligenceSchema);
