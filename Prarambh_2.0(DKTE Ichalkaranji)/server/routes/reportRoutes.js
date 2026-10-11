import express from 'express';
import { getPlacementReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/placement-readiness', protect, getPlacementReport);

export default router;
