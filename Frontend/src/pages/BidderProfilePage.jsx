import React, { useState, useEffect } from 'react';
import AppLayout from '../layouts/AppLayout';
import { BIDDER_PROFILE_DETAILS, CURRENT_USER_BIDDER } from '../data/mockData';

export default function BidderProfilePage({ navigate, currentPath }) {
  // Clone profile data into editable state
  const [profile, setProfile] = useState({ ...BIDDER_PROFILE_DETAILS });
  const [editSection, setEditSection] = useState(null); // 'personal' | 'company' | 'bank' | 'signatory' | null
  const [saved, setSaved] = useState(false);
  const [draftProfile, setDraftProfile] = useState({ ...BIDDER_PROFILE_DETAILS });

  const startEdit = (section) => {
    setDraftProfile({ ...profile });
    setEditSection(section);
    setSaved(false);
  };

  const cancelEdit = () => {
    setDraftProfile({ ...profile });
    setEditSection(null);
  };

  const saveEdit = () => {
    setProfile({ ...draftProfile });
    setEditSection(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateDraft = (field, value) => {
    setDraftProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Whether currently editing a specific section
  const isEditing = (section) => editSection === section;

  // Reusable field display / edit row
  const Field = ({ label, field, type = 'text', readOnly = false, mono = false, section }) => {
    const editing = isEditing(section) && !readOnly;
    const value = editing ? draftProfile[field] : profile[field];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-2.5 border-b border-slate-100 last:border-b-0 items-start">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pt-1.5">
          {label}
        </label>
        <div className="sm:col-span-2">
          {editing ? (
            type === 'textarea' ? (
              <textarea
                value={value}
                onChange={(e) => updateDraft(field, e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => updateDraft(field, e.target.value)}
                className={`w-full px-3 py-2 bg-white border border-blue-300 rounded text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${mono ? 'font-mono uppercase' : ''}`}
              />
            )
          ) : (
            <p className={`text-xs text-slate-800 font-semibold leading-relaxed ${mono ? 'font-mono' : ''}`}>
              {value || <span className="text-slate-400 italic">Not provided</span>}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Section header with edit button
  const SectionHeader = ({ title, icon, section, description }) => (
    <div className="flex items-center justify-between pb-3 mb-1">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-900">{title}</h3>
          {description && (
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {isEditing(section) ? (
        <div className="flex items-center gap-2">
          <button
            onClick={cancelEdit}
            className="px-3 py-1.5 text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={saveEdit}
            className="px-4 py-1.5 text-[11px] font-bold text-white bg-blue-700 hover:bg-blue-800 rounded shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
        </div>
      ) : (
        <button
          onClick={() => startEdit(section)}
          className="px-3 py-1.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
      )}
    </div>
  );

  return (
    <AppLayout role="bidder" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Success Toast */}
        {saved && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="flex items-center gap-2.5 px-5 py-3 bg-emerald-700 text-white rounded-lg shadow-lg text-xs font-bold border border-emerald-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Profile updated successfully
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Large Avatar */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 text-white font-black flex items-center justify-center text-lg shadow-md border-2 border-blue-200">
                {CURRENT_USER_BIDDER.avatar}
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">{profile.fullName}</h1>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{profile.designation} • {profile.companyName}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Verified Vendor
                  </span>
                  {profile.digiLockerLinked && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      DigiLocker Linked
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500 font-semibold">
              <p>Last updated</p>
              <p className="font-mono text-slate-700">{profile.lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs">
          <SectionHeader
            title="Personal Information"
            description="Contact details of the authorized representative"
            section="personal"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          <Field label="Full Name" field="fullName" section="personal" />
          <Field label="Designation" field="designation" section="personal" />
          <Field label="Email Address" field="email" type="email" section="personal" />
          <Field label="Mobile Number" field="mobile" type="tel" section="personal" />
        </div>

        {/* Company / Organization Details */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs">
          <SectionHeader
            title="Company & Organization Details"
            description="Legal entity information linked to your GEM vendor account"
            section="company"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
          <Field label="Company Name" field="companyName" section="company" />
          <Field label="Company Type" field="companyType" section="company" />
          <Field label="GSTIN" field="gstin" mono section="company" />
          <Field label="GST Return Status" field="gstReturnFilingStatus" readOnly section="company" />
          <Field label="PAN" field="pan" mono section="company" />
          <Field label="CIN" field="cin" mono section="company" />
          <Field label="MSME / Udyam Registration" field="msmeRegistration" mono section="company" />
          <Field label="EPFO Code" field="epfoCode" mono section="company" />
          <Field label="ESIC Code" field="esicCode" mono section="company" />
          <Field label="Year of Incorporation" field="yearOfIncorporation" section="company" />
          <Field label="Website" field="website" type="url" section="company" />
          <Field label="Registered Address" field="registeredAddress" type="textarea" section="company" />
          <Field label="Correspondence Address" field="correspondenceAddress" type="textarea" section="company" />
        </div>

        {/* Multi-Source Government Credentials & Compliance Readiness */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                🏛️
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Government Registry Verification Summary</h3>
                <p className="text-[10px] text-slate-500 font-medium">Automated multi-source credentials linked to your vendor profile</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-extrabold text-[10px] rounded border border-emerald-200">
              Multi-Source Verified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase block">GSTN &amp; Returns</span>
              <span className="font-bold text-emerald-700 block mt-1">✓ Active &amp; Up to Date</span>
              <span className="text-[10px] text-slate-400 font-mono">GSTR-3B Q4 Filed</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Udyam MSME</span>
              <span className="font-bold text-emerald-700 block mt-1">✓ Verified</span>
              <span className="text-[10px] text-slate-400 font-mono">Medium Enterprise</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase block">MCA21 &amp; PAN</span>
              <span className="font-bold text-emerald-700 block mt-1">✓ Verified</span>
              <span className="text-[10px] text-slate-400 font-mono">Active Filings</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Debarment Status</span>
              <span className="font-bold text-emerald-700 block mt-1">✓ Clear</span>
              <span className="text-[10px] text-slate-400 font-mono">CPPP &amp; GeM Watchlist</span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs">
          <SectionHeader
            title="Bank Account Details"
            description="Used for payment processing on government contracts"
            section="bank"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
          />
          <Field label="Bank Name" field="bankName" section="bank" />
          <Field label="Branch" field="bankBranch" section="bank" />
          <Field label="Account Number" field="bankAccountNo" mono section="bank" />
          <Field label="IFSC Code" field="bankIfsc" mono section="bank" />
        </div>

        {/* Authorized Signatory */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs">
          <SectionHeader
            title="Authorized Signatory"
            description="Person authorized to sign bid submissions and contracts"
            section="signatory"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            }
          />
          <Field label="Signatory Name" field="authorizedSignatory" section="signatory" />
          <Field label="Designation" field="signatoryDesignation" section="signatory" />
        </div>

        {/* Security / Actions */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Account & Security</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Manage your password and account settings</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors cursor-pointer flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Change Password
            </button>
            <button
              onClick={() => navigate('/bidder/digilocker')}
              className="px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              DigiLocker Settings
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Toast animation */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.35s ease-out forwards;
        }
      `}</style>
    </AppLayout>
  );
}
