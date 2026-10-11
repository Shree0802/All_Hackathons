import mongoose from 'mongoose';

const requiredSkillThresholdSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  minScore: { type: Number, required: true }
});

const jobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  companyName: { type: String, default: 'TechNova Labs' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: 'Bengaluru / Remote' },
  jobType: { type: String, enum: ['Full-time', 'Internship', 'Contract'], default: 'Internship' },
  stipendOrSalary: { type: String, default: '₹45,000 / month' },
  requiredSkills: [requiredSkillThresholdSchema],
  applicantCount: { type: Number, default: 24 },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Job', jobSchema);
