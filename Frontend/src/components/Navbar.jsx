import React, { useState } from 'react';
import { CURRENT_USER_OFFICER, CURRENT_USER_BIDDER } from '../data/mockData';

export default function Navbar({ role = 'officer', onToggleSidebar, navigate }) {
  const isOfficer = role === 'officer';
  const user = isOfficer ? CURRENT_USER_OFFICER : CURRENT_USER_BIDDER;
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-blue-900 border-b border-blue-950 sticky top-0 z-30 shadow-md">
      <div className="h-14 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile drawer toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded text-blue-100 hover:bg-blue-800 md:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Department badge / Title */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-800 text-white text-[10px] font-extrabold uppercase tracking-wider rounded border border-blue-700">
              ProcuraAI Engine
            </span>
            <span className="text-blue-300">|</span>
            <span className="text-xs font-bold text-white">
              {isOfficer ? ' Procurement Officer Interface' : 'Authorized Vendor Portal'}
            </span>
          </div>

          {/* Search bar */}
          <div className="relative hidden xl:block w-72 ml-4">
            <input
              type="text"
              placeholder="Search tender ID, vendor, clause..."
              className="w-full pl-8 pr-3 py-1 bg-blue-950/60 border border-blue-700 rounded text-xs text-white placeholder-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-blue-950"
            />
            <svg
              className="w-3.5 h-3.5 text-blue-200 absolute left-2.5 top-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded text-blue-100 hover:bg-blue-800 relative cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                />
              </svg>
              <span className="hidden sm:inline">Alerts</span>
              {/* <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" /> */}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-300 rounded-md shadow-lg p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 font-bold text-slate-900">
                  <span>Procurement System Alerts</span>
                  <span className="text-[10px] bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded font-bold border border-blue-200">
                    2 New
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded text-rose-900">
                    <p className="font-bold text-[11px]">Address Mismatch Detected</p>
                    <p className="text-[10px] text-rose-700 mt-0.5">Apex Marine GST address differs from submitted PAN.</p>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                    <p className="font-bold text-[11px]">DigiLocker Verification Passed</p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">Alpha Energy GST & PAN certificates matched.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-blue-500">
            <div className="w-7 h-7 rounded bg-white text-blue-800 font-black flex items-center justify-center text-xs border border-blue-300 shadow-2xs">
              {user.avatar}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-extrabold text-white leading-tight">{user.name}</p>
              <p className="text-[10px] text-blue-200 font-semibold leading-tight">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
