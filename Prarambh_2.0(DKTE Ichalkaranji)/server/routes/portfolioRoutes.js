import express from 'express';
import { getPublicPortfolio, updatePrivacySettings } from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:userId', getPublicPortfolio);
router.put('/privacy', protect, updatePrivacySettings);

export default router;
