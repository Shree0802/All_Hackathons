import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export const interviewEngine = {
  getQuestionsForRole(roleTitle = 'Machine Learning Engineer', interviewType = 'Technical') {
    if (interviewType === 'HR') {
      return [
        { id: 'q_hr1', question: 'Tell me about a challenging technical project you built. What trade-offs did you evaluate?' },
        { id: 'q_hr2', question: 'How do you handle situation when an ML model performance degrades in production?' }
      ];
    }

    return [
      { id: 'q_tech1', question: 'Explain the bias-variance tradeoff in Machine Learning models. How do L1 and L2 regularization impact model variance?' },
      { id: 'q_tech2', question: 'How do you address severe class imbalance when training a binary classification model for customer churn prediction?' },
      { id: 'q_tech3', question: 'What metrics would you use to evaluate an object detection model vs a semantic segmentation neural network?' }
    ];
  },

  async evaluateAnswer({ roleTitle, question, studentAnswer }) {
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Evaluate this student mock interview answer for role "${roleTitle}":
Question: "${question}"
Answer: "${studentAnswer}"

Return ONLY a JSON object:
{
  "technicalRelevanceScore": 85,
  "completenessScore": 80,
  "structureScore": 82,
  "feedback": "Detailed constructive feedback focusing on technical accuracy and completeness.",
  "keyStrengths": ["Accurate explanation of L1/L2 penalty", "Good practical context"],
  "improvementSuggestions": ["Elaborate on cross-validation hyperparameter tuning"]
}`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.warn('[Interview Engine Warning] Gemini API fallback:', e.message);
      }
    }

    // Deterministic Mock Evaluation
    const wordCount = studentAnswer ? studentAnswer.split(/\s+/).length : 0;
    let score = 75;
    if (wordCount > 30) score = 85;
    if (wordCount > 60) score = 92;

    return {
      technicalRelevanceScore: score,
      completenessScore: Math.min(95, score + 2),
      structureScore: Math.max(70, score - 3),
      feedback: `Strong technical explanation! You correctly identified the core mechanisms. To make your response even stronger, mention specific metric tradeoffs like Precision-Recall AUC vs ROC-AUC.`,
      keyStrengths: [
        "Clear technical terminology",
        "Structured logical flow",
        "Demonstrated practical model training awareness"
      ],
      improvementSuggestions: [
        "Mention hyperparameter tuning steps during cross-validation",
        "Provide a quick real-world code implementation example"
      ]
    };
  }
};
