import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { CURRENT_USER_BIDDER } from '../data/mockData';

// Initial Mock DigiLocker Issued Documents
const INITIAL_DIGILOCKER_DOCS = [
  {
    id: 'DOC-DL-001',
    name: 'GST Registration Certificate (Form REG-06)',
    issuer: 'Central Board of Indirect Taxes and Customs (GSTN)',
    category: 'Financial & Tax',
    docUri: 'in.gov.gstn.cert:27AAACP1234A1Z5',
    registrationNo: '27AAACP1234A1Z5',
    issueDate: '2017-07-01',
    validUntil: 'Lifetime (Active)',
    status: 'Verified',
    securityHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    digitalSignature: 'Signed by GSTN CA v3 (RSA 2048-bit)',
    autoAttachedTenders: ['MOPNG-2026-001', 'ONGC-2026-042', 'GAIL-2026-108', 'HPCL-2026-019'],
    extractedData: {
      tradeName: 'Alpha Energy Infrastructure Pvt Ltd',
      taxpayerType: 'Regular',
      constitutionOfBusiness: 'Private Limited Company',
      jurisdiction: 'State - Maharashtra, Division - Mumbai Zone 4',
      dateOfLiability: '01/07/2017',
    },
    badgeColor: 'emerald',
  },
  {
    id: 'DOC-DL-002',
    name: 'Permanent Account Number (PAN Card)',
    issuer: 'Income Tax Department (CBDT)',
    category: 'Mandatory Statutory',
    docUri: 'in.gov.incometax.pan:AAACP1234A',
    registrationNo: 'AAACP1234A',
    issueDate: '2012-04-14',
    validUntil: 'Lifetime (Active)',
    status: 'Verified',
    securityHash: '8f4e2b10a9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2',
    digitalSignature: 'Signed by CBDT NSDL PKI (SHA-256)',
    autoAttachedTenders: ['MOPNG-2026-001', 'ONGC-2026-042', 'GAIL-2026-108'],
    extractedData: {
      nameOnCard: 'ALPHA ENERGY INFRASTRUCTURE PRIVATE LIMITED',
      category: 'Company',
      panStatus: 'Active & Linked with Aadhaar/GST',
      aadhaarSeedingStatus: 'Not Applicable (Corporate PAN)',
    },
    badgeColor: 'emerald',
  },
  {
    id: 'DOC-DL-003',
    name: 'Certificate of Incorporation (Form 1 / MCA CoI)',
    issuer: 'Ministry of Corporate Affairs (MCA / ROC Mumbai)',
    category: 'Mandatory Statutory',
    docUri: 'in.gov.mca.coi:CIN-U74999MH2012PTC228941',
    registrationNo: 'U74999MH2012PTC228941',
    issueDate: '2012-03-19',
    validUntil: 'Active Incorporation',
    status: 'Verified',
    securityHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    digitalSignature: 'Signed by Registrar of Companies, Mumbai',
    autoAttachedTenders: ['MOPNG-2026-001', 'GAIL-2026-108'],
    extractedData: {
      companyName: 'ALPHA ENERGY INFRASTRUCTURE PRIVATE LIMITED',
      cin: 'U74999MH2012PTC228941',
      classOfCompany: 'Private',
      authorizedCapital: '₹ 15,00,00,000 (15 Crores)',
      paidUpCapital: '₹ 10,50,00,000 (10.5 Crores)',
      registeredAddress: 'Plot 42, Bandra-Kurla Complex, Mumbai, Maharashtra 400051',
    },
    badgeColor: 'emerald',
  },
  {
    id: 'DOC-DL-004',
    name: 'OISD Safety Audit Compliance (OISD-STD-137)',
    issuer: 'Oil Industry Safety Directorate (MoPNG)',
    category: 'Technical & Safety',
    docUri: 'in.gov.mopng.oisd:CERT-2025-8841',
    registrationNo: 'OISD-STD-137-2025/MH-442',
    issueDate: '2024-11-15',
    validUntil: '2027-11-14',
    status: 'Verified',
    securityHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    digitalSignature: 'Signed by OISD Technical Inspection Authority',
    autoAttachedTenders: ['MOPNG-2026-001', 'ONGC-2026-042'],
    extractedData: {
      auditScope: 'High-Pressure Hydrocarbon Pipeline Safety & Offshore Operations',
      complianceLevel: 'Grade A1 (Zero Critical Non-Conformities)',
      inspectingOfficer: 'Dr. S. K. Deshmukh, Chief Director (Safety)',
      lastAuditDate: '2024-11-10',
    },
    badgeColor: 'emerald',
  },
  {
    id: 'DOC-DL-005',
    name: 'ISO 45001:2018 Health & Safety Management Certificate',
    issuer: 'Bureau of Indian Standards / Quality Council of India',
    category: 'Technical & Safety',
    docUri: 'in.gov.qci.iso:45001-2024-9912',
    registrationNo: 'ISO-45001-IN99120B',
    issueDate: '2024-08-16',
    validUntil: '2027-08-15',
    status: 'Verified',
    securityHash: '4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e',
    digitalSignature: 'Signed by BIS Quality Accreditation Registry',
    autoAttachedTenders: ['MOPNG-2026-001', 'ONGC-2026-042', 'GAIL-2026-108'],
    extractedData: {
      accreditationBody: 'NABCB / IAF Member',
      standard: 'ISO 45001:2018 Occupational Health and Safety Management Systems',
      scope: 'Pipeline Inspection, Non-Destructive Testing, Cryogenic Refurbishment',
      surveillanceAuditDue: '2026-08-15',
    },
    badgeColor: 'emerald',
  },
  {
    id: 'DOC-DL-006',
    name: 'Udyam MSME Registration Certificate',
    issuer: 'Ministry of Micro, Small and Medium Enterprises',
    category: 'Mandatory Statutory',
    docUri: 'in.gov.msme.udyam:UDYAM-MH-12-0048192',
    registrationNo: 'UDYAM-MH-12-0048192',
    issueDate: '2021-01-20',
    validUntil: 'Active (No Expiry)',
    status: 'Verified',
    securityHash: '7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b',
    digitalSignature: 'Signed by Ministry of MSME Udyam Portal Authority',
    autoAttachedTenders: ['MOPNG-2026-001', 'HPCL-2026-019'],
    extractedData: {
      enterpriseType: 'Medium Enterprise',
      majorActivity: 'Services & Industrial Engineering Construction',
      nicCode: '42202 - Construction of utility projects for fluids',
      dateOfIncorporation: '19/03/2012',
    },
    badgeColor: 'emerald',
  },
  {
    id: 'DOC-DL-007',
    name: 'CA Certified Financial Turnover & Net Worth (UDIN Verified)',
    issuer: 'Institute of Chartered Accountants of India (ICAI UDIN)',
    category: 'Financial & Tax',
    docUri: 'in.org.icai.udin:24098712AAAAAB1234',
    registrationNo: 'UDIN-24098712AAAAAB1234',
    issueDate: '2025-07-10',
    validUntil: 'FY 2024-25 Valid',
    status: 'Verified',
    securityHash: '3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b',
    digitalSignature: 'Signed by ICAI UDIN Cryptographic Verification Portal',
    autoAttachedTenders: ['MOPNG-2026-001', 'ONGC-2026-042', 'GAIL-2026-108'],
    extractedData: {
      udin: '24098712AAAAAB1234',
      caFirm: 'R. K. Mehta & Associates (FRN: 104521W)',
      membershipNo: '098712',
      avg3YrTurnover: '₹ 87.40 Crores',
      netWorthFY25: '₹ 32.15 Crores',
      solvencyRating: 'AAA (Highly Solvent)',
    },
    badgeColor: 'emerald',
  },
  {
    id: 'DOC-DL-008',
    name: 'EPFO Electronic Challan cum Return (ECR) & Compliance',
    issuer: 'Employees Provident Fund Organisation (Ministry of Labour)',
    category: 'Mandatory Statutory',
    docUri: 'in.gov.epfindia.ecr:MH-BAN-003419-2026',
    registrationNo: 'MHBAN003419000',
    issueDate: '2026-02-15',
    validUntil: 'Monthly Active (Feb 2026 Paid)',
    status: 'Verified',
    securityHash: '0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a',
    digitalSignature: 'Signed by EPFO Shram Suvidha Gateway',
    autoAttachedTenders: ['MOPNG-2026-001'],
    extractedData: {
      establishmentName: 'ALPHA ENERGY INFRASTRUCTURE PRIVATE LIMITED',
      activeEmployeesCovered: '420',
      lastECRChallanNo: '04126021598412',
      complianceStatus: '100% Up to date',
    },
    badgeColor: 'emerald',
  },
];

export default function DigiLockerIntegrationPage({ navigate, currentPath }) {
  const [documents, setDocuments] = useState(INITIAL_DIGILOCKER_DOCS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(null);
  
  // Modals
  const [previewDoc, setPreviewDoc] = useState(null);
  const [activeTabModal, setActiveTabModal] = useState('extracted'); // 'extracted' | 'signature' | 'xml' | 'tenders'
  const [showLinkModal, setShowLinkModal] = useState(false);

  // Link New Document Modal State
  const [newDocForm, setNewDocForm] = useState({
    department: 'GSTN',
    docType: 'GST Registration Certificate',
    docNumber: '',
    otp: '',
  });
  const [linkStep, setLinkStep] = useState(1); // 1: input, 2: OTP, 3: Success
  const [isVerifyingLink, setIsVerifyingLink] = useState(false);

  // Handle Sync Action
  const handleSyncVault = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToast({
        type: 'success',
        message: 'DigiLocker Vault successfully synchronized with MeitY Government Gateway! 8 documents re-verified.',
      });
      setTimeout(() => setSyncToast(null), 4000);
    }, 1200);
  };

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.docUri.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && doc.category === selectedCategory;
  });

  // Category Counts
  const countAll = documents.length;
  const countStatutory = documents.filter((d) => d.category === 'Mandatory Statutory').length;
  const countTax = documents.filter((d) => d.category === 'Financial & Tax').length;
  const countTechnical = documents.filter((d) => d.category === 'Technical & Safety').length;

  // Submit Link New Document
  const handleStartLink = (e) => {
    e.preventDefault();
    if (!newDocForm.docNumber) return;
    setIsVerifyingLink(true);
    setTimeout(() => {
      setIsVerifyingLink(false);
      setLinkStep(2); // Go to OTP state
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsVerifyingLink(true);
    setTimeout(() => {
      setIsVerifyingLink(false);
      setLinkStep(3); // Success

      // Add a newly verified document to state
      const createdDoc = {
        id: `DOC-DL-${Date.now().toString().slice(-3)}`,
        name: newDocForm.docType,
        issuer:
          newDocForm.department === 'GSTN'
            ? 'Central Board of Indirect Taxes & Customs'
            : newDocForm.department === 'MCA'
            ? 'Ministry of Corporate Affairs (MCA)'
            : newDocForm.department === 'INCOMETAX'
            ? 'Income Tax Department (CBDT)'
            : 'Government of India Authorized Issuing Authority',
        category: newDocForm.department === 'INCOMETAX' || newDocForm.department === 'GSTN' ? 'Financial & Tax' : 'Mandatory Statutory',
        docUri: `in.gov.${newDocForm.department.toLowerCase()}.cert:${newDocForm.docNumber}`,
        registrationNo: newDocForm.docNumber.toUpperCase(),
        issueDate: '2026-01-10',
        validUntil: 'Active (Verified)',
        status: 'Verified',
        securityHash: 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890',
        digitalSignature: `Signed by ${newDocForm.department} PKI Gateway`,
        autoAttachedTenders: ['MOPNG-2026-001'],
        extractedData: {
          documentNumber: newDocForm.docNumber.toUpperCase(),
          issuingAuthority: newDocForm.department,
          verificationDate: new Date().toISOString().split('T')[0],
          status: 'Authenticated via DigiLocker Sandbox API v2.4',
        },
        badgeColor: 'emerald',
      };

      setDocuments((prev) => [createdDoc, ...prev]);
    }, 1200);
  };

  const resetLinkModal = () => {
    setShowLinkModal(false);
    setLinkStep(1);
    setNewDocForm({ department: 'GSTN', docType: 'GST Registration Certificate', docNumber: '', otp: '' });
  };

  return (
    <AppLayout role="bidder" currentPath={currentPath} navigate={navigate}>
      <div className="space-y-5">
        {/* Toast Notification */}
        {syncToast && (
          <div className="fixed top-5 right-5 z-50 bg-emerald-900 text-white px-4 py-3 rounded-lg shadow-xl border border-emerald-700 flex items-center gap-3 animate-bounce">
            <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-semibold">{syncToast.message}</span>
            <button onClick={() => setSyncToast(null)} className="ml-2 text-emerald-300 hover:text-white font-bold">×</button>
          </div>
        )}

        {/* DigiLocker Official Government Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white rounded-lg p-5 shadow-sm border border-blue-700 relative overflow-hidden">
          {/* Subtle Background Emblem Watermark */}
          <div className="absolute right-3 -bottom-6 opacity-10 pointer-events-none select-none text-9xl font-black">
            GOI
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  DigiLocker Integration Portal • MeitY Gateway
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold flex items-center gap-1">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  OAuth 2.0 Auth Level 3 (API v2.4 Active)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-white">
                    DigiLocker Verified Statutory Vault
                  </h1>
                  <p className="text-xs text-blue-100/90 font-medium mt-0.5">
                    Account Entity: <span className="font-bold text-white">{CURRENT_USER_BIDDER.company}</span> • Aadhaar & PAN Linked
                  </p>
                </div>
              </div>

              <p className="text-xs text-blue-200/80 leading-relaxed max-w-3xl">
                Documents fetched directly from Government issuing authorities (GSTN, Income Tax, MCA, OISD, MSME) carry cryptographic digital signatures. Auto-attached DigiLocker documents guarantee <span className="text-emerald-300 font-bold">100% compliance pass</span> on statutory requirements with zero tampering risk.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <button
                onClick={handleSyncVault}
                disabled={isSyncing}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{isSyncing ? 'Synchronizing with Govt Vault...' : 'Sync Vault with DigiLocker API'}</span>
              </button>

              <button
                onClick={() => setShowLinkModal(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-xs"
              >
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Link New Govt Document</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            title="Issued Documents"
            value={`${documents.length} Records`}
            subtitle="100% Cryptographic Match"
            color="emerald"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <StatCard
            title="Auto-Attached Bids"
            value="4 Active Tenders"
            subtitle="Instant mandatory pass"
            color="blue"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />

          <StatCard
            title="Expiries & Renewals"
            value="0 Expired"
            subtitle="Next renewal in 524 days"
            color="white"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <StatCard
            title="Security & Trust Score"
            value="100 / 100"
            subtitle="Tamper-proof SHA-256 signatures"
            color="emerald"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Documents ({countAll})
              </button>
              <button
                onClick={() => setSelectedCategory('Mandatory Statutory')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  selectedCategory === 'Mandatory Statutory'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Mandatory Statutory ({countStatutory})
              </button>
              <button
                onClick={() => setSelectedCategory('Financial & Tax')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  selectedCategory === 'Financial & Tax'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Financial & Tax ({countTax})
              </button>
              <button
                onClick={() => setSelectedCategory('Technical & Safety')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  selectedCategory === 'Technical & Safety'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Technical & Safety ({countTechnical})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search document name, URI, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Documents Vault List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>Verified Government Issued Documents</span>
              <span className="text-xs font-bold text-slate-500 normal-case">({filteredDocs.length} shown)</span>
            </h2>
            <span className="text-xs font-medium text-slate-500">
              Direct API Sync from Govt Data Repositories
            </span>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-800">No documents found matching filters</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or switching categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left: Document Info & Badges */}
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-extrabold flex items-center gap-1">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        DigiLocker Verified
                      </span>

                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] font-bold">
                        {doc.category}
                      </span>

                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        URI: {doc.docUri}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                      {doc.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                      <span><strong className="text-slate-900">Issuer:</strong> {doc.issuer}</span>
                      <span><strong className="text-slate-900">Doc No:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">{doc.registrationNo}</code></span>
                      <span><strong className="text-slate-900">Valid:</strong> {doc.validUntil}</span>
                    </div>

                    {/* Auto Attached Tender Pill */}
                    <div className="flex items-center gap-2 text-[11px] pt-1">
                      <span className="text-slate-500 font-semibold">Auto-attached to e-Bids:</span>
                      <div className="flex flex-wrap gap-1">
                        {doc.autoAttachedTenders.map((tId) => (
                          <span key={tId} className="px-1.5 py-0.3 bg-blue-50 text-blue-800 border border-blue-200 rounded text-[10px] font-bold">
                            {tId}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      onClick={() => {
                        setPreviewDoc(doc);
                        setActiveTabModal('extracted');
                      }}
                      className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Preview Certificate</span>
                    </button>

                    <button
                      onClick={() => {
                        setPreviewDoc(doc);
                        setActiveTabModal('signature');
                      }}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
                    >
                      <svg className="w-3.5 h-3.5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Security Signature</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Architectural Workflow Card */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                DigiLocker e-Procurement Compliance Architecture
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                How cryptographic verification guarantees zero document fraud & instant tender scoring
              </p>
            </div>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded text-[10px] font-bold border border-blue-200">
              MeitY Circular 2025 Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 relative">
              <div className="w-6 h-6 rounded-full bg-blue-700 text-white font-black flex items-center justify-center mb-2 text-[10px]">
                1
              </div>
              <h3 className="font-bold text-slate-900">OAuth 2.0 Auth</h3>
              <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                Bidder authorizes portal access via DigiLocker Aadhaar/OTP OAuth level 3.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 relative">
              <div className="w-6 h-6 rounded-full bg-blue-700 text-white font-black flex items-center justify-center mb-2 text-[10px]">
                2
              </div>
              <h3 className="font-bold text-slate-900">Direct Govt API Fetch</h3>
              <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                XML metadata & signed PDF streams fetched straight from GSTN, MCA & IT Dept.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 relative">
              <div className="w-6 h-6 rounded-full bg-blue-700 text-white font-black flex items-center justify-center mb-2 text-[10px]">
                3
              </div>
              <h3 className="font-bold text-slate-900">SHA-256 Hash Verification</h3>
              <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                AI Engine compares extracted values against cryptographic public key signatures.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded border border-emerald-200 relative">
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black flex items-center justify-center mb-2 text-[10px]">
                4
              </div>
              <h3 className="font-bold text-emerald-900">100% Mandatory Pass</h3>
              <p className="text-emerald-800 mt-1 leading-relaxed text-[11px]">
                Officer dashboard flags document as "DigiLocker Verified", bypassing manual checks.
              </p>
            </div>
          </div>
        </div>

        {/* MODAL 1: Document Details & Security Preview */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg border border-slate-300 shadow-2xl w-full max-w-3xl overflow-hidden my-8">
              {/* Modal Header */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-white font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white">{previewDoc.name}</h3>
                    <p className="text-[11px] text-slate-300">Issued by: {previewDoc.issuer}</p>
                  </div>
                </div>

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="bg-slate-100 px-4 border-b border-slate-200 flex gap-2 text-xs font-bold pt-2">
                <button
                  onClick={() => setActiveTabModal('extracted')}
                  className={`pb-2 px-3 border-b-2 cursor-pointer ${
                    activeTabModal === 'extracted'
                      ? 'border-blue-700 text-blue-900'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Extracted Govt Data
                </button>
                <button
                  onClick={() => setActiveTabModal('signature')}
                  className={`pb-2 px-3 border-b-2 cursor-pointer ${
                    activeTabModal === 'signature'
                      ? 'border-blue-700 text-blue-900'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Digital Signature & Hash
                </button>
                <button
                  onClick={() => setActiveTabModal('xml')}
                  className={`pb-2 px-3 border-b-2 cursor-pointer ${
                    activeTabModal === 'xml'
                      ? 'border-blue-700 text-blue-900'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Raw XML / JSON Metadata
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
                {activeTabModal === 'extracted' && (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs text-emerald-900 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold block">Official Authenticated Record</span>
                        <span className="text-[11px] text-emerald-800">These fields match official govt database records & are tamper-proof.</span>
                      </div>
                      <span className="px-2 py-1 bg-emerald-700 text-white rounded text-[10px] font-bold">100% Verified</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(previewDoc.extractedData).map(([key, val]) => (
                        <div key={key} className="p-2.5 bg-slate-50 rounded border border-slate-200">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-xs font-bold text-slate-900 mt-0.5 block">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTabModal === 'signature' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded text-purple-900 space-y-1">
                      <span className="font-bold block text-sm">Cryptographic Signature Overview</span>
                      <p className="text-[11px]">
                        Digitally signed using PKI (Public Key Infrastructure) issued by MeitY Controller of Certifying Authorities (CCA India).
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">Digital Signature Authority</label>
                        <input
                          readOnly
                          value={previewDoc.digitalSignature}
                          className="w-full bg-slate-100 border border-slate-300 rounded p-2 text-xs font-mono font-bold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">SHA-256 Checksum Hash</label>
                        <input
                          readOnly
                          value={previewDoc.securityHash}
                          className="w-full bg-slate-100 border border-slate-300 rounded p-2 text-xs font-mono text-slate-800 break-all"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">DigiLocker Document URI</label>
                        <input
                          readOnly
                          value={previewDoc.docUri}
                          className="w-full bg-slate-100 border border-slate-300 rounded p-2 text-xs font-mono text-blue-900 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTabModal === 'xml' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-700">JSON Payload from DigiLocker API</span>
                      <span className="text-[10px] text-slate-400 font-mono">ContentType: application/json</span>
                    </div>
                    <pre className="bg-slate-900 text-emerald-400 p-3.5 rounded text-[11px] font-mono overflow-x-auto max-h-60">
{JSON.stringify(
  {
    docHeader: {
      uri: previewDoc.docUri,
      issuer: previewDoc.issuer,
      docType: previewDoc.category,
      registrationNo: previewDoc.registrationNo,
    },
    verificationToken: {
      status: "AUTHENTICATED",
      hashAlgorithm: "SHA-256",
      hash: previewDoc.securityHash,
      timestamp: new Date().toISOString(),
    },
    payload: previewDoc.extractedData,
  },
  null,
  2
)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: Link New Govt Document Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-slate-300 shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="p-4 bg-blue-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white font-bold text-xs">
                    GOI
                  </div>
                  <h3 className="text-sm font-bold">Link New Government Document</h3>
                </div>
                <button onClick={resetLinkModal} className="p-1 rounded text-blue-200 hover:text-white">×</button>
              </div>

              <div className="p-5 space-y-4">
                {linkStep === 1 && (
                  <form onSubmit={handleStartLink} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Government Issuing Authority</label>
                      <select
                        value={newDocForm.department}
                        onChange={(e) => {
                          const dept = e.target.value;
                          let defaultDocName = 'GST Registration Certificate';
                          if (dept === 'MCA') defaultDocName = 'Certificate of Incorporation';
                          if (dept === 'INCOMETAX') defaultDocName = 'Tax Clearance Certificate';
                          if (dept === 'EPFO') defaultDocName = 'EPF Annual Compliance Certificate';
                          if (dept === 'OISD') defaultDocName = 'OISD Safety Audit Compliance';

                          setNewDocForm({ ...newDocForm, department: dept, docType: defaultDocName });
                        }}
                        className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-medium focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="GSTN">Central Board of Indirect Taxes (GSTN)</option>
                        <option value="INCOMETAX">Income Tax Department (CBDT)</option>
                        <option value="MCA">Ministry of Corporate Affairs (MCA / ROC)</option>
                        <option value="OISD">Oil Industry Safety Directorate (OISD)</option>
                        <option value="EPFO">Employees Provident Fund Organisation (EPFO)</option>
                        <option value="MSME">Ministry of MSME (Udyam)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Document Title / Classification</label>
                      <input
                        type="text"
                        value={newDocForm.docType}
                        onChange={(e) => setNewDocForm({ ...newDocForm, docType: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-medium focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Registration / Certificate Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 27AAACP1234A1Z5 or CIN No."
                        value={newDocForm.docNumber}
                        onChange={(e) => setNewDocForm({ ...newDocForm, docNumber: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono font-bold focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 text-[11px] leading-relaxed">
                      💡 Linking will initiate a secure request to MeitY DigiLocker Sandbox API. An Aadhaar/OTP authorization prompt will be issued.
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={resetLinkModal}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isVerifyingLink}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {isVerifyingLink ? 'Connecting DigiLocker API...' : 'Fetch Document →'}
                      </button>
                    </div>
                  </form>
                )}

                {linkStep === 2 && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 text-[11px]">
                      🔒 <strong>DigiLocker Security Authentication:</strong> An OTP has been sent to the Aadhaar-linked mobile ending in <strong>**** 8921</strong> for entity <strong>Alpha Energy Infrastructure Pvt Ltd</strong>.
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Enter 6-Digit DigiLocker OTP</label>
                      <input
                        type="text"
                        maxLength="6"
                        required
                        placeholder="1 2 3 4 5 6"
                        value={newDocForm.otp}
                        onChange={(e) => setNewDocForm({ ...newDocForm, otp: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 font-mono text-center text-lg tracking-widest font-black focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setLinkStep(1)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isVerifyingLink}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {isVerifyingLink ? 'Verifying Hash & Key...' : 'Confirm & Authenticate'}
                      </button>
                    </div>
                  </form>
                )}

                {linkStep === 3 && (
                  <div className="text-center py-4 space-y-3 text-xs">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-base font-black text-slate-900">Document Linked Successfully!</h4>
                    <p className="text-slate-600 max-w-sm mx-auto">
                      The document <span className="font-bold text-slate-900">{newDocForm.docType}</span> has been authenticated and added to your DigiLocker Vault.
                    </p>

                    <div className="pt-3">
                      <button
                        onClick={resetLinkModal}
                        className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded"
                      >
                        Return to Vault
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
