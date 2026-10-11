import mongoose from 'mongoose';

const verificationLogSchema = new mongoose.Schema({
  logId: { type: String, required: true, unique: true },
  entityType: { type: String, enum: ['Project', 'Certification', 'Evidence', 'Assessment'], required: true },
  entityId: { type: String, required: true },
  userId: { type: String, required: true },
  action: { type: String, required: true },
  status: { type: String, enum: ['Submitted', 'Analyzing', 'Verified', 'Requires Review', 'Rejected'], default: 'Submitted' },
  verificationScore: { type: Number, default: 0 },
  verificationMethod: { type: String, default: 'AI Repository Parser' },
  details: { type: Object, default: {} },
  verifiedBy: { type: String, default: 'EDUTECH AI Engine' }
}, { timestamps: true });

export default mongoose.models.VerificationLog || mongoose.model('VerificationLog', verificationLogSchema);
