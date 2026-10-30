import React from 'react';
import { 
  Compass, 
  Cpu, 
  Cloud, 
  Activity, 
  Layers, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Sliders, 
  Settings,
  Sparkles,
  Terminal
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemStatus }) {
  const navItems = [
    { id: 'landing', label: 'Overview', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'workspace', label: 'AI Career Agent', icon: Sparkles, badge: 'Agent' },
    { id: 'skill-gaps', label: 'Skill Gaps', icon: Layers },
    { id: 'projects', label: 'Projects', icon: BookOpen },
    { id: 'roadmap', label: 'Roadmap', icon: GraduationCap },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'interview', label: 'Interview Prep', icon: Terminal },
    { id: 'decision-lab', label: 'Decision Lab', icon: Sliders, highlight: true },
    { id: 'settings', label: 'System', icon: Settings },
  ];

  const isDeciderLive = systemStatus?.decider_2b_available;
  const isBedrockConfigured = systemStatus?.bedrock_configured;

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-500 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  SkillPilot AI
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                  AWS Hackathon
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Your Skills. Your Goals. Your Next Move.
              </p>
            </div>
          </div>

          {/* Integration Status Badges */}
          <div className="hidden md:flex items-center space-x-2 text-xs">
            {/* Decider Status */}
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border ${
              isDeciderLive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
            }`}>
              <Cpu className="w-3.5 h-3.5" />
              <span className="font-medium">
                Decider 2B: {isDeciderLive ? 'Live Endpoint' : 'Demo Stub Mode'}
              </span>
            </div>

            {/* Bedrock Status */}
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border ${
              isBedrockConfigured 
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                : 'bg-gray-800 text-gray-400 border-gray-700'
            }`}>
              <Cloud className="w-3.5 h-3.5" />
              <span className="font-medium">
                Bedrock: {isBedrockConfigured ? 'AWS Active' : 'Fallback Ready'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-gray-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                    : item.highlight
                    ? 'text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : ''}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
