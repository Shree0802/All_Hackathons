import express from 'express';
import { getLearningModules, updateModuleStatus } from '../controllers/learningModuleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getLearningModules);
router.put('/:id/status', protect, updateModuleStatus);

export default router;
