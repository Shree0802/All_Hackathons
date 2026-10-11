import express from 'express';
import { handleMentorChat } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/mentor/chat', protect, handleMentorChat);

export default router;
