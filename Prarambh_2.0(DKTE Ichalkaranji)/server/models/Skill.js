import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  skillId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['Core Programming', 'AI & ML', 'Data & Analytics', 'DevOps & Cloud', 'Web & Software'], required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'Code' }
});

export default mongoose.model('Skill', skillSchema);
