import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import StatCard from '../components/StatCard';
import TenderCard from '../components/TenderCard';
import BidderCard from '../components/BidderCard';
import ComplianceTable from '../components/ComplianceTable';
import { ComplianceOverviewChart, RiskDistributionGraph } from '../components/ChartCard';
import {
  SYSTEM_STATS_OFFICER,
  MOCK_TENDERS,
  MOCK_BIDDERS_SUMMARY,
  MOCK_RISK_ALERTS,
  MOCK_AUDIT_TRAIL,
} from '../data/mockData';

export default function OfficerDashboard({ navigate, currentPath }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AppLayout role="officer" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Government Officer Header Banner */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 border-t-4 border-t-blue-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-700 animate-pulse" />
              Ministry of Petroleum & Natural Gas • Government of India
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Procurement Officer Executive Dashboard
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Automated requirement extraction, multi-document evidence verification & transparent evaluation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/officer/tenders')}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Upload Tender PDF</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <StatCard
            title="Active Tenders"
            value={SYSTEM_STATS_OFFICER.activeTenders}
            subtitle="Under evaluation"
            color="blue"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <StatCard
            title="Total Bids"
            value={SYSTEM_STATS_OFFICER.totalBids}
            subtitle="Parsed & processed"
            color="white"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Under Review"
            value={SYSTEM_STATS_OFFICER.underReview}
            subtitle="Needs officer action"
            color="amber"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="High Risk Bids"
            value={SYSTEM_STATS_OFFICER.highRiskBids}
            subtitle="Contradictions flagged"
            color="rose"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
          <StatCard
            title="Avg Compliance"
            value={SYSTEM_STATS_OFFICER.avgComplianceScore}
            unit="%"
            subtitle="System evaluation avg"
            color="emerald"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Charts & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <ComplianceOverviewChart />
          </div>
          <div>
            <RiskDistributionGraph />
          </div>
        </div>

        {/* Simplified Navigation Tabs */}
        <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex gap-2 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Evaluated Bidders Matrix
          </button>
          <button
            onClick={() => setActiveTab('tenders')}
            className={`px-4 py-2 rounded transition-all cursor-pointer ${
              activeTab === 'tenders'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Active Procurement Tenders
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className={`px-4 py-2 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'risks'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Risk Flags & Red Flags</span>
            <span className="px-1.5 py-0.2 bg-rose-100 text-rose-900 rounded text-[10px]">
              {MOCK_RISK_ALERTS.length}
            </span>
          </button>
        </div>

        {/* Tab Content 1: Evaluated Bidders */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Target Tender Evaluation: MOPNG-2026-001
                </h2>
                <p className="text-xs text-slate-500">
                  Pipeline Maintenance & Inspection Services • 4 Bids Evaluated
                </p>
              </div>

              <button
                onClick={() => navigate('/officer/tenders/bidders')}
                className="text-xs text-blue-700 hover:underline font-bold flex items-center gap-1"
              >
                <span>View Comparison Matrix</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <ComplianceTable bidders={MOCK_BIDDERS_SUMMARY} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {MOCK_BIDDERS_SUMMARY.slice(0, 3).map((bidder) => (
                <BidderCard
                  key={bidder.bidderId}
                  bidder={bidder}
                  onInspect={() => navigate('/officer/tenders/bidders')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Active Tenders */}
        {activeTab === 'tenders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
              <h2 className="text-sm font-bold text-slate-900">Open Government Tenders</h2>
              <span className="text-xs text-slate-500">Showing 4 active tenders</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_TENDERS.map((tender) => (
                <TenderCard
                  key={tender.id}
                  tender={tender}
                  actionLabel="Inspect Requirements"
                  onSelect={() => navigate('/officer/tenders')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 3: Risk Flags */}
        {activeTab === 'risks' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-900 font-medium">
              <span className="font-bold">⚠️ Risk Signals Notice:</span> Risk scores are calculated using deterministic weight rules (Missing Document +30, Address Contradiction +25, Metadata Mismatch +13).
            </div>

            <div className="space-y-3">
              {MOCK_RISK_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Tender: {alert.tenderId} • Vendor ID: {alert.bidderId}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{alert.bidderName}</h3>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-rose-100 text-rose-900 font-extrabold text-xs rounded border border-rose-200">
                        Risk Score: {alert.riskScore} / 100 ({alert.riskLevel})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {alert.flags.map((flag, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 rounded border border-slate-200 text-xs flex items-start justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{flag.title}</span>
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded">
                              {flag.severity} ({flag.impactScore} pts)
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1">{flag.detail}</p>
                          <p className="text-slate-500 font-mono text-[10px] mt-1">
                            📄 Reference: {flag.documentRef}
                          </p>
                        </div>
                        <button className="px-3 py-1 bg-blue-700 text-white rounded text-xs font-bold hover:bg-blue-800 shrink-0 cursor-pointer">
                          View PDF Snippet
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Log Stream */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent e-Procurement Audit Log</h3>
              <p className="text-[11px] text-slate-500">Immutable record of officer actions and automated verification jobs</p>
            </div>
            <button
              onClick={() => navigate('/officer/audit')}
              className="text-xs text-blue-700 hover:underline font-bold"
            >
              View Full Audit Log →
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_AUDIT_TRAIL.map((event) => (
              <div key={event.id} className="flex items-start gap-2 text-xs p-2 rounded bg-slate-50 border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-blue-700 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{event.action}</span>
                    <span className="font-mono text-[10px] text-slate-500">{event.time}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">{event.details}</p>
                  <span className="text-[10px] text-slate-400 font-mono">Actor: {event.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

