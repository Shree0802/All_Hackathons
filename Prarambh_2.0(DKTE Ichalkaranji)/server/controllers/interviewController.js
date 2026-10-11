import { interviewEngine } from '../services/interviewEngine.js';
import { logAuditEvent } from '../services/integrityService.js';

const activeSessions = {};

export const startInterview = async (req, res) => {
  const { roleTitle = 'Machine Learning Engineer', interviewType = 'Technical' } = req.body;
  const questions = interviewEngine.getQuestionsForRole(roleTitle, interviewType);

  const sessionId = 'session_' + Date.now();
  activeSessions[sessionId] = {
    sessionId,
    userId: req.user._id,
    roleTitle,
    interviewType,
    questions,
    currentIndex: 0,
    answers: [],
    overallScore: 82
  };

  await logAuditEvent({
    userId: req.user._id,
    userName: req.user.name,
    action: 'Mock Interview Started',
    details: `Started ${interviewType} Mock Interview for role ${roleTitle}.`
  });

  return res.json({
    sessionId,
    roleTitle,
    interviewType,
    totalQuestions: questions.length,
    currentQuestion: questions[0]
  });
};

export const submitInterviewAnswer = async (req, res) => {
  const { sessionId, answerText } = req.body;
  const session = activeSessions[sessionId];

  if (!session) {
    return res.status(404).json({ message: 'Interview session expired or not found' });
  }

  const currentQ = session.questions[session.currentIndex];
  const evaluation = await interviewEngine.evaluateAnswer({
    roleTitle: session.roleTitle,
    question: currentQ.question,
    studentAnswer: answerText
  });

  session.answers.push({
    question: currentQ.question,
    answer: answerText,
    evaluation
  });

  session.currentIndex += 1;
  const isFinished = session.currentIndex >= session.questions.length;

  return res.json({
    isFinished,
    evaluation,
    nextQuestion: isFinished ? null : session.questions[session.currentIndex],
    summary: isFinished ? {
      overallScore: Math.round(session.answers.reduce((acc, a) => acc + a.evaluation.technicalRelevanceScore, 0) / session.answers.length),
      totalQuestionsAnswered: session.answers.length
    } : null
  });
};
