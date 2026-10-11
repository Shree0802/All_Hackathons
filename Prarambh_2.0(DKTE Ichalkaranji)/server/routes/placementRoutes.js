import express from 'express';
import {
  getPlacementProfile,
  getCoreSubjects,
  toggleTopicStatus,
  getAptitudeModules,
  submitAptitudeAttempt,
  getDSAModules,
  submitDSAProblem,
  getPlacementProjects,
  toggleProjectMilestone,
  submitProjectForVerification,
  getPlacementRoadmap,
  toggleRoadmapTask,
  getCompanyPreparation,
  getMockTests
} from '../controllers/placementController.js';

const router = express.Router();

router.get('/profile', getPlacementProfile);
router.get('/core-subjects', getCoreSubjects);
router.post('/core-subjects/toggle-topic', toggleTopicStatus);
router.get('/aptitude', getAptitudeModules);
router.post('/aptitude/submit', submitAptitudeAttempt);
router.get('/dsa', getDSAModules);
router.post('/dsa/submit', submitDSAProblem);
router.get('/projects', getPlacementProjects);
router.post('/projects/milestone', toggleProjectMilestone);
router.post('/projects/verify', submitProjectForVerification);
router.get('/roadmap', getPlacementRoadmap);
router.post('/roadmap/toggle-task', toggleRoadmapTask);
router.get('/company-prep', getCompanyPreparation);
router.get('/mock-tests', getMockTests);

export default router;
