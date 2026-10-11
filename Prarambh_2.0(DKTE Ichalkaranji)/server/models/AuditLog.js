import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  integrityFlag: { type: String, enum: ['Clean', 'Requires Review', 'Potential Inconsistency', 'Insufficient Evidence'], default: 'Clean' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('AuditLog', auditLogSchema);
