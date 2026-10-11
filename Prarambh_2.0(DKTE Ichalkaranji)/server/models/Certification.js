import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  credentialId: { type: String, required: true },
  credentialUrl: { type: String, required: true },
  issueDate: { type: String, required: true },
  verificationStatus: { type: String, enum: ['Verified', 'Under Review', 'Unverified', 'Rejected'], default: 'Verified' },
  verificationMethod: { type: String, default: 'Credential URL & Provider Check' },
  linkedSkills: [{ type: String }],
  scoreContribution: { type: Number, default: 15 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Certification', certificationSchema);
