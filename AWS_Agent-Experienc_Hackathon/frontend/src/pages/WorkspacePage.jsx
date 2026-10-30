import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Copy, 
  Trash2, 
  Cpu, 
  Check, 
  Layers, 
  BookOpen, 
  Target, 
  Briefcase, 
  Terminal, 
  Clock, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import DecisionTracePanel from '../components/DecisionTracePanel';

export default function WorkspacePage({ 
  messages, 
  onSendMessage, 
  loading, 
  onClearChat, 
  currentTrace,
  systemStatus,
  prefilledPrompt 
}) {
  const [input, setInput] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [operatingMode, setOperatingMode] = useState('auto'); // auto, real, demo
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (prefilledPrompt) {
      setInput(prefilledPrompt);
    }
  }, [prefilledPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input.trim(), operatingMode);
    setInput('');
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const suggestedPrompts = [
    { label: "Assess my skill gaps", text: "Assess my skill gaps for Full-Stack AI Engineer and show what I'm missing" },
    { label: "Recommend portfolio project", text: "Recommend a portfolio project using Strands Decider and Bedrock" },
    { label: "Generate 6-week study roadmap", text: "Generate a 6-week learning roadmap for my career goal" },
    { label: "Search matching internships", text: "Search for remote sample internships matching my Python and React skills" },
    { label: "Prepare interview questions", text: "Create an interview prep plan with DSA patterns and technical topics" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header with Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg font-bold text-white">AI Career Agent Workspace</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Pattern: #tool-selection
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Decider 2B evaluates your request & selects the next tool workflow with verified confidence.
          </p>
        </div>

        {/* Operating Mode Selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400 font-medium">Mode:</span>
          <div className="bg-gray-900 border border-gray-800 p-1 rounded-lg flex space-x-1">
            <button
              onClick={() => setOperatingMode('auto')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                operatingMode === 'auto'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Auto (Live → Fallback)
            </button>
            <button
              onClick={() => setOperatingMode('real')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                operatingMode === 'real'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Strict Real Mode
            </button>
            <button
              onClick={() => setOperatingMode('demo')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                operatingMode === 'demo'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Demo Heuristics
            </button>
          </div>
          <button
            onClick={onClearChat}
            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-gray-800 border border-gray-800 transition-all"
            title="Clear Chat Conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Chat Stream (Left) + Live Decision Trace (Right) */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Chat Stream (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col h-[700px] bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Suggested Prompts Banner */}
            {messages.length === 0 && (
              <div className="text-center py-8 px-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Ready to Guide Your Next Career Move
                </h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                  Ask a question or select a prompt below. Notice how Strands Decider 2B selects the tool
                  in the trace panel.
                </p>

                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {suggestedPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(p.text);
                        onSendMessage(p.text, operatingMode);
                      }}
                      className="text-left text-xs bg-gray-900 hover:bg-gray-850 hover:border-blue-500/40 text-gray-300 border border-gray-800 px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Items */}
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 px-1">
                    <span>{isUser ? 'You' : 'SkillPilot AI Agent'}</span>
                    {!isUser && msg.tool && (
                      <span className="font-mono text-blue-400 font-semibold">
                        [Tool: {msg.tool}]
                      </span>
                    )}
                  </div>

                  <div
                    className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    {/* Message Body */}
                    <p className="whitespace-pre-line text-xs font-normal">
                      {msg.content}
                    </p>

                    {/* Rich Tool Result Rendering if Available */}
                    {!isUser && msg.data && (
                      <div className="mt-3 pt-3 border-t border-gray-800/80 space-y-2">
                        {/* Gap analysis summary */}
                        {msg.data.readiness_score !== undefined && (
                          <div className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 flex items-center justify-between">
                            <span className="text-gray-400 font-medium">Curriculum Match Index:</span>
                            <span className="font-mono font-bold text-emerald-400 text-sm">
                              {msg.data.readiness_score}%
                            </span>
                          </div>
                        )}

                        {/* Project summary */}
                        {msg.data.recommended_project && (
                          <div className="bg-gray-950 p-2.5 rounded-lg border border-gray-800 space-y-1">
                            <span className="text-[10px] text-blue-400 font-semibold uppercase">Project Title</span>
                            <p className="text-xs font-bold text-white">
                              {msg.data.recommended_project.title}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              Tech: {msg.data.recommended_project.tech_stack?.join(', ')}
                            </p>
                          </div>
                        )}

                        {/* Action buttons or clarifications */}
                        {msg.data.suggested_options && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {msg.data.suggested_options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => onSendMessage(opt.prompt || opt.label, operatingMode)}
                                className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[11px] hover:bg-blue-600/30 transition-all"
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message Footer */}
                    {!isUser && (
                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-500">
                        <div className="flex items-center space-x-2 font-mono">
                          <span>Latency: {msg.latency_ms || 120}ms</span>
                          <span>•</span>
                          <span>{msg.bedrock_invoked ? 'Bedrock' : 'Deterministic'}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(msg.content, idx)}
                          className="hover:text-gray-300 flex items-center space-x-1"
                        >
                          {copiedIdx === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading State Indicator */}
            {loading && (
              <div className="flex flex-col items-start space-y-1">
                <span className="text-[10px] text-gray-400 px-1">
                  Strands Decider 2B Routing...
                </span>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl rounded-tl-none p-3.5 flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-gray-300 animate-pulse font-mono">
                    Evaluating state against #tool-selection options...
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Box */}
          <form onSubmit={handleSubmit} className="p-3 bg-gray-900/90 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for skill gap analysis, projects, roadmap, internships, or interview prep..."
                disabled={loading}
                className="flex-1 bg-[#0B0F19] text-gray-100 placeholder-gray-500 text-xs px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Decision Trace Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <DecisionTracePanel 
            trace={currentTrace} 
            toolStatus={currentTrace ? "success" : null}
            toolName={currentTrace?.selected_action}
            bedrockInvoked={systemStatus?.bedrock_configured}
            isFallback={!currentTrace?.is_live_decider}
          />

          {/* Quick Guide to Hackathon Judges */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 font-semibold">
              <Info className="w-4 h-4" />
              <span>Hackathon Evaluation Guide</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Every prompt in this workspace goes through <strong className="text-gray-200">Strands Decider 2B</strong> to
              evaluate the 7 typed choices. Watch the <strong className="text-blue-300">Calibrated Confidence</strong> and{' '}
              <strong className="text-blue-300">Latency</strong> metrics above change dynamically per request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
