import express from 'express';
import { 
  getStudentDashboard, 
  updateTargetRole, 
  getSkillEvidenceDetail, 
  runReassessment 
} from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getStudentDashboard);
router.put('/target-role', protect, updateTargetRole);
router.post('/reassessment', protect, runReassessment);
router.get('/skills/:skillName/evidence', protect, getSkillEvidenceDetail);

export default router;
