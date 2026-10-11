import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Award, 
  FolderCheck, 
  CheckSquare, 
  Target, 
  TrendingUp, 
  Compass, 
  Bot, 
  Users, 
  Grid, 
  AlertTriangle, 
  PlusCircle, 
  Layers,
  GraduationCap,
  BookOpen,
  Mic,
  ShieldCheck,
  Zap,
  Globe,
  Briefcase
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || 'student';

  const studentLinks = [
    { to: '/student', label: 'Command Center', icon: LayoutDashboard },
    { to: '/student/academic', label: 'Academic Record', icon: GraduationCap },
    { to: '/student/skill-graph', label: 'Skill Graph & Strength', icon: Layers },
    { to: '/student/evidence', label: 'My Evidence', icon: FolderCheck },
    { to: '/student/projects', label: 'Projects & Verification', icon: CheckSquare },
    { to: '/student/assessments', label: 'Assessments', icon: CheckSquare },
    { to: '/student/placement-prep', label: 'Placement Preparation', icon: Briefcase },
    { to: '/student/learning-hub', label: 'Learning Hub & Roadmap', icon: BookOpen },
    { to: '/student/career-roles', label: 'Career Role Explorer', icon: Target },
    { to: '/student/skill-gaps', label: 'Skill Gap Analysis', icon: TrendingUp },
    { to: '/student/mock-interview', label: 'AI Mock Interview', icon: Mic },
    { to: '/student/market-intelligence', label: 'Skill Intelligence', icon: Zap },
    { to: '/student/ai-mentor', label: 'AI Mentor Chat', icon: Bot },
  ];

  const facultyLinks = [
    { to: '/faculty', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/faculty/heatmap', label: 'Institutional Skill Heatmap', icon: Grid },
    { to: '/faculty/curriculum-gaps', label: 'Curriculum Gap Analysis', icon: AlertTriangle },
    { to: '/faculty/students', label: 'Student Analytics', icon: Users },
  ];

  const employerLinks = [
    { to: '/employer', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/employer/create-job', label: 'Create Job Requisition', icon: PlusCircle },
    { to: '/employer/candidates', label: 'Candidate Discovery', icon: Users },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
    { to: '/admin/verification-center', label: 'Anti-Fraud Integrity Queue', icon: ShieldCheck },
  ];

  let currentLinks = studentLinks;
  if (role === 'faculty') currentLinks = facultyLinks;
  else if (role === 'employer') currentLinks = employerLinks;
  else if (role === 'admin') currentLinks = adminLinks;

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/60 backdrop-blur-md hidden md:flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">
            {role} Ecosystem Navigation
          </p>
          <div className="space-y-1">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/student' || link.to === '/faculty' || link.to === '/employer' || link.to === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-brand-500/15 text-brand-400 font-semibold border border-brand-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>EDUTECH Ecosystem</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Evidence Verification Engine v2.0 • Gemini AI Integrated
        </p>
      </div>
    </aside>
  );
};
