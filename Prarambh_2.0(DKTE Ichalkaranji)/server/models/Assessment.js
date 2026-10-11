import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  skillName: { type: String, required: true },
  explanation: { type: String, default: '' }
});

const assessmentSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  questionCount: { type: Number, default: 10 },
  timeLimitMinutes: { type: Number, default: 20 },
  skillsEvaluated: [{ type: String }],
  questions: [questionSchema],
  codingChallenge: {
    title: { type: String },
    problemStatement: { type: String },
    initialTemplate: { type: Object },
    testCases: [{
      input: { type: String },
      expectedOutput: { type: String }
    }]
  }
});

export default mongoose.model('Assessment', assessmentSchema);
