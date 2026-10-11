import AcademicRecord from '../models/AcademicRecord.js';
import { demoAcademicRecord } from '../seed/seedData.js';

export const getAcademicRecord = async (req, res) => {
  try {
    if (req.app.locals.isMemoryStore) {
      return res.json(demoAcademicRecord);
    }
    const record = await AcademicRecord.findOne({ userId: req.user._id });
    if (record) return res.json(record);
    return res.json(demoAcademicRecord);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAcademicRecord = async (req, res) => {
  const { cgpa, subjects, academicAchievements } = req.body;
  try {
    if (!req.app.locals.isMemoryStore) {
      await AcademicRecord.findOneAndUpdate(
        { userId: req.user._id },
        { cgpa, subjects, academicAchievements, updatedAt: new Date() },
        { upsert: true }
      );
    }
    if (cgpa) demoAcademicRecord.cgpa = cgpa;
    if (subjects) demoAcademicRecord.subjects = subjects;
    if (academicAchievements) demoAcademicRecord.academicAchievements = academicAchievements;

    return res.json({ message: 'Academic Record updated successfully', record: demoAcademicRecord });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
