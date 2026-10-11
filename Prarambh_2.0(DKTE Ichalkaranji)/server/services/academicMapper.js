/**
 * Subject-to-Skill Mapping Engine
 * 
 * Maps academic course subjects to industry practical competencies
 */

export const academicSubjectMap = [
  {
    code: 'CS301',
    name: 'Database Management Systems',
    marks: 88,
    grade: 'A+',
    mappedSkills: ['SQL', 'Database Design', 'PostgreSQL', 'Normalization']
  },
  {
    code: 'CS302',
    name: 'Machine Learning & Pattern Recognition',
    marks: 82,
    grade: 'A',
    mappedSkills: ['Python', 'Machine Learning', 'Statistics', 'Model Evaluation']
  },
  {
    code: 'CS303',
    name: 'Data Structures & Algorithms',
    marks: 85,
    grade: 'A',
    mappedSkills: ['Data Structures', 'Python', 'Algorithm Design']
  },
  {
    code: 'CS304',
    name: 'Cloud Computing & Distributed Systems',
    marks: 68,
    grade: 'B',
    mappedSkills: ['Cloud Infrastructure', 'Docker', 'Git']
  },
  {
    code: 'CS305',
    name: 'Applied Probability & Statistics',
    marks: 74,
    grade: 'B+',
    mappedSkills: ['Statistics', 'NumPy', 'Pandas']
  }
];

export const getSubjectToSkillMapping = () => {
  return academicSubjectMap;
};
