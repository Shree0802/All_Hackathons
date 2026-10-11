import mongoose from 'mongoose';

const assessmentResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentId: { type: String, required: true },
  title: { type: String, required: true },
  scorePercentage: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  competencyLevel: { type: String, default: 'Intermediate' },
  skillsEvaluated: [{
    skillName: { type: String },
    score: { type: Number }
  }],
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model('AssessmentResult', assessmentResultSchema);
