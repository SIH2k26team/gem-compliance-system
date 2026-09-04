import React from 'react';

export default function LoadingState({ message = 'Loading procurement data...' }) {
  return (
    <div className="p-12 text-center bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-sm font-semibold text-slate-700">{message}</p>
      <p className="text-xs text-slate-400 mt-1">Executing automated compliance checks...</p>
    </div>
  );
}
