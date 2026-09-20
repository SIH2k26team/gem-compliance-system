import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import StatusBadge from '../components/StatusBadge';
import RiskBadge from '../components/RiskBadge';
import {
  MOCK_TENDERS,
  MOCK_BIDDERS_SUMMARY,
  MOCK_REQUIREMENTS_SAMPLE,
  MOCK_BIDDER_SUBMISSIONS_LIST,
} from '../data/mockData';

export default function ComplianceEvaluationPage({ navigate, currentPath }) {
  const [selectedTenderId, setSelectedTenderId] = useState('MOPNG-2026-001');
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'requirement_view' | 'detailed_bidder'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideTarget, setOverrideTarget] = useState(null);
  const [overrideScore, setOverrideScore] = useState('');
  const [overrideJustification, setOverrideJustification] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Local state for bidder scores to allow interactive overrides
  const [biddersState, setBiddersState] = useState(MOCK_BIDDERS_SUMMARY);

  const selectedTender = MOCK_TENDERS.find((t) => t.id === selectedTenderId) || MOCK_TENDERS[0];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredBidders = biddersState.filter((bidder) => {
    const matchesSearch =
      bidder.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bidder.bidderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'RECOMMENDED' && bidder.officerDecision === 'Recommended') ||
      (statusFilter === 'REVIEW' && bidder.officerDecision === 'Pending Review') ||
      (statusFilter === 'RISK' && bidder.officerDecision === 'High Risk Flagged');
    return matchesSearch && matchesStatus;
  });

  const handleApplyOverride = () => {
    if (!overrideTarget || !overrideScore || !overrideJustification.trim()) {
      alert('Please fill out score and official justification.');
      return;
    }

    const newScore = Math.min(100, Math.max(0, parseInt(overrideScore, 10)));
    setBiddersState((prev) =>
      prev.map((b) =>
        b.bidderId === overrideTarget.bidderId
          ? {
              ...b,
              complianceScore: newScore,
              officerDecision: `Overridden (${newScore}/100)`,
            }
          : b
      )
    );

    triggerToast(
      `Compliance score for ${overrideTarget.companyName} updated to ${newScore}/100. Audit note logged.`
    );
    setShowOverrideModal(false);
    setOverrideTarget(null);
    setOverrideScore('');
    setOverrideJustification('');
  };

  const handleDecisionChange = (bidderId, newDecision) => {
    setBiddersState((prev) =>
      prev.map((b) => (b.bidderId === bidderId ? { ...b, officerDecision: newDecision } : b))
    );
    triggerToast(`Decision updated to "${newDecision}" for ${bidderId}.`);
  };

  return (
    <AppLayout role="officer" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-2xl border border-slate-700 text-xs flex items-center gap-3 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Page Header Banner */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              Ministry of Petroleum &amp; Natural Gas &nbsp;•&nbsp; Compliance Verification Engine
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Compliance Evaluation Matrix & Scoring
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={selectedTenderId}
              onChange={(e) => setSelectedTenderId(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded px-3 py-2 focus:ring-1 focus:ring-slate-700 focus:outline-none cursor-pointer"
            >
              {MOCK_TENDERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id}: {t.title.slice(0, 30)}...
                </option>
              ))}
            </select>

            <button
              onClick={() => triggerToast('Generated PDF Evaluation Report for ' + selectedTenderId)}
              className="px-5 py-2 bg-[#c05621] hover:bg-[#a04303] text-white font-bold rounded-full text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Export Matrix (PDF)</span>
              <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Selected Tender Summary Bar */}
        <div className="bg-slate-100 border border-slate-200 rounded-md p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 font-extrabold uppercase text-[10px]">Tender Title:</span>
            <p className="font-extrabold text-slate-900 truncate mt-0.5">{selectedTender.title}</p>
          </div>
          <div>
            <span className="text-slate-500 font-extrabold uppercase text-[10px]">Department / Budget:</span>
            <p className="font-bold text-slate-800 mt-0.5">{selectedTender.department} • <span className="text-slate-900 font-mono font-extrabold">{selectedTender.budget}</span></p>
          </div>
          <div>
            <span className="text-slate-500 font-extrabold uppercase text-[10px]">Extracted Clauses:</span>
            <p className="font-bold text-slate-800 mt-0.5">{selectedTender.requirementsCount} Clauses ({selectedTender.mandatoryCount} Mandatory Pass/Fail)</p>
          </div>
          <div>
            <span className="text-slate-500 font-extrabold uppercase text-[10px]">Evaluated Submissions:</span>
            <p className="font-bold text-emerald-800 mt-0.5">{selectedTender.evaluatedBids} Evaluated / {selectedTender.totalBidsSubmitted} Submitted Bids</p>
          </div>
        </div>

        {/* Filter Bar & View Toggle */}
        <div className="bg-white border border-slate-200 rounded-md p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* View Mode Buttons */}
            <div className="bg-slate-100 p-1 rounded flex gap-1 text-xs font-bold border border-slate-200">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === 'matrix' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bidder Matrix
              </button>
              <button
                onClick={() => setActiveTab('requirement_view')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTab === 'requirement_view' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Clause-by-Clause View
              </button>
            </div>


            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search vendor name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-600 focus:bg-white"
              />
              <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-slate-500 text-xs font-bold">Filter Decision:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded px-2.5 py-1.5"
            >
              <option value="ALL">All Decisions</option>
              <option value="RECOMMENDED">Recommended Only</option>
              <option value="REVIEW">Pending Review</option>
              <option value="RISK">High Risk Flagged</option>
            </select>
          </div>
        </div>

        {/* TAB 1: BIDDER MATRIX */}
        {activeTab === 'matrix' && (
          <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                    <th className="py-3 px-4">Bidder Details</th>
                    <th className="py-3 px-4">Mandatory Qualification</th>
                    <th className="py-3 px-4">System Compliance Score</th>
                    <th className="py-3 px-4">Risk Profile</th>
                    <th className="py-3 px-4">DigiLocker Status</th>
                    <th className="py-3 px-4">Officer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {filteredBidders.map((bidder) => {
                    const fullSub = MOCK_BIDDER_SUBMISSIONS_LIST.find((s) => s.bidderId === bidder.bidderId || s.submissionId.includes(bidder.bidderId));
                    return (
                      <tr key={bidder.bidderId} className="hover:bg-blue-50/40 transition-colors">
                        {/* Bidder Info */}
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-extrabold text-slate-900 text-sm block">
                              {bidder.companyName}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">
                                {bidder.bidderId}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-[11px] text-slate-500 font-medium">
                                Submitted: {bidder.submissionDate}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Mandatory Qualification */}
                        <td className="py-3.5 px-4">
                          <div>
                            {bidder.mandatoryPassed === bidder.mandatoryTotal ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
                                
                                {bidder.mandatoryPassed}/{bidder.mandatoryTotal} Clauses Passed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 font-bold border border-rose-200 text-[11px]">
                                
                                {bidder.mandatoryPassed}/{bidder.mandatoryTotal} Passed (OISD Missing)
                              </span>
                            )}
                          </div>
                        </td>

                        {/* System Compliance Score */}
                        <td className="py-3.5 px-4">
                          <div className="w-40">
                            <div className="flex items-center justify-between font-extrabold text-xs mb-1">
                              <span className="text-slate-900">{bidder.complianceScore} / {bidder.maxScore}</span>
                              <span className="text-emerald-700">
                                {bidder.complianceScore}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                              <div
                                className="h-full rounded-full bg-emerald-600"
                                style={{ width: `${bidder.complianceScore}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Risk Profile */}
                        <td className="py-3.5 px-4">
                          <RiskBadge level={bidder.riskLevel} score={bidder.riskScore} />
                        </td>

                        {/* DigiLocker */}
                        <td className="py-3.5 px-4">
                          {bidder.digiLockerVerified ? (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[10px] rounded inline-flex items-center gap-1">
                              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Govt Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px] rounded inline-flex items-center gap-1">
                              ⚠️ Manual Check
                            </span>
                          )}
                        </td>

                        {/* Officer Actions */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedBidder(bidder)}
                              className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-[11px] cursor-pointer shadow-2xs"
                            >
                              Inspect Breakdowns
                            </button>

                            <button
                              onClick={() => {
                                setOverrideTarget(bidder);
                                setOverrideScore(String(bidder.complianceScore));
                                setShowOverrideModal(true);
                              }}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[11px] border border-slate-300 cursor-pointer"
                              title="Override Score"
                            >
                              ✏️ Override
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CLAUSE-BY-CLAUSE VIEW */}
        {activeTab === 'requirement_view' && (
          <div className="space-y-4">
            {MOCK_REQUIREMENTS_SAMPLE.map((req) => (
              <div key={req.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {req.id}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          req.type === 'Mandatory'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {req.type} Requirement
                      </span>
                      <span className="text-xs text-slate-400 font-mono">PDF Page {req.sourcePage}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mt-1">{req.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{req.extractedClause}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold block">Scoring Weight:</span>
                    <span className="text-sm font-black text-slate-900 font-mono">
                      {req.weightMarks ? `${req.weightMarks} Marks` : 'Pass / Fail'}
                    </span>
                  </div>
                </div>

                {/* Evidence & Threshold Info */}
                <div className="bg-slate-50 p-2.5 rounded text-xs grid grid-cols-1 md:grid-cols-2 gap-2 border border-slate-200">
                  <div>
                    <span className="text-slate-500 font-bold">Mandatory Threshold:</span>{' '}
                    <span className="font-bold text-slate-800">{req.threshold}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold">Required Evidence:</span>{' '}
                    <span className="font-mono text-slate-700">{req.evidenceRequired.join(', ')}</span>
                  </div>
                </div>

                {/* Bidders Evaluation Grid for this requirement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {biddersState.map((bidder) => {
                    const isPassed = req.type === 'Mandatory' ? bidder.mandatoryPassed === bidder.mandatoryTotal : true;
                    return (
                      <div
                        key={bidder.bidderId}
                        className="p-3 bg-white border border-slate-200 rounded text-xs space-y-1.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-slate-900 truncate">{bidder.companyName.split(' ')[0]}</span>
                          <span className="font-mono text-[10px] text-slate-500">{bidder.bidderId}</span>
                        </div>

                        {req.type === 'Mandatory' ? (
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-slate-500 font-medium">Result:</span>
                            <span
                              className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                                bidder.bidderId === 'BID-C03'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {bidder.bidderId === 'BID-C03' ? 'FAILED (Doc Missing)' : 'PASSED'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-slate-500 font-medium">Assessed Score:</span>
                            <span className="font-black text-blue-900 font-mono">
                              {bidder.bidderId === 'BID-A01'
                                ? '18 / 20'
                                : bidder.bidderId === 'BID-B02'
                                ? '16 / 20'
                                : bidder.bidderId === 'BID-D04'
                                ? '19 / 20'
                                : '10 / 20'}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DETAILED BIDDER INSPECTION MODAL */}
        {selectedBidder && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-5">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-900 text-[10px] font-extrabold rounded">
                      {selectedBidder.bidderId}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Tender: {selectedTenderId}</span>
                  </div>
                  <h2 className="text-lg font-black text-slate-900 mt-1">{selectedBidder.companyName}</h2>
                </div>

                <button
                  onClick={() => setSelectedBidder(null)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Score summary cards */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-center">
                  <span className="text-slate-500 font-bold block">Compliance Score</span>
                  <span className="text-2xl font-black text-blue-900">{selectedBidder.complianceScore}%</span>
                </div>
                <div className="bg-rose-50 border border-rose-200 rounded p-3 text-center">
                  <span className="text-slate-500 font-bold block">Risk Score</span>
                  <span className="text-2xl font-black text-rose-800">{selectedBidder.riskScore}/100</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-center">
                  <span className="text-slate-500 font-bold block">Officer Decision</span>
                  <span className="text-sm font-black text-emerald-900 mt-1 block">
                    {selectedBidder.officerDecision}
                  </span>
                </div>
              </div>

              {/* Requirements & Evidence details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Evaluated Clause Evidence & Submissions
                </h3>
                {MOCK_REQUIREMENTS_SAMPLE.map((req) => (
                  <div key={req.id} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900">{req.id}: {req.title}</span>
                      <span className="font-mono text-blue-800">
                        {req.type === 'Mandatory' ? 'Pass' : '18/20 pts'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{req.scoringRule}</p>
                    <div className="pt-1 text-[10px] text-slate-500 font-mono">
                      📄 Evidence Source: {req.evidenceRequired[0]} (Verified via AI PyMuPDF Extractor)
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    handleDecisionChange(selectedBidder.bidderId, 'Approved & Recommended');
                    setSelectedBidder(null);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded cursor-pointer"
                >
                  Approve & Recommend Bid
                </button>
                <button
                  onClick={() => {
                    handleDecisionChange(selectedBidder.bidderId, 'High Risk Disqualified');
                    setSelectedBidder(null);
                  }}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded cursor-pointer"
                >
                  Disqualify Bidder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OVERRIDE SCORE MODAL */}
        {showOverrideModal && overrideTarget && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
              <h2 className="text-base font-black text-slate-900">
                Official Score Override: {overrideTarget.companyName}
              </h2>
              <p className="text-xs text-slate-600">
                You are manually overriding the AI-calculated compliance score for <span className="font-bold text-slate-900">{overrideTarget.bidderId}</span>. This action will be logged in the system audit trail with your NIC credentials.
              </p>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Adjusted Score (0 - 100):
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-sm font-mono font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Official Audit Justification / Remarks:
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Verified original physical affidavit document provided during committee evaluation..."
                  value={overrideJustification}
                  onChange={(e) => setOverrideJustification(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowOverrideModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyOverride}
                  className="px-5 py-1.5 bg-[#c05621] hover:bg-[#a04303] text-white text-xs font-bold rounded-full cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Commit Override & Save</span>
                  <div className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center shrink-0">
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
