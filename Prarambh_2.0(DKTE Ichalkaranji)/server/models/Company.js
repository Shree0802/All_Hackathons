import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'TechNova Labs' },
  industry: { type: String, default: 'Artificial Intelligence & Enterprise SaaS' },
  location: { type: String, default: 'Bengaluru, India' },
  description: { type: String, default: 'Leading AI research laboratory and enterprise AI solutions developer.' },
  openPositionsCount: { type: Number, default: 3 },
  totalCandidates: { type: Number, default: 128 },
  verifiedProfilesCount: { type: Number, default: 96 }
});

export default mongoose.model('Company', companySchema);
