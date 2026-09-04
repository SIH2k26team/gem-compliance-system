import React from 'react';
import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';

export default function ComplianceTable({ bidders = [] }) {
  if (!bidders || bidders.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-lg text-slate-500 text-xs font-medium">
        No bidder compliance records available for evaluation.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-xs bg-white">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
          <tr>
            <th scope="col" className="py-3 px-4">Bidder Organization</th>
            <th scope="col" className="py-3 px-4">Submission Date</th>
            <th scope="col" className="py-3 px-4 text-center">Compliance Score</th>
            <th scope="col" className="py-3 px-4 text-center">Mandatory Criteria</th>
            <th scope="col" className="py-3 px-4">Risk Signal</th>
            <th scope="col" className="py-3 px-4">Officer Action</th>
            <th scope="col" className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {bidders.map((b) => (
            <tr key={b.bidderId} className="hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4">
                <div className="font-bold text-blue-950 text-xs">{b.companyName}</div>
                <div className="text-[10px] font-mono text-slate-500">Vendor ID: {b.bidderId}</div>
              </td>
              <td className="py-3 px-4 font-mono text-slate-600 text-xs whitespace-nowrap">
                {b.submissionDate}
              </td>
              <td className="py-3 px-4 text-center whitespace-nowrap">
                <div className="inline-flex items-center gap-1">
                  <span className="text-sm font-black text-blue-900">{b.complianceScore}%</span>
                  <span className="text-[10px] text-slate-400">/ 100</span>
                </div>
                <div className="w-20 bg-slate-200 rounded-full h-1.5 mx-auto mt-1 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      b.complianceScore >= 85
                        ? 'bg-emerald-600'
                        : b.complianceScore >= 70
                        ? 'bg-amber-500'
                        : 'bg-rose-600'
                    }`}
                    style={{ width: `${b.complianceScore}%` }}
                  />
                </div>
              </td>
              <td className="py-3 px-4 text-center whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                    b.mandatoryPassed === b.mandatoryTotal
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {b.mandatoryPassed === b.mandatoryTotal ? '✅ All Passed' : `❌ ${b.mandatoryTotal - b.mandatoryPassed} Failed`}
                </span>
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <RiskBadge level={b.riskLevel} score={b.riskScore} />
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <StatusBadge status={b.officerDecision || b.status} size="sm" />
              </td>
              <td className="py-3 px-4 text-right whitespace-nowrap">
                <button className="px-3 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded font-bold text-xs transition-colors cursor-pointer shadow-2xs">
                  Inspect Evidence
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
