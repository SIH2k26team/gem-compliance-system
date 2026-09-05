import React from 'react';

export default function Sidebar({ role = 'officer', currentPath = '/', navigate, isOpen, onClose }) {
  const isOfficer = role === 'officer';

  const officerNav = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      path: '/officer/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'tenders',
      label: 'Tenders & Requirements',
      path: '/officer/tenders',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'bidders',
      label: 'Bidder Submissions',
      path: '/officer/tenders/bidders',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'compliance',
      label: 'Compliance Evaluation',
      path: '/officer/bids/compliance',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'risk',
      label: 'Risk Flags & Verification',
      path: '/officer/bids/risk',
      badge: '5 Alerts',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      id: 'audit',
      label: 'System Audit Logs',
      path: '/officer/audit',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const bidderNav = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      path: '/bidder/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'open-tenders',
      label: 'Open Public Tenders',
      path: '/bidder/tenders',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      id: 'my-bids',
      label: 'My Submitted Bids',
      path: '/bidder/submissions',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'digilocker',
      label: 'DigiLocker Integration',
      path: '/bidder/digilocker',
      badge: 'Verified',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
  ];

  const items = isOfficer ? officerNav : bidderNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white text-slate-800 flex flex-col justify-between border-r border-slate-200 shadow-xs transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Branding with Govt Emblem look */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded bg-blue-700 flex flex-col items-center justify-center text-white shadow-xs font-bold">
                <span className="text-[10px] tracking-widest uppercase leading-none">GOI</span>
                <span className="text-[8px] font-semibold opacity-90 leading-none mt-0.5">SIH26</span>
              </div>
              <div>
                <span className="font-black text-blue-900 tracking-tight text-xs block leading-tight">
                  Tender Compliance
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block leading-tight">
                  e-Procurement Portal
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-700 md:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Role Status Banner */}
          <div className="px-4 py-2 bg-blue-50/80 border-b border-blue-100 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-bold text-[11px]">Active Mode:</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                isOfficer
                  ? 'bg-blue-700 text-white'
                  : 'bg-emerald-700 text-white'
              }`}
            >
              {isOfficer ? 'Procurement Officer' : 'Bidder Portal'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <p className="px-2 pb-1 text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              Main Navigation
            </p>
            {items.map((item) => {
              // Only routes that do not have their own sidebar item should inherit a
              // parent's active state. For example, /officer/tenders/bidders is the
              // Bidder Submissions page, not the Tenders & Requirements page.
              const hasMoreSpecificItem = items.some(
                (otherItem) => otherItem.path !== item.path && currentPath === otherItem.path,
              );
              const isActive =
                currentPath === item.path ||
                (!hasMoreSpecificItem && currentPath.startsWith(item.path + '/'));
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-blue-900'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="text-slate-700 font-semibold text-[11px]">NIC Gateway: Connected</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full py-1.5 px-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Portal Home</span>
          </button>
        </div>
      </aside>
    </>
  );
}
