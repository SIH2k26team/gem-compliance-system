import React from 'react';

export default function StatCard({ title, value, unit, subtitle, icon, trend, color = 'blue' }) {
  const colorStyles = {
    blue: {
      border: 'border-t-2 border-t-slate-800 border-x border-b border-slate-200',
      badge: 'bg-slate-100 text-slate-800 border border-slate-200',
      value: 'text-slate-900',
    },
    emerald: {
      border: 'border-t-2 border-t-emerald-700 border-x border-b border-slate-200',
      badge: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      value: 'text-slate-900',
    },
    rose: {
      border: 'border-t-2 border-t-rose-700 border-x border-b border-slate-200',
      badge: 'bg-rose-50 text-rose-800 border border-rose-200',
      value: 'text-slate-900',
    },
    amber: {
      border: 'border-t-2 border-t-indigo-600 border-x border-b border-slate-200',
      badge: 'bg-indigo-50 text-indigo-900 border border-indigo-200',
      value: 'text-slate-900',
    },
    white: {
      border: 'border-t-2 border-t-slate-600 border-x border-b border-slate-200',
      badge: 'bg-slate-100 text-slate-700 border border-slate-200',
      value: 'text-slate-900',
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`p-4 bg-white rounded-md  shadow-2xs`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">{title}</p>
        {icon && <div className={`p-1.5 rounded ${style.badge}`}>{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={`text-2xl font-black tracking-tight font-mono ${style.value}`}>{value}</span>
        {unit && <span className="text-xs font-bold text-slate-500">{unit}</span>}
      </div>
      {(subtitle || trend) && (
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>{subtitle}</span>
          {trend && <span className="font-bold text-slate-800">{trend}</span>}
        </div>
      )}
    </div>
  );
}

