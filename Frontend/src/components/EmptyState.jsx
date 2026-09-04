import React from 'react';

export default function EmptyState({ title = 'No Data Found', message = 'There are no items to display right now.', actionText, onAction }) {
  return (
    <div className="p-10 text-center bg-white border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center">
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h4 className="text-sm font-extrabold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4 leading-relaxed">{message}</p>
      {actionText && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
