/**
 * Standardized Competency Level & Evidence Strength Engine
 * 
 * Levels:
 * 0 (0-20%): No Evidence
 * 1 (21-40%): Beginner
 * 2 (41-60%): Developing
 * 3 (61-75%): Intermediate
 * 4 (76-90%): Advanced
 * 5 (91-100%): Industry Ready
 */

export const mapScoreToLevel = (score = 0) => {
  if (score >= 91) return { level: 5, label: 'Industry Ready', badgeStyle: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40' };
  if (score >= 76) return { level: 4, label: 'Advanced', badgeStyle: 'bg-sky-500/15 text-sky-300 border-sky-500/40' };
  if (score >= 61) return { level: 3, label: 'Intermediate', badgeStyle: 'bg-brand-500/15 text-brand-300 border-brand-500/40' };
  if (score >= 41) return { level: 2, label: 'Developing', badgeStyle: 'bg-amber-500/15 text-amber-300 border-amber-500/40' };
  if (score >= 21) return { level: 1, label: 'Beginner', badgeStyle: 'bg-slate-500/15 text-slate-300 border-slate-500/40' };
  return { level: 0, label: 'No Evidence', badgeStyle: 'bg-slate-800 text-slate-400 border-slate-700' };
};

export const calculateEvidenceStrength = (evidenceList = [], scorePercentage = 0) => {
  const verifiedCount = evidenceList.filter(e => e.verificationStatus === 'Verified' || e.score).length;
  const hasProject = evidenceList.some(e => (e.type === 'Project' || e.evidenceType === 'Projects'));
  const hasAssessment = evidenceList.some(e => (e.type === 'Assessment' || e.evidenceType === 'Assessments'));
  
  if (verifiedCount >= 3 && hasProject && hasAssessment) {
    return {
      strength: 'HIGH',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      reason: `Backed by ${verifiedCount} independent verified sources including projects, MCQs, and live code runners.`
    };
  }
  
  if (verifiedCount >= 2) {
    return {
      strength: 'MEDIUM',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      reason: `Backed by ${verifiedCount} verified evidence items. Adding 1 more verified project will upgrade strength to HIGH.`
    };
  }

  return {
    strength: 'LOW',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    reason: `Limited evidence available (under 2 items). Complete practical assessments or submit code repos to increase credibility.`
  };
};

/**
 * 5-Source Evidence Weighting Calculation:
 * - Assessment: 30%
 * - Practical Coding Runner: 25%
 * - Verified Projects: 25%
 * - Portfolio Evidence: 10%
 * - Certification: 10%
 */
export const calculateDetailedSkillScore = ({
  assessmentScore = 80,
  codingScore = 85,
  projectScore = 84,
  portfolioScore = 75,
  certificationScore = 90
}) => {
  const weightedScore = Math.round(
    assessmentScore * 0.30 +
    codingScore * 0.25 +
    projectScore * 0.25 +
    portfolioScore * 0.10 +
    certificationScore * 0.10
  );

  return {
    weightedScore,
    breakdown: [
      { name: 'Technical Assessment', weight: '30%', score: assessmentScore, contribution: (assessmentScore * 0.30).toFixed(1) },
      { name: 'Practical Coding Challenge', weight: '25%', score: codingScore, contribution: (codingScore * 0.25).toFixed(1) },
      { name: 'Verified GitHub Project', weight: '25%', score: projectScore, contribution: (projectScore * 0.25).toFixed(1) },
      { name: 'Portfolio & Achievements', weight: '10%', score: portfolioScore, contribution: (portfolioScore * 0.10).toFixed(1) },
      { name: 'Certification Verification', weight: '10%', score: certificationScore, contribution: (certificationScore * 0.10).toFixed(1) }
    ]
  };
};
