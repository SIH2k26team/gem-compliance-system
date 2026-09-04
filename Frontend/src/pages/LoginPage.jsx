import React, { useState } from 'react';

export default function LoginPage({ navigate }) {
  const [role, setRole] = useState('officer');
  const [email, setEmail] = useState('rajesh.kumar@mopng.gov.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'officer') {
      navigate('/officer/dashboard');
    } else {
      navigate('/bidder/dashboard');
    }
  };

  const handleDemoOfficer = () => {
    setRole('officer');
    setEmail('rajesh.kumar@mopng.gov.in');
    navigate('/officer/dashboard');
  };

  const handleDemoBidder = () => {
    setRole('bidder');
    setEmail('v.sharma@alphaenergy.co.in');
    navigate('/bidder/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-4 py-12">
      {/* Top Ribbon */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-600 z-50" />

      <div className="w-full max-w-md bg-white border border-slate-300 rounded-lg p-8 shadow-md">
        <div className="text-center mb-6">
          <div
            onClick={() => navigate('/')}
            className="inline-flex flex-col items-center justify-center w-12 h-12 rounded bg-blue-900 text-white font-extrabold shadow-xs cursor-pointer mb-2 border border-blue-950"
          >
            <span className="text-[10px] tracking-widest uppercase leading-none">GOI</span>
            <span className="text-[8px] font-semibold opacity-90 leading-none mt-0.5">SIH26</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">e-Procurement Portal Sign In</h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Ministry of Petroleum & Natural Gas</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded border border-slate-200 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setRole('officer');
              setEmail('rajesh.kumar@mopng.gov.in');
            }}
            className={`py-2 rounded transition-all cursor-pointer ${
              role === 'officer'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Procurement Officer
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('bidder');
              setEmail('v.sharma@alphaenergy.co.in');
            }}
            className={`py-2 rounded transition-all cursor-pointer ${
              role === 'bidder'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bidder / Vendor
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Government Email / Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white"
              placeholder="name@mopng.gov.in"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded transition-all shadow-xs cursor-pointer text-xs mt-1"
          >
            Sign In to {role === 'officer' ? 'Officer Portal' : 'Bidder Portal'}
          </button>
        </form>

        {/* Quick Demo Access */}
        <div className="mt-6 pt-5 border-t border-slate-200 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Phase 1 Quick Access Demo
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={handleDemoOfficer}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded font-bold transition-colors cursor-pointer"
            >
              Demo Officer
            </button>
            <button
              onClick={handleDemoBidder}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded font-bold transition-colors cursor-pointer"
            >
              Demo Bidder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
