/**
 * Readiness Calculation Engine
 * 
 * Industry Readiness Formula:
 * - Technical Competency Weight: 35%
 * - Practical Evidence Weight: 25%
 * - Assessment Performance Weight: 20%
 * - Project Verification Weight: 10%
 * - Role Alignment Weight: 10%
 */

export const calculateReadinessScore = ({
  technicalCompetency = 82,
  practicalEvidence = 76,
  assessments = 81,
  projectVerification = 74,
  roleAlignment = 78,
  weights = {
    technicalCompetency: 0.35,
    practicalEvidence: 0.25,
    assessments: 0.20,
    projectVerification: 0.10,
    roleAlignment: 0.10
  }
}) => {
  const overallScore = Math.round(
    technicalCompetency * weights.technicalCompetency +
    practicalEvidence * weights.practicalEvidence +
    assessments * weights.assessments +
    projectVerification * weights.projectVerification +
    roleAlignment * weights.roleAlignment
  );

  return {
    overallScore,
    breakdown: {
      technicalCompetency,
      practicalEvidence,
      assessments,
      projectVerification,
      roleAlignment
    },
    weightsExplanation: [
      { name: 'Technical Competency', weight: '35%', score: technicalCompetency, description: 'Derived from aggregate verified proficiency across core technical skills.' },
      { name: 'Practical Evidence', weight: '25%', score: practicalEvidence, description: 'Derived from total verified projects, certifications, and portfolio contributions.' },
      { name: 'Assessment Performance', weight: '20%', score: assessments, description: 'Derived from proctored MCQ & interactive coding assessment scores.' },
      { name: 'Project Verification', weight: '10%', score: projectVerification, description: 'Derived from AI GitHub repository analysis, commit history, and code structure.' },
      { name: 'Role Alignment', weight: '10%', score: roleAlignment, description: 'Derived from competency match against target industry role requirement matrix.' }
    ]
  };
};
