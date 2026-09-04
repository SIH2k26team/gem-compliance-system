import React from 'react';

export default function StatCard({ title, value, unit, subtitle, icon, trend, color = 'blue' }) {
  const colorStyles = {
    blue: {
      border: 'border-t-4 border-t-blue-800 border-slate-200',
      badge: 'bg-blue-50 text-blue-800 border border-blue-100',
      value: 'text-blue-950',
    },
    emerald: {
      border: 'border-t-4 border-t-emerald-600 border-slate-200',
      badge: 'bg-emerald-50 text-emerald-800 border border-emerald-100',
      value: 'text-emerald-950',
    },
    rose: {
      border: 'border-t-4 border-t-rose-600 border-slate-200',
      badge: 'bg-rose-50 text-rose-800 border border-rose-100',
      value: 'text-rose-950',
    },
    amber: {
      border: 'border-t-4 border-t-amber-500 border-slate-200',
      badge: 'bg-amber-50 text-amber-900 border border-amber-100',
      value: 'text-amber-950',
    },
    white: {
      border: 'border-t-4 border-t-slate-700 border-slate-200',
      badge: 'bg-slate-100 text-slate-700 border border-slate-200',
      value: 'text-slate-900',
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`p-4 bg-white rounded-lg border ${style.border} shadow-xs hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">{title}</p>
        {icon && <div className={`p-2 rounded-lg ${style.badge}`}>{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={`text-2xl font-black tracking-tight ${style.value}`}>{value}</span>
        {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
      </div>
      {(subtitle || trend) && (
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{subtitle}</span>
          {trend && <span className="font-bold text-blue-700">{trend}</span>}
        </div>
      )}
    </div>
  );
}
