import { demoUsers, demoSkills, demoRoles, demoEvidenceList } from '../seed/seedData.js';

export const getAdminStats = async (req, res) => {
  return res.json({
    totalUsers: demoUsers.length + 15,
    institutionsCount: 8,
    employersCount: 12,
    verifiedProjectsCount: 420,
    assessmentsCompletedCount: 1240,
    activeJobRolesCount: demoRoles.length,
    verificationRequestsCount: 14
  });
};

export const getUsers = async (req, res) => {
  return res.json(demoUsers);
};

export const getVerificationRequests = async (req, res) => {
  return res.json(demoEvidenceList);
};
