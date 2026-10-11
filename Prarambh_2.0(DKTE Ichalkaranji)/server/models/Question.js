import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true, unique: true },
  assessmentId: { type: String, required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  skillName: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  explanation: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
