import express from 'express';
import { getAdminStats, getUsers, getVerificationRequests } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getAdminStats);
router.get('/users', protect, getUsers);
router.get('/verification-requests', protect, getVerificationRequests);

export default router;
