import mongoose from 'mongoose';

const qnaSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  question: { type: String, required: true },
  studentAnswer: { type: String, default: '' },
  feedback: { type: String, default: '' },
  technicalRelevanceScore: { type: Number, default: 0 },
  completenessScore: { type: Number, default: 0 },
  structureScore: { type: Number, default: 0 }
});

const mockInterviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roleTitle: { type: String, default: 'Machine Learning Engineer' },
  interviewType: { type: String, enum: ['Technical', 'HR', 'Mixed'], default: 'Technical' },
  overallScore: { type: Number, default: 82 },
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
  transcript: [qnaSchema],
  strengths: [{ type: String }],
  improvements: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MockInterview', mockInterviewSchema);
