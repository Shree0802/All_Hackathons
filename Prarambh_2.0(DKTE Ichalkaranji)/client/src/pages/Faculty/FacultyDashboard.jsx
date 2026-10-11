import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Users, ShieldCheck, TrendingUp, AlertTriangle, Grid, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacultyDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await apiFetch('/faculty/dashboard');
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { summaryCards, institution } = data || {};

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Institutional Skill Analytics Portal</h1>
          <p className="text-xs text-slate-400">Real-time skill gap visibility, curriculum analytics, and competency heatmaps for <strong className="text-brand-300">{institution?.name || 'National Institute of Technology'}</strong>.</p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled Students</span>
          <div className="text-2xl font-black text-white">{summaryCards?.totalStudents?.toLocaleString() || '2,450'}</div>
          <span className="text-[10px] text-emerald-400">Computer Science & AI/ML Branch</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Verified Skill Profiles</span>
          <div className="text-2xl font-black text-emerald-400">{summaryCards?.verifiedProfiles?.toLocaleString() || '1,920'}</div>
          <span className="text-[10px] text-slate-400">78.3% Total Verification Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Average Industry Readiness</span>
          <div className="text-2xl font-black text-brand-400">{summaryCards?.avgReadinessScore || 68}%</div>
          <span className="text-[10px] text-brand-300">Across 10 Industry Roles</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Critical Skill Gap Alert</span>
          <div className="text-2xl font-black text-rose-400">{summaryCards?.criticalSkillGapCount || 742}</div>
          <span className="text-[10px] text-rose-400/80">Students with Cloud & Stats Gaps</span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/faculty/heatmap" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 hover:border-brand-500/40 transition block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Grid className="w-5 h-5 text-brand-400" />
              <h3 className="text-base font-bold text-white">Institutional Skill Heatmap</h3>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Inspect competency levels by First Year (FY), Second Year (SY), Third Year (TY), and Final Year (LY) across Python, SQL, DSA, ML, Cloud, and Git.
          </p>
        </Link>

        <Link to="/faculty/curriculum-gaps" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 hover:border-brand-500/40 transition block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">AI Curriculum Gap Recommendations</h3>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI-generated institutional insights: 58% 3rd year cloud gap detected. Actionable recommendations to add practical workshops.
          </p>
        </Link>
      </div>
    </div>
  );
};
