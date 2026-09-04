import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function AppLayout({ children, role = 'officer', currentPath = '/', navigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">
      <Sidebar
        role={role}
        currentPath={currentPath}
        navigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <Navbar
          role={role}
          navigate={navigate}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-4 md:p-5 lg:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="py-3 px-6 bg-white border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-bold text-slate-800">SIH26100 e-Procurement Compliance System</span>
            <span className="ml-2 font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">Phase 1 Frontend</span>
          </div>
          <div className="font-semibold text-slate-700">Ministry of Petroleum & Natural Gas (Govt. of India)</div>
        </footer>
      </div>
    </div>
  );
}
