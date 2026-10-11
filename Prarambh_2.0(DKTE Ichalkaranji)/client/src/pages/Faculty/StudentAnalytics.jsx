import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Users, Search, Award, CheckCircle2 } from 'lucide-react';

export const StudentAnalytics = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await apiFetch('/faculty/students');
        setStudents(res || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Student Roster Analytics</h1>
        <p className="text-xs text-slate-400">View individual student readiness scores, verified evidence items, and target role alignments.</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Target Role</th>
                <th className="py-3 px-4">Role Fit %</th>
                <th className="py-3 px-4">Verified Projects</th>
                <th className="py-3 px-4">Verified Certs</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {students.map((st, i) => (
                <tr key={i} className="hover:bg-slate-850/50 transition">
                  <td className="py-3.5 px-4 font-bold text-white">{st.name}</td>
                  <td className="py-3.5 px-4 text-slate-300">{st.targetRole}</td>
                  <td className="py-3.5 px-4 font-extrabold text-brand-400">{st.roleFitPercentage}%</td>
                  <td className="py-3.5 px-4">{st.verifiedProjectsCount} Items</td>
                  <td className="py-3.5 px-4">{st.verifiedCertificatesCount} Items</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
