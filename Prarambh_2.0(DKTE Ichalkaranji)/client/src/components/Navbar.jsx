import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Zap,
  Sparkles,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const { user, loginDemoAccount, demoAccounts, logout } = useAuth();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: 'Your Python assessment result (87%) has been verified.', time: '10m ago' },
    { id: 2, text: 'AI Repo Verification completed for "AI Resume Analyzer" (Score: 84/100).', time: '1h ago' },
    { id: 3, text: 'TechNova Labs viewed your verified profile for ML Intern position.', time: '3h ago' },
    { id: 4, text: 'New skill gap recommendation available: Statistics & Probability.', time: '1d ago' }
  ];

  return (
    <nav className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Brand Header */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">EDU<span className="text-brand-400">TECH</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">AI Ready</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Prove Your Skills. Build Your Future.</p>
          </div>
        </Link>
      </div>

      {/* Center Link: Traceability */}
      <div className="hidden md:flex items-center space-x-6">
        <Link 
          to="/traceability" 
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-500/40 transition flex items-center space-x-1.5"
        >
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Requirements Traceability</span>
        </Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Quick Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Role: <span className="font-bold text-brand-400 capitalize">{user?.role || 'student'}</span></span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
              <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                Switch Demo Role
              </div>
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => {
                    loginDemoAccount(acc.role);
                    setRoleMenuOpen(false);
                    if (acc.role === 'student') navigate('/student');
                    else if (acc.role === 'faculty') navigate('/faculty');
                    else if (acc.role === 'employer') navigate('/employer');
                    else if (acc.role === 'admin') navigate('/admin');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition ${user?.role === acc.role ? 'text-brand-400 font-semibold bg-brand-500/10' : 'text-slate-300'}`}
                >
                  <span>{acc.title}</span>
                  {user?.role === acc.role && <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850 transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-white">
                <span>Notifications</span>
                <span className="text-[10px] text-brand-400">4 New</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/50">
                {notifications.map(n => (
                  <div key={n.id} className="p-3 text-xs text-slate-300 hover:bg-slate-850 transition">
                    <p className="line-clamp-2">{n.text}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
          <img 
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'} 
            alt={user?.name} 
            className="w-8 h-8 rounded-full border border-brand-500/40 object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">{user?.name || 'Prathamesh Patil'}</p>
            <p className="text-[10px] text-slate-400 capitalize">{user?.role || 'student'}</p>
          </div>
          <button 
            onClick={logout}
            title="Logout" 
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};
