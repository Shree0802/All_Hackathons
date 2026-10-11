import mongoose from 'mongoose';

const heatmapCellSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  fy: { type: Number, default: 45 },
  sy: { type: Number, default: 60 },
  ty: { type: Number, default: 72 },
  ly: { type: Number, default: 85 }
});

const institutionSchema = new mongoose.Schema({
  name: { type: String, default: 'National Institute of Technology' },
  totalStudents: { type: Number, default: 2450 },
  verifiedProfiles: { type: Number, default: 1920 },
  avgReadinessScore: { type: Number, default: 68 },
  criticalSkillGapCount: { type: Number, default: 742 },
  skillHeatmap: [heatmapCellSchema],
  curriculumGaps: [{
    title: { type: String },
    insight: { type: String },
    recommendation: { type: String },
    affectedStudentsPct: { type: Number }
  }]
});

export default mongoose.model('Institution', institutionSchema);
