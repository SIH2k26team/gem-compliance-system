import React, { useState } from 'react';

export default function RegisterPage({ navigate }) {
  // Role selection ('bidder' or 'officer')
  const [role, setRole] = useState('bidder');

  // Basic Info Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  // Bidder Specific Basic Info
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');

  // Officer Specific Basic Info
  const [department, setDepartment] = useState('Ministry of Petroleum & Natural Gas');
  const [employeeId, setEmployeeId] = useState('');

  // Password Fields
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [registrationRef, setRegistrationRef] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (role === 'bidder') {
      if (!companyName.trim()) {
        setErrorMsg('Please enter your company name.');
        return;
      }
      if (!gstin.trim()) {
        setErrorMsg('Please enter GSTIN number.');
        return;
      }
    } else {
      if (!employeeId.trim()) {
        setErrorMsg('Please enter your Government Employee ID.');
        return;
      }
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your password.');
      return;
    }

    const ref = `REG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegistrationRef(ref);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-center items-center px-4 py-8 md:py-12">
      {/* Top Tri-color Ribbon */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-slate-200 to-emerald-600 z-50" />

      <div className="w-full max-w-xl bg-white border border-slate-300 rounded-lg p-6 sm:p-8 shadow-sm my-4 relative">
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-6">
          <div
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded bg-slate-900 text-slate-50 font-black text-xs flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-800 transition-colors shrink-0"
          >
            PA
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              e-Procurement Portal Registration
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ministry of Petroleum & Natural Gas • Central Procurement System
            </p>
          </div>
        </div>

        {submitted ? (
          /* Registration Success Screen */
          <div className="space-y-6">
            <div className="bg-emerald-50/50 border border-emerald-300 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded font-mono text-[11px] font-bold tracking-wider uppercase border border-emerald-200">
                  Reference: {registrationRef}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-3">Registration Submitted Successfully</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Account created for <span className="font-bold text-slate-900">{fullName}</span> as{' '}
                  <span className="font-bold underline text-slate-900">
                    {role === 'officer' ? 'Procurement Officer' : 'Bidder / Vendor'}
                  </span>.
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 bg-white border border-slate-200 rounded text-left text-xs space-y-1.5 text-slate-700 shadow-2xs font-mono">
                <p><span className="font-bold text-slate-900 font-sans">Full Name:</span> {fullName}</p>
                <p><span className="font-bold text-slate-900 font-sans">Email:</span> {email}</p>
                <p><span className="font-bold text-slate-900 font-sans">Mobile:</span> +91 {mobile}</p>
                {role === 'officer' ? (
                  <>
                    <p><span className="font-bold text-slate-900 font-sans">Department:</span> {department}</p>
                    <p><span className="font-bold text-slate-900 font-sans">Employee ID:</span> {employeeId}</p>
                  </>
                ) : (
                  <>
                    <p><span className="font-bold text-slate-900 font-sans">Company Name:</span> {companyName}</p>
                    <p><span className="font-bold text-slate-900 font-sans">GSTIN:</span> {gstin}</p>
                  </>
                )}
              </div>

              {/* Next Steps Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate(role === 'officer' ? '/officer/dashboard' : '/bidder/dashboard')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  Proceed to {role === 'officer' ? 'Officer Portal' : 'Bidder Dashboard'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-xs transition-colors cursor-pointer border border-slate-300"
                >
                  Sign In Page
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Error Message Banner */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded text-rose-900 text-xs font-semibold flex items-center justify-between">
                <span>{errorMsg}</span>
                <button
                  type="button"
                  onClick={() => setErrorMsg('')}
                  className="text-rose-600 hover:text-rose-900 font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Role Selection Tabs */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                Select Account Role
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded border border-slate-200 font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setRole('bidder');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    role === 'bidder'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Bidder / Vendor
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('officer');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    role === 'officer'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Procurement Officer
                </button>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
                Basic Information
              </h3>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {role === 'officer' ? 'Official Government Email ID' : 'Official Email ID'} <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    placeholder={role === 'officer' ? 'officer@mopng.gov.in' : 'contact@company.com'}
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  maxLength={10}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  placeholder="10-digit mobile number"
                />
              </div>

              {/* Role Specific Basic Fields */}
              {role === 'bidder' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                      placeholder="Company Legal Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      GSTIN Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      required
                      maxLength={15}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-mono uppercase text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                      placeholder="e.g. 27AAACA12341Z5"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Department / Ministry <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    >
                      <option value="Ministry of Petroleum & Natural Gas">Ministry of Petroleum & Natural Gas</option>
                      <option value="ONGC - Oil and Natural Gas Corporation">ONGC - Oil and Natural Gas Corporation</option>
                      <option value="IOCL - Indian Oil Corporation Limited">IOCL - Indian Oil Corporation Limited</option>
                      <option value="GAIL (India) Limited">GAIL (India) Limited</option>
                      <option value="HPCL - Hindustan Petroleum Corp Ltd">HPCL - Hindustan Petroleum Corp Ltd</option>
                      <option value="BPCL - Bharat Petroleum Corp Ltd">BPCL - Bharat Petroleum Corp Ltd</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Govt Employee ID <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                      placeholder="e.g. GOI-OFF-9942"
                    />
                  </div>
                </div>
              )}

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-xs transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                Register Account as {role === 'officer' ? 'Procurement Officer' : 'Bidder'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        )}

        {/* Footer Link */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
          Already registered on the e-Procurement Portal?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-slate-900 font-bold hover:underline cursor-pointer"
          >
            Sign In here
          </button>
        </div>
      </div>
    </div>
  );
}

