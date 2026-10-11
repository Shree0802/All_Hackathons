import React, { useState, useEffect } from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2, Award, Calendar } from 'lucide-react';
import { apiFetch } from '../services/api';

export const PlacementReportModal = ({ isOpen, onClose }) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (isOpen) {
      apiFetch('/reports/placement-readiness').then(res => setReport(res)).catch(e => console.error(e));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <h3 className="font-bold text-base text-white">Verified Industry Readiness Report</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => window.print()} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold flex items-center space-x-1">
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Container */}
        {report ? (
          <div className="p-8 space-y-6 overflow-y-auto bg-slate-950 text-slate-200 font-sans text-xs">
            {/* Header Document Banner */}
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-black text-white">EDUTECH SKILL INTELLIGENCE DOSSIER</h1>
                <p className="text-slate-400">Verified Evidence-Based Industry Competency Report</p>
              </div>
              <div className="text-right text-[10px] text-slate-500 font-mono">
                <span>Report ID: {report.reportId}</span>
                <span className="block">Timestamp: {report.generatedAt}</span>
              </div>
            </div>

            {/* Student Info & Readiness */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="space-y-1">
                <p className="text-slate-400">Student Name: <strong className="text-white">{report.studentInfo?.name}</strong></p>
                <p className="text-slate-400">Institution: <strong className="text-white">{report.studentInfo?.institution}</strong></p>
                <p className="text-slate-400">Branch & CGPA: <strong className="text-white">{report.studentInfo?.branch} (CGPA: {report.studentInfo?.cgpa})</strong></p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-400">Target Role Fit</span>
                <div className="text-2xl font-black text-white">{report.readinessMetrics?.targetRoleTitle}</div>
                <div className="text-base font-extrabold text-emerald-400">{report.readinessMetrics?.readinessScore}% Overall Readiness</div>
              </div>
            </div>

            {/* Competency Level Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Technical Competency Index</h4>
              <div className="grid grid-cols-2 gap-2">
                {report.skills?.map((sk, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{sk.skillName}</span>
                      <span className="text-[10px] text-slate-400">{sk.evidenceCount} Evidence Items</span>
                    </div>
                    <span className="font-bold text-brand-400 text-sm">{sk.scorePercentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Evidence Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Evidence Proof</h4>
              <div className="space-y-1.5">
                {report.verifiedEvidence?.map((ev, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{ev.title}</span>
                      <span className="text-slate-400 text-[10px] block">Source: {ev.source}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[10px]">✓ {ev.verificationStatus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">Loading Report...</div>
        )}
      </div>
    </div>
  );
};
