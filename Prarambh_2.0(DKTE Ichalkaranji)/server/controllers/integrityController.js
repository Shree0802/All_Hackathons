import { demoAuditLogs } from '../seed/seedData.js';
import { inMemoryAuditLogs } from '../services/integrityService.js';

export const getAuditLogs = async (req, res) => {
  const combined = [...inMemoryAuditLogs, ...demoAuditLogs];
  return res.json(combined);
};

export const getIntegrityFlags = async (req, res) => {
  const flagged = demoAuditLogs.filter(l => l.integrityFlag !== 'Clean');
  return res.json({
    totalFlagged: flagged.length,
    flaggedRequests: flagged
  });
};
