import mongoose from 'mongoose';

const roleRequirementSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  requiredScore: { type: Number, required: true },
  importance: { type: String, enum: ['Critical', 'High', 'Medium'], default: 'High' },
  category: { type: String, default: 'Technical' }
});

const roleSchema = new mongoose.Schema({
  roleId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Engineering' },
  description: { type: String, required: true },
  avgSalary: { type: String, default: '₹12 - 18 LPA' },
  demandLevel: { type: String, default: 'High Demand' },
  requiredSkills: [roleRequirementSchema]
});

export default mongoose.model('Role', roleSchema);
