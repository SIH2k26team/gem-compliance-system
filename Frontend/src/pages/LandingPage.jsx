import React from 'react';
import gemLogo from '../assets/nav-logo.png';

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

  const footerSections = [
    {
      title: 'PLATFORM',
      links: ['About the Platform', 'How It Works', 'Security & Privacy', 'Accessibility'],
    },
    {
      title: 'COMPLIANCE',
      links: ['Tender Evaluation', 'Document Verification', 'Risk Assessment', 'Audit Trail'],
    },
    {
      title: 'RESOURCES',
      links: ['User Guide', 'Evaluation Framework', 'DigiLocker Integration', 'FAQs'],
    },
    {
      title: 'SUPPORT',
      links: ['Officer Help Centre', 'Bidder Help Centre', 'Raise a Support Ticket', 'Contact Support'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">

      {/* Navigation Header */}
      <nav className="border-b border-slate-200 bg-slate-900 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={gemLogo} alt="ProcuraAI Logo" className="h-12 w-auto py-1" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight">
          AI-Powered Tender Compliance & Bid Evaluation Platform
        </h1>

        <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Automated requirement extraction, multi-document cross-verification, DigiLocker integration, and auditable risk scoring for government procurement officers.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/officer/dashboard')}
            className="w-full sm:w-auto px-7 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md text-xs shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Procurement Officer Portal</span>
          </button>

          <button
            onClick={() => navigate('/bidder/dashboard')}
            className="w-full sm:w-auto px-7 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-md text-xs shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Bidder Vendor Portal</span>
          </button>
        </div>

        {/* Stats Ribbon */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-white border border-slate-200 rounded-md shadow-2xs">
          <div className="border-r border-slate-100 last:border-0 p-2">
            <div className="text-2xl font-black text-slate-900 font-mono">100%</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Traceable Evidence</div>
          </div>
          <div className="border-r border-slate-100 last:border-0 p-2">
            <div className="text-2xl font-black text-slate-900 font-mono">Multi-Doc</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Contradiction Detection</div>
          </div>
          <div className="border-r border-slate-100 last:border-0 p-2">
            <div className="text-2xl font-black text-emerald-800 font-mono">DigiLocker</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Govt Record Verification</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-black text-amber-800 font-mono">Human-in-Loop</div>
            <div className="text-xs text-slate-600 font-semibold mt-0.5">Officer Decision Control</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)]">
            <div className="max-w-xs">
              <img src={gemLogo} alt="ProcuraAI" className="h-8 w-auto" />
              <p className="mt-4 text-sm leading-6 text-slate-600">
                AI-powered tender compliance and bid evaluation for transparent, evidence-backed public procurement.
              </p>
              <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
                Ministry of Petroleum & Natural Gas<br />Government of India
              </p>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-extrabold tracking-tight text-slate-950">{section.title}</h2>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        onClick={(event) => event.preventDefault()}
                        className="text-sm text-slate-500 transition-colors hover:text-slate-900 hover:underline underline-offset-4"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>AI-Powered Tender Compliance & Bid Evaluation Platform.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href="#" onClick={(event) => event.preventDefault()} className="hover:text-slate-900">Terms of Use</a>
              <a href="#" onClick={(event) => event.preventDefault()} className="hover:text-slate-900">Website Policies</a>
              <a href="#" onClick={(event) => event.preventDefault()} className="hover:text-slate-900">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
