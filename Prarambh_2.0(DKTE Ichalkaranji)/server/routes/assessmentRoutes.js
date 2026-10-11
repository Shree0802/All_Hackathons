import express from 'express';
import { 
  getAssessments, 
  getAssessmentById, 
  submitAssessment, 
  runCode 
} from '../controllers/assessmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAssessments);
router.get('/:id', protect, getAssessmentById);
router.post('/:id/submit', protect, submitAssessment);
router.post('/code/run', protect, runCode);

export default router;
