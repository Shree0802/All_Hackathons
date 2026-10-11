import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  evidenceType: { 
    type: String, 
    enum: ['Projects', 'Certifications', 'Assessments', 'Internships', 'Hackathons', 'Achievements'], 
    required: true 
  },
  source: { type: String, required: true },
  verificationStatus: { 
    type: String, 
    enum: ['Verified', 'Under Review', 'Unverified', 'Rejected'], 
    default: 'Verified' 
  },
  verificationMethod: { type: String, default: 'AI Repository & Credential Check' },
  verificationScore: { type: Number, default: 85 },
  linkedSkills: [{ type: String }],
  date: { type: String, default: 'Sep 2026' },
  metadata: { type: Object, default: {} }
});

export default mongoose.model('Evidence', evidenceSchema);
