import mongoose from 'mongoose';

const learningPathSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  targetRoleId: { type: String, required: true },
  phases: [{
    phaseNumber: { type: Number, required: true },
    title: { type: String, required: true },
    durationDays: { type: Number, default: 7 },
    topics: [{ type: String }],
    recommendedReason: { type: String },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date }
  }],
  progressPct: { type: Number, default: 25 },
  timeCommitmentHoursPerDay: { type: Number, default: 2 }
}, { timestamps: true });

export default mongoose.models.LearningPath || mongoose.model('LearningPath', learningPathSchema);
