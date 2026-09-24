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
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-center items-center px-4 py-12">

      <div className="w-full max-w-md bg-white border border-slate-300 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-6">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-slate-900 cursor-pointer mb-3 group"
          >
            <div className="w-9 h-9 rounded bg-blue-700 text-slate-50 font-black text-xs flex items-center justify-center shadow-xs">
              PA
            </div>
            <div className="text-left">
              <span className="block text-base font-extrabold tracking-tight leading-none text-slate-900">ProcuraAI</span>
              <span className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">Procurement Portal</span>
            </div>
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Sign In to Enterprise Portal</h2>
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
                ? 'bg-blue-700 text-white shadow-xs'
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
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bidder / Vendor
          </button>
        </div>

       

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              {role === 'officer' ? 'Government Email ID' : 'Registered Business Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white font-mono text-xs"
              placeholder={role === 'officer' ? 'name@mopng.gov.in' : 'vendor@company.co.in'}
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-700 hover:bg-slate-800 text-white font-bold rounded transition-all shadow-xs cursor-pointer text-xs mt-1"
          >
            Sign In to {role === 'officer' ? 'Officer Portal' : 'Bidder Portal'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-slate-900 font-bold hover:underline cursor-pointer"
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
}
