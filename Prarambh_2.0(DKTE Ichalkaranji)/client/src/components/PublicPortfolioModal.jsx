import React, { useState } from 'react';
import { X, Globe, Lock, QrCode, Copy, Check, ExternalLink } from 'lucide-react';
import { QRCodeGenerator } from './QRCodeGenerator';
import { apiFetch } from '../services/api';

export const PublicPortfolioModal = ({ isOpen, onClose }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const publicUrl = 'http://localhost:5173/portfolio/660a11111111111111111111';

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePrivacy = async (newVal) => {
    setIsPublic(newVal);
    try {
      await apiFetch('/portfolio/privacy', {
        method: 'PUT',
        body: JSON.stringify({ isPublic: newVal, showEmployer: true, allowSearch: true })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-brand-400" />
            <h3 className="font-bold text-base text-white">Verified Public Portfolio & Privacy Controls</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Privacy Toggle Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white block">Portfolio Visibility Status</span>
              <span className="text-[11px] text-slate-400">
                {isPublic ? 'Publicly accessible to recruiters & employers via URL/QR' : 'Private - only visible to you'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleTogglePrivacy(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${isPublic ? 'bg-brand-500 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Public
              </button>
              <button
                onClick={() => handleTogglePrivacy(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${!isPublic ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Private
              </button>
            </div>
          </div>

          {/* QR Code */}
          <QRCodeGenerator portfolioUrl={publicUrl} studentName="Prathamesh Patil" />

          {/* Copy Public Link */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-400">Public Profile Share URL</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold flex items-center space-x-1.5 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
