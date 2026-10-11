import React, { useState } from 'react';
import { apiFetch } from '../../services/api';
import { Bot, Send, User, Sparkles, Loader2, HelpCircle } from 'lucide-react';

export const AIMentor = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Prathamesh! I'm your EDUTECH AI Mentor. I have full context on your Machine Learning Engineer target role, 78% readiness score, and 51% Statistics gap. How can I guide your preparation today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "What should I learn next?",
    "Why is my ML readiness at 78%?",
    "How can I improve my Python score to 90%?",
    "Which project should I build next?",
    "Am I ready for a Data Analyst role?"
  ];

  const handleSend = async (questionText) => {
    const query = questionText || input;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await apiFetch('/ai/mentor/chat', {
        method: 'POST',
        body: JSON.stringify({ question: query, targetRoleId: 'role_ml_engineer' })
      });
      setMessages([...newMessages, { sender: 'ai', text: res.answer }]);
    } catch (e) {
      setMessages([...newMessages, { sender: 'ai', text: "I'm having trouble fetching live recommendations right now, but I recommend focusing on your Statistics gap!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">EDUTECH AI Career Mentor</h1>
        <p className="text-xs text-slate-400">Context-aware learning assistant trained directly on your verified evidence, assessment scores, and target role requirements.</p>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {sampleQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-500/40 text-xs transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Console */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 min-h-[450px] flex flex-col justify-between">
        <div className="space-y-4 max-h-[420px] overflow-y-auto p-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed max-w-xl ${
                  m.sender === 'user'
                    ? 'bg-brand-500 text-white font-medium rounded-tr-none'
                    : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-xs text-brand-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI Mentor analyzing your profile context...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center space-x-3 pt-4 border-t border-slate-800"
        >
          <input
            type="text"
            placeholder="Ask your AI mentor about skill gaps, learning paths, or career advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center space-x-2 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
