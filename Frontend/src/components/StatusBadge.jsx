import React from 'react';

export default function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || '').toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-700 border-slate-300';
  let dotColor = 'bg-slate-400';

  if (
    normalized.includes('complied') ||
    normalized.includes('passed') ||
    normalized.includes('verified') ||
    normalized.includes('recommended') ||
    normalized.includes('active') ||
    normalized.includes('completed')
  ) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (
    normalized.includes('review') ||
    normalized.includes('pending') ||
    normalized.includes('evaluation') ||
    normalized.includes('open')
  ) {
    styles = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (
    normalized.includes('fail') ||
    normalized.includes('high risk') ||
    normalized.includes('rejected') ||
    normalized.includes('action required') ||
    normalized.includes('contradiction')
  ) {
    styles = 'bg-rose-50 text-rose-800 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (normalized.includes('processing') || normalized.includes('queued')) {
    styles = 'bg-blue-50 text-blue-800 border-blue-200';
    dotColor = 'bg-blue-500 animate-pulse';
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs'
      : size === 'lg'
      ? 'px-3 py-1 text-sm font-medium'
      : 'px-2.5 py-0.5 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${styles} transition-colors`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}
