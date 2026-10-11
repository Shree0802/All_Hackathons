import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: { type: String, required: true },
  targetRole: { type: String, required: true },
  roleFitPercentage: { type: Number, required: true },
  verifiedProjectsCount: { type: Number, default: 4 },
  verifiedAssessmentsCount: { type: Number, default: 6 },
  verifiedCertificatesCount: { type: Number, default: 3 },
  status: { type: String, enum: ['Reviewed', 'Shortlisted', 'Interviewing', 'Submitted'], default: 'Shortlisted' },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
