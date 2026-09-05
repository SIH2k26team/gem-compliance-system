import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import StatusBadge from '../components/StatusBadge';
import {
  MOCK_BIDDER_SUBMISSIONS_LIST,
  CURRENT_USER_BIDDER,
} from '../data/mockData';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function ScoreRing({ score, size = 72 }) {
  if (score === null) {
    return (
      <div
        className="flex items-center justify-center rounded-full border-4 border-slate-200 bg-slate-50 text-slate-400 font-bold"
        style={{ width: size, height: size, fontSize: 11 }}
      >
        N/A
      </div>
    );
  }
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? '#16a34a' : score >= 75 ? '#2563eb' : score >= 60 ? '#d97706' : '#dc2626';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <span className="absolute font-black text-slate-900" style={{ fontSize: size * 0.22 }}>
        {score}%
      </span>
    </div>
  );
}

function DocStatusChip({ status }) {
  const map = {
    Verified: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
    Missing: 'bg-rose-50 text-rose-800 border-rose-200',
  };
  const icons = {
    Verified: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
    ),
    Pending: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Missing: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border font-bold ${map[status] || map.Pending}`}
      style={{ fontSize: '10px' }}
    >
      {icons[status]}
      {status}
    </span>
  );
}

function ReqResultChip({ result }) {
  const map = {
    Passed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Scored: 'bg-blue-50 text-blue-800 border-blue-200',
    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
    Missing: 'bg-rose-50 text-rose-800 border-rose-200',
    Failed: 'bg-rose-50 text-rose-800 border-rose-200',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border font-bold ${map[result] || map.Pending}`}
      style={{ fontSize: '10px' }}
    >
      {result}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Submission Detail Panel
// ---------------------------------------------------------------------------
function SubmissionDetailPanel({ sub, onClose, navigate, tendersPath = '/bidder/tenders', tendersLabel = 'Browse Open Tenders' }) {
  const [tab, setTab] = useState('overview');

  const scoredReqs = (sub.requirementResults || []).filter((r) => r.type === 'Evaluation' && r.score !== null);
  const earnedMarks = scoredReqs.reduce((s, r) => s + (r.score || 0), 0);
  const totalMarks = scoredReqs.reduce((s, r) => s + (r.maxScore || 0), 0);

  const mandatoryReqs = (sub.requirementResults || []).filter((r) => r.type === 'Mandatory');
  const allMandatoryPassed = mandatoryReqs.every((r) => r.result === 'Passed');

  const isDraft = sub.status.includes('Draft') || sub.status.includes('Pending');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200" style={{ fontSize: '10px' }}>
                {sub.submissionId}
              </span>
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" style={{ fontSize: '10px' }}>
                {sub.tenderId}
              </span>
              <StatusBadge status={sub.status} size="sm" />
            </div>
            <h2 className="text-base font-black text-slate-900 leading-tight">{sub.tenderTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{sub.department}</p>
          </div>
          <button
            id="close-detail-panel"
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 pt-3 bg-white border-b border-slate-100 shrink-0">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'documents', label: `Documents (${(sub.documents || []).length})` },
          { key: 'requirements', label: `Requirements (${(sub.requirementResults || []).length})` },
          { key: 'timeline', label: 'Timeline' },
        ].map((t) => (
          <button
            key={t.key}
            id={`detail-tab-${t.key}`}
            onClick={() => setTab(t.key)}
            className={`px-3 py-2 text-xs font-bold rounded-t border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              tab === t.key
                ? 'border-blue-700 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">
        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="space-y-4">
            {/* Score + Meta */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row items-center gap-5">
              <ScoreRing score={sub.complianceScore} size={88} />
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>Compliance Score</p>
                  <p className="text-sm font-black text-slate-900">
                    {sub.complianceScore !== null ? `${sub.complianceScore} / 100` : 'Pending processing'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>Risk Level</p>
                    <p className={`text-xs font-bold mt-0.5 ${
                      sub.riskLevel === 'Low' ? 'text-emerald-700' :
                      sub.riskLevel === 'High' ? 'text-rose-700' : 'text-amber-700'
                    }`}>
                      {sub.riskLevel === 'Low' ? '✅' : sub.riskLevel === 'Processing' ? '🔄' : '⚠️'} {sub.riskLevel}
                    </p>
                  </div>
                  <div>
                    <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>DigiLocker Status</p>
                    <p className={`text-xs font-bold mt-0.5 ${
                      sub.digiLockerStatus === 'Verified' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {sub.digiLockerStatus === 'Verified' ? '🏛️ Govt Verified' : '⚠️ ' + sub.digiLockerStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Submission Date', value: sub.submissionDate },
                { label: 'Tender Deadline', value: sub.deadline },
                { label: 'Budget', value: sub.budget },
                { label: 'Officer Assigned', value: sub.officerAssigned },
                { label: 'Documents Uploaded', value: `${sub.documentsCount} total` },
                { label: 'Documents Verified', value: `${sub.verifiedDocs} / ${sub.documentsCount}` },
              ].map((m) => (
                <div key={m.label} className="bg-white border border-slate-200 rounded-lg p-3">
                  <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>{m.label}</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Mandatory pass/fail summary */}
            <div className={`rounded-lg border p-4 ${allMandatoryPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{allMandatoryPassed ? '✅' : '❌'}</span>
                <div>
                  <p className={`text-xs font-extrabold ${allMandatoryPassed ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {allMandatoryPassed ? 'All Mandatory Requirements Satisfied' : 'Mandatory Requirements Incomplete'}
                  </p>
                  <p className={`mt-0.5 ${allMandatoryPassed ? 'text-emerald-700' : 'text-rose-700'}`} style={{ fontSize: '11px' }}>
                    {mandatoryReqs.filter((r) => r.result === 'Passed').length} of {mandatoryReqs.length} mandatory clauses passed
                  </p>
                </div>
              </div>
            </div>

            {/* Marks earned */}
            {totalMarks > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-extrabold uppercase text-slate-500">Scored Marks</p>
                  <span className="text-sm font-black text-blue-900">{earnedMarks} / {totalMarks}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-700"
                    style={{ width: `${(earnedMarks / totalMarks) * 100}%` }}
                  />
                </div>
                <p className="text-slate-500 mt-1" style={{ fontSize: '10px' }}>
                  {Math.round((earnedMarks / totalMarks) * 100)}% of available scoring marks
                </p>
              </div>
            )}

            {/* Draft action */}
            {isDraft && (
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                <p className="text-xs font-extrabold text-amber-800 mb-1">⚠️ Action Required</p>
                <p className="text-xs text-amber-700 mb-3">
                  Your submission is incomplete. Upload the missing documents before the deadline.
                </p>
                <button
                  id="complete-submission-btn"
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded text-xs font-bold cursor-pointer transition-colors"
                >
                  Complete Submission
                </button>
              </div>
            )}
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {tab === 'documents' && (
          <div className="space-y-2">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    {['Document', 'Type', 'Size', 'Status', 'Action'].map((h) => (
                      <th
                        key={h}
                        className="py-2.5 px-3 font-extrabold uppercase text-slate-600"
                        style={{ fontSize: '10px' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(sub.documents || []).map((doc, i) => (
                    <tr key={i} className={`transition-colors ${doc.status === 'Missing' ? 'bg-rose-50/50' : 'hover:bg-slate-50'}`}>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <svg className={`w-4 h-4 shrink-0 ${doc.status === 'Missing' ? 'text-rose-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className={`text-xs font-semibold ${doc.status === 'Missing' ? 'text-rose-600 italic' : 'text-slate-900'}`}>
                            {doc.name}
                            {doc.status === 'Missing' && ' (not uploaded)'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded border font-bold ${
                            doc.type === 'Mandatory'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                          style={{ fontSize: '9px' }}
                        >
                          {doc.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-500 font-mono whitespace-nowrap">
                        {doc.size ?? '—'}
                      </td>
                      <td className="py-3 px-3">
                        <DocStatusChip status={doc.status} />
                      </td>
                      <td className="py-3 px-3">
                        {doc.status === 'Missing' ? (
                          <button
                            id={`upload-doc-${i}`}
                            className="px-2.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded font-bold cursor-pointer transition-colors"
                            style={{ fontSize: '10px' }}
                          >
                            Upload
                          </button>
                        ) : (
                          <button
                            id={`view-doc-${i}`}
                            className="px-2.5 py-1 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded font-bold cursor-pointer transition-colors flex items-center gap-1"
                            style={{ fontSize: '10px' }}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upload missing docs CTA */}
            {(sub.documents || []).some((d) => d.status === 'Missing') && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 flex items-center justify-between gap-3">
                <p className="text-xs text-rose-800 font-semibold">
                  <span className="font-extrabold">
                    {(sub.documents || []).filter((d) => d.status === 'Missing').length} document(s) missing.
                  </span>{' '}
                  Upload them before the tender deadline.
                </p>
                <button
                  id="bulk-upload-btn"
                  className="shrink-0 px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded text-xs font-bold cursor-pointer transition-colors"
                >
                  Bulk Upload
                </button>
              </div>
            )}
          </div>
        )}

        {/* REQUIREMENTS TAB */}
        {tab === 'requirements' && (
          <div className="space-y-3">
            {(sub.requirementResults || []).map((req) => {
              const barPct = req.maxScore ? (req.score / req.maxScore) * 100 : 0;
              return (
                <div
                  key={req.id}
                  className={`bg-white border rounded-lg p-4 ${
                    req.result === 'Missing' || req.result === 'Failed'
                      ? 'border-rose-200'
                      : req.result === 'Pending'
                      ? 'border-amber-200'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-mono text-slate-400" style={{ fontSize: '10px' }}>{req.id}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded border font-bold ${
                            req.type === 'Mandatory'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                          style={{ fontSize: '9px' }}
                        >
                          {req.type}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{req.title}</p>
                      <p className="text-slate-500 mt-1" style={{ fontSize: '11px' }}>{req.note}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <ReqResultChip result={req.result} />
                      {req.type === 'Evaluation' && req.maxScore !== null && (
                        <p className="font-black text-slate-900 mt-1" style={{ fontSize: '13px' }}>
                          {req.score} <span className="font-semibold text-slate-400" style={{ fontSize: '10px' }}>/ {req.maxScore}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  {req.type === 'Evaluation' && req.maxScore !== null && (
                    <div className="mt-3">
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-700 ${
                            barPct >= 80 ? 'bg-emerald-500' : barPct >= 50 ? 'bg-blue-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TIMELINE TAB */}
        {tab === 'timeline' && (
          <div className="space-y-1">
            {(sub.timeline || []).map((event, i) => {
              const isLast = i === (sub.timeline || []).length - 1;
              const iconMap = {
                'Bid Submitted': { bg: 'bg-blue-700', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                'AI Parsing Started': { bg: 'bg-purple-600', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2' },
                'AI Parsing Complete': { bg: 'bg-purple-600', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2' },
                'Partial Parsing': { bg: 'bg-purple-400', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2' },
                'DigiLocker Verification': { bg: 'bg-emerald-600', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
                'DigiLocker Action Required': { bg: 'bg-amber-500', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                'Compliance Score Calculated': { bg: 'bg-blue-600', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                'Technical Compliance Passed': { bg: 'bg-emerald-600', icon: 'M5 13l4 4L19 7' },
                'Evaluation Completed': { bg: 'bg-emerald-700', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              };
              const style = iconMap[event.event] || { bg: 'bg-slate-500', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' };

              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={style.icon} />
                      </svg>
                    </div>
                    {!isLast && <div className="w-0.5 flex-1 bg-slate-200 my-1" />}
                  </div>
                  <div className={`bg-white border border-slate-200 rounded-lg p-3 flex-1 ${!isLast ? 'mb-0' : ''}`}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-extrabold text-slate-900">{event.event}</span>
                      <span className="font-mono text-slate-400" style={{ fontSize: '10px' }}>{event.time}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5" style={{ fontSize: '11px' }}>{event.detail}</p>
                    <p className="text-slate-400 mt-1 font-semibold" style={{ fontSize: '10px' }}>Actor: {event.actor}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-200 bg-white shrink-0 flex flex-wrap items-center justify-between gap-2">
        {isDraft ? (
          <button
            id="complete-sub-footer-btn"
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Missing Documents
          </button>
        ) : (
          <button
            id="download-report-btn"
            className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
        )}
        <button
          id="view-open-tenders-btn"
          onClick={() => navigate(tendersPath)}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {tendersLabel}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function BidderSubmissionsPage({ navigate, currentPath, role = 'bidder' }) {
  const [selectedSub, setSelectedSub] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const isOfficer = role === 'officer';
  const tendersPath = isOfficer ? '/officer/tenders' : '/bidder/tenders';
  const tendersLabel = isOfficer ? 'View Tenders' : 'Browse Open Tenders';

  const statuses = ['All', ...Array.from(new Set(MOCK_BIDDER_SUBMISSIONS_LIST.map((s) => s.status)))];

  const filtered = MOCK_BIDDER_SUBMISSIONS_LIST.filter(
    (s) => statusFilter === 'All' || s.status === statusFilter,
  );

  // Aggregate KPIs
  const submitted = MOCK_BIDDER_SUBMISSIONS_LIST.filter((s) => !s.status.includes('Draft'));
  const avgScore = submitted.length
    ? Math.round(
        submitted
          .filter((s) => s.complianceScore !== null)
          .reduce((a, s) => a + s.complianceScore, 0) /
          submitted.filter((s) => s.complianceScore !== null).length,
      )
    : 0;
  const pendingAction = MOCK_BIDDER_SUBMISSIONS_LIST.filter((s) => s.status.includes('Draft') || s.digiLockerStatus !== 'Verified').length;

  return (
    <AppLayout role={role} currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Page Header */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 border-t-4 border-t-emerald-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              {isOfficer ? 'Procurement Officer Portal' : `Vendor Portal \u00a0\u2022\u00a0 ${CURRENT_USER_BIDDER.company}`}
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              {isOfficer ? 'Bidder Submissions' : 'My Submitted Bids'}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              {isOfficer
                ? 'Review compliance scores, document status & bidder submissions'
                : 'Compliance scores \u00a0\u2022\u00a0 Document status \u00a0\u2022\u00a0 Officer evaluation tracking'}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="browse-tenders-header-btn"
              onClick={() => navigate(tendersPath)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {tendersLabel}
            </button>
          </div>
        </div>

        {/* KPI stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Submissions', value: MOCK_BIDDER_SUBMISSIONS_LIST.length, accent: 'border-t-blue-700', sub: 'All statuses' },
            { label: 'Avg Compliance Score', value: `${avgScore}%`, accent: 'border-t-emerald-600', sub: 'Submitted bids' },
            { label: 'Pending Action', value: pendingAction, accent: 'border-t-amber-500', sub: 'Needs your input' },
            {
              label: 'DigiLocker Verified',
              value: MOCK_BIDDER_SUBMISSIONS_LIST.filter((s) => s.digiLockerStatus === 'Verified').length,
              accent: 'border-t-slate-700',
              sub: 'Govt verified docs',
            },
          ].map((k) => (
            <div key={k.label} className={`bg-white border border-slate-200 border-t-4 ${k.accent} rounded-lg p-4 shadow-xs`}>
              <p className="font-extrabold uppercase tracking-wider text-slate-500" style={{ fontSize: '10px' }}>{k.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{k.value}</p>
              <p className="text-slate-400 mt-0.5" style={{ fontSize: '11px' }}>{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className={`grid gap-5 ${selectedSub ? 'lg:grid-cols-5' : 'grid-cols-1'}`}>
          {/* LEFT — Submission list */}
          <div className={`space-y-4 ${selectedSub ? 'lg:col-span-2' : ''}`}>
            {/* Status filter */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-wrap gap-1.5">
              {statuses.map((s) => (
                <button
                  key={s}
                  id={`status-filter-${s.replace(/[\s/]/g, '-').toLowerCase()}`}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded font-bold transition-colors cursor-pointer ${
                    statusFilter === s
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={{ fontSize: '10px' }}
                >
                  {s}
                </button>
              ))}
              <span className="ml-auto text-xs text-slate-400 font-semibold self-center">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {filtered.map((sub) => {
                const isSelected = selectedSub?.submissionId === sub.submissionId;
                const isDraft = sub.status.includes('Draft') || sub.status.includes('Pending');

                return (
                  <div
                    key={sub.submissionId}
                    id={`submission-card-${sub.submissionId}`}
                    onClick={() => setSelectedSub(isSelected ? null : sub)}
                    className={`bg-white border rounded-lg p-4 shadow-xs cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                        : isDraft
                        ? 'border-amber-300 hover:border-amber-400'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {/* Card top row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200" style={{ fontSize: '10px' }}>
                            {sub.submissionId}
                          </span>
                          <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" style={{ fontSize: '10px' }}>
                            {sub.tenderId}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">{sub.tenderTitle}</h3>
                        <p className="text-slate-500 mt-0.5 font-semibold" style={{ fontSize: '11px' }}>{sub.department}</p>
                      </div>
                      {/* Score ring — compact */}
                      <ScoreRing score={sub.complianceScore} size={52} />
                    </div>

                    {/* Status + digilocker row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <StatusBadge status={sub.status} size="sm" />
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border font-bold ${
                          sub.digiLockerStatus === 'Verified'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                        style={{ fontSize: '10px' }}
                      >
                        {sub.digiLockerStatus === 'Verified' ? '🏛️ DigiLocker Verified' : '⚠️ ' + sub.digiLockerStatus}
                      </span>
                    </div>

                    {/* Meta strip */}
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="font-extrabold uppercase text-slate-400" style={{ fontSize: '9px' }}>Submitted</p>
                        <p className="font-bold text-slate-700 mt-0.5 truncate" style={{ fontSize: '10px' }}>{sub.submissionDate.split(' ')[0]}</p>
                      </div>
                      <div>
                        <p className="font-extrabold uppercase text-slate-400" style={{ fontSize: '9px' }}>Docs</p>
                        <p className="font-bold text-slate-700 mt-0.5" style={{ fontSize: '11px' }}>
                          {sub.verifiedDocs}/{sub.documentsCount}
                          <span className="text-slate-400 ml-0.5" style={{ fontSize: '9px' }}>verified</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-extrabold uppercase text-slate-400" style={{ fontSize: '9px' }}>Risk</p>
                        <p className={`font-bold mt-0.5 ${sub.riskLevel === 'Low' ? 'text-emerald-700' : sub.riskLevel === 'High' ? 'text-rose-700' : 'text-amber-700'}`} style={{ fontSize: '10px' }}>
                          {sub.riskLevel}
                        </p>
                      </div>
                    </div>

                    {/* Action row */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      {isDraft && (
                        <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Action required
                        </span>
                      )}
                      <button
                        id={`view-detail-btn-${sub.submissionId}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSub(isSelected ? null : sub);
                        }}
                        className={`ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-blue-700 hover:bg-blue-800 text-white'
                        }`}
                        style={{ fontSize: '11px' }}
                      >
                        {isSelected ? 'Close' : 'View Details'}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSelected ? 'M6 18L18 6M6 6l12 12' : 'M9 5l7 7-7 7'} />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300 text-slate-400">
                  <svg className="w-8 h-8 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-bold">No submissions match this filter</p>
                  <button onClick={() => setStatusFilter('All')} className="mt-2 text-blue-700 text-xs font-bold underline cursor-pointer">
                    Show all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Detail panel */}
          {selectedSub && (
            <div
              className="lg:col-span-3 bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden flex flex-col"
              style={{ position: 'sticky', top: '1.5rem', maxHeight: 'calc(100vh - 8rem)' }}
            >
              <SubmissionDetailPanel
                sub={selectedSub}
                onClose={() => setSelectedSub(null)}
                navigate={navigate}
                tendersPath={tendersPath}
                tendersLabel={tendersLabel}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
