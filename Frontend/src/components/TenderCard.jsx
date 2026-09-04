import React from 'react';
import StatusBadge from './StatusBadge';

export default function TenderCard({ tender, onSelect, actionLabel = 'View Tender' }) {
  if (!tender) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              {tender.id}
            </span>
            <span className="ml-2 text-xs text-slate-500 font-semibold">{tender.category}</span>
          </div>
          <StatusBadge status={tender.status} size="sm" />
        </div>

        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-1 hover:text-blue-700 cursor-pointer" onClick={() => onSelect && onSelect(tender)}>
          {tender.title}
        </h3>

        <p className="text-xs text-slate-600 mt-1 flex items-center gap-1 font-semibold">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {tender.department}
        </p>

        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {tender.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold uppercase">Estimated Budget</span>
            <span className="font-bold text-slate-900">{tender.budget}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold uppercase">Submission Deadline</span>
            <span className="font-bold text-slate-900">{tender.deadline}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-600">
          <span className="font-bold text-slate-900">{tender.totalBidsSubmitted}</span> Bids Submitted
        </div>

        <button
          onClick={() => onSelect && onSelect(tender)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors cursor-pointer shadow-2xs"
        >
          {actionLabel}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
