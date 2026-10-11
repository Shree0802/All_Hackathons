import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import Skill from '../models/Skill.js';
import Role from '../models/Role.js';
import Project from '../models/Project.js';
import Assessment from '../models/Assessment.js';
import Evidence from '../models/Evidence.js';
import SkillScore from '../models/SkillScore.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Institution from '../models/Institution.js';

import {
  demoUsers,
  demoStudentProfile,
  demoSkills,
  demoStudentSkillScores,
  demoRoles,
  demoEvidenceList,
  demoProjects,
  demoAssessments,
  demoCompany,
  demoJobs,
  demoInstitution
} from './seedData.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edutech';
    console.log('[Seed] Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });

    console.log('[Seed] Clearing existing data...');
    await User.deleteMany({});
    await StudentProfile.deleteMany({});
    await Skill.deleteMany({});
    await Role.deleteMany({});
    await Project.deleteMany({});
    await Assessment.deleteMany({});
    await Evidence.deleteMany({});
    await SkillScore.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await Institution.deleteMany({});

    console.log('[Seed] Inserting Demo Users...');
    for (const u of demoUsers) {
      const user = new User(u);
      await user.save();
    }

    const prathamesh = await User.findOne({ email: 'student@edutech.demo' });
    if (prathamesh) {
      demoStudentProfile.userId = prathamesh._id;
      await StudentProfile.create(demoStudentProfile);

      for (const ss of demoStudentSkillScores) {
        await SkillScore.create({ ...ss, userId: prathamesh._id });
      }

      for (const ev of demoEvidenceList) {
        await Evidence.create({ ...ev, userId: prathamesh._id });
      }

      for (const proj of demoProjects) {
        await Project.create({ ...proj, userId: prathamesh._id });
      }
    }

    console.log('[Seed] Inserting Skills...');
    await Skill.insertMany(demoSkills);

    console.log('[Seed] Inserting Roles...');
    await Role.insertMany(demoRoles);

    console.log('[Seed] Inserting Assessments...');
    await Assessment.insertMany(demoAssessments);

    const employer = await User.findOne({ email: 'employer@edutech.demo' });
    if (employer) {
      const comp = await Company.create({ ...demoCompany, userId: employer._id });
      for (const job of demoJobs) {
        await Job.create({ ...job, companyId: comp._id });
      }
    }

    console.log('[Seed] Inserting Institution Data...');
    await Institution.create(demoInstitution);

    console.log('✅ [Seed Success] Database seeded with realistic EDUTECH demo data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed Error]', error.message);
    process.exit(1);
  }
};

if (process.argv[1].includes('seedDatabase.js')) {
  seedDatabase();
}
