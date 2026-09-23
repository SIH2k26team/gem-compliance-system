import React from 'react';

export default function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || '').toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-800 border-slate-300';

  if (
    normalized.includes('complied') ||
    normalized.includes('passed') ||
    normalized.includes('verified') ||
    normalized.includes('recommended') ||
    normalized.includes('active') ||
    normalized.includes('completed')
  ) {
    styles = ' text-emerald-800  font-semibold';
  } else if (
    normalized.includes('review') ||
    normalized.includes('pending') ||
    normalized.includes('evaluation') ||
    normalized.includes('open')
  ) {
    styles = ' text-indigo-900 border-indigo-300 font-semibold';
  } else if (
    normalized.includes('fail') ||
    normalized.includes('high risk') ||
    normalized.includes('rejected') ||
    normalized.includes('action required') ||
    normalized.includes('contradiction') ||
    normalized.includes('disqualified')
  ) {
    styles = 'text-rose-900  font-semibold';
  } else if (normalized.includes('processing') || normalized.includes('queued')) {
    styles = ' text-slate-800 border-slate-300 font-semibold';
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px]'
      : size === 'lg'
        ? 'px-3 py-1 text-xs font-bold'
        : 'px-2.5 py-0.5 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md ${sizeClasses} ${styles}`}
    >
      <span>{status}</span>
    </span>
  );
}

