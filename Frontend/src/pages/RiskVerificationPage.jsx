import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import RiskBadge from '../components/RiskBadge';
import { MOCK_RISK_ALERTS } from '../data/mockData';

export default function RiskVerificationPage({ navigate, currentPath }) {
  const [alertsState, setAlertsState] = useState(MOCK_RISK_ALERTS);
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeComparatorAlert, setActiveComparatorAlert] = useState(null);
  const [activeComparatorFlag, setActiveComparatorFlag] = useState(null);

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeTargetAlert, setNoticeTargetAlert] = useState(null);
  const [noticeText, setNoticeText] = useState('');

  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredAlerts = alertsState.filter((alert) => {
    const matchesSearch =
      alert.bidderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.bidderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.tenderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'ALL' || alert.riskLevel.toUpperCase() === selectedSeverity;

    const matchesCategory =
      selectedCategory === 'ALL' ||
      alert.flags.some((f) =>
        f.type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        f.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  // Action handlers
  const handleResolveFlag = (alertId, flagIndex) => {
    setAlertsState((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId) {
          const updatedFlags = alert.flags.filter((_, idx) => idx !== flagIndex);
          const newScore = Math.max(0, alert.riskScore - 25);
          const newLevel = newScore > 50 ? 'High' : newScore > 25 ? 'Medium' : 'Low';
          return {
            ...alert,
            flags: updatedFlags,
            riskScore: newScore,
            riskLevel: newLevel,
          };
        }
        return alert;
      })
    );
    triggerToast('Risk flag verified & cleared. Vendor risk score recalculated.');
    setActiveComparatorAlert(null);
    setActiveComparatorFlag(null);
  };

  const handleSendNotice = () => {
    if (!noticeText.trim()) {
      alert('Please enter clarification notice details.');
      return;
    }
    triggerToast(`Official Clarification Notice dispatched to ${noticeTargetAlert.bidderName}. Deadline: 48 Hours.`);
    setShowNoticeModal(false);
    setNoticeTargetAlert(null);
    setNoticeText('');
  };

  return (
    <AppLayout role="officer" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-2xl border border-slate-700 text-xs flex items-center gap-3 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Page Banner Header */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-700" />
              Ministry of Petroleum &amp; Natural Gas
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-3">
              Risk Flags &amp; Multi-Source Verification Exceptions
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => triggerToast('Exported Risk & Contradiction Audit Report (PDF)')}
              className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Risk Report</span>
            </button>
          </div>
        </div>

        {/* Human-in-the-Loop Governance Notice */}
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-900 font-medium flex items-center gap-3 shadow-2xs">
          <span className="text-base shrink-0">🛡️</span>
          <div>
            <span className="font-extrabold">Human-in-the-Loop Governance Principle:</span> AI engines and multi-source government verification checks extract evidence and flag potential risks (e.g. GST return defaults, local content deficiencies, OEM authorization gaps, and debarment watchlist matches). <span className="font-bold underline">The Procurement Officer always makes the final qualification or disqualification decision.</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search vendor name, tender ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-rose-600 focus:bg-white"
              />
              <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="text-slate-500">Severity:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded px-2.5 py-1.5"
              >
                <option value="ALL">All Severities</option>
                <option value="HIGH">High Risk</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="LOW">Low Risk</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="text-slate-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded px-2.5 py-1.5"
              >
                <option value="ALL">All Risk Categories</option>
                <option value="Blacklisting">Blacklisting / Debarment Watchlist</option>
                <option value="GST">GST Return Filing Pending</option>
                <option value="OEM">OEM Authorization Issues</option>
                <option value="Local Content">Make In India / Local Content Below Threshold</option>
                <option value="Contradiction">Address / Name Contradictions</option>
                <option value="Missing">Missing Mandatory Documents</option>
              </select>
            </div>
          </div>
        </div>

        {/* Risk Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500 text-xs">
              No risk alerts match your current filter settings.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
              >
                {/* Alert Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Tender: {alert.tenderId}
                      </span>
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        Vendor ID: {alert.bidderId}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium">Flagged: {alert.timestamp}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 mt-1">{alert.bidderName}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <RiskBadge level={alert.riskLevel} score={alert.riskScore} />
                    <button
                      onClick={() => {
                        setNoticeTargetAlert(alert);
                        setShowNoticeModal(true);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold text-xs rounded transition-colors cursor-pointer"
                    >
                      📩 Issue Clarification Notice
                    </button>
                  </div>
                </div>

                {/* Flags Breakdown */}
                <div className="space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Detected Anomaly, Compliance &amp; Verification Flags ({alert.flags.length})
                  </span>

                  {alert.flags.map((flag, flagIdx) => (
                    <div
                      key={flagIdx}
                      className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-100/80 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                              flag.severity === 'Critical'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : flag.severity === 'High'
                                ? 'bg-rose-50 text-rose-900 border border-rose-200'
                                : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                            }`}
                          >
                            {flag.severity} ({flag.impactScore} Score)
                          </span>
                          <span className="font-extrabold text-slate-900 text-xs">{flag.title}</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">{flag.detail}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="font-mono text-slate-500">
                            <span className="font-sans font-bold text-slate-700">Source:</span> {flag.source || 'Govt Registry / Document'}
                          </div>
                          <div className="font-mono text-slate-500">
                            <span className="font-sans font-bold text-slate-700">Evidence:</span> {flag.documentRef}
                          </div>
                        </div>

                        {flag.action && (
                          <div className="mt-1.5 p-2 bg-blue-50/70 border border-blue-200 rounded text-[11px] text-blue-900 font-medium">
                            💡 <span className="font-bold">Recommended Action:</span> {flag.action}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setActiveComparatorAlert(alert);
                            setActiveComparatorFlag(flag);
                          }}
                          className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold cursor-pointer shadow-2xs flex items-center gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>Compare Side-by-Side Evidence</span>
                        </button>

                        <button
                          onClick={() => handleResolveFlag(alert.id, flagIdx)}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-bold cursor-pointer"
                          title="Mark flag verified"
                        >
                          ✓ Mark Verified
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* SIDE-BY-SIDE EVIDENCE COMPARATOR MODAL */}
        {activeComparatorAlert && activeComparatorFlag && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-300 shadow-2xl p-6 space-y-5">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 bg-rose-100 text-rose-900 text-[10px] font-extrabold rounded uppercase">
                    Cross-Document &amp; Government API Inspector
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-1">
                    {activeComparatorFlag.title}
                  </h2>
                  <p className="text-xs text-slate-600">
                    Vendor: <span className="font-bold text-slate-900">{activeComparatorAlert.bidderName}</span> ({activeComparatorAlert.bidderId})
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveComparatorAlert(null);
                    setActiveComparatorFlag(null);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Side by side comparison panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Document A Panel */}
                <div className="bg-slate-50 border-2 border-indigo-300 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                    <span className="font-extrabold text-indigo-900 uppercase text-[11px]">Submitted Bidder Evidence</span>
                    <span className="font-mono text-[10px] bg-indigo-100 text-indigo-900 font-bold px-2 py-0.5 rounded">
                      {activeComparatorFlag.documentRef || 'Submitted Doc'}
                    </span>
                  </div>
                  <div className="bg-white p-3 border border-slate-200 rounded font-mono text-[11px] space-y-1">
                    <div className="text-slate-400 font-sans text-[10px]">Extracted Evidence Details:</div>
                    <div className="font-bold text-slate-900 bg-indigo-50 p-2 rounded border border-indigo-200 text-indigo-950">
                      {activeComparatorFlag.detail}
                    </div>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Parsed via OCR &amp; PyMuPDF text extractor.
                  </p>
                </div>

                {/* Document B / Government Source Panel */}
                <div className="bg-slate-50 border-2 border-rose-300 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                    <span className="font-extrabold text-rose-900 uppercase text-[11px]">Government / Official Record</span>
                    <span className="font-mono text-[10px] bg-rose-100 text-rose-900 font-bold px-2 py-0.5 rounded">
                      {activeComparatorFlag.source || 'Govt Registry API'}
                    </span>
                  </div>
                  <div className="bg-white p-3 border border-slate-200 rounded font-mono text-[11px] space-y-1">
                    <div className="text-slate-400 font-sans text-[10px]">Official Registry Response:</div>
                    <div className="font-bold text-slate-900 bg-rose-50 p-2 rounded border border-rose-200 text-rose-900">
                      {activeComparatorFlag.action || 'Manual verification flag logged for officer review.'}
                    </div>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Verified against government registry API sandbox.
                  </p>
                </div>
              </div>

              {/* Contradiction Analysis Summary */}
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-xs space-y-2 text-rose-900">
                <span className="font-black text-sm block">⚠️ Risk Recommendation:</span>
                <p>
                  {activeComparatorFlag.action || 'Officer review required before final qualification.'}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    handleResolveFlag(activeComparatorAlert.id, 0);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs cursor-pointer"
                >
                  ✓ Accept Explanation &amp; Clear Risk Flag
                </button>

                <button
                  onClick={() => {
                    setActiveComparatorAlert(null);
                    setActiveComparatorFlag(null);
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded text-xs cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ISSUE CLARIFICATION NOTICE MODAL */}
        {showNoticeModal && noticeTargetAlert && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 text-xs">
              <h2 className="text-base font-black text-slate-900">
                Issue Clarification Notice: {noticeTargetAlert.bidderName}
              </h2>
              <p className="text-slate-600">
                Send an automated NIC procurement query notice requesting official explanation for the flagged risk anomaly.
              </p>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Vendor Email:</label>
                <input
                  type="text"
                  readOnly
                  value="compliance-officer@apexmarine.co.in"
                  className="w-full p-2 bg-slate-100 border border-slate-300 rounded font-mono font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clarification Notice Details:</label>
                <textarea
                  rows={4}
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  placeholder="Please clarify the discrepancy or missing OEM authorization / local content certificate within 48 hours..."
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowNoticeModal(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendNotice}
                  className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded cursor-pointer"
                >
                  Dispatch Notice (48h Timer)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
