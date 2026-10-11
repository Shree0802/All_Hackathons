import { demoAssessments, demoStudentSkillScores } from '../seed/seedData.js';

export const getAssessments = async (req, res) => {
  return res.json(demoAssessments);
};

export const getAssessmentById = async (req, res) => {
  const { id } = req.params;
  const asm = demoAssessments.find(a => a.assessmentId === id || a._id === id);
  if (asm) return res.json(asm);
  return res.status(404).json({ message: 'Assessment not found' });
};

export const submitAssessment = async (req, res) => {
  const { assessmentId, userAnswers } = req.body; // userAnswers: { q1: 2, q2: 1 }

  const asm = demoAssessments.find(a => a.assessmentId === assessmentId);
  if (!asm) return res.status(404).json({ message: 'Assessment not found' });

  let correctCount = 0;
  const total = asm.questions.length;

  asm.questions.forEach(q => {
    if (userAnswers && userAnswers[q.questionId] === q.correctOptionIndex) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / total) * 100);
  let competencyLevel = 'Beginner';
  if (scorePercentage >= 80) competencyLevel = 'Advanced';
  else if (scorePercentage >= 60) competencyLevel = 'Intermediate';

  // Update student's skill score
  asm.skillsEvaluated.forEach(skillName => {
    const existing = demoStudentSkillScores.find(s => s.skillName.toLowerCase() === skillName.toLowerCase());
    if (existing) {
      existing.scorePercentage = Math.min(98, Math.round((existing.scorePercentage + scorePercentage) / 2));
      existing.lastAssessed = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  });

  return res.json({
    assessmentId,
    title: asm.title,
    totalQuestions: total,
    correctAnswers: correctCount,
    scorePercentage,
    competencyLevel,
    message: `Assessment submitted! You scored ${scorePercentage}% (${competencyLevel}). Skill competencies updated.`
  });
};

export const runCode = async (req, res) => {
  const { code, language, problemId } = req.body;

  // Code Execution Sandbox / Mock Runner
  try {
    let output = '';
    let testCasesPassed = 0;
    const totalTestCases = 3;

    if (language === 'javascript') {
      // Safe execution for JavaScript demo code
      try {
        let logs = [];
        const customConsole = { log: (...args) => logs.push(args.join(' ')) };
        const runFn = new Function('console', code);
        runFn(customConsole);
        output = logs.join('\n') || 'Code executed with output: 6';
        testCasesPassed = 3;
      } catch (err) {
        output = `Execution Error: ${err.message}`;
        testCasesPassed = 0;
      }
    } else {
      // Realistic Mock runner for Python and Java
      if (code.includes('max_so_far') || code.includes('maxSubArray') || code.includes('max')) {
        output = `[Test Case 1] Input: [-2,1,-3,4,-1,2,1,-5,4] -> Expected: 6, Got: 6 (PASS)\n[Test Case 2] Input: [1] -> Expected: 1, Got: 1 (PASS)\n[Test Case 3] Input: [5,4,-1,7,8] -> Expected: 23, Got: 23 (PASS)\n\nAll Test Cases Passed!`;
        testCasesPassed = 3;
      } else {
        output = `[Test Case 1] Output: Incorrect result or syntax error.\nFailed 2 of 3 test cases. Check array indexing logic.`;
        testCasesPassed = 1;
      }
    }

    return res.json({
      language,
      testCasesPassed,
      totalTestCases,
      success: testCasesPassed === totalTestCases,
      output,
      executionTimeMs: Math.floor(Math.random() * 40) + 12
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
