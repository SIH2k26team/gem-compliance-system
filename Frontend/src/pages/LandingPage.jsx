import React from 'react';

export default function LandingPage({ navigate }) {
  const workflowSteps = [
    { number: '01', title: 'Tender PDF Upload', desc: 'Procurement officer uploads the official tender PDF.' },
    { number: '02', title: 'AI Clause Extraction', desc: 'Gemini AI extracts requirements, marks & thresholds.' },
    { number: '03', title: 'Document Verification', desc: 'Bidder uploads parsed & classified with OCR/DigiLocker.' },
    { number: '04', title: 'Cross-Doc Verification', desc: 'Detects GST/PAN/Experience address mismatches.' },
    { number: '05', title: 'Compliance Scoring', desc: 'Deterministic score calculation with exact page evidence.' },
    { number: '06', title: 'Explainable Risk Analysis', desc: 'Weighted risk flags highlight contradictions & missing docs.' },
    { number: '07', title: 'Human-in-the-Loop Review', desc: 'Officer inspects exact evidence & confirms recommendation.' },
    { number: '08', title: 'Audit Trail & PDF Report', desc: 'Immutable audit log generated with legal compliance report.' },
  ];

  const features = [
    {
      title: 'AI Tender Clause Extraction',
      desc: 'Automatically parses tender PDFs to extract mandatory requirements, evaluation weights, and evidence guidelines.',
      icon: (
        <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'Intelligent Document Classification',
      desc: 'Classifies PAN, GST, CA Turnover certificates, and technical work orders with OCR fallbacks.',
      icon: (
        <svg className="w-6 h-6 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Automated Compliance Scoring',
      desc: 'Applies deterministic rules for evaluation marks while strictly enforcing Pass/Fail on mandatory clauses.',
      icon: (
        <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Multi-Document Cross Verification',
      desc: 'Detects inconsistencies across GST, PAN, experience certificates, and corporate registration addresses.',
      icon: (
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'DigiLocker Verification',
      desc: 'Integrates with official government sources for consent-based document verification.',
      icon: (
        <svg className="w-6 h-6 text-teal-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'Explainable Risk Analysis',
      desc: 'Transparent risk scoring based on weighted signals: missing evidence, contradictions, and metadata anomalies.',
      icon: (
        <svg className="w-6 h-6 text-rose-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: 'Evidence-Linked Decisions',
      desc: 'Every compliance evaluation links directly to the exact PDF page, paragraph, and extracted snippet.',
      icon: (
        <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      title: 'Audit-Ready Trail',
      desc: 'Tracks every officer action, requirement modification, and document check for complete accountability.',
      icon: (
        <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      {/* Top Tricolor Accent Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

      {/* Navigation Header */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-900 flex flex-col items-center justify-center text-white font-extrabold text-sm shadow-xs border border-blue-950">
              <span className="text-[10px] tracking-widest uppercase leading-none">GOI</span>
              <span className="text-[8px] font-semibold opacity-90 leading-none mt-0.5">SIH26</span>
            </div>
            <div>
              <span className="font-extrabold text-blue-950 text-sm tracking-tight block leading-none">
                AI Tender Compliance Portal
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">Ministry of Petroleum & Natural Gas</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/officer/dashboard')}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              Officer Portal
            </button>
            <button
              onClick={() => navigate('/bidder/dashboard')}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              Bidder Portal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-900" />
          Official e-Procurement Compliance Solution (SIH26100)
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight">
          AI-Powered Tender Compliance & Bid Evaluation Platform
        </h1>

        <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Automated requirement extraction, multi-document cross-verification, DigiLocker integration, and auditable risk scoring for government procurement officers.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/officer/dashboard')}
            className="w-full sm:w-auto px-7 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Procurement Officer Dashboard</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={() => navigate('/bidder/dashboard')}
            className="w-full sm:w-auto px-7 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Bidder Vendor Portal</span>
          </button>
        </div>

        {/* Stats Ribbon */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-white border border-slate-200 rounded-lg shadow-xs">
          <div className="border-r border-slate-100 last:border-0 p-2">
            <div className="text-2xl font-black text-blue-900 font-mono">100%</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Traceable Evidence</div>
          </div>
          <div className="border-r border-slate-100 last:border-0 p-2">
            <div className="text-2xl font-black text-blue-900 font-mono">Multi-Doc</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Contradiction Detection</div>
          </div>
          <div className="border-r border-slate-100 last:border-0 p-2">
            <div className="text-2xl font-black text-emerald-700 font-mono">DigiLocker</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Govt Record Verification</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-black text-amber-700 font-mono">Human-in-Loop</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Officer Decision Control</div>
          </div>
        </div>
      </section>

      {/* Core Workflow Section */}
      <section className="py-14 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Standard Public Procurement Evaluation Workflow
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              End-to-end transparent process from tender upload to auditable decision report.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="p-4 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between hover:border-blue-800 transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                    Step {step.number}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-2">{step.title}</h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key System Capabilities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Key System Capabilities & Differentiators
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Built specifically around government e-procurement guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-5 bg-white border border-slate-200 rounded-lg shadow-2xs hover:shadow-sm transition-all"
            >
              <div className="p-2 bg-slate-50 rounded w-fit border border-slate-200 mb-3">
                {f.icon}
              </div>
              <h3 className="text-xs font-bold text-slate-900">{f.title}</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-600">
        <p className="font-bold text-slate-800">SIH26100 AI-Powered Integrated Bid Compliance Verification Platform</p>
        <p className="mt-1 text-[11px] text-slate-500">Ministry of Petroleum & Natural Gas • Government of India</p>
      </footer>
    </div>
  );
}
