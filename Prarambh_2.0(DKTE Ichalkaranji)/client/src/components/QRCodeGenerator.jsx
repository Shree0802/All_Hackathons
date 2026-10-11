import React from 'react';
import { QrCode, ExternalLink, ShieldCheck } from 'lucide-react';

export const QRCodeGenerator = ({ portfolioUrl = 'http://localhost:5173/portfolio/660a11111111111111111111', studentName = 'Prathamesh Patil' }) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
      <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-white">
        <ShieldCheck className="w-4 h-4 text-brand-400" />
        <span>Scan Verified Portfolio QR</span>
      </div>

      {/* SVG QR Code Simulation */}
      <div className="w-40 h-40 mx-auto bg-white p-2.5 rounded-xl border border-slate-700 flex items-center justify-center shadow-lg relative group">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Top Left Finder Pattern */}
          <rect x="5" y="5" width="30" height="30" fill="#0f172a" />
          <rect x="10" y="10" width="20" height="20" fill="#ffffff" />
          <rect x="15" y="15" width="10" height="10" fill="#0c8de9" />

          {/* Top Right Finder Pattern */}
          <rect x="65" y="5" width="30" height="30" fill="#0f172a" />
          <rect x="70" y="10" width="20" height="20" fill="#ffffff" />
          <rect x="75" y="15" width="10" height="10" fill="#0c8de9" />

          {/* Bottom Left Finder Pattern */}
          <rect x="5" y="65" width="30" height="30" fill="#0f172a" />
          <rect x="10" y="70" width="20" height="20" fill="#ffffff" />
          <rect x="15" y="75" width="10" height="10" fill="#0c8de9" />

          {/* Random Data Pattern Squares */}
          <rect x="40" y="10" width="8" height="8" fill="#0f172a" />
          <rect x="50" y="20" width="8" height="8" fill="#0c8de9" />
          <rect x="10" y="45" width="8" height="8" fill="#0f172a" />
          <rect x="25" y="45" width="8" height="8" fill="#0c8de9" />
          <rect x="45" y="45" width="15" height="15" fill="#0f172a" />
          <rect x="65" y="45" width="8" height="8" fill="#0c8de9" />
          <rect x="80" y="45" width="8" height="8" fill="#0f172a" />
          <rect x="40" y="70" width="8" height="8" fill="#0c8de9" />
          <rect x="55" y="75" width="12" height="12" fill="#0f172a" />
          <rect x="75" y="75" width="15" height="15" fill="#0c8de9" />
        </svg>

        <a 
          href={portfolioUrl} 
          target="_blank" 
          rel="noreferrer"
          className="absolute inset-0 bg-brand-900/90 text-white font-bold text-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl space-y-1"
        >
          <ExternalLink className="w-5 h-5 text-brand-300" />
          <span>Open Public Link</span>
        </a>
      </div>

      <div className="space-y-0.5">
        <p className="text-xs font-semibold text-slate-200">{studentName}'s Public Dossier</p>
        <p className="text-[10px] text-slate-500 font-mono truncate max-w-[200px] mx-auto">{portfolioUrl}</p>
      </div>
    </div>
  );
};
