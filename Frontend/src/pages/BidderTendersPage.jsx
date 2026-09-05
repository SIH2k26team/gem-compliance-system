import React, { useState, useMemo } from 'react';
import AppLayout from '../layouts/AppLayout';
import StatusBadge from '../components/StatusBadge';
import { MOCK_TENDERS, MOCK_REQUIREMENTS_SAMPLE } from '../data/mockData';

// Same requirements map (reuse from TendersPage concept)
const ALL_REQUIREMENTS = {
  'MOPNG-2026-001': MOCK_REQUIREMENTS_SAMPLE,
  'ONGC-2026-042': [
    {
      id: 'REQ-101', title: 'Offshore Instrumentation Certification', type: 'Mandatory',
      threshold: 'ATEX / IECEx Zone-1 Certified Instruments', period: 'Valid on submission date',
      weightMarks: null, evidenceRequired: ['ATEX Certificate', 'IECEx Declaration of Conformity'],
      sourcePage: 6, scoringRule: 'Pass / Fail Only',
      extractedClause: 'All pressure sensors and shut-off valves supplied must carry valid ATEX or IECEx certification for Zone-1 hazardous area use.',
    },
    {
      id: 'REQ-102', title: 'Offshore Project Experience', type: 'Evaluation',
      threshold: 'Minimum 2 offshore calibration projects of >= Rs. 10 Cr each', period: 'Last 7 Years',
      weightMarks: 30, evidenceRequired: ['Project Completion Certificates', 'Client Letters'],
      sourcePage: 10, scoringRule: '2 projects = 20 marks; 3+ = 30 marks',
      extractedClause: 'Bidder must demonstrate at least two successfully completed offshore sensor calibration contracts valued at >= Rs. 10 Crore each.',
    },
    {
      id: 'REQ-103', title: 'Net Worth & Financial Soundness', type: 'Evaluation',
      threshold: 'Rs. 15.0 Cr Positive Net Worth', period: 'Last Audited Financial Year',
      weightMarks: 15, evidenceRequired: ['CA Certified Balance Sheet'],
      sourcePage: 9, scoringRule: 'Rs. 15 Cr = 10 marks; Rs. 20 Cr+ = 15 marks',
      extractedClause: 'The bidder must demonstrate a positive net worth of at least Rs. 15 Crore as per the last audited balance sheet.',
    },
  ],
  'GAIL-2026-108': [
    {
      id: 'REQ-201', title: 'Cryogenic Engineering Competency', type: 'Mandatory',
      threshold: 'Qualified Cryogenic Engineer (IIChE/ASHRAE)', period: 'Available throughout contract',
      weightMarks: null, evidenceRequired: ['Engineer Qualification Certificate', 'Appointment Letter'],
      sourcePage: 7, scoringRule: 'Pass / Fail Only',
      extractedClause: 'The bidding company must employ at least one certified cryogenic engineer who will be actively deployed for the duration of the contract.',
    },
    {
      id: 'REQ-202', title: 'LNG Tank Refurbishment Experience', type: 'Evaluation',
      threshold: '1 completed LNG tank project >= Rs. 30 Cr', period: 'Last 10 Years',
      weightMarks: 35, evidenceRequired: ['Completion Certificate', 'Client Reference Letter'],
      sourcePage: 13, scoringRule: '1 project = 25 marks; 2+ = 35 marks',
      extractedClause: 'Bidder must have successfully completed at least one cryogenic LNG storage tank refurbishment project with contract value >= Rs. 30 Crore.',
    },
    {
      id: 'REQ-203', title: 'HSE Management System Certification', type: 'Mandatory',
      threshold: 'ISO 45001:2018 & ISO 14001:2015 Dual Certification', period: 'Current & Valid',
      weightMarks: null, evidenceRequired: ['ISO 45001 Certificate', 'ISO 14001 Certificate'],
      sourcePage: 5, scoringRule: 'Pass / Fail Only',
      extractedClause: 'Mandatory: The company must hold current, valid dual certification of ISO 45001:2018 and ISO 14001:2015.',
    },
    {
      id: 'REQ-204', title: 'Average Annual Turnover', type: 'Evaluation',
      threshold: 'Rs. 80.0 Cr average over last 3 years', period: 'FY 2022-23 to 2024-25',
      weightMarks: 20, evidenceRequired: ['CA Certified Financial Statements'],
      sourcePage: 11, scoringRule: 'Rs. 80 Cr = 15 marks; +1 per Rs. 10 Cr (Max 20)',
      extractedClause: 'The bidder must demonstrate an average annual financial turnover of Rs. 80 Crore or more over the last three financial years.',
    },
  ],
  'HPCL-2026-019': [
    {
      id: 'REQ-301', title: 'IoT Platform & Cloud Experience', type: 'Evaluation',
      threshold: 'At least 1 large-scale IoT deployment (10,000+ devices)', period: 'Last 5 Years',
      weightMarks: 30, evidenceRequired: ['Work Order Copy', 'Completion Certificate'],
      sourcePage: 8, scoringRule: '10k devices = 20 marks; 25k+ = 30 marks',
      extractedClause: 'Bidder must have deployed a large-scale IoT telemetry solution with minimum 10,000 active connected devices in an industrial environment.',
    },
    {
      id: 'REQ-302', title: 'GSTIN & Company Registration', type: 'Mandatory',
      threshold: 'Active GSTIN & valid CIN', period: 'Current',
      weightMarks: null, evidenceRequired: ['GSTIN Certificate', 'MCA21 Incorporation Certificate'],
      sourcePage: 3, scoringRule: 'Pass / Fail + DigiLocker Cross Check',
      extractedClause: 'The bidder must be a registered company under the Companies Act 2013, with a valid and active GSTIN.',
    },
    {
      id: 'REQ-303', title: 'Smart Meter OEM Authorization', type: 'Mandatory',
      threshold: 'Authorized Dealer / Manufacturer Certificate from OEM', period: 'Valid on bid date',
      weightMarks: null, evidenceRequired: ['OEM Authorization Letter', 'Product Compliance Certificate'],
      sourcePage: 6, scoringRule: 'Pass / Fail Only',
      extractedClause: 'Bidder must provide a valid OEM authorization certificate confirming they are an authorized distributor or manufacturer of the proposed telemetry hardware.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Checklist item component (bidder self-assessment)
// ---------------------------------------------------------------------------
function ChecklistItem({ req }) {
  const [checked, setChecked] = useState(false);
  const isMandatory = req.type === 'Mandatory';

  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
        checked
          ? 'border-emerald-300 bg-emerald-50'
          : isMandatory
          ? 'border-rose-200 bg-rose-50/40 hover:border-rose-300'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="mt-0.5 accent-emerald-600 w-4 h-4 cursor-pointer shrink-0"
      />
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-900">{req.title}</span>
          <span
            className={`px-1.5 py-0.5 rounded font-extrabold border ${
              isMandatory
                ? 'bg-rose-100 text-rose-800 border-rose-200'
                : 'bg-blue-100 text-blue-800 border-blue-200'
            }`}
            style={{ fontSize: '9px' }}
          >
            {isMandatory ? 'MANDATORY' : `${req.weightMarks} pts`}
          </span>
        </div>
        <p className="text-slate-500 mt-0.5" style={{ fontSize: '11px' }}>{req.threshold}</p>
        {req.evidenceRequired && (
          <p className="text-slate-400 mt-0.5" style={{ fontSize: '10px' }}>
            Docs: {req.evidenceRequired.join(', ')}
          </p>
        )}
      </div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Tender Detail Modal (bidder view)
// ---------------------------------------------------------------------------
function TenderDetailModal({ tender, onClose, onApply }) {
  const reqs = ALL_REQUIREMENTS[tender.id] || [];
  const mandatory = reqs.filter((r) => r.type === 'Mandatory');
  const evaluation = reqs.filter((r) => r.type === 'Evaluation');
  const totalMarks = evaluation.reduce((sum, r) => sum + (r.weightMarks || 0), 0);
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-200 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" style={{ fontSize: '10px' }}>
                {tender.id}
              </span>
              <StatusBadge status={tender.status} size="sm" />
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">{tender.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{tender.department} &nbsp;&bull;&nbsp; {tender.category}</p>
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors ml-4 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 px-5 pt-3 pb-0 bg-white border-b border-slate-100">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'requirements', label: `Requirements (${reqs.length})` },
            { key: 'checklist', label: 'Self-Assessment' },
          ].map((tab) => (
            <button
              key={tab.key}
              id={`modal-tab-${tab.key}`}
              onClick={() => setActiveSection(tab.key)}
              className={`px-4 py-2 text-xs font-bold rounded-t border-b-2 transition-colors cursor-pointer ${
                activeSection === tab.key
                  ? 'border-blue-700 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">
          {/* Overview Tab */}
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Budget', value: tender.budget },
                  { label: 'Deadline', value: tender.deadline },
                  { label: 'Published', value: tender.publishDate },
                  { label: 'Bids So Far', value: tender.totalBidsSubmitted },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                    <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>{kpi.label}</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="font-extrabold uppercase text-slate-500 mb-2" style={{ fontSize: '10px' }}>Description</p>
                <p className="text-xs text-slate-700 leading-relaxed">{tender.description}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs font-extrabold text-emerald-800">Compliance Tip</p>
                  <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                    This tender has <strong>{mandatory.length} mandatory</strong> and <strong>{evaluation.length} scored</strong> requirements worth a total of <strong>{totalMarks} marks</strong>. Use the Self-Assessment tab to check your readiness before submitting.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Requirements Tab */}
          {activeSection === 'requirements' && (
            <div className="space-y-5">
              {mandatory.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Mandatory Requirements ({mandatory.length}) — Pass/Fail
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {mandatory.map((req) => (
                      <div key={req.id} className="bg-white border border-rose-200 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{req.title}</p>
                            <p className="text-slate-600 mt-1 leading-relaxed" style={{ fontSize: '11px' }}>{req.extractedClause}</p>
                          </div>
                          <span className="shrink-0 px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold border border-rose-200" style={{ fontSize: '9px' }}>MANDATORY</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-rose-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '9px' }}>Threshold</p>
                            <p className="text-xs font-bold text-slate-800 mt-0.5">{req.threshold}</p>
                          </div>
                          <div>
                            <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '9px' }}>Evidence Required</p>
                            <p className="text-xs text-slate-700 mt-0.5">{req.evidenceRequired.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {evaluation.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Scored Criteria ({evaluation.length}) — {totalMarks} Total Marks
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {evaluation.map((req) => (
                      <div key={req.id} className="bg-white border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{req.title}</p>
                            <p className="text-slate-600 mt-1 leading-relaxed" style={{ fontSize: '11px' }}>{req.extractedClause}</p>
                          </div>
                          <span className="shrink-0 px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold border border-blue-200" style={{ fontSize: '9px' }}>
                            {req.weightMarks} PTS
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-blue-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '9px' }}>Threshold</p>
                            <p className="text-xs font-semibold text-slate-800 mt-0.5">{req.threshold}</p>
                          </div>
                          <div>
                            <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '9px' }}>Scoring Rule</p>
                            <p className="text-xs font-semibold text-blue-800 mt-0.5">{req.scoringRule}</p>
                          </div>
                          <div>
                            <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '9px' }}>Evidence</p>
                            <p className="text-xs text-slate-700 mt-0.5">{req.evidenceRequired.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Self-Assessment Tab */}
          {activeSection === 'checklist' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-xs font-extrabold text-amber-800">Self-Assessment Tool</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Check all items you can comply with. This is not submitted — it's a personal readiness check before applying.
                  </p>
                </div>
              </div>

              {mandatory.length > 0 && (
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-rose-700 mb-2">
                    Mandatory (must check ALL to qualify)
                  </p>
                  <div className="space-y-2">
                    {mandatory.map((req) => <ChecklistItem key={req.id} req={req} />)}
                  </div>
                </div>
              )}

              {evaluation.length > 0 && (
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-2">
                    Scored Criteria (check what you can provide)
                  </p>
                  <div className="space-y-2">
                    {evaluation.map((req) => <ChecklistItem key={req.id} req={req} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Deadline: <span className="font-bold text-slate-800">{tender.deadline}</span>
            &nbsp;&bull;&nbsp; Budget: <span className="font-bold text-slate-800">{tender.budget}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              id="cancel-modal-btn"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-xs font-bold hover:border-slate-400 cursor-pointer transition-colors"
            >
              Close
            </button>
            <button
              id="apply-tender-btn"
              onClick={() => { onClose(); onApply && onApply(tender); }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Apply / Submit Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page: BidderTendersPage
// ---------------------------------------------------------------------------
export default function BidderTendersPage({ navigate, currentPath }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedTender, setSelectedTender] = useState(null);
  const [sortBy, setSortBy] = useState('deadline');
  const [appliedTenders, setAppliedTenders] = useState(new Set());

  const categories = ['All', ...Array.from(new Set(MOCK_TENDERS.map((t) => t.category)))];

  const filtered = useMemo(() => {
    return MOCK_TENDERS.filter((t) => {
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.department.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'All' || t.category === categoryFilter;
      return matchSearch && matchCat;
    }).sort((a, b) => {
      if (sortBy === 'deadline') return a.deadline.localeCompare(b.deadline);
      if (sortBy === 'budget')
        return (
          parseInt(b.budget.replace(/[^0-9]/g, '')) -
          parseInt(a.budget.replace(/[^0-9]/g, ''))
        );
      return 0;
    });
  }, [search, categoryFilter, sortBy]);

  const handleApply = (tender) => {
    setAppliedTenders((prev) => new Set([...prev, tender.id]));
    navigate('/bidder/submissions');
  };

  return (
    <AppLayout role="bidder" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Page Header */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 border-t-4 border-t-emerald-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              e-Procurement Vendor Portal &nbsp;&bull;&nbsp; Ministry of Petroleum &amp; Natural Gas
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Open Public Tenders
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Browse, review requirements &amp; submit your bid &nbsp;&bull;&nbsp; DigiLocker-verified submissions
            </p>
          </div>
          <button
            id="verify-digilocker-btn"
            onClick={() => navigate('/bidder/digilocker')}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Verify via DigiLocker
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Open Tenders', value: MOCK_TENDERS.length, accent: 'border-t-blue-700' },
            {
              label: 'Deadline This Month',
              value: MOCK_TENDERS.filter((t) => t.deadline.startsWith('2026-03')).length,
              accent: 'border-t-amber-500',
            },
            { label: 'Tenders Applied', value: appliedTenders.size, accent: 'border-t-emerald-600' },
            {
              label: 'Total Budget Pool',
              value: 'Rs. 170+ Cr',
              accent: 'border-t-rose-600',
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-white border border-slate-200 border-t-4 ${kpi.accent} rounded-lg p-4 shadow-xs`}
            >
              <p className="font-extrabold uppercase tracking-wider text-slate-500" style={{ fontSize: '10px' }}>{kpi.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="bidder-tender-search"
              type="text"
              placeholder="Search tenders by title, ID, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-slate-50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`cat-filter-${cat.replace(/[\s&]/g, '-').toLowerCase()}`}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-0.5 rounded-full font-bold transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={{ fontSize: '10px' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 ml-auto">
              <span className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>Sort:</span>
              <select
                id="bidder-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-200 rounded px-2 py-0.5 bg-white text-slate-700 cursor-pointer focus:outline-none font-bold"
                style={{ fontSize: '10px' }}
              >
                <option value="deadline">Earliest Deadline</option>
                <option value="budget">Highest Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tender Grid */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-slate-500 font-semibold">
              Showing <span className="text-slate-900 font-extrabold">{filtered.length}</span> open tenders
            </span>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 bg-white rounded-lg border border-slate-200">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm font-bold">No tenders match your search</p>
              <button
                onClick={() => { setSearch(''); setCategoryFilter('All'); }}
                className="mt-2 text-emerald-700 font-bold text-xs underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((tender) => {
              const reqs = ALL_REQUIREMENTS[tender.id] || [];
              const mandatoryCount = reqs.filter((r) => r.type === 'Mandatory').length;
              const scoredCount = reqs.filter((r) => r.type === 'Evaluation').length;
              const totalPts = reqs
                .filter((r) => r.type === 'Evaluation')
                .reduce((s, r) => s + (r.weightMarks || 0), 0);
              const isApplied = appliedTenders.has(tender.id);

              return (
                <div
                  key={tender.id}
                  id={`bidder-tender-card-${tender.id}`}
                  className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" style={{ fontSize: '10px' }}>
                        {tender.id}
                      </span>
                      <span className="text-slate-500 font-semibold ml-2" style={{ fontSize: '10px' }}>{tender.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <StatusBadge status={tender.status} size="sm" />
                      {isApplied && (
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold border border-emerald-200" style={{ fontSize: '9px' }}>
                          Applied
                        </span>
                      )}
                    </div>
                  </div>

                  <h3
                    className="text-sm font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors leading-tight"
                    onClick={() => setSelectedTender(tender)}
                  >
                    {tender.title}
                  </h3>

                  <p className="text-slate-500 mt-0.5 flex items-center gap-1 font-semibold" style={{ fontSize: '11px' }}>
                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {tender.department}
                  </p>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {tender.description}
                  </p>

                  {/* Requirement summary chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-rose-50 text-rose-800 rounded border border-rose-200 font-bold" style={{ fontSize: '10px' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      {mandatoryCount} Mandatory
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200 font-bold" style={{ fontSize: '10px' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {scoredCount} Scored ({totalPts} pts)
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
                    <div>
                      <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '9px' }}>Estimated Budget</p>
                      <p className="text-xs font-black text-slate-900">{tender.budget}</p>
                    </div>
                    <div>
                      <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '9px' }}>Submission Deadline</p>
                      <p className="text-xs font-black text-slate-900">{tender.deadline}</p>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-slate-500" style={{ fontSize: '11px' }}>
                      <span className="font-bold text-slate-700">{tender.totalBidsSubmitted}</span> bids submitted
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        id={`view-req-btn-${tender.id}`}
                        onClick={() => setSelectedTender(tender)}
                        className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded font-bold transition-colors cursor-pointer flex items-center gap-1"
                        style={{ fontSize: '11px' }}
                      >
                        View Requirements
                      </button>
                      <button
                        id={`apply-btn-${tender.id}`}
                        onClick={() => {
                          if (!isApplied) {
                            setSelectedTender(tender);
                          }
                        }}
                        className={`px-3 py-1.5 rounded font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                          isApplied
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                        }`}
                        style={{ fontSize: '11px' }}
                      >
                        {isApplied ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Applied
                          </>
                        ) : (
                          <>
                            Apply Now
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTender && (
        <TenderDetailModal
          tender={selectedTender}
          onClose={() => setSelectedTender(null)}
          onApply={handleApply}
        />
      )}
    </AppLayout>
  );
}
