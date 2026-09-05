import React, { useState, useMemo } from 'react';
import AppLayout from '../layouts/AppLayout';
import StatusBadge from '../components/StatusBadge';
import { MOCK_TENDERS, MOCK_REQUIREMENTS_SAMPLE } from '../data/mockData';

// ---------------------------------------------------------------------------
// Additional mock requirements for other tenders
// ---------------------------------------------------------------------------
const ALL_REQUIREMENTS = {
  'MOPNG-2026-001': MOCK_REQUIREMENTS_SAMPLE,
  'ONGC-2026-042': [
    {
      id: 'REQ-101',
      tenderId: 'ONGC-2026-042',
      title: 'Offshore Instrumentation Certification',
      type: 'Mandatory',
      threshold: 'ATEX / IECEx Zone-1 Certified Instruments',
      period: 'Valid on submission date',
      weightMarks: null,
      evidenceRequired: ['ATEX Certificate', 'IECEx Declaration of Conformity'],
      sourcePage: 6,
      extractedClause:
        'All pressure sensors and shut-off valves supplied must carry valid ATEX or IECEx certification for Zone-1 hazardous area use. Non-compliant equipment will result in disqualification.',
      scoringRule: 'Pass / Fail Only',
    },
    {
      id: 'REQ-102',
      tenderId: 'ONGC-2026-042',
      title: 'Offshore Project Experience',
      type: 'Evaluation',
      threshold: 'Minimum 2 offshore calibration projects of >= Rs. 10 Cr each',
      period: 'Last 7 Years',
      weightMarks: 30,
      evidenceRequired: ['Project Completion Certificates', 'Client Letters from ONGC / IOC'],
      sourcePage: 10,
      extractedClause:
        'Bidder must demonstrate at least two successfully completed offshore sensor calibration contracts for oil & gas clients valued at >= Rs. 10 Crore each within the last seven financial years.',
      scoringRule: '2 projects = 20 marks; 3+ projects = 30 marks',
    },
    {
      id: 'REQ-103',
      tenderId: 'ONGC-2026-042',
      title: 'Net Worth & Financial Soundness',
      type: 'Evaluation',
      threshold: 'Rs. 15.0 Cr Positive Net Worth',
      period: 'Last Audited Financial Year',
      weightMarks: 15,
      evidenceRequired: ['CA Certified Balance Sheet', 'Chartered Accountant Certificate'],
      sourcePage: 9,
      extractedClause:
        'The bidder must demonstrate a positive net worth of at least Rs. 15 Crore as per the last audited balance sheet certified by a registered Chartered Accountant.',
      scoringRule: 'Rs. 15 Cr = 10 marks; Rs. 20 Cr+ = 15 marks',
    },
  ],
  'GAIL-2026-108': [
    {
      id: 'REQ-201',
      tenderId: 'GAIL-2026-108',
      title: 'Cryogenic Engineering Competency',
      type: 'Mandatory',
      threshold: 'Qualified Cryogenic Engineer (Certified) on project team',
      period: 'Must be available throughout contract duration',
      weightMarks: null,
      evidenceRequired: ['Engineer Qualification Certificate', 'Appointment Letter'],
      sourcePage: 7,
      extractedClause:
        'The bidding company must employ at least one certified cryogenic engineer (IIChE or ASHRAE recognized) who will be actively deployed for the duration of the contract.',
      scoringRule: 'Pass / Fail Only',
    },
    {
      id: 'REQ-202',
      tenderId: 'GAIL-2026-108',
      title: 'LNG Tank Refurbishment Experience',
      type: 'Evaluation',
      threshold: '1 completed LNG tank project >= Rs. 30 Cr',
      period: 'Last 10 Years',
      weightMarks: 35,
      evidenceRequired: ['Completion Certificate', 'Client Reference Letter', 'Photographs / Videos'],
      sourcePage: 13,
      extractedClause:
        'Bidder must have successfully completed at least one cryogenic LNG storage tank refurbishment or new construction project with a contract value >= Rs. 30 Crore within the last 10 years.',
      scoringRule: '1 project = 25 marks; 2+ projects = 35 marks',
    },
    {
      id: 'REQ-203',
      tenderId: 'GAIL-2026-108',
      title: 'HSE Management System Certification',
      type: 'Mandatory',
      threshold: 'ISO 45001:2018 & ISO 14001:2015 Dual Certification',
      period: 'Current & Valid',
      weightMarks: null,
      evidenceRequired: ['ISO 45001 Certificate', 'ISO 14001 Certificate'],
      sourcePage: 5,
      extractedClause:
        'Mandatory requirement: The company must hold current, valid dual certification of ISO 45001:2018 (OHS Management) and ISO 14001:2015 (Environmental Management). Certificates must be from accredited certification bodies.',
      scoringRule: 'Pass / Fail Only',
    },
    {
      id: 'REQ-204',
      tenderId: 'GAIL-2026-108',
      title: 'Average Annual Turnover',
      type: 'Evaluation',
      threshold: 'Rs. 80.0 Cr average over last 3 years',
      period: 'FY 2022-23 to 2024-25',
      weightMarks: 20,
      evidenceRequired: ['CA Certified Financial Statements', 'Turnover Certificate'],
      sourcePage: 11,
      extractedClause:
        'The bidder must demonstrate an average annual financial turnover of Rs. 80 Crore or more over the last three financial years as certified by a Chartered Accountant.',
      scoringRule: 'Rs. 80 Cr = 15 marks; Every additional Rs. 10 Cr = +1 mark (Max 20 marks)',
    },
  ],
  'HPCL-2026-019': [
    {
      id: 'REQ-301',
      tenderId: 'HPCL-2026-019',
      title: 'IoT Platform & Cloud Experience',
      type: 'Evaluation',
      threshold: 'At least 1 large-scale IoT deployment (10,000+ devices)',
      period: 'Last 5 Years',
      weightMarks: 30,
      evidenceRequired: ['Work Order / Contract Copy', 'Completion Certificate', 'System Architecture Document'],
      sourcePage: 8,
      extractedClause:
        'Bidder must have successfully deployed and commissioned a large-scale IoT telemetry solution with a minimum of 10,000 active connected devices in an industrial or utility environment within the last 5 years.',
      scoringRule: '10k devices = 20 marks; 25k+ devices = 30 marks',
    },
    {
      id: 'REQ-302',
      tenderId: 'HPCL-2026-019',
      title: 'GSTIN & Company Registration',
      type: 'Mandatory',
      threshold: 'Active GSTIN & valid CIN',
      period: 'Current',
      weightMarks: null,
      evidenceRequired: ['GSTIN Certificate', 'MCA21 Incorporation Certificate'],
      sourcePage: 3,
      extractedClause:
        'The bidder must be a registered company (Pvt Ltd or Ltd) under the Companies Act 2013, with a valid and active GSTIN. Both PAN and GSTIN-registered addresses must be consistent.',
      scoringRule: 'Pass / Fail + DigiLocker Cross Check',
    },
    {
      id: 'REQ-303',
      tenderId: 'HPCL-2026-019',
      title: 'Smart Meter OEM Authorization',
      type: 'Mandatory',
      threshold: 'Authorized Dealer / Manufacturer Certificate from Smart Meter OEM',
      period: 'Valid on bid date',
      weightMarks: null,
      evidenceRequired: ['OEM Authorization Letter', 'Product Compliance Certificate'],
      sourcePage: 6,
      extractedClause:
        'Bidder must provide a valid OEM authorization certificate from the smart meter manufacturer, confirming the bidder is an authorized distributor or manufacturer of the proposed telemetry hardware.',
      scoringRule: 'Pass / Fail Only',
    },
  ],
};

// ---------------------------------------------------------------------------
// Requirement Row (expandable)
// ---------------------------------------------------------------------------
function RequirementRow({ req, index }) {
  const [expanded, setExpanded] = useState(false);
  const isMandatory = req.type === 'Mandatory';

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        id={`req-row-${req.id}`}
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
              isMandatory
                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}
          >
            {index + 1}
          </span>
          <div className="min-w-0">
            <span className="font-bold text-slate-900 text-xs block truncate">{req.title}</span>
            <span className="text-slate-400 font-mono" style={{ fontSize: '10px' }}>{req.id} · Page {req.sourcePage}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span
            className={`px-2 py-0.5 rounded font-extrabold border ${
              isMandatory
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}
            style={{ fontSize: '10px' }}
          >
            {isMandatory ? 'Mandatory' : `${req.weightMarks} Marks`}
          </span>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-4 py-4 bg-slate-50 space-y-3">
          <div>
            <p className="font-extrabold uppercase tracking-wider text-slate-500 mb-1" style={{ fontSize: '10px' }}>
              Extracted Clause (AI — PyMuPDF)
            </p>
            <p className="text-xs text-slate-800 bg-white border border-slate-200 rounded p-3 leading-relaxed font-medium italic">
              "{req.extractedClause}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded p-3">
              <p className="font-extrabold uppercase text-slate-500 mb-1" style={{ fontSize: '10px' }}>Threshold / Criteria</p>
              <p className="text-xs font-bold text-slate-900">{req.threshold}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded p-3">
              <p className="font-extrabold uppercase text-slate-500 mb-1" style={{ fontSize: '10px' }}>Reference Period</p>
              <p className="text-xs font-bold text-slate-900">{req.period}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-3">
            <p className="font-extrabold uppercase text-slate-500 mb-1" style={{ fontSize: '10px' }}>Scoring Rule</p>
            <p className={`text-xs font-bold ${isMandatory ? 'text-rose-800' : 'text-blue-800'}`}>
              {req.scoringRule}
            </p>
          </div>

          <div>
            <p className="font-extrabold uppercase tracking-wider text-slate-500 mb-2" style={{ fontSize: '10px' }}>
              Required Evidence Documents
            </p>
            <div className="flex flex-wrap gap-2">
              {req.evidenceRequired.map((doc, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded shadow-sm"
                  style={{ fontSize: '11px' }}
                >
                  <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {doc}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              id={`confirm-req-${req.id}`}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors cursor-pointer"
            >
              Confirm Extraction
            </button>
            <button
              id={`edit-req-${req.id}`}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer"
            >
              Edit Clause
            </button>
            <button
              id={`view-pdf-req-${req.id}`}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View PDF Snippet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tender Detail Panel
// ---------------------------------------------------------------------------
function TenderDetailPanel({ tender, onClose, navigate }) {
  const reqs = ALL_REQUIREMENTS[tender.id] || [];
  const mandatory = reqs.filter((r) => r.type === 'Mandatory');
  const evaluation = reqs.filter((r) => r.type === 'Evaluation');
  const totalMarks = evaluation.reduce((sum, r) => sum + (r.weightMarks || 0), 0);

  return (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-start justify-between p-5 border-b border-slate-200 bg-white shrink-0">
        <div>
          <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" style={{ fontSize: '10px' }}>
            {tender.id}
          </span>
          <h2 className="text-base font-black text-slate-900 mt-1 leading-tight">{tender.title}</h2>
          <p className="text-xs text-slate-500 mt-0.5 font-semibold">{tender.department} · {tender.category}</p>
        </div>
        <button
          id="close-tender-panel"
          onClick={onClose}
          className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ml-3 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Budget', value: tender.budget },
            { label: 'Deadline', value: tender.deadline },
            { label: 'Total Bids', value: tender.totalBidsSubmitted },
            { label: 'Requirements', value: reqs.length },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm text-center">
              <p className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>{kpi.label}</p>
              <p className="text-sm font-black text-slate-900 mt-0.5">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="font-extrabold uppercase text-slate-500 mb-1" style={{ fontSize: '10px' }}>Tender Description</p>
          <p className="text-xs text-slate-700 leading-relaxed">{tender.description}</p>
        </div>

        {/* Requirements Banner */}
        <div className="bg-blue-700 rounded-lg p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider opacity-80">Extracted Requirements</p>
            <p className="text-lg font-black mt-0.5">{reqs.length} Requirements</p>
            <p className="text-xs opacity-70 mt-0.5">
              {mandatory.length} Mandatory &nbsp;·&nbsp; {evaluation.length} Scored ({totalMarks} total marks)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-white/20 border border-white/30 rounded text-xs font-bold">AI Extracted</span>
            <span className="px-3 py-1.5 bg-emerald-500 rounded text-xs font-bold">Officer Review Ready</span>
          </div>
        </div>

        {/* Mandatory */}
        {mandatory.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Mandatory Qualification Requirements ({mandatory.length})
              </h3>
            </div>
            <p className="text-slate-500 mb-3 ml-4" style={{ fontSize: '11px' }}>
              Bidders failing ANY mandatory requirement are automatically disqualified.
            </p>
            <div className="space-y-2">
              {mandatory.map((req, i) => (
                <RequirementRow key={req.id} req={req} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Evaluation */}
        {evaluation.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Scored Evaluation Criteria ({evaluation.length}) — {totalMarks} Total Marks
              </h3>
            </div>
            <div className="space-y-2">
              {evaluation.map((req, i) => (
                <RequirementRow key={req.id} req={req} index={i} />
              ))}
            </div>
          </div>
        )}

        {reqs.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            Requirements not yet extracted for this tender.
          </div>
        )}

        {/* Officer Actions */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="font-extrabold uppercase text-slate-500 mb-3" style={{ fontSize: '10px' }}>Officer Actions</p>
          <div className="flex flex-wrap gap-2">
            <button
              id={`upload-tender-${tender.id}`}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload New Tender PDF
            </button>
            <button
              id={`view-bidders-${tender.id}`}
              onClick={() => navigate('/officer/tenders/bidders')}
              className="px-4 py-2 bg-white border border-slate-300 hover:border-blue-400 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View Bidder Submissions
            </button>
            <button
              id={`export-req-${tender.id}`}
              className="px-4 py-2 bg-white border border-slate-300 hover:border-blue-400 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Requirements CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function TendersPage({ navigate, currentPath }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedTender, setSelectedTender] = useState(null);
  const [sortBy, setSortBy] = useState('deadline');

  const statuses = ['All', 'Active', 'Open for Bids', 'Evaluation Phase'];
  const categories = ['All', ...Array.from(new Set(MOCK_TENDERS.map((t) => t.category)))];

  const filtered = useMemo(() => {
    return MOCK_TENDERS.filter((t) => {
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchCat = categoryFilter === 'All' || t.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    }).sort((a, b) => {
      if (sortBy === 'deadline') return a.deadline.localeCompare(b.deadline);
      if (sortBy === 'budget')
        return (
          parseInt(b.budget.replace(/[^0-9]/g, '')) -
          parseInt(a.budget.replace(/[^0-9]/g, ''))
        );
      if (sortBy === 'bids') return b.totalBidsSubmitted - a.totalBidsSubmitted;
      return 0;
    });
  }, [search, statusFilter, categoryFilter, sortBy]);

  const totalReqs = MOCK_TENDERS.reduce(
    (s, t) => s + (ALL_REQUIREMENTS[t.id]?.length || 0),
    0,
  );
  const totalMandatory = MOCK_TENDERS.reduce(
    (s, t) =>
      s + (ALL_REQUIREMENTS[t.id]?.filter((r) => r.type === 'Mandatory').length || 0),
    0,
  );

  return (
    <AppLayout role="officer" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Page Header */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 border-t-4 border-t-blue-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-700 animate-pulse" />
              Ministry of Petroleum &amp; Natural Gas &nbsp;&bull;&nbsp; Procurement Management
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Tenders &amp; Requirements Management
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              AI-extracted requirement clauses &nbsp;&bull;&nbsp; Officer confirmation workflow &nbsp;&bull;&nbsp; Multi-tender oversight
            </p>
          </div>
          <button
            id="upload-new-tender-btn"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Tender PDF
          </button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Tenders', value: MOCK_TENDERS.length, sub: 'In system', accent: 'border-t-blue-700' },
            { label: 'Extracted Requirements', value: totalReqs, sub: 'AI extracted', accent: 'border-t-emerald-600' },
            { label: 'Mandatory Clauses', value: totalMandatory, sub: 'Pass/Fail only', accent: 'border-t-rose-600' },
            {
              label: 'Total Bids Received',
              value: MOCK_TENDERS.reduce((s, t) => s + t.totalBidsSubmitted, 0),
              sub: 'All tenders',
              accent: 'border-t-amber-500',
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-white border border-slate-200 border-t-4 ${kpi.accent} rounded-lg p-4 shadow-xs`}
            >
              <p className="font-extrabold uppercase tracking-wider text-slate-500" style={{ fontSize: '10px' }}>{kpi.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{kpi.value}</p>
              <p className="text-slate-400 mt-0.5" style={{ fontSize: '11px' }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className={`grid gap-5 ${selectedTender ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* LEFT — Tender List */}
          <div className="space-y-4">
            {/* Filters */}
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
                  id="tender-search-input"
                  type="text"
                  placeholder="Search tenders by title, ID, or department..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-slate-50"
                />
              </div>

              {/* Status + Sort */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>Status:</span>
                {statuses.map((s) => (
                  <button
                    key={s}
                    id={`filter-status-${s.replace(/\s/g, '-').toLowerCase()}`}
                    onClick={() => setStatusFilter(s)}
                    className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                      statusFilter === s
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    style={{ fontSize: '10px' }}
                  >
                    {s}
                  </button>
                ))}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="font-extrabold uppercase text-slate-500" style={{ fontSize: '10px' }}>Sort:</span>
                  <select
                    id="tender-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-slate-200 rounded px-2 py-0.5 bg-white text-slate-700 cursor-pointer focus:outline-none font-bold"
                    style={{ fontSize: '10px' }}
                  >
                    <option value="deadline">Deadline</option>
                    <option value="budget">Budget (High)</option>
                    <option value="bids">Most Bids</option>
                  </select>
                </div>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-cat-${cat.replace(/[\s&]/g, '-').toLowerCase()}`}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-0.5 rounded-full font-bold transition-colors cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    style={{ fontSize: '10px' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Count line */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span>
                Showing <span className="text-slate-900 font-extrabold">{filtered.length}</span> of {MOCK_TENDERS.length} tenders
              </span>
              {selectedTender && (
                <span className="text-blue-700 font-bold">Inspecting: {selectedTender.id}</span>
              )}
            </div>

            {/* Tender Cards */}
            <div className="space-y-3">
              {filtered.length === 0 && (
                <div className="text-center py-12 text-slate-400 bg-white rounded-lg border border-slate-200">
                  <svg className="w-8 h-8 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-bold">No tenders match your filters</p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setStatusFilter('All');
                      setCategoryFilter('All');
                    }}
                    className="mt-2 text-blue-700 font-bold text-xs underline cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {filtered.map((tender) => {
                const reqs = ALL_REQUIREMENTS[tender.id] || [];
                const mandatoryCount = reqs.filter((r) => r.type === 'Mandatory').length;
                const scoredCount = reqs.filter((r) => r.type === 'Evaluation').length;
                const isSelected = selectedTender?.id === tender.id;

                return (
                  <div
                    key={tender.id}
                    id={`tender-card-${tender.id}`}
                    className={`bg-white border rounded-lg p-4 shadow-xs cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedTender(isSelected ? null : tender)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" style={{ fontSize: '10px' }}>
                            {tender.id}
                          </span>
                          <span className="text-slate-500 font-semibold" style={{ fontSize: '10px' }}>{tender.category}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">{tender.title}</h3>
                        <p className="text-slate-500 mt-0.5 flex items-center gap-1" style={{ fontSize: '11px' }}>
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {tender.department}
                        </p>
                      </div>
                      <div className="shrink-0 flex flex-col items-end gap-1.5">
                        <StatusBadge status={tender.status} size="sm" />
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-4 gap-2 text-center">
                      {[
                        { label: 'Budget', value: tender.budget },
                        { label: 'Deadline', value: tender.deadline },
                        { label: 'Mandatory', value: `${mandatoryCount} Req.` },
                        { label: 'Scored', value: `${scoredCount} Req.` },
                      ].map((meta) => (
                        <div key={meta.label}>
                          <p className="font-extrabold uppercase text-slate-400" style={{ fontSize: '9px' }}>{meta.label}</p>
                          <p className="font-bold text-slate-800 mt-0.5" style={{ fontSize: '11px' }}>{meta.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-slate-500" style={{ fontSize: '11px' }}>
                        <span className="font-bold text-slate-800">{tender.totalBidsSubmitted}</span> bids &nbsp;&bull;&nbsp;{' '}
                        <span className="font-bold text-slate-800">{tender.evaluatedBids}</span> evaluated
                      </span>
                      <button
                        id={`inspect-btn-${tender.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTender(isSelected ? null : tender);
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-blue-700 hover:bg-blue-800 text-white'
                        }`}
                        style={{ fontSize: '11px' }}
                      >
                        {isSelected ? 'Close Panel' : 'Inspect Requirements'}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isSelected ? 'M6 18L18 6M6 6l12 12' : 'M9 5l7 7-7 7'}
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Detail Panel */}
          {selectedTender && (
            <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden flex flex-col" style={{ position: 'sticky', top: '1.5rem', maxHeight: 'calc(100vh - 8rem)' }}>
              <TenderDetailPanel
                tender={selectedTender}
                onClose={() => setSelectedTender(null)}
                navigate={navigate}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
