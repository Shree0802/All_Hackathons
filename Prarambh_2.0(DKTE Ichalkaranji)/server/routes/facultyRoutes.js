import express from 'express';
import { 
  getFacultyDashboard, 
  getSkillHeatmap, 
  getCurriculumGaps, 
  getStudentsList 
} from '../controllers/facultyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getFacultyDashboard);
router.get('/skill-heatmap', protect, getSkillHeatmap);
router.get('/curriculum-gaps', protect, getCurriculumGaps);
router.get('/students', protect, getStudentsList);

export default router;
