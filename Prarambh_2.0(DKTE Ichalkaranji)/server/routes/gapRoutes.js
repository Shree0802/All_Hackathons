import express from 'express';
import { getSkillGapAnalysis } from '../controllers/gapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getSkillGapAnalysis);

export default router;
