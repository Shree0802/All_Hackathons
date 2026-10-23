import React from 'react';
import { 
  Zap, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  BarChart2, 
  HelpCircle,
  Code
} from 'lucide-react';

export default function DecisionTracePanel({ trace, toolStatus, toolName, bedrockInvoked, isFallback }) {
  if (!trace) {
    return (
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 text-center text-gray-500 text-sm">
        <Zap className="w-8 h-8 text-gray-600 mx-auto mb-2 animate-pulse" />
        <p className="font-medium text-gray-400">Decision Trace Idle</p>
        <p className="text-xs text-gray-500 mt-1">
          Submit a request to inspect the live Strands Decider 2B decision path.
        </p>
      </div>
    );
  }

  const isLive = trace.is_live_decider;
  const confidence = trace.confidence;
  const probabilities = trace.probabilities || {};

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gray-850 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-violet-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
            Decision Trace (#tool-selection)
          </h3>
        </div>
        
        {/* Source Badge */}
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
          isLive 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : trace.source === 'demo_heuristic_stub'
            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
        }`}>
          {isLive ? '● Strands Decider 2B (Live)' : `○ ${trace.source}`}
        </span>
      </div>

      <div className="p-4 space-y-4 text-xs">
        
        {/* Question & Selected Action */}
        <div>
          <span className="text-gray-400 font-medium block mb-1">Decision Prompt / Question:</span>
          <p className="text-gray-300 bg-gray-900 p-2.5 rounded-lg border border-gray-800/80 italic text-[11px]">
            "{trace.question}"
          </p>
        </div>

        {/* Selected Action Pill */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/80 p-3 rounded-lg border border-gray-800">
            <span className="text-gray-400 text-[10px] uppercase font-semibold block mb-1">
              Selected Action
            </span>
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="font-mono font-bold text-blue-300 text-sm">
                {trace.selected_action}
              </span>
            </div>
          </div>

          <div className="bg-gray-900/80 p-3 rounded-lg border border-gray-800">
            <span className="text-gray-400 text-[10px] uppercase font-semibold block mb-1">
              Calibrated Confidence
            </span>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-gray-200 text-sm">
                {confidence !== null && confidence !== undefined 
                  ? `${(confidence * 100).toFixed(1)}%` 
                  : 'N/A'}
              </span>
              {confidence !== null && confidence !== undefined && (
                <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${confidence >= 0.7 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min(100, Math.max(5, confidence * 100))}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Probabilities Distribution (if available) */}
        {Object.keys(probabilities).length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-gray-400 font-medium flex items-center space-x-1">
                <BarChart2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Candidate Probability Distribution:</span>
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                Formula: (N*p_max - 1)/(N - 1)
              </span>
            </div>
            <div className="space-y-1.5 bg-gray-900/50 p-2.5 rounded-lg border border-gray-800/60 max-h-36 overflow-y-auto">
              {Object.entries(probabilities)
                .sort((a, b) => b[1] - a[1])
                .map(([opt, prob]) => {
                  const isChosen = opt === trace.selected_action;
                  return (
                    <div key={opt} className="flex items-center text-[11px] font-mono">
                      <span className={`w-44 truncate ${isChosen ? 'text-blue-300 font-semibold' : 'text-gray-400'}`}>
                        {isChosen ? '▸ ' : '  '}{opt}
                      </span>
                      <div className="flex-1 mx-2 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${isChosen ? 'bg-blue-500' : 'bg-gray-600'}`}
                          style={{ width: `${Math.min(100, Math.round(prob * 100))}%` }}
                        />
                      </div>
                      <span className={`w-12 text-right ${isChosen ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>
                        {(prob * 100).toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Execution Metadata */}
        <div className="pt-2 border-t border-gray-800/80 flex flex-wrap items-center justify-between text-[11px] text-gray-400 gap-2">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span>Decision Latency: <strong className="text-gray-200">{trace.latency_ms} ms</strong></span>
          </div>

          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tool Dispatched: <strong className="text-gray-200">{toolName || trace.selected_action}</strong></span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className={`w-2 h-2 rounded-full ${bedrockInvoked ? 'bg-purple-400' : 'bg-gray-500'}`} />
            <span>Generative AI: <strong className="text-gray-200">{bedrockInvoked ? 'Amazon Bedrock' : 'Deterministic'}</strong></span>
          </div>
        </div>

        {/* Source Honesty Alert */}
        <div className="bg-blue-950/20 border border-blue-900/30 rounded p-2 text-[10px] text-blue-300/80 leading-relaxed">
          <strong>Decision Transparency:</strong> {trace.reasoning}
        </div>
      </div>
    </div>
  );
}
