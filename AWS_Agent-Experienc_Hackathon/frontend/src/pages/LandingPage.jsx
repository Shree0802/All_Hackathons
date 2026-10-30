import React from 'react';
import { 
  Compass, 
  Cpu, 
  Cloud, 
  Zap, 
  ArrowRight, 
  Layers, 
  Target, 
  GitBranch, 
  CheckCircle, 
  Terminal, 
  Code2, 
  Github, 
  FileText,
  Shield,
  Activity,
  Briefcase
} from 'lucide-react';

export default function LandingPage({ setActiveTab, systemStatus }) {
  const isDeciderLive = systemStatus?.decider_2b_available;

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Zap className="w-3.5 h-3.5" />
          <span>AWS Agent Experience Hackathon Submission</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Your Skills. Your Goals.{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
            Your Next Move.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Traditional chatbots just generate text. <strong className="font-semibold text-white">SkillPilot AI</strong> makes
          real architectural decisions using <strong className="text-blue-400 font-semibold">Strands Decider 2B</strong> to select
          executable career development tools, enriched with <strong className="text-purple-400 font-semibold">Amazon Bedrock</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('workspace')}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch SkillPilot Agent</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('decision-lab')}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-gray-200 font-medium border border-gray-700 transition-all"
          >
            <Cpu className="w-4 h-4 text-violet-400" />
            <span>Explore Decision Lab</span>
          </button>
        </div>

        {/* Tech Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400 font-mono">
          <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-lg flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>#strands-decider-2b</span>
          </span>
          <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-lg flex items-center space-x-1.5">
            <GitBranch className="w-3.5 h-3.5 text-violet-400" />
            <span>#tool-selection</span>
          </span>
          <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-lg flex items-center space-x-1.5">
            <Cloud className="w-3.5 h-3.5 text-purple-400" />
            <span>Amazon Bedrock</span>
          </span>
          <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-lg flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strands Agents SDK</span>
          </span>
        </div>
      </section>

      {/* Why Decision Models Matter Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              How Strands Decider 2B Changes Agent Architecture
            </h2>
            <p className="text-sm text-gray-400">
              Decoupling sub-50ms deterministic tool selection from multi-second generative text synthesis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Traditional LLM approach */}
            <div className="bg-gray-900/60 border border-red-500/20 rounded-xl p-5 relative">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Traditional Chatbot LLM Routing</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400">✕</span>
                  <span><strong>High Latency:</strong> Generates conversational tokens first before emitting tool calls (800ms - 2500ms).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400">✕</span>
                  <span><strong>Uncalibrated Confidence:</strong> LLMs cannot output mathematically calibrated uncertainty probabilities.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400">✕</span>
                  <span><strong>Hallucinated Tool Calls:</strong> Vulnerable to calling invalid function schemas or drift.</span>
                </li>
              </ul>
            </div>

            {/* SkillPilot AI Strands Decider Approach */}
            <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-5 relative">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>SkillPilot AI: Decider 2B + Bedrock</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Ultra-Fast Tool Selection:</strong> Single forward-pass classification over typed criteria (&lt;50ms).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Calibrated Confidence:</strong> Real probability mass formula: <code className="text-blue-300 font-mono text-[10px]">(N*p_max - 1)/(N - 1)</code>.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Bedrock Synthesis:</strong> Claude Sonnet 3.5 is called only when rich generative personalization is required.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Core Agent Workflows</h2>
          <p className="text-sm text-gray-400">
            Strands Decider 2B routes student requests to one of 7 registered actions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "1. Skill Gap Assessment",
              desc: "Deterministic comparison against curriculum requirements with weighted scoring and prioritized gap breakdown.",
              tab: "skill-gaps",
              action: "assess_skill_gaps",
              icon: Layers
            },
            {
              title: "2. Project Recommendations",
              desc: "Practical portfolio-grade project blueprints with tech stacks, difficulty levels, and resume impact highlights.",
              tab: "projects",
              action: "recommend_project",
              icon: Code2
            },
            {
              title: "3. Learning Roadmaps",
              desc: "Personalized 6-week milestones, weekly study goals, practice activities, and assessment checkpoints.",
              tab: "roadmap",
              action: "generate_learning_roadmap",
              icon: Target
            },
            {
              title: "4. Sample Internship Explorer",
              desc: "Search sample internship openings filtered by skills, target role, and location with transparent sample labels.",
              tab: "internships",
              action: "search_internships",
              icon: Briefcase
            },
            {
              title: "5. Interview Preparation",
              desc: "Technical topics, high-frequency DSA patterns, project discussion questions, and a 7-day study timetable.",
              tab: "interview",
              action: "prepare_interview",
              icon: Terminal
            },
            {
              title: "6. Decision Lab & Trace",
              desc: "Inspect live decision probabilities, confidence metrics, and tool dispatch logs in an interactive testing playground.",
              tab: "decision-lab",
              action: "decision_lab",
              icon: Activity
            }
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx}
                onClick={() => setActiveTab(f.tab)}
                className="bg-[#111827] border border-gray-800 hover:border-blue-500/40 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-500/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-blue-300">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  {f.desc}
                </p>
                <span className="text-[10px] font-mono text-gray-500 group-hover:text-blue-400 flex items-center space-x-1">
                  <span>Action: {f.action}</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 pt-12 border-t border-gray-800 text-xs text-gray-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          <strong className="text-gray-300">SkillPilot AI</strong> — AWS Agent Experience Hackathon
          <p className="text-[11px] text-gray-500 mt-0.5">
            Decider 2B & Amazon Bedrock Career Intelligence Agent
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setActiveTab('settings')} className="hover:text-gray-300">
            System Status
          </button>
          <button onClick={() => setActiveTab('decision-lab')} className="hover:text-gray-300">
            Decision Lab
          </button>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400 font-mono">#strands-decider-2b</span>
          <span className="text-gray-400 font-mono">#tool-selection</span>
        </div>
      </footer>
    </div>
  );
}
