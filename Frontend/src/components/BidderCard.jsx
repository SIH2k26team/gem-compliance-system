import React from 'react';
import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';

export default function BidderCard({ bidder, onInspect }) {
  if (!bidder) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <StatusBadge status={bidder.officerDecision || bidder.status} size="sm" />
          <RiskBadge level={bidder.riskLevel} score={bidder.riskScore} />
        </div>

        <h4 className="text-sm font-extrabold text-slate-900 mt-1">{bidder.companyName}</h4>
        <p className="text-xs text-slate-500 font-mono mt-0.5">Bidder ID: {bidder.bidderId}</p>

        <div className="mt-3 p-2.5 bg-blue-50/60 rounded border border-blue-100 grid grid-cols-2 gap-2 text-center">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold block">
              Compliance
            </span>
            <span className="text-lg font-black text-blue-900">
              {bidder.complianceScore}%
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold block">
              Mandatory Criteria
            </span>
            <span className="text-xs font-bold text-slate-800">
              {bidder.mandatoryPassed} / {bidder.mandatoryTotal} Passed
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-1 text-xs text-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Cross-Doc Flags:</span>
            <span className={`font-bold ${bidder.contradictionCount > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
              {bidder.contradictionCount} Flagged
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">DigiLocker Record:</span>
            <span className={`font-bold ${bidder.digiLockerVerified ? 'text-emerald-700' : 'text-amber-800'}`}>
              {bidder.digiLockerVerified ? '✅ Verified' : '⚠️ Pending'}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onInspect && onInspect(bidder)}
        className="mt-4 w-full py-1.5 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
      >
        <span>Inspect Evidence & Scores</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
