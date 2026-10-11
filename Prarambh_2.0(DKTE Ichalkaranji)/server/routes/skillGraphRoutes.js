import express from 'express';
import { getSkillGraph } from '../controllers/skillGraphController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getSkillGraph);

export default router;
