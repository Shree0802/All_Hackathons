import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { login, loginDemoAccount, demoAccounts } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@edutech.demo');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      navigate(`/${user.role || 'student'}`);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    loginDemoAccount(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-brand-500/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Sign In to EDUTECH</h2>
          <p className="text-xs text-slate-400">Access your verified skill intelligence dashboard</p>
        </div>

        {/* Quick Demo Login Cards */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>Hackathon Quick 1-Click Demo Logins</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleQuickDemo(acc.role)}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500/60 text-left transition group"
              >
                <span className="text-xs font-bold text-white block capitalize group-hover:text-brand-300">{acc.role}</span>
                <span className="text-[10px] text-slate-400 block truncate">{acc.email}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-800">
          {error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">{error}</div>}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Don't have an account? <Link to="/register" className="text-brand-400 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};
