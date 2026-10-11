import express from 'express';
import { 
  getEmployerDashboard, 
  createJob, 
  getCandidates, 
  getCandidateProfile 
} from '../controllers/employerController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getEmployerDashboard);
router.post('/jobs', protect, createJob);
router.get('/candidates', protect, getCandidates);
router.get('/candidates/:id', protect, getCandidateProfile);

export default router;
