import React from 'react';

export const CircularProgress = ({ percentage = 78, size = 160, strokeWidth = 12, onClick }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle with gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center percentage label */}
      <div className="absolute text-center flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white tracking-tight leading-none group-hover:text-brand-300 transition-colors">
          {percentage}%
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-wider">
          Readiness
        </span>
        <span className="text-[9px] text-brand-400 underline mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          Click for Formula
        </span>
      </div>
    </div>
  );
};
