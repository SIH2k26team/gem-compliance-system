import React, { useState } from 'react';

// 1. Vertical / Grouped Bar Chart comparing Bidders for Tender Evaluation
export function BidderComparisonBarChart() {
  const [metricFilter, setMetricFilter] = useState('both'); // 'compliance', 'both'
  const [hoveredBidder, setHoveredBidder] = useState(null);

  const biddersData = [
    {
      id: 'BID-A01',
      name: 'Alpha Energy Infra',
      fullName: 'Alpha Energy Infrastructure Pvt Ltd',
      score: 92,
      riskScore: 12,
      mandatory: '5 / 5',
      decision: 'Recommended',
      riskColor: 'bg-blue-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'BID-D04',
      name: 'Oceanic Hydrocarbon',
      fullName: 'Oceanic Hydrocarbon Engineering Ltd',
      score: 88,
      riskScore: 18,
      mandatory: '5 / 5',
      decision: 'Recommended',
      riskColor: 'bg-blue-900',
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    {
      id: 'BID-B02',
      name: 'Petroleum Logistics',
      fullName: 'Petroleum Logistics Corp',
      score: 81,
      riskScore: 38,
      mandatory: '5 / 5',
      decision: 'Pending Review',
      riskColor: 'bg-blue-900',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'BID-C03',
      name: 'Apex Marine Services',
      fullName: 'Apex Marine & Pipeline Services',
      score: 64,
      riskScore: 68,
      mandatory: '4 / 5',
      decision: 'High Risk Flagged',
      riskColor: 'bg-blue-900',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-slate-900">Bidder Compliance Score Comparison</h3>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded text-[10px] font-bold">
              Tender: MOPNG-2026-001
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparative evaluation across 4 submitted bidder proposals
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-[11px] font-bold">
          <button
            onClick={() => setMetricFilter('both')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              metricFilter === 'both'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Compliance vs Risk
          </button>
          <button
            onClick={() => setMetricFilter('compliance')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              metricFilter === 'compliance'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Compliance Score
          </button>
        </div>
      </div>

      {/* Bar Chart Canvas */}
      <div className="relative pt-6 pb-2">
        {/* Y-Axis Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-300 font-mono">
          <div className="border-b border-slate-100 pb-0.5 flex justify-between">
            <span>100%</span>
            <span>Target Threshold</span>
          </div>
          <div className="border-b border-slate-100 pb-0.5">75%</div>
          <div className="border-b border-slate-100 pb-0.5">50%</div>
          <div className="border-b border-slate-100 pb-0.5">25%</div>
          <div className="border-b border-slate-200">0%</div>
        </div>

        {/* Vertical Bars Container */}
        <div className="relative z-10 grid grid-cols-4 gap-3 sm:gap-6 h-56 items-end px-4 pt-4">
          {biddersData.map((b) => (
            <div
              key={b.id}
              onMouseEnter={() => setHoveredBidder(b)}
              onMouseLeave={() => setHoveredBidder(null)}
              className="flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              {/* Tooltip Popup */}
              {hoveredBidder?.id === b.id && (
                <div className="absolute -top-12 bg-slate-900 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 z-30 font-sans pointer-events-none whitespace-nowrap animate-fadeIn">
                  <span className="font-extrabold">{b.fullName}</span>: Compliance{' '}
                  <span className="text-blue-400 font-bold">{b.score}%</span> | Risk{' '}
                  <span className="text-blue-400 font-bold">{b.riskScore}/100</span>
                </div>
              )}

              {/* Bar Group */}
              <div className="w-full max-w-[56px] flex items-end justify-center gap-1 h-full relative">
                {/* Main Compliance Bar */}
                <div
                  className="w-full rounded-t-lg bg-blue-900 transition-all duration-500 shadow-sm group-hover:brightness-110 relative flex flex-col justify-between items-center py-1"
                  style={{ height: `${b.score}%` }}
                >
                  <span className="text-[11px] font-black text-white drop-shadow-xs font-mono">
                    {b.score}%
                  </span>
                </div>

                {/* Risk Score Side Bar (When 'both' filter is selected) */}
                {metricFilter === 'both' && (
                  <div
                    className={`w-1/2 rounded-t-md ${b.riskColor} opacity-90 transition-all duration-500 relative flex justify-center py-0.5`}
                    style={{ height: `${b.riskScore}%` }}
                    title={`Risk Score: ${b.riskScore}`}
                  >
                    <span className="text-[9px] font-black text-slate-900 font-mono">
                      {b.riskScore}
                    </span>
                  </div>
                )}
              </div>

              {/* X-Axis Label */}
              <div className="mt-3 text-center w-full">
                <p className="text-[11px] font-bold text-slate-800 truncate" title={b.fullName}>
                  {b.name}
                </p>
                <div className="mt-0.5 flex items-center justify-center gap-1">
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${b.badge}`}>
                    {b.decision}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Footer Highlights */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-500 font-medium block">Highest Score</span>
          <span className="font-extrabold text-emerald-700 font-mono">92% (Alpha Energy)</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-500 font-medium block">Evaluation Average</span>
          <span className="font-extrabold text-blue-900 font-mono">82.75% Avg</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-500 font-medium block">Flagged Bids</span>
          <span className="font-extrabold text-rose-700 font-mono">1 High Risk (25%)</span>
        </div>
      </div>
    </div>
  );
}

// 2. Interactive SVG Donut / Pie Chart for Bidder Status & Risk Distribution
export function BidderStatusPieChart() {
  const [activeSlice, setActiveSlice] = useState(null);

  const slices = [
    {
      id: 'recommended',
      label: 'Recommended / Compliant',
      count: 2,
      percent: 50,
      color: '#10B981', // emerald-500
      bgClass: 'bg-emerald-500',
      textClass: 'text-emerald-700',
      dashArray: '113.1 226.19',
      dashOffset: '0',
      detail: 'Passed all mandatory clauses and financial thresholds',
    },
    {
      id: 'pending',
      label: 'Needs Officer Review',
      count: 1,
      percent: 25,
      color: '#F59E0B', // amber-500
      bgClass: 'bg-amber-500',
      textClass: 'text-amber-700',
      dashArray: '56.55 226.19',
      dashOffset: '-113.1',
      detail: 'Minor document abbreviation mismatch flagged',
    },
    {
      id: 'flagged',
      label: 'High Risk Flagged',
      count: 1,
      percent: 25,
      color: '#F43F5E', // rose-500
      bgClass: 'bg-rose-500',
      textClass: 'text-rose-700',
      dashArray: '56.55 226.19',
      dashOffset: '-169.65',
      detail: 'Missing OISD safety cert & GST address mismatch',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Bidder Decision Distribution</h3>
            <p className="text-xs text-slate-500">Evaluation breakdown across submitted proposals</p>
          </div>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded font-mono text-xs font-bold">
            4 Total Bids
          </span>
        </div>

        {/* Donut Chart Visual */}
        <div className="flex items-center justify-center my-2 relative">
          <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="14"
            />

            {/* Donut Slices */}
            {slices.map((s) => (
              <circle
                key={s.id}
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke={s.color}
                strokeWidth={activeSlice === s.id ? '17' : '14'}
                strokeDasharray={s.dashArray}
                strokeDashoffset={s.dashOffset}
                onMouseEnter={() => setActiveSlice(s.id)}
                onMouseLeave={() => setActiveSlice(null)}
                className="transition-all duration-300 cursor-pointer"
              />
            ))}
          </svg>

          {/* Center Callout Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 leading-none">4</span>
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mt-0.5">
              Evaluated Bids
            </span>
          </div>
        </div>

        {/* Legend Slices */}
        <div className="space-y-2 pt-2">
          {slices.map((s) => (
            <div
              key={s.id}
              onMouseEnter={() => setActiveSlice(s.id)}
              onMouseLeave={() => setActiveSlice(null)}
              className={`p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between ${
                activeSlice === s.id
                  ? 'bg-slate-100 border-slate-300 shadow-xs'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${s.bgClass} shrink-0`} />
                <span className="font-bold text-slate-800">{s.label}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className={`font-black ${s.textClass}`}>{s.count} Bids</span>
                <span className="text-slate-400">({s.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Deterministic Rule Engine:</span>
        <span className="font-bold text-emerald-700">100% Automated Audit</span>
      </div>
    </div>
  );
}

// Legacy fallback export
export function ComplianceOverviewChart() {
  return <BidderComparisonBarChart />;
}

export function RiskDistributionGraph() {
  return <BidderStatusPieChart />;
}
