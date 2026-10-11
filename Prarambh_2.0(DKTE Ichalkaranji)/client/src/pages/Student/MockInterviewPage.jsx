import React, { useState } from 'react';
import { apiFetch } from '../../services/api';
import { Bot, Send, Play, CheckCircle2, Sparkles, Loader2, Award, RefreshCw } from 'lucide-react';

export const MockInterviewPage = () => {
  const [session, setSession] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [evaluations, setEvaluations] = useState([]);
  const [interviewType, setInterviewType] = useState('Technical');
  const [loading, setLoading] = useState(false);

  const startInterviewSession = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/mock-interviews/start', {
        method: 'POST',
        body: JSON.stringify({ roleTitle: 'Machine Learning Engineer', interviewType })
      });
      setSession(res);
      setEvaluations([]);
      setCurrentAnswer('');
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (!currentAnswer.trim()) return;
    setLoading(true);
    try {
      const res = await apiFetch('/mock-interviews/answer', {
        method: 'POST',
        body: JSON.stringify({ sessionId: session.sessionId, answerText: currentAnswer })
      });
      setEvaluations([...evaluations, res.evaluation]);
      if (res.isFinished) {
        setSession({ ...session, isFinished: true, summary: res.summary });
      } else {
        setSession({ ...session, currentQuestion: res.nextQuestion });
        setCurrentAnswer('');
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Technical & HR Mock Interview Module</h1>
          <p className="text-xs text-slate-400">Practice role-specific technical questions and receive AI feedback on relevance, completeness, and structure.</p>
        </div>

        <div className="flex items-center space-x-2">
          {['Technical', 'HR', 'Mixed'].map((type) => (
            <button
              key={type}
              onClick={() => setInterviewType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                interviewType === type
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              {type} Interview
            </button>
          ))}
        </div>
      </div>

      {!session ? (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-xl mx-auto shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto border border-brand-500/30">
            <Bot className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">Start AI Mock Interview</h3>
          <p className="text-xs text-slate-400">Target Role: <strong className="text-brand-300">Machine Learning Engineer</strong> ({interviewType} Format)</p>
          <button
            onClick={startInterviewSession}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition disabled:opacity-50"
          >
            {loading ? 'Initializing Session...' : 'Begin Mock Interview'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {!session.isFinished ? (
            /* Active Interview Runner */
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Question for Machine Learning Engineer
                </span>
                <span className="text-xs text-slate-500">Live AI Session</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="text-sm font-bold text-white">{session.currentQuestion?.question}</h4>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Your Technical Response *</label>
                <textarea
                  rows={4}
                  placeholder="Explain your approach, technical concepts, trade-offs, and algorithms..."
                  value={currentAnswer}
                  onChange={e => setCurrentAnswer(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleAnswerSubmit}
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-2 transition disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Submit Response for AI Evaluation</span>
                </button>
              </div>
            </div>
          ) : (
            /* Session Completed Summary */
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xl mx-auto border border-emerald-400/40">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white">Mock Interview Completed!</h3>
              <p className="text-xs text-slate-400">Overall Technical Evaluation Score: <strong className="text-emerald-400 font-bold text-base">{session.summary?.overallScore}%</strong></p>
              
              <button
                onClick={() => setSession(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold transition"
              >
                Start Another Session
              </button>
            </div>
          )}

          {/* Evaluations Feedback Cards */}
          {evaluations.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Feedback & Technical Evaluation Reports ({evaluations.length})
              </h3>

              {evaluations.map((ev, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Answer Evaluation #{idx + 1}</span>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-400">Relevance: <strong className="text-brand-400">{ev.technicalRelevanceScore}%</strong></span>
                      <span className="text-slate-400">Completeness: <strong className="text-emerald-400">{ev.completenessScore}%</strong></span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-950 border border-slate-800">{ev.feedback}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                      <span className="font-bold block text-[10px] uppercase text-emerald-400">Key Strengths</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] mt-1">
                        {ev.keyStrengths?.map((s, k) => <li key={k}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                      <span className="font-bold block text-[10px] uppercase text-amber-400">Improvement Suggestions</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] mt-1">
                        {ev.improvementSuggestions?.map((s, k) => <li key={k}>{s}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
