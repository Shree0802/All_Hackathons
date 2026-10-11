import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isMemoryMode } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import gapRoutes from './routes/gapRoutes.js';
import learningPathRoutes from './routes/learningPathRoutes.js';
import employerRoutes from './routes/employerRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// New Upgraded Ecosystem Routes
import academicRoutes from './routes/academicRoutes.js';
import skillGraphRoutes from './routes/skillGraphRoutes.js';
import learningModuleRoutes from './routes/learningModuleRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import integrityRoutes from './routes/integrityRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import placementRoutes from './routes/placementRoutes.js';

import { demoUsers } from './seed/seedData.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize DB Connection
connectDB().then(() => {
  app.locals.isMemoryStore = isMemoryMode.value;
  app.locals.inMemoryUsers = demoUsers;
});

// Middleware to keep isMemoryStore synchronized
app.use((req, res, next) => {
  req.app.locals.isMemoryStore = isMemoryMode.value;
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    product: 'EDUTECH AI Skill & Industry Readiness Ecosystem',
    timestamp: new Date(),
    isMemoryStore: isMemoryMode.value
  });
});

// Mount Core REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/skill-gaps', gapRoutes);
app.use('/api/learning-paths', learningPathRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Mount Upgraded Ecosystem Routes
app.use('/api/academic', academicRoutes);
app.use('/api/skill-graph', skillGraphRoutes);
app.use('/api/learning-modules', learningModuleRoutes);
app.use('/api/mock-interviews', interviewRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/integrity', integrityRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/placement', placementRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 EDUTECH Ecosystem Backend running on port ${PORT}`);
  console.log(`🎯 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
