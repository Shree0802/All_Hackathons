import mongoose from 'mongoose';

const skillGapSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  targetRoleId: { type: String, required: true },
  targetRoleTitle: { type: String, required: true },
  readinessPercentage: { type: Number, default: 78 },
  gaps: [{
    skillName: { type: String, required: true },
    currentScore: { type: Number, required: true },
    requiredScore: { type: Number, required: true },
    gap: { type: Number, required: true },
    status: { type: String, enum: ['ready', 'needs_improvement', 'major_gap'], default: 'needs_improvement' },
    importance: { type: String, default: 'High' }
  }],
  lastAnalyzedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.SkillGap || mongoose.model('SkillGap', skillGapSchema);
