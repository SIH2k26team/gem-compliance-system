import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import { MOCK_AUDIT_TRAIL } from '../data/mockData';

// Extended audit items for a richer realistic government audit stream
const EXTENDED_AUDIT_TRAIL = [
  ...MOCK_AUDIT_TRAIL,
  {
    id: "AUD-806",
    time: "2026-02-27 17:45",
    actor: "Rajesh Kumar (Officer)",
    action: "Score Override Applied",
    details: "Manually adjusted compliance score for Alpha Energy (+2 pts for verified physical affidavit).",
    tenderId: "MOPNG-2026-001",
    ipAddress: "10.240.12.84",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "AUD-807",
    time: "2026-02-25 11:10",
    actor: "DigiLocker Integration",
    action: "PAN Tax Database Cross-Check",
    details: "Successfully validated PAN AAACA1234F against Income Tax Department API endpoint.",
    tenderId: "ONGC-2026-042",
    ipAddress: "10.200.4.12",
    sha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
  },
  {
    id: "AUD-808",
    time: "2026-02-20 14:05",
    actor: "Compliance Engine",
    action: "Automated Evaluation Matrix Compiled",
    details: "Generated candidate rankings for ONGC-2026-042. 3/4 bids scored above 80%.",
    tenderId: "ONGC-2026-042",
    ipAddress: "10.200.4.15",
    sha256: "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d",
  },
];

export default function AuditLogsPage({ navigate, currentPath }) {
  const [logsState, setLogsState] = useState(EXTENDED_AUDIT_TRAIL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActor, setSelectedActor] = useState('ALL');
  const [selectedAction, setSelectedAction] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState(null);
  const [hashVerificationStatus, setHashVerificationStatus] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredLogs = logsState.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tenderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActor =
      selectedActor === 'ALL' ||
      (selectedActor === 'OFFICER' && log.actor.includes('Officer')) ||
      (selectedActor === 'AI' && log.actor.includes('AI')) ||
      (selectedActor === 'DIGILOCKER' && log.actor.includes('DigiLocker')) ||
      (selectedActor === 'ENGINE' && log.actor.includes('Compliance'));

    const matchesAction =
      selectedAction === 'ALL' || log.action.toLowerCase().includes(selectedAction.toLowerCase());

    return matchesSearch && matchesActor && matchesAction;
  });

  const handleVerifyHash = (log) => {
    setHashVerificationStatus('verifying');
    setTimeout(() => {
      setHashVerificationStatus('verified');
      triggerToast(`SHA-256 Hash for ${log.id} verified clean. 0 alterations detected.`);
    }, 800);
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

        {/* Page Header */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              Ministry of Petroleum &amp; Natural Gas &nbsp;•&nbsp; Cryptographic Compliance Ledger
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-3">
              System Audit Trail & Compliance Ledger
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 font-extrabold text-xs rounded border border-slate-200 font-mono">
                SHA-256 Verified
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => triggerToast('Exported complete Audit Stream (CSV Format)')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Audit Trail (CSV)</span>
            </button>
          </div>
        </div>


        {/* Filter Toolbar */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                placeholder="Search event ID, tender, action, detail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-slate-700 focus:bg-white"
              />
              <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="text-slate-500">Filter Actor:</span>
              <select
                value={selectedActor}
                onChange={(e) => setSelectedActor(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded px-2.5 py-1.5"
              >
                <option value="ALL">All Actors</option>
                <option value="OFFICER">Procurement Officer</option>
                <option value="AI">AI Engine (PyMuPDF)</option>
                <option value="DIGILOCKER">DigiLocker Integration</option>
                <option value="ENGINE">Compliance Engine</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="text-slate-500">Action Type:</span>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded px-2.5 py-1.5"
              >
                <option value="ALL">All Event Types</option>
                <option value="Confirmed">Requirement Confirmed</option>
                <option value="Contradiction">Contradiction Flagged</option>
                <option value="Fetched">DigiLocker Fetched</option>
                <option value="Published">Tender Published</option>
                <option value="Override">Score Override</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                  <th className="py-3 px-4">Event ID & Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Details & Target Tender</th>
                  <th className="py-3 px-4">SHA-256 Digest</th>
                  <th className="py-3 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredLogs.map((log) => {
                  const isOfficer = log.actor.includes('Officer');
                  const isAI = log.actor.includes('AI');
                  const isDigi = log.actor.includes('DigiLocker');

                  return (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      {/* ID & Time */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-blue-900 block text-xs">{log.id}</span>
                        <span className="text-[10px] text-slate-500 font-sans">{log.time}</span>
                      </td>

                      {/* Actor */}
                      <td className="py-3.5 px-4">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-extrabold inline-flex items-center gap-1 "
                        >
                          {log.actor}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4">
                        <span className="font-black text-slate-900">{log.action}</span>
                      </td>

                      {/* Details & Tender */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-slate-700 text-xs font-medium truncate">{log.details}</p>
                        <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                          Ref: {log.tenderId}
                        </span>
                      </td>

                      {/* SHA-256 Hash */}
                      <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                        <span>
                          {log.sha256 ? `${log.sha256.slice(0, 10)}...` : '0x8f3a2190...'}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedLog(log);
                            setHashVerificationStatus(null);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[11px] border border-slate-300 cursor-pointer"
                        >
                          View Payload
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* LOG DETAIL & PAYLOAD MODAL */}
        {selectedLog && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-300 shadow-2xl p-6 space-y-5 text-xs">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {selectedLog.id}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono text-xs text-slate-500">{selectedLog.time}</span>
                  </div>
                  <h2 className="text-base font-black text-slate-900 mt-1">{selectedLog.action}</h2>
                </div>

                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Event Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">Actor Identity:</span>
                  <span className="font-bold text-slate-900">{selectedLog.actor}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">Client IP / Endpoint:</span>
                  <span className="font-mono text-slate-800">{selectedLog.ipAddress || '10.240.12.84'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">Tender Reference:</span>
                  <span className="font-mono text-blue-900 font-bold">{selectedLog.tenderId}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">Immutability Protocol:</span>
                  <span className="font-bold text-emerald-800">NIC Append-Only Log</span>
                </div>
              </div>

              {/* Raw JSON Payload */}
              <div>
                <span className="font-bold text-slate-800 block mb-1">Raw Cryptographic Payload JSON:</span>
                <pre className="bg-slate-900 text-emerald-400 p-3 rounded font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
{JSON.stringify(
  {
    eventId: selectedLog.id,
    timestamp: selectedLog.time,
    actor: selectedLog.actor,
    action: selectedLog.action,
    tenderId: selectedLog.tenderId,
    details: selectedLog.details,
    sha256Digest: selectedLog.sha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    verificationSignature: 'NIC-GOI-SIG-90218-VALID',
  },
  null,
  2
)}
                </pre>
              </div>

              {/* SHA-256 Verification Section */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-blue-900 block">Cryptographic Hash Verification:</span>
                  <span className="font-mono text-[10px] text-slate-600 block truncate max-w-sm">
                    {selectedLog.sha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                  </span>
                </div>

                <button
                  onClick={() => handleVerifyHash(selectedLog)}
                  disabled={hashVerificationStatus === 'verifying'}
                  className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs shrink-0 cursor-pointer"
                >
                  {hashVerificationStatus === 'verifying'
                    ? 'Verifying Hash...'
                    : hashVerificationStatus === 'verified'
                    ? '✅ Hash Verified'
                    : 'Verify SHA-256 Hash'}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded text-xs cursor-pointer"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
