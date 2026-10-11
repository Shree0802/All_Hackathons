import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  marks: { type: Number, required: true },
  maxMarks: { type: Number, default: 100 },
  grade: { type: String, default: 'A' },
  mappedSkills: [{ type: String }]
});

const semesterScoreSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  gpa: { type: Number, required: true }
});

const academicRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  institution: { type: String, default: 'National Institute of Technology' },
  degree: { type: String, default: 'Bachelor of Technology (B.Tech)' },
  branch: { type: String, default: 'Computer Science & Engineering (AI & ML)' },
  academicYear: { type: String, default: '2023 - 2027' },
  currentYear: { type: String, default: 'Third Year' },
  semester: { type: Number, default: 6 },
  cgpa: { type: Number, default: 8.6 },
  semesterScores: [semesterScoreSchema],
  subjects: [subjectSchema],
  academicAchievements: [{ type: String }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('AcademicRecord', academicRecordSchema);
