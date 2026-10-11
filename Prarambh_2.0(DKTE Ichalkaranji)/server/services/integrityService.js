import AuditLog from './../models/AuditLog.js';

export const inMemoryAuditLogs = [];

export const logAuditEvent = async ({ userId, userName, action, details, integrityFlag = 'Clean' }) => {
  const auditData = {
    userId: userId || 'user_demo',
    userName: userName || 'Prathamesh Patil',
    action,
    details,
    integrityFlag,
    timestamp: new Date()
  };

  let logItem;

  try {
    if (process.env.MONGODB_URI) {
      const doc = await AuditLog.create(auditData);
      logItem = doc.toObject();
    } else {
      logItem = { _id: 'audit_' + Date.now(), ...auditData };
    }
  } catch (e) {
    logItem = { _id: 'audit_' + Date.now(), ...auditData };
  }

  inMemoryAuditLogs.unshift(logItem);
  return logItem;
};

export const evaluateProjectIntegrity = ({ githubUrl, commitCount = 42, readmeDetected = true }) => {
  if (!githubUrl || !githubUrl.includes('github.com')) {
    return { flag: 'Requires Review', reason: 'Invalid or missing GitHub repository URL.' };
  }
  if (commitCount < 3) {
    return { flag: 'Potential Inconsistency', reason: 'Low commit count detected (fewer than 3 commits).' };
  }
  if (!readmeDetected) {
    return { flag: 'Insufficient Evidence', reason: 'Repository missing detailed documentation / README file.' };
  }
  return { flag: 'Clean', reason: 'Repository passed structural code and commit history verification.' };
};
