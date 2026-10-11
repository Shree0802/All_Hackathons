import express from 'express';
import { getRoles, getRoleById, compareRoles } from '../controllers/roleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getRoles);
router.get('/compare', protect, compareRoles);
router.get('/:id', protect, getRoleById);

export default router;
