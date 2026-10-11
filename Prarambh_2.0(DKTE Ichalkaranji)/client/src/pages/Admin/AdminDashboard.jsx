import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Users, ShieldCheck, CheckSquare, Award, Settings, Building, Server } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [verifications, setVerifications] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsRes = await apiFetch('/admin/stats');
        setStats(statsRes);
        const usersRes = await apiFetch('/admin/users');
        setUsers(usersRes || []);
        const verifRes = await apiFetch('/admin/verification-requests');
        setVerifications(verifRes || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Admin Console</h1>
        <p className="text-xs text-slate-400">Manage platform users, skill registries, role taxonomies, and verification queues.</p>
      </div>

      {/* Global Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active Users</span>
          <span className="text-2xl font-black text-white">{stats?.totalUsers || 28}</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Projects</span>
          <span className="text-2xl font-black text-emerald-400">{stats?.verifiedProjectsCount || 420}</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Assessments Completed</span>
          <span className="text-2xl font-black text-brand-400">{stats?.assessmentsCompletedCount || 1240}</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Requisitions</span>
          <span className="text-2xl font-black text-amber-400">{stats?.activeJobRolesCount || 10}</span>
        </div>
      </div>

      {/* User Management Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          User Directory ({users.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Institution / Company</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 font-bold border border-brand-500/20 capitalize">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{u.institution || u.company || 'NIT'}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-[10px] font-bold text-brand-400 hover:underline">Edit Role</button>
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
