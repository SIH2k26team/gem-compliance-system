import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ClauseRiskChatModal from '../components/ClauseRiskChatModal';

export default function AppLayout({ children, role = 'officer', currentPath = '/', navigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">
      <Sidebar
        role={role}
        currentPath={currentPath}
        navigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-clip">
        <Navbar
          role={role}
          navigate={navigate}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenChat={() => setIsChatOpen(true)}
        />

        <main className="flex-1 p-4 md:p-5 lg:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="py-3 px-6 bg-white border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-bold text-slate-800">e-Procurement Compliance System</span>
          </div>
          <div className="font-semibold text-slate-700">Ministry of Petroleum & Natural Gas (Govt. of India)</div>
        </footer>
      </div>

      {role === 'officer' && (
        <>
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border border-blue-400/40 transition-all hover:scale-105 cursor-pointer ring-4 ring-blue-900/15"
            title="Ask AI Copilot for Bid & Tender Details"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
            </svg>
            <span>Ask AI Copilot</span>
          </button>

          <ClauseRiskChatModal
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            navigate={navigate}
          />
        </>
      )}
    </div>
  );
}
