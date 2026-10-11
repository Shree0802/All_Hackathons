import express from 'express';
import { getAcademicRecord, updateAcademicRecord } from '../controllers/academicController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAcademicRecord);
router.put('/', protect, updateAcademicRecord);

export default router;
