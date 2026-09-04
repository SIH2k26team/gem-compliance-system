import React, { useState } from 'react';
import { CURRENT_USER_OFFICER, CURRENT_USER_BIDDER } from '../data/mockData';

export default function Navbar({ role = 'officer', onToggleSidebar, navigate }) {
  const isOfficer = role === 'officer';
  const user = isOfficer ? CURRENT_USER_OFFICER : CURRENT_USER_BIDDER;
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      {/* Top Tricolor Accent Stripe (Govt of India style) */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

      <div className="h-14 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile drawer toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Department Header text */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
            <span className="text-xs font-black text-blue-900 tracking-tight">
              Ministry of Petroleum & Natural Gas
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-600">
              Government of India
            </span>
          </div>

          {/* Search bar */}
          <div className="relative hidden lg:block w-72">
            <input
              type="text"
              placeholder="Search tender ID, bidder, clause..."
              className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:bg-white"
            />
            <svg
              className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2"
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
          {/* Role Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded border border-slate-300 text-xs font-bold">
            <button
              onClick={() => navigate('/officer/dashboard')}
              className={`px-3 py-1 rounded transition-all cursor-pointer text-xs ${
                isOfficer
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-blue-900'
              }`}
            >
              Officer Portal
            </button>
            <button
              onClick={() => navigate('/bidder/dashboard')}
              className={`px-3 py-1 rounded transition-all cursor-pointer text-xs ${
                !isOfficer
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-blue-900'
              }`}
            >
              Bidder Portal
            </button>
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100 relative cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-600 rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-300 rounded-lg shadow-xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 font-bold text-slate-900">
                  <span>Procurement Notifications</span>
                  <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-bold">
                    3 Unread
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded text-rose-900">
                    <p className="font-bold">⚠️ Red Flag Alert</p>
                    <p className="text-[11px] text-rose-800">Apex Marine: Address contradiction across GST & Exp certificate.</p>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                    <p className="font-bold">✅ DigiLocker Verification Passed</p>
                    <p className="text-[11px] text-emerald-800">Alpha Energy Infra GST records verified against GSTN portal.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-7 h-7 rounded bg-blue-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {user.avatar}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-extrabold text-slate-900 leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
