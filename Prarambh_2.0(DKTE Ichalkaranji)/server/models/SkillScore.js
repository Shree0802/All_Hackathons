import mongoose from 'mongoose';

const evidenceContributionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  score: { type: Number, required: true }
});

const skillScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillName: { type: String, required: true },
  scorePercentage: { type: Number, required: true },
  evidenceCount: { type: Number, default: 3 },
  evidenceList: [evidenceContributionSchema],
  lastAssessed: { type: String, default: '15 Sep 2026' }
});

export default mongoose.model('SkillScore', skillScoreSchema);
