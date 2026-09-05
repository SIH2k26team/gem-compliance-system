import React, { useState, useEffect } from 'react';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import OfficerDashboard from '../pages/OfficerDashboard';
import BidderDashboard from '../pages/BidderDashboard';
import TendersPage from '../pages/TendersPage';
import BidderTendersPage from '../pages/BidderTendersPage';
import BidderSubmissionsPage from '../pages/BidderSubmissionsPage';
import AppLayout from '../layouts/AppLayout';

export default function SimpleRouter() {
  const [currentPath, setCurrentPath] = useState(
    window.location.hash ? window.location.hash.replace('#', '') : '/'
  );

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash ? window.location.hash.replace('#', '') : '/';
      setCurrentPath(path);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Match routes
  if (currentPath === '/' || currentPath === '') {
    return <LandingPage navigate={navigate} />;
  }

  if (currentPath === '/login') {
    return <LoginPage navigate={navigate} />;
  }

  if (currentPath === '/officer/dashboard') {
    return <OfficerDashboard navigate={navigate} currentPath={currentPath} />;
  }

  if (currentPath === '/bidder/dashboard') {
    return <BidderDashboard navigate={navigate} currentPath={currentPath} />;
  }

  if (currentPath === '/officer/tenders') {
    return <TendersPage navigate={navigate} currentPath={currentPath} />;
  }

  if (currentPath === '/bidder/tenders') {
    return <BidderTendersPage navigate={navigate} currentPath={currentPath} />;
  }

  if (currentPath === '/bidder/submissions') {
    return <BidderSubmissionsPage navigate={navigate} currentPath={currentPath} />;
  }

  // Officer bidder-submission view
  if (currentPath === '/officer/tenders/bidders') {
    return <BidderSubmissionsPage navigate={navigate} currentPath={currentPath} role="officer" />;
  }

  if (currentPath === '/officer/bids/compliance' || currentPath === '/officer/bids/risk') {
    return <OfficerDashboard navigate={navigate} currentPath={currentPath} />;
  }

  if (currentPath === '/officer/audit') {
    return <OfficerDashboard navigate={navigate} currentPath={currentPath} />;
  }

  // Bidder sidebar routes — redirect to nearest real page
  if (currentPath === '/bidder/digilocker') {
    return <BidderDashboard navigate={navigate} currentPath={currentPath} />;
  }

  // Placeholder route handler for Phase 2+ routes
  const isOfficerRoute = currentPath.startsWith('/officer');

  return (
    <AppLayout role={isOfficerRoute ? 'officer' : 'bidder'} currentPath={currentPath} navigate={navigate}>
      <div className="bg-white border border-slate-200 rounded-lg p-8 text-center max-w-xl mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3 border border-blue-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-lg font-black text-slate-900">Module Scheduled for Phase 2</h2>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          The route <span className="font-mono text-slate-900 font-bold px-1.5 py-0.5 bg-slate-100 rounded">{currentPath}</span> will be active in Phase 2 (Tender Upload, AI Clause Confirmation & Evidence Viewer).
        </p>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => navigate(isOfficerRoute ? '/officer/dashboard' : '/bidder/dashboard')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Return to {isOfficerRoute ? 'Officer Dashboard' : 'Bidder Dashboard'}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
