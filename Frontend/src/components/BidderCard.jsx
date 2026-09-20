import React from 'react';
import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';

export default function BidderCard({ bidder, onInspect }) {
  if (!bidder) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <h4 className="text-sm font-extrabold text-slate-900 mt-1">{bidder.companyName}</h4>
        <p className="text-xs text-slate-500 font-mono mt-0.5">Bidder ID: {bidder.bidderId}</p>

        <div className="mt-3 p-2.5 bg-slate-50 rounded border border-slate-200 grid grid-cols-2 gap-2 text-center">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block">
              Compliance
            </span>
            <span className="text-lg font-black text-slate-900 font-mono">
              {bidder.complianceScore}%
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block">
              Mandatory Criteria
            </span>
            <span className="text-xs font-bold text-slate-800 font-mono">
              {bidder.mandatoryPassed} / {bidder.mandatoryTotal} Passed
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Cross-Doc Flags:</span>
            <span className={`font-bold font-mono ${bidder.contradictionCount > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
              {bidder.contradictionCount} Flagged
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">DigiLocker Record:</span>
            <span className={`font-bold ${bidder.digiLockerVerified ? 'text-emerald-800' : 'text-amber-800'}`}>
              {bidder.digiLockerVerified ? '✅ Verified' : '⚠️ Pending'}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onInspect && onInspect(bidder)}
        className="mt-4 w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
      >
        <span>Inspect Evidence & Scores</span>
        <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center shrink-0">
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
}

