import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, Filter, Eye } from 'lucide-react';

export const AdminVerificationCenter = () => {
  const [logs, setLogs] = useState([]);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsRes = await apiFetch('/integrity/audit-logs');
        setLogs(logsRes || []);
        const flagsRes = await apiFetch('/integrity/flags');
        setFlags(flagsRes.flaggedRequests || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Anti-Fraud & Evidence Integrity Queue</h1>
        <p className="text-xs text-slate-400">Review suspicious submissions, audit trail logs, and evidence consistency flags.</p>
      </div>

      {/* Flagged Submissions Queue */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Submissions Requiring Faculty/Admin Review ({flags.length})</span>
        </h3>

        <div className="space-y-3">
          {flags.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-xs">{item.userName}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                    {item.integrityFlag}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{item.details}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Submission ${item._id} Approved`)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
                >
                  Approve Evidence
                </button>
                <button
                  onClick={() => alert(`Submission ${item._id} Rejected`)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold border border-rose-500/30"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          System-Wide Audit Trail Logs ({logs.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4 text-right">Flag Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">{log.userName}</td>
                  <td className="py-3 px-4 font-semibold text-brand-300">{log.action}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{log.details}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.integrityFlag === 'Clean' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {log.integrityFlag}
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
