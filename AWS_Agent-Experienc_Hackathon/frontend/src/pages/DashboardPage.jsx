import React from 'react';
import { 
  User, 
  Target, 
  Award, 
  Layers, 
  BookOpen, 
  Briefcase, 
  Terminal, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Zap, 
  GraduationCap 
} from 'lucide-react';

export default function DashboardPage({ profile, activities, setActiveTab, onQuickPrompt }) {
  const skills = profile?.skills || [];
  const targetRole = profile?.target_role || "Full-Stack AI Engineer";

  // Calculate quick stats
  const avgProficiency = skills.length 
    ? (skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length).toFixed(1)
    : "3.2";

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Student Career Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.name || "Alex Sharma"}!
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            You are preparing for <strong className="text-blue-300">{targetRole}</strong>. 
            SkillPilot AI has indexed your skills, career goals, and the latest curriculum benchmarks.
          </p>

          <div className="flex flex-wrap gap-4 text-xs">
            <button
              onClick={() => onQuickPrompt(`Assess my skill gaps for ${targetRole}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-md shadow-blue-600/20"
            >
              <Layers className="w-4 h-4" />
              <span>Assess Skill Gaps</span>
            </button>
            <button
              onClick={() => onQuickPrompt("Recommend a capstone project for my skills")}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-750 text-gray-200 border border-gray-700 rounded-lg font-medium transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Recommend Project</span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-750 text-gray-200 border border-gray-700 rounded-lg font-medium transition-all"
            >
              <Target className="w-4 h-4" />
              <span>View Learning Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Overview & Skills Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              {profile?.name ? profile.name.charAt(0) : "A"}
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">{profile?.name}</h3>
              <p className="text-xs text-gray-400">{profile?.academic_branch}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs border-t border-gray-800 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Target Role:</span>
              <span className="text-blue-300 font-medium">{profile?.target_role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Class of:</span>
              <span className="text-gray-200">{profile?.graduation_year || 2026}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Experience Level:</span>
              <span className="text-gray-200">{profile?.current_experience_level || "Intermediate"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg Skill Rating:</span>
              <span className="text-emerald-400 font-bold">{avgProficiency} / 5.0</span>
            </div>
          </div>
        </div>

        {/* Existing Skills Cloud */}
        <div className="md:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-400" />
              <h3 className="font-semibold text-white text-sm">Indexed Skills Profile</h3>
            </div>
            <button 
              onClick={() => setActiveTab('skill-gaps')}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span>Full Gap Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {skills.map((s, idx) => (
              <div key={idx} className="bg-gray-900/80 border border-gray-800 p-2.5 rounded-lg">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-200 truncate">{s.name}</span>
                  <span className="text-[10px] font-mono text-blue-400">{s.proficiency}/5</span>
                </div>
                <div className="bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full" 
                    style={{ width: `${(s.proficiency / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
            <span>Interests: {profile?.interests?.join(', ') || 'AI, Cloud, Full-Stack'}</span>
            <span className="text-[11px] text-gray-500">Updated in Local Storage</span>
          </div>
        </div>
      </div>

      {/* Recommended Next Step & Quick Action Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Skill Gap Matrix",
            desc: "Compare profile against Full-Stack AI criteria",
            tab: "skill-gaps",
            icon: Layers,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            title: "Project Blueprints",
            desc: "Portfolio projects featuring Decider & Bedrock",
            tab: "projects",
            icon: BookOpen,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
          },
          {
            title: "Weekly Roadmap",
            desc: "6-week structured milestone schedule",
            tab: "roadmap",
            icon: Target,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            title: "Interview Prep",
            desc: "Technical DSA & behavioral simulation",
            tab: "interview",
            icon: Terminal,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className="bg-[#111827] border border-gray-800 hover:border-gray-700 p-4 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 group"
            >
              <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-white text-xs mb-1 group-hover:text-blue-300">
                {item.title}
              </h4>
              <p className="text-[11px] text-gray-400">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Agent Activities Feed */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-violet-400" />
            <h3 className="font-semibold text-white text-sm">Recent Agent Activities & Decisions</h3>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            Telemetry Feed
          </span>
        </div>

        <div className="space-y-2.5">
          {activities && activities.length > 0 ? (
            activities.slice(0, 5).map((act, idx) => (
              <div 
                key={idx}
                className="bg-gray-900/60 border border-gray-800/80 p-3 rounded-lg flex flex-wrap items-center justify-between text-xs gap-2"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <div>
                    <span className="text-gray-200 font-medium block">
                      "{act.user_request}"
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Dispatched tool: <code className="text-blue-400">{act.tool_name}</code>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                    Source: {act.decision_source}
                  </span>
                  {act.confidence !== null && (
                    <span className="text-emerald-400 font-bold">
                      {(act.confidence * 100).toFixed(0)}% Conf
                    </span>
                  )}
                  <span className="text-gray-500">
                    {act.execution_time_ms}ms
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 py-4 text-center">
              No recent agent activities logged yet. Run a prompt in the AI Career Agent workspace!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
