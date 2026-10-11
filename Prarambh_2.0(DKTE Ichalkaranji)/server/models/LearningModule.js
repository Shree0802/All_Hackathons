import mongoose from 'mongoose';

const learningModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  skillName: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  estimatedHours: { type: Number, default: 4 },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  topics: [{ type: String }],
  linkUrl: { type: String, default: '#' },
  category: { type: String, default: 'Recommended Course' }
});

export default mongoose.model('LearningModule', learningModuleSchema);
