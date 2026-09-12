import React, { useState } from 'react';

export default function RegisterPage({ navigate }) {
  // Step State: 1 = Role & Personal, 2 = Statutory / Dept Details, 3 = Document Upload & DigiLocker, 4 = Security & Review, 5 = Acknowledgement Receipt
  const [currentStep, setCurrentStep] = useState(1);

  // Role Selection ('bidder' or 'officer')
  const [role, setRole] = useState('bidder');

  // Step 1: Account & Contact
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Step 2: Officer Specific Fields
  const [department, setDepartment] = useState('Ministry of Petroleum & Natural Gas');
  const [employeeId, setEmployeeId] = useState('');
  const [designation, setDesignation] = useState('');
  const [division, setDivision] = useState('');
  const [govIdNo, setGovIdNo] = useState('');

  // Step 2: Bidder Specific Fields
  const [companyName, setCompanyName] = useState('');
  const [entityType, setEntityType] = useState('Private Limited');
  const [gstin, setGstin] = useState('');
  const [panNo, setPanNo] = useState('');
  const [gemVendorId, setGemVendorId] = useState('');
  const [registeredAddress, setRegisteredAddress] = useState('');
  const [gstVerified, setGstVerified] = useState(false);
  const [gstDetails, setGstDetails] = useState(null);

  // Step 3: Documents Upload State
  const [uploadedDocs, setUploadedDocs] = useState({
    gstCert: null,
    panCert: null,
    officerId: null,
    otherCert: null,
  });
  const [digiLockerSynced, setDigiLockerSynced] = useState(false);

  // Step 4: Security & Review
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [securityCaptcha, setSecurityCaptcha] = useState('');
  const [captchaValue] = useState('7K9P2');

  // Feedback State
  const [errorMsg, setErrorMsg] = useState('');
  const [registrationRef, setRegistrationRef] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200', text: 'text-slate-400' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600' };
      case 3:
        return { score: 75, label: 'Good', color: 'bg-blue-600', text: 'text-blue-600' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-600', text: 'text-emerald-600' };
      default:
        return { score: 15, label: 'Too Short', color: 'bg-rose-400', text: 'text-rose-500' };
    }
  };

  // Auto-fill Demo Profiles for Testing
  const handleAutoFillDemo = () => {
    setErrorMsg('');
    if (role === 'officer') {
      setFullName('Dr. Ananya Roy');
      setEmail('ananya.roy@mopng.gov.in');
      setMobile('9876543210');
      setIsOtpVerified(true);
      setDepartment('Ministry of Petroleum & Natural Gas');
      setEmployeeId('GOI-OFF-9942');
      setDesignation('Chief Procurement Specialist');
      setDivision('Commercial & Contracts Division');
      setGovIdNo('EPRAMAAN-GOV-88219');
      setPassword('OfficerPass@2026');
      setConfirmPassword('OfficerPass@2026');
      setAgreedTerms(true);
      setSecurityCaptcha('7K9P2');
      setUploadedDocs({
        gstCert: null,
        panCert: null,
        officerId: { name: 'GOI_Identity_Card_Ananya.pdf', size: '1.4 MB', verified: true },
        otherCert: { name: 'Deputation_Order_MoPNG.pdf', size: '890 KB', verified: true },
      });
    } else {
      setFullName('Vikram Sharma');
      setEmail('v.sharma@alphaenergy.co.in');
      setMobile('9812345678');
      setIsOtpVerified(true);
      setCompanyName('Alpha Energy Infrastructure Pvt Ltd');
      setEntityType('Private Limited');
      setGstin('27AAACA12341Z5');
      setPanNo('AAACA12341');
      setGemVendorId('GEM-VND-2026-9941');
      setRegisteredAddress('Plot 42, Tech Park, Sector 62, Noida, UP - 201301');
      setGstVerified(true);
      setGstDetails({
        legalName: 'Alpha Energy Infrastructure Private Limited',
        status: 'Active',
        jurisdiction: 'Noida Sector 62, Uttar Pradesh',
        regDate: '14-May-2018',
      });
      setPassword('BidderPass@2026');
      setConfirmPassword('BidderPass@2026');
      setAgreedTerms(true);
      setSecurityCaptcha('7K9P2');
      setUploadedDocs({
        gstCert: { name: 'GST_Reg_Certificate_2026.pdf', size: '1.2 MB', verified: true },
        panCert: { name: 'PAN_Card_AlphaEnergy.pdf', size: '450 KB', verified: true },
        officerId: null,
        otherCert: { name: 'MSME_Udyam_Registration.pdf', size: '980 KB', verified: true },
      });
      setDigiLockerSynced(true);
    }
  };

  // Simulate GSTIN Live Verification
  const handleVerifyGstin = () => {
    if (!gstin || gstin.length < 15) {
      setErrorMsg('Please enter a valid 15-digit GSTIN number (e.g. 27AAACA12341Z5).');
      return;
    }
    setErrorMsg('');
    setGstVerified(true);
    setGstDetails({
      legalName: companyName || 'Alpha Energy Infrastructure Private Limited',
      status: 'ACTIVE',
      jurisdiction: 'State Tax Office, Circle-IV',
      regDate: '14-May-2018',
      taxpayerType: 'Regular Taxpayer',
    });
  };

  // Simulate DigiLocker Quick Sync
  const handleDigiLockerSync = () => {
    setDigiLockerSynced(true);
    if (role === 'bidder') {
      setCompanyName('Alpha Energy Infrastructure Pvt Ltd');
      setGstin('27AAACA12341Z5');
      setPanNo('AAACA12341');
      setGemVendorId('GEM-VND-2026-9941');
      setRegisteredAddress('Plot 42, Tech Park, Sector 62, Noida, UP - 201301');
      setGstVerified(true);
      setGstDetails({
        legalName: 'Alpha Energy Infrastructure Private Limited',
        status: 'Active',
        jurisdiction: 'Noida Sector 62, UP',
        regDate: '14-May-2018',
      });
      setUploadedDocs((prev) => ({
        ...prev,
        gstCert: { name: 'DigiLocker_GSTIN_Certificate.pdf', size: '1.1 MB', verified: true },
        panCert: { name: 'DigiLocker_PAN_Verification.pdf', size: '380 KB', verified: true },
      }));
    } else {
      setGovIdNo('EPRAMAAN-GOV-88219');
      setUploadedDocs((prev) => ({
        ...prev,
        officerId: { name: 'DigiLocker_ePramaan_GovtID.pdf', size: '1.2 MB', verified: true },
      }));
    }
  };

  // Simulate OTP Verification
  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number first.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setShowOtpModal(true);
  };

  const handleConfirmOtp = () => {
    if (otpInput === '123456' || otpInput.length === 6 || otpSent) {
      setIsOtpVerified(true);
      setShowOtpModal(false);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid OTP. Please enter 123456 for demo verification.');
    }
  };

  // Handle Mock File Upload
  const handleFileUpload = (docKey, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedDocs((prev) => ({
        ...prev,
        [docKey]: {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          verified: true,
        },
      }));
    }
  };

  // Remove File
  const handleRemoveFile = (docKey) => {
    setUploadedDocs((prev) => ({ ...prev, [docKey]: null }));
  };

  // Validate Step Transitions
  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your Full Name.');
        return;
      }
      if (!email.trim()) {
        setErrorMsg('Please enter a valid Official Email ID.');
        return;
      }
      if (role === 'officer' && !email.includes('.gov.in') && !email.includes('.nic.in') && !email.includes('.co.in') && !email.includes('.in')) {
        setErrorMsg('Procurement Officers must use an official government or PSU domain email address (e.g. name@mopng.gov.in).');
        return;
      }
      if (!mobile || mobile.length < 10) {
        setErrorMsg('Please enter a valid 10-digit Mobile Number.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (role === 'officer') {
        if (!employeeId.trim()) {
          setErrorMsg('Please enter your Govt Employee ID.');
          return;
        }
        if (!designation.trim()) {
          setErrorMsg('Please enter your Official Designation.');
          return;
        }
        if (!govIdNo.trim()) {
          setErrorMsg('Please enter your Officer Identity Proof / e-Pramaan ID.');
          return;
        }
      } else {
        if (!companyName.trim()) {
          setErrorMsg('Please enter Company Legal Name.');
          return;
        }
        if (!gstin.trim() || gstin.length < 15) {
          setErrorMsg('Please enter a valid 15-digit GSTIN number.');
          return;
        }
        if (!panNo.trim() || panNo.length < 10) {
          setErrorMsg('Please enter a valid 10-digit PAN number.');
          return;
        }
        if (!registeredAddress.trim()) {
          setErrorMsg('Please enter the Registered Business Address.');
          return;
        }
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  // Submit Final Registration
  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify password entries.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('You must accept the official declaration and legal compliance terms.');
      return;
    }
    if (securityCaptcha.toUpperCase() !== captchaValue) {
      setErrorMsg('Invalid Security CAPTCHA code. Please enter 7K9P2.');
      return;
    }

    // Generate unique Registration Reference ID
    const randomRef = `REG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegistrationRef(randomRef);
    setCurrentStep(5);
  };

  const passStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-center items-center px-4 py-8 md:py-12">
      {/* Top Tri-color Ribbon */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-600 z-50" />

      <div className="w-full max-w-3xl bg-white border border-slate-300 rounded-xl p-5 sm:p-8 shadow-xl my-4 relative">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-5 mb-6 gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div
              onClick={() => navigate('/')}
              className="inline-flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-blue-900 text-white font-extrabold shadow-md cursor-pointer shrink-0 border border-blue-950 hover:bg-blue-800 transition-colors"
            >
              <span className="text-[10px] tracking-widest uppercase leading-none">GOI</span>
              <span className="text-[8px] font-semibold opacity-90 leading-none mt-0.5">SIH26</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                e-Procurement Portal Onboarding
                <span className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                  GOI Portal
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Ministry of Petroleum & Natural Gas • Central Public Procurement Platform
              </p>
            </div>
          </div>

          {/* Quick Auto-fill Testing Helper */}
          {currentStep < 5 && (
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-extrabold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Click to auto-populate complete demo dataset for instant step testing"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto-Fill Demo Data
            </button>
          )}
        </div>

        {/* Stepper Navigation Indicator */}
        {currentStep < 5 && (
          <div className="mb-6 bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4">
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
              {[
                { step: 1, title: 'Identity & Contact' },
                { step: 2, title: role === 'officer' ? 'Dept Credentials' : 'Statutory & Tax' },
                { step: 3, title: 'Docs & DigiLocker' },
                { step: 4, title: 'Security & Submit' },
              ].map((s) => {
                const isActive = currentStep === s.step;
                const isPassed = currentStep > s.step;
                return (
                  <div
                    key={s.step}
                    onClick={() => {
                      if (isPassed) setCurrentStep(s.step);
                    }}
                    className={`flex flex-col items-center p-2 rounded-md transition-all ${
                      isPassed ? 'cursor-pointer' : ''
                    } ${
                      isActive
                        ? 'bg-blue-900 text-white shadow-xs'
                        : isPassed
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
                          isActive
                            ? 'bg-white text-blue-900'
                            : isPassed
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isPassed ? '✓' : s.step}
                      </span>
                      <span className="hidden md:inline truncate">{s.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-300 rounded-lg text-rose-900 text-xs font-semibold flex items-center gap-2.5">
            <svg className="w-4 h-4 text-rose-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex-1">{errorMsg}</span>
            <button
              onClick={() => setErrorMsg('')}
              className="text-rose-500 hover:text-rose-800 font-bold text-sm px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* STEP 1: Account & Role Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">
                1. Select Portal Registration Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => {
                    setRole('bidder');
                    setErrorMsg('');
                  }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    role === 'bidder'
                      ? 'border-blue-900 bg-blue-50/60 text-blue-950 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${role === 'bidder' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Bidder / Vendor Registration</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      For Private Companies, PSUs, MSEs, & Startups participating in Govt Tenders.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setRole('officer');
                    setErrorMsg('');
                  }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    role === 'officer'
                      ? 'border-blue-900 bg-blue-50/60 text-blue-950 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${role === 'officer' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Procurement Officer</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      For Ministry Officials, Evaluators & Tender Inviting Authorities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-900" />
                Personal Contact & Verification Details
              </h3>

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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    placeholder="e.g. Dr. Ananya Roy / Rajesh Kumar"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {role === 'officer' ? 'Official Govt Email ID' : 'Official Corporate Email ID'} <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    placeholder={role === 'officer' ? 'ananya.roy@mopng.gov.in' : 'v.sharma@alphaenergy.co.in'}
                  />
                </div>
              </div>

              {/* Mobile Number + OTP Verification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (e-Pramaan Registered) <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      placeholder="9876543210"
                    />
                    {isOtpVerified && (
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-emerald-600 flex items-center gap-1">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  {isOtpVerified ? (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      Mobile & Email Verified via Aadhaar / e-Pramaan OTP
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {otpSent ? 'Resend OTP Verification Code' : 'Verify Mobile via OTP'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md flex items-center gap-2"
              >
                Continue to Step 2: {role === 'officer' ? 'Department Credentials' : 'Statutory & Tax Info'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Role Specific Credentials (Officer vs Bidder) */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {role === 'officer' ? (
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-900" />
                  2. Procurement Officer & Department Credentials
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ministry / PSU Department <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
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
                      Govt Employee ID / Officer Code <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      placeholder="GOI-OFF-9942"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Designation <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      placeholder="Chief Procurement Specialist"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cadre / Department Division <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      placeholder="Commercial & Contracts Division"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Officer Identity Proof / e-Pramaan ID <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={govIdNo}
                    onChange={(e) => setGovIdNo(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white font-mono"
                    placeholder="EPRAMAAN-GOV-88219"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Verified against Central Civil Services e-Pramaan Directory & Ministry Identity Portal.
                  </p>
                </div>
              </div>
            ) : (
              /* Bidder Statutory Info */
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-900" />
                    2. Bidder Statutory Tax & Corporate Credentials
                  </h3>

                  <button
                    type="button"
                    onClick={handleDigiLockerSync}
                    className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    DigiLocker Quick Sync
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Legal Registered Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      placeholder="Alpha Energy Infrastructure Pvt Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Organization Entity Type <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    >
                      <option value="Private Limited">Private Limited (Pvt Ltd)</option>
                      <option value="Public Limited">Public Limited (Ltd)</option>
                      <option value="Partnership / LLP">Partnership / LLP</option>
                      <option value="Proprietorship">Sole Proprietorship</option>
                      <option value="MSE / Micro Enterprise">MSE / Micro Enterprise</option>
                      <option value="DPIIT Recognized Startup">DPIIT Recognized Startup</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      GSTIN Number <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value.toUpperCase())}
                        required
                        maxLength={15}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono uppercase text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                        placeholder="27AAACA12341Z5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company PAN Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                      required
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono uppercase text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      placeholder="AAACA12341"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      GeM Vendor ID / Udyam No <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={gemVendorId}
                      onChange={(e) => setGemVendorId(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      placeholder="GEM-VND-2026-9941"
                    />
                  </div>
                </div>

                {/* GST Live API Verify Button */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <button
                    type="button"
                    onClick={handleVerifyGstin}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md font-bold text-xs transition-colors cursor-pointer shrink-0"
                  >
                    {gstVerified ? '✓ Re-verify GSTIN API' : 'Verify GSTIN on Govt Portal'}
                  </button>
                  {gstVerified && gstDetails ? (
                    <div className="text-[11px] text-emerald-950 font-medium">
                      <span className="font-bold text-emerald-800">✓ Status: ACTIVE</span> | Legal: {gstDetails.legalName} ({gstDetails.jurisdiction})
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      Click to perform instant sandbox validation against GST & Income Tax API databases.
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Registered Office Business Address <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    value={registeredAddress}
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                    required
                    rows={2}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    placeholder="Plot 42, Tech Park, Sector 62, Noida, UP - 201301..."
                  />
                </div>
              </div>
            )}

            {/* Step 2 Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                ← Back to Step 1
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md flex items-center gap-2"
              >
                Continue to Step 3: Document Uploads
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Document Uploads & DigiLocker Sync */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-900" />
                  3. Proof of Registration Documents & DigiLocker Vault
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Upload PDF proofs or pull authenticated documents directly from DigiLocker.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDigiLockerSync}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                  digiLockerSynced
                    ? 'bg-emerald-700 text-white'
                    : 'bg-sky-600 hover:bg-sky-700 text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {digiLockerSynced ? '✓ Synced with DigiLocker Vault' : 'Import All from DigiLocker'}
              </button>
            </div>

            {/* Document Upload Cards */}
            <div className="grid grid-cols-1 gap-3">
              {/* GST Certificate (Bidder) or Officer Deputation Order */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    {role === 'officer' ? 'Official Deputation Order / Appointment Letter' : 'GST Registration Certificate'}
                    <span className="text-[10px] text-rose-600 font-bold">* Mandatory</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">PDF or PNG scan (Max size: 5MB)</p>
                </div>

                {uploadedDocs.gstCert ? (
                  <div className="flex items-center gap-2 bg-white p-2 rounded border border-emerald-300 text-emerald-950 text-xs">
                    <span className="font-bold">📄 {uploadedDocs.gstCert.name}</span>
                    <span className="text-[10px] text-slate-400">({uploadedDocs.gstCert.size})</span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      ✓ AI Verified
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('gstCert')}
                      className="text-rose-500 hover:text-rose-700 font-bold ml-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="px-4 py-2 bg-white border border-slate-300 hover:border-blue-900 rounded-lg text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-xs">
                    Browse & Upload PDF
                    <input
                      type="file"
                      accept=".pdf,.png,.jpeg"
                      onChange={(e) => handleFileUpload('gstCert', e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* PAN Card / Officer Identity Card */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    {role === 'officer' ? 'Govt Identity Card / e-Pramaan Card' : 'Company PAN Card Copy'}
                    <span className="text-[10px] text-rose-600 font-bold">* Mandatory</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">PDF or PNG scan (Max size: 5MB)</p>
                </div>

                {uploadedDocs.panCert || uploadedDocs.officerId ? (
                  <div className="flex items-center gap-2 bg-white p-2 rounded border border-emerald-300 text-emerald-950 text-xs">
                    <span className="font-bold">📄 {uploadedDocs.panCert?.name || uploadedDocs.officerId?.name}</span>
                    <span className="text-[10px] text-slate-400">({uploadedDocs.panCert?.size || uploadedDocs.officerId?.size})</span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      ✓ AI Verified
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(role === 'officer' ? 'officerId' : 'panCert')}
                      className="text-rose-500 hover:text-rose-700 font-bold ml-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="px-4 py-2 bg-white border border-slate-300 hover:border-blue-900 rounded-lg text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-xs">
                    Browse & Upload PDF
                    <input
                      type="file"
                      accept=".pdf,.png,.jpeg"
                      onChange={(e) => handleFileUpload(role === 'officer' ? 'officerId' : 'panCert', e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* MSME / Additional Cert */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    {role === 'officer' ? 'Security Clearance / Vigilance Undertaking' : 'MSME Udyam / DPIIT Startup Certificate'}
                    <span className="text-[10px] text-slate-400 font-bold">(Optional)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Exemption certificate if applicable</p>
                </div>

                {uploadedDocs.otherCert ? (
                  <div className="flex items-center gap-2 bg-white p-2 rounded border border-emerald-300 text-emerald-950 text-xs">
                    <span className="font-bold">📄 {uploadedDocs.otherCert.name}</span>
                    <span className="text-[10px] text-slate-400">({uploadedDocs.otherCert.size})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('otherCert')}
                      className="text-rose-500 hover:text-rose-700 font-bold ml-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="px-4 py-2 bg-white border border-slate-300 hover:border-blue-900 rounded-lg text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-xs">
                    Browse & Upload PDF
                    <input
                      type="file"
                      accept=".pdf,.png,.jpeg"
                      onChange={(e) => handleFileUpload('otherCert', e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Step 3 Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                ← Back to Step 2
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md flex items-center gap-2"
              >
                Continue to Step 4: Security & Review
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Password, Declaration & Submit */}
        {currentStep === 4 && (
          <form onSubmit={handleSubmitRegistration} className="space-y-6 text-xs">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-blue-900" />
              4. Password Credentials & Official Security Verification
            </h3>

            {/* Password Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Portal Login Password <span className="text-rose-600">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  placeholder="••••••••••••"
                />

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-500">Password Strength:</span>
                      <span className={passStrength.text}>{passStrength.label}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${passStrength.color}`}
                        style={{ width: `${passStrength.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-600">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Security CAPTCHA Verification */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-0.5">
                  Security CAPTCHA Code <span className="text-rose-600">*</span>
                </label>
                <p className="text-[11px] text-slate-500">Enter the characters shown in the security box</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-slate-900 text-amber-400 font-mono tracking-widest text-lg font-black rounded border border-slate-700 select-none shadow-xs">
                  {captchaValue}
                </div>
                <input
                  type="text"
                  value={securityCaptcha}
                  onChange={(e) => setSecurityCaptcha(e.target.value)}
                  required
                  className="w-28 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="7K9P2"
                />
              </div>
            </div>

            {/* Official Legal Declaration Checkbox */}
            <div className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-900 focus:ring-blue-900 shrink-0"
                />
                <span className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  I hereby declare that all information, statutory records ({role === 'officer' ? 'Govt Employee ID & Cadre' : 'GSTIN, PAN & GeM ID'}), and uploaded documents are accurate and authentic under the Information Technology Act & Central Public Procurement Rules. I consent to AI document validation and DigiLocker verification.
                </span>
              </label>
            </div>

            {/* Step 4 Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                ← Back to Step 3
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-extrabold rounded-lg text-xs transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                Complete Onboarding Application as {role === 'officer' ? 'Procurement Officer' : 'Bidder'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Registration Acknowledgement Receipt (Success Screen) */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md border-2 border-emerald-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-200 text-emerald-950 rounded-full font-mono text-[11px] font-black tracking-wider uppercase">
                  Application Reference: {registrationRef}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">Registration Application Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Your onboarding credentials for <span className="font-bold text-slate-900">{fullName}</span> as{' '}
                  <span className="font-bold underline text-blue-900">
                    {role === 'officer' ? 'Procurement Officer' : 'Bidder / Vendor'}
                  </span>{' '}
                  have been validated and logged in the Central Procurement Registry.
                </p>
              </div>

              {/* Printable Registration Slip Summary */}
              <div className="p-4 bg-white border border-slate-300 rounded-lg text-left text-xs space-y-2 text-slate-700 shadow-xs font-mono">
                <div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-slate-900 font-sans">
                  <span>Portal Registration Slip</span>
                  <span className="text-emerald-700">● Verification Status: PRE-VERIFIED</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p><span className="font-bold text-slate-900">Full Name:</span> {fullName}</p>
                  <p><span className="font-bold text-slate-900">Email:</span> {email}</p>
                  <p><span className="font-bold text-slate-900">Mobile:</span> +91 {mobile}</p>
                  {role === 'officer' ? (
                    <>
                      <p><span className="font-bold text-slate-900">Department:</span> {department}</p>
                      <p><span className="font-bold text-slate-900">Employee ID:</span> {employeeId}</p>
                      <p><span className="font-bold text-slate-900">Cadre/Designation:</span> {designation}</p>
                    </>
                  ) : (
                    <>
                      <p><span className="font-bold text-slate-900">Company Name:</span> {companyName}</p>
                      <p><span className="font-bold text-slate-900">GSTIN:</span> {gstin}</p>
                      <p><span className="font-bold text-slate-900">PAN No:</span> {panNo}</p>
                      <p><span className="font-bold text-slate-900">GeM Vendor ID:</span> {gemVendorId}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Next Steps Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate(role === 'officer' ? '/officer/dashboard' : '/bidder/dashboard')}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-extrabold rounded-lg text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to {role === 'officer' ? 'Officer Portal' : 'Bidder Dashboard'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Return to Sign In Page
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
          Already registered on the e-Procurement Portal?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-900 font-bold hover:underline cursor-pointer"
          >
            Sign In here
          </button>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-300 rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Enter OTP Verification Code</h3>
              <p className="text-xs text-slate-500 mt-1">
                A 6-digit OTP code has been sent to <span className="font-bold text-slate-800">+91 {mobile}</span> and <span className="font-bold text-slate-800">{email}</span>.
              </p>
              <p className="text-[11px] text-blue-900 font-semibold mt-1">
                Demo Code: <span className="font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200">123456</span>
              </p>
            </div>

            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-center text-lg tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="123456"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="w-1/2 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmOtp}
                className="w-1/2 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs cursor-pointer"
              >
                Verify & Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
