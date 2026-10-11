import express from 'express';
import { startInterview, submitInterviewAnswer } from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/start', protect, startInterview);
router.post('/answer', protect, submitInterviewAnswer);

export default router;
