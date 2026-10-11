import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  branch: { type: String, default: 'Computer Science (AI & ML)' },
  year: { type: String, default: 'Third Year' },
  semester: { type: Number, default: 6 },
  targetRoleId: { type: String, default: 'role_ml_engineer' },
  targetRoleTitle: { type: String, default: 'Machine Learning Engineer' },
  readinessScore: { type: Number, default: 78 },
  breakdown: {
    technicalCompetency: { type: Number, default: 82 },
    practicalEvidence: { type: Number, default: 76 },
    assessments: { type: Number, default: 81 },
    projectVerification: { type: Number, default: 74 },
    roleAlignment: { type: Number, default: 78 }
  },
  institution: { type: String, default: 'National Institute of Technology' },
  bio: { type: String, default: 'Aspiring ML Engineer specializing in Computer Vision, NLP, and scalable MLOps pipeline development.' },
  githubUrl: { type: String, default: 'https://github.com/prathamesh' },
  linkedinUrl: { type: String, default: 'https://linkedin.com/in/prathamesh' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('StudentProfile', studentProfileSchema);
