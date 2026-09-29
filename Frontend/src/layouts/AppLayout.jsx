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
        <ClauseRiskChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          navigate={navigate}
        />
      )}
    </div>
  );
}
