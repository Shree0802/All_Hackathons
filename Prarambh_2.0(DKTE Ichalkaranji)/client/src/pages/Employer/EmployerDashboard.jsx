import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Briefcase, UserCheck, PlusCircle, Building, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmployerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const res = await apiFetch('/employer/dashboard');
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployer();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { company, openJobs, candidateCount } = data || {};

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Employer Candidate Intelligence Portal</h1>
          <p className="text-xs text-slate-400">Evaluate candidates using verified competency evidence & project code rather than resumes alone.</p>
        </div>

        <Link
          to="/employer/create-job"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 flex items-center space-x-2 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Job Requirement</span>
        </Link>
      </div>

      {/* Company Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center text-xl">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{company?.name || 'TechNova Labs'}</h2>
            <p className="text-xs text-slate-400">{company?.industry} • {company?.location}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-center text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Open Job Roles</span>
            <span className="text-xl font-black text-brand-400">{company?.openPositionsCount || 3}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Applicants</span>
            <span className="text-xl font-black text-emerald-400">{company?.verifiedProfilesCount || 96}</span>
          </div>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Active Job Requisitions ({openJobs?.length})
          </h3>
          <Link to="/employer/candidates" className="text-xs font-semibold text-brand-400 hover:underline">
            Discover Verified Candidates →
          </Link>
        </div>

        <div className="space-y-3">
          {openJobs?.map((job, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-base font-bold text-white">{job.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 font-bold border border-brand-500/20">
                    {job.jobType}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{job.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requiredSkills?.map((sk, k) => (
                    <span key={k} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {sk.skillName} ≥ {sk.minScore}%
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-white block">{job.stipendOrSalary}</span>
                  <span className="text-[10px] text-slate-400">{job.applicantCount} Applicants</span>
                </div>
                <Link
                  to="/employer/candidates"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition"
                >
                  View Matches
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
