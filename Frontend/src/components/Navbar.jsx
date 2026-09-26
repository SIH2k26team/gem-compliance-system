import React, { useState, useRef, useEffect } from 'react';
import { CURRENT_USER_OFFICER, CURRENT_USER_BIDDER } from '../data/mockData';

export default function Navbar({ role = 'officer', onToggleSidebar, navigate }) {
  const isOfficer = role === 'officer';
  const user = isOfficer ? CURRENT_USER_OFFICER : CURRENT_USER_BIDDER;
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            
            <span className="text-xs font-bold text-white">
              {isOfficer ? ' Procurement Officer Interface' : 'Authorized Vendor Portal'}
            </span>
          </div>

          {/* Search bar */}
          <div className="relative hidden xl:block w-72 ml-4">
            <input
              type="text"
              placeholder="Search tender ID, vendor, clause..."
              className="w-full pl-8 pr-3 py-1 bg-blue-950/60 border border-blue-700 rounded text-xs text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-blue-950"
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
              className="p-1.5 rounded text-white hover:bg-blue-800 relative cursor-pointer flex items-center gap-1 text-xs font-semibold"
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

          {/* User Badge - Clickable for Bidders */}
          <div className="relative" ref={profileMenuRef}>
            <div
              onClick={() => {
                if (!isOfficer) {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }
              }}
              className={`flex items-center gap-2 pl-3 border-l border-blue-500 ${
                !isOfficer ? 'cursor-pointer group' : ''
              }`}
              role={!isOfficer ? 'button' : undefined}
              aria-label={!isOfficer ? 'Open profile menu' : undefined}
            >
              <div className={`w-7 h-7 rounded bg-white text-blue-800 font-black flex items-center justify-center text-xs border border-blue-300 shadow-2xs transition-all ${
                !isOfficer ? 'group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-offset-1 group-hover:ring-offset-blue-900' : ''
              }`}>
                {user.avatar}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className={`font-extrabold text-white leading-tight ${!isOfficer ? 'group-hover:text-blue-200 transition-colors' : ''}`}>{user.name}</p>
                <p className="text-[10px] text-blue-200 font-semibold leading-tight">{user.role}</p>
              </div>
              {/* Dropdown chevron for bidders */}
              {!isOfficer && (
                <svg className={`w-3.5 h-3.5 text-blue-300 hidden lg:block transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>

            {/* Profile Dropdown - Only for Bidders */}
            {!isOfficer && showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden animate-dropdown">
                {/* User info header */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 text-white font-black flex items-center justify-center text-xs shadow-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/bidder/profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors cursor-pointer text-left"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/bidder/digilocker');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors cursor-pointer text-left"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    DigiLocker Verification
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/bidder/dashboard');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition-colors cursor-pointer text-left"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </button>
                </div>

                {/* Divider + Sign out */}
                <div className="border-t border-slate-200 py-1.5">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown animation */}
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown {
          animation: dropdownIn 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
}

