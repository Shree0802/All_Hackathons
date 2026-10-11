import express from 'express';
import { getAuditLogs, getIntegrityFlags } from '../controllers/integrityController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/audit-logs', protect, getAuditLogs);
router.get('/flags', protect, getIntegrityFlags);

export default router;
