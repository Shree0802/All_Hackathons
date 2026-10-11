import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubUrl: { type: String, required: true },
  demoUrl: { type: String, default: '' },
  technologies: [{ type: String }],
  projectCategory: { type: String, default: 'AI/ML' },
  verificationStatus: { type: String, enum: ['Verified', 'Under Review', 'Unverified', 'Rejected'], default: 'Verified' },
  verificationScore: { type: Number, default: 84 },
  detectedSkills: [{
    skillName: { type: String },
    level: { type: String }
  }],
  repositoryEvidence: {
    repoAccessible: { type: Boolean, default: true },
    readmeDetected: { type: Boolean, default: true },
    sourceCodeDetected: { type: Boolean, default: true },
    multipleCommits: { type: Boolean, default: true },
    dependenciesDetected: { type: Boolean, default: true }
  },
  verificationTimeline: [{
    stage: { type: String },
    status: { type: String, enum: ['completed', 'in_progress', 'pending'] },
    timestamp: { type: Date, default: Date.now },
    detail: { type: String }
  }],
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', projectSchema);
