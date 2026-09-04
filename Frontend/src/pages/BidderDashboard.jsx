import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import StatCard from '../components/StatCard';
import TenderCard from '../components/TenderCard';
import StatusBadge from '../components/StatusBadge';
import {
  SYSTEM_STATS_BIDDER,
  MOCK_TENDERS,
  MOCK_BIDDER_SUBMISSIONS_LIST,
  CURRENT_USER_BIDDER,
} from '../data/mockData';

export default function BidderDashboard({ navigate, currentPath }) {
  const [activeTab, setActiveTab] = useState('tenders');

  return (
    <AppLayout role="bidder" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Government Vendor Header */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 border-t-4 border-t-emerald-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              e-Procurement Vendor Portal • Ministry of Petroleum & Natural Gas
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              {CURRENT_USER_BIDDER.company}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Authorized Vendor ID: VEND-99420 • Contact: {CURRENT_USER_BIDDER.name} ({CURRENT_USER_BIDDER.email})
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/bidder/digilocker')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>Verify with DigiLocker</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            title="Open Tenders"
            value={SYSTEM_STATS_BIDDER.openTenders}
            subtitle="Matching company scope"
            color="blue"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          <StatCard
            title="Submitted Bids"
            value={SYSTEM_STATS_BIDDER.submittedBids}
            subtitle="Under officer evaluation"
            color="white"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Pending Documents"
            value={SYSTEM_STATS_BIDDER.pendingDocuments}
            subtitle="Action required"
            color="amber"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
          <StatCard
            title="Verified Documents"
            value={SYSTEM_STATS_BIDDER.verifiedDocuments}
            subtitle="DigiLocker + OCR verified"
            color="emerald"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
          />
        </div>

        {/* Tab Controls */}
        <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex gap-2 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('tenders')}
            className={`px-4 py-2 rounded transition-all cursor-pointer ${
              activeTab === 'tenders'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Open Tenders ({MOCK_TENDERS.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded transition-all cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            My Submitted Bids ({MOCK_BIDDER_SUBMISSIONS_LIST.length})
          </button>
        </div>

        {/* Tab 1: Open Tenders */}
        {activeTab === 'tenders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
              <h2 className="text-sm font-bold text-slate-900">Recommended Government Tenders</h2>
              <span className="text-xs text-slate-500">Ministry of Petroleum Sector</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_TENDERS.map((tender) => (
                <TenderCard
                  key={tender.id}
                  tender={tender}
                  actionLabel="Apply / Submit Bid"
                  onSelect={() => navigate('/bidder/tenders')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: My Submitted Bids */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
              <h2 className="text-sm font-bold text-slate-900">My Active Submissions</h2>
              <span className="text-xs text-slate-500">Evaluation & Verification Status</span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-xs bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th scope="col" className="py-3 px-4">Tender Title</th>
                    <th scope="col" className="py-3 px-4">Submission Date</th>
                    <th scope="col" className="py-3 px-4 text-center">Score</th>
                    <th scope="col" className="py-3 px-4">DigiLocker Status</th>
                    <th scope="col" className="py-3 px-4">Evaluation Status</th>
                    <th scope="col" className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {MOCK_BIDDER_SUBMISSIONS_LIST.map((sub) => (
                    <tr key={sub.submissionId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-blue-950 text-xs">{sub.tenderTitle}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          ID: {sub.tenderId} • {sub.department}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap text-xs">
                        {sub.submissionDate}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {sub.complianceScore !== null ? (
                          <span className="text-sm font-black text-blue-900">
                            {sub.complianceScore}%
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Processing...</span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                            sub.digiLockerStatus === 'Verified'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {sub.digiLockerStatus === 'Verified' ? '✅ Govt Verified' : '⚠️ Action Needed'}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusBadge status={sub.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-bold transition-colors cursor-pointer text-xs">
                          View Submission
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
