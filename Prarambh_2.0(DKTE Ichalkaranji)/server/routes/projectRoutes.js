import express from 'express';
import { getProjects, submitProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProjects);
router.post('/submit', protect, submitProject);

export default router;
