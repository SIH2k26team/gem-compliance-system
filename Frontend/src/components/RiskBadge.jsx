import React from 'react';

export default function RiskBadge({ level = 'Low', score, showScore = true }) {
  const normalized = (level || '').toLowerCase();

  let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-300';
  let label = 'Low Risk';

  if (normalized.includes('high') || (score && score >= 50)) {
    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-300 font-semibold';
    label = 'High Risk';
  } else if (normalized.includes('medium') || (score && score >= 21 && score < 50)) {
    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-300';
    label = 'Medium Risk';
  } else if (normalized.includes('low') || (score !== undefined && score < 21)) {
    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-300';
    label = 'Low Risk';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border ${badgeStyle}`}
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{label}</span>
      {showScore && score !== undefined && (
        <span className="ml-1 pl-1.5 border-l border-current font-mono opacity-80">
          {score}/100
        </span>
      )}
    </span>
  );
}
