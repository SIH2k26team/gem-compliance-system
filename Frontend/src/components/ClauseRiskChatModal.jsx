import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MOCK_TENDERS,
  MOCK_BIDDERS_SUMMARY,
  MOCK_REQUIREMENTS_SAMPLE,
  MOCK_RISK_ALERTS,
  MOCK_BIDDER_SUBMISSIONS_LIST,
  CURRENT_USER_OFFICER,
} from '../data/mockData';


// Helper for formatting inline markdown: **bold**, `code`, etc.
function renderInlineFormatting(text, isUser = false) {
  if (!text) return '';
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className={`font-extrabold ${isUser ? 'text-white' : 'text-slate-900'}`}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className={`px-1 py-0.5 rounded font-mono text-[11px] ${isUser ? 'bg-blue-950 text-blue-100' : 'bg-slate-100 text-blue-900 border border-slate-200'
            }`}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Helper to render complex blocks: tables, bullet lists, headers
function renderMessageBlock(paragraph, pIdx, isUser = false) {
  const trimmed = paragraph.trim();
  if (!trimmed) return null;

  // Header 3
  if (trimmed.startsWith('### ')) {
    return (
      <h4 key={pIdx} className="font-extrabold text-slate-900 text-xs mt-2 mb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-3 bg-blue-800 rounded-xs inline-block"></span>
        {trimmed.replace('### ', '')}
      </h4>
    );
  }

  // Header 1 / 2
  if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
    return (
      <h3 key={pIdx} className="font-extrabold text-slate-900 text-sm mt-2 mb-1">
        {trimmed.replace(/^#+\s*/, '')}
      </h3>
    );
  }

  // Markdown Table
  if (trimmed.includes('|') && trimmed.includes('\n')) {
    const rows = trimmed.split('\n').map((r) => r.trim()).filter(Boolean);
    const tableRows = rows.filter((r) => !r.includes(':---') && !r.includes('---'));
    if (tableRows.length > 0) {
      const headerCols = tableRows[0].split('|').map((c) => c.trim()).filter(Boolean);
      const dataRows = tableRows.slice(1);

      return (
        <div key={pIdx} className="my-2 overflow-x-auto rounded border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-[11px] border-collapse bg-white">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                {headerCols.map((col, cIdx) => (
                  <th key={cIdx} className="px-2.5 py-1.5 whitespace-nowrap">
                    {renderInlineFormatting(col, isUser)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataRows.map((row, rIdx) => {
                const cols = row.split('|').map((c) => c.trim()).filter(Boolean);
                return (
                  <tr key={rIdx} className="hover:bg-slate-50">
                    {cols.map((col, cIdx) => (
                      <td key={cIdx} className="px-2.5 py-1.5 text-slate-800">
                        {renderInlineFormatting(col, isUser)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  // Bullet or Numbered List
  if (trimmed.split('\n').some((line) => line.trim().startsWith('- ') || /^\d+\.\s/.test(line.trim()))) {
    const lines = trimmed.split('\n');
    return (
      <ul key={pIdx} className="space-y-1 my-1 pl-1">
        {lines.map((line, lIdx) => {
          const lTrim = line.trim();
          if (lTrim.startsWith('- ') || lTrim.startsWith('* ')) {
            return (
              <li key={lIdx} className="flex items-start gap-1.5 text-slate-700">
                <span className="text-blue-600 font-bold leading-tight mt-0.5">•</span>
                <span className="flex-1">{renderInlineFormatting(lTrim.substring(2), isUser)}</span>
              </li>
            );
          }
          if (/^\d+\.\s/.test(lTrim)) {
            const num = lTrim.match(/^\d+\./)[0];
            return (
              <li key={lIdx} className="flex items-start gap-1.5 text-slate-700">
                <span className="text-blue-900 font-bold text-[10px] min-w-3 mt-0.5">{num}</span>
                <span className="flex-1">{renderInlineFormatting(lTrim.replace(/^\d+\.\s*/, ''), isUser)}</span>
              </li>
            );
          }
          return (
            <p key={lIdx} className="pl-4 text-slate-600">
              {renderInlineFormatting(lTrim, isUser)}
            </p>
          );
        })}
      </ul>
    );
  }

  // Default Paragraph
  return (
    <p key={pIdx} className="leading-relaxed">
      {renderInlineFormatting(trimmed, isUser)}
    </p>
  );
}

export default function ClauseRiskChatModal({ isOpen, onClose, navigate }) {
  const [selectedBidId, setSelectedBidId] = useState('ALL');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'assistant',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Greetings Officer ${CURRENT_USER_OFFICER.name}. I am your **GeM Clause & Risk Intelligence Copilot**.`,
      bidContext: 'ALL',
      tags: ['Tender: MOPNG-2026-001', 'Clause Verification', 'GFR Rule 173'],
      recommendations: null,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Scroll to bottom when messages update or typing starts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const currentBidData = MOCK_BIDDERS_SUMMARY.find((b) => b.bidderId === selectedBidId);

  // Suggested questions based on selected bid
  const getSuggestions = () => {
    if (selectedBidId === 'BID-C03') {
      return [
        'Why is Apex Marine flagged High Risk (68/100)?',
        'Detail the GST address contradiction vs Experience Certificate',
        'What happened to mandatory OISD Safety Certificate (REQ-003)?',
        'Should this bid be disqualified under Clause 4.2?',
      ];
    }
    if (selectedBidId === 'BID-B02') {
      return [
        'What contradiction was flagged for Petroleum Logistics?',
        'Verify financial turnover compliance for BID-B02',
        'Can this bid proceed to commercial evaluation?',
      ];
    }
    if (selectedBidId === 'BID-A01') {
      return [
        'Why was Alpha Energy scored 92/100?',
        'Breakdown of marks for REQ-001 and REQ-002',
        'Confirm DigiLocker verification status for Alpha Energy',
      ];
    }
    return [
      'Compare compliance scores & risk ranks for all bidders',
      'Explain REQ-001 financial turnover threshold & scoring formula',
      'What are the mandatory Pass/Fail requirements for MOPNG-2026-001?',
      'Which bidders have missing documents or unresolved contradictions?',
    ];
  };

  // Natural AI response generator grounded in tender & bid data
  const generateBotResponse = (query, bidId) => {
    const q = query.toLowerCase();

    // 1. Specific High Risk query for Apex Marine (BID-C03)
    if (
      q.includes('apex') ||
      (bidId === 'BID-C03' && (q.includes('risk') || q.includes('why') || q.includes('flag'))) ||
      (q.includes('bid-c03') && q.includes('risk'))
    ) {
      return {
        text: `**Apex Marine & Pipeline Services (BID-C03)** has been classified as **HIGH RISK (Risk Score: 68/100)** with a Compliance Score of only **64/100**.\n\n### Critical Findings:\n1. **Missing Mandatory Certificate [Clause 4.2 | REQ-003]**:\n   - Failed to provide the mandatory *OISD-STD-137 Safety Certificate*.\n   - **Impact**: +30 to Risk Score. Non-waivable mandatory criteria.\n2. **Contradiction Detected [Document Cross-Verification]**:\n   - Registered address on **GST Certificate** (*Mumbai*) does not match the registered corporate office on the **Experience Certificate** (*New Delhi*).\n   - **Impact**: +25 to Risk Score.\n3. **DigiLocker Verification**: FAILED (Manual upload unverified with official repository).`,
        tags: [
          'Bid: BID-C03 (Apex Marine)',
          'Severity: CRITICAL',
          'Clause 4.2 Violation',
          'GST Mismatch',
        ],
        actionLink: {
          label: 'Inspect Apex Marine Risk Flags',
          path: '/officer/bids/risk',
        },
        recommendation:
          'Under GeM Procurement Guidelines Rule 173(iv), failure to meet mandatory safety requirements renders the technical bid non-responsive. Recommended action: Issue Formal Show-Cause / Rejection Notice.',
      };
    }

    // 2. GST Address Mismatch or Contradictions
    if (q.includes('gst') || q.includes('address') || q.includes('contradiction') || q.includes('mismatch')) {
      return {
        text: `### Cross-Document Contradiction Analysis\n\nOur cross-verification algorithm extracted and compared entities across all submitted PDFs:\n\n- **Apex Marine & Pipeline Services (BID-C03)**:\n  - **File 1**: \`GST_Cert_2025.pdf\` (Page 1) lists registered entity at *Andheri East, Mumbai, Maharashtra*.\n  - **File 2**: \`Exp_Cert.pdf\` (Page 3) certifies execution under *Barakhamba Road, Connaught Place, New Delhi* without registered branch disclosure.\n  - **Impact**: +25 Risk Score.\n\n- **Petroleum Logistics Corp (BID-B02)**:\n  - 1 minor discrepancy in declared turnover annexure vs balance sheet footnote.\n  - **Status**: Rectifiable under officer clarification query.`,
        tags: ['Cross-Doc Engine', 'Entity Mismatch', 'DocRef: GST_Cert_2025.pdf vs Exp_Cert.pdf'],
        actionLink: {
          label: 'View Cross-Verification Matrix',
          path: '/officer/bids/risk',
        },
        recommendation: 'Request official letter of clarification from bidder within 48 hours before opening financial bids.',
      };
    }

    // 3. OISD or ISO Safety Requirement (REQ-003)
    if (q.includes('oisd') || q.includes('iso') || q.includes('safety') || q.includes('req-003')) {
      const req = MOCK_REQUIREMENTS_SAMPLE.find((r) => r.id === 'REQ-003');
      return {
        text: `### Clause REQ-003: OISD & ISO Safety Certification\n\n- **Tender ID**: ${req.tenderId}\n- **Clause Source**: Page ${req.sourcePage}, Section 4.2\n- **Requirement Type**: **${req.type} (Strict Pass / Fail)**\n- **Extracted Clause**: *"The bidder must possess valid ISO 45001 Health & Safety and OISD-STD-137 compliance certificate."*\n- **Required Evidence**: ISO Certificate Copy + OISD Audit Report\n\n### Bidder Compliance Status:\n- **Alpha Energy (BID-A01)**: **PASSED** (Valid ISO 45001 & OISD-STD-137 confirmed via DigiLocker).\n- **Petroleum Logistics (BID-B02)**: **PASSED** (Both certificates verified).\n- **Apex Marine (BID-C03)**: **FAILED** (OISD Audit Report omitted).`,
        tags: ['Mandatory Clause', 'Source: Page 8', 'OISD-STD-137', 'ISO 45001'],
        actionLink: {
          label: 'Open Compliance Evaluation Grid',
          path: '/officer/bids/compliance',
        },
        recommendation: 'Mandatory clauses carry no weight marks. A failure results in automatic technical disqualification.',
      };
    }

    // 4. Financial Turnover Requirement (REQ-001)
    if (q.includes('turnover') || q.includes('financial') || q.includes('req-001') || q.includes('revenue')) {
      const req = MOCK_REQUIREMENTS_SAMPLE.find((r) => r.id === 'REQ-001');
      return {
        text: `### Clause REQ-001: Average Annual Financial Turnover\n\n- **Threshold**: ₹ 50.0 Crore average over last 3 FY (2022-23 to 2024-25)\n- **Weight**: **20 Marks** (Evaluation Criterion)\n- **Scoring Formula**: \`${req.scoringRule}\`\n- **Extracted Clause**: *"The bidder must have an average annual turnover of at least ₹50 Crore over the last three financial years."* (Page ${req.sourcePage})\n- **Required Evidence**: CA Certified Financial Statement & UDIN-verified Turnover Certificate.\n\n### Bidder Evaluation:\n- **Alpha Energy (BID-A01)**: Avg ₹ 87.0 Cr -> **18 / 20 Marks** (Awarded)\n- **Petroleum Logistics (BID-B02)**: Avg ₹ 62.0 Cr -> **16 / 20 Marks** (Awarded)\n- **Apex Marine (BID-C03)**: Avg ₹ 44.2 Cr -> **0 / 20 Marks** (Below ₹50 Cr minimum threshold)`,
        tags: ['Evaluation Clause', 'Weight: 20 Marks', 'Threshold: ₹50 Cr', 'Source: Page 12'],
        actionLink: {
          label: 'View Detailed Scoring Breakdown',
          path: '/officer/bids/compliance',
        },
        recommendation: 'Officer may cross-verify UDIN number with ICAI registry directly from the evaluation screen.',
      };
    }

    // 5. Experience Requirement (REQ-002)
    if (q.includes('experience') || q.includes('req-002') || q.includes('pipeline') || q.includes('projects')) {
      const req = MOCK_REQUIREMENTS_SAMPLE.find((r) => r.id === 'REQ-002');
      return {
        text: `### Clause REQ-002: Relevant Experience in Oil & Gas Pipelines\n\n- **Threshold**: At least 3 executed projects of ≥ 100km pipeline inspection (Last 5 Years)\n- **Weight**: **25 Marks** (Evaluation Criterion)\n- **Scoring Rule**: \`${req.scoringRule}\`\n- **Extracted Clause**: *"The bidder must demonstrate successfully completed inline inspection or maintenance contracts of at least 3 high-pressure gas pipeline projects."* (Page ${req.sourcePage})\n\n### Submissions:\n- **Alpha Energy (BID-A01)**: 4 qualifying projects with GAIL & IOCL -> **22 / 25 Marks**.\n- **Petroleum Logistics (BID-B02)**: 3 qualifying projects -> **18 / 25 Marks**.\n- **Apex Marine (BID-C03)**: 2 qualifying projects (1 rejected due to incomplete completion certificate) -> **12 / 25 Marks**.`,
        tags: ['Evaluation Clause', 'Weight: 25 Marks', 'Pipeline Experience', 'Source: Page 14'],
        actionLink: {
          label: 'View Work Order Evidence',
          path: '/officer/bids/compliance',
        },
        recommendation: 'Check completion certificates for client signature and stamp verification.',
      };
    }

    // 6. Compare Bidders / Summary / Ranking
    if (q.includes('compare') || q.includes('rank') || q.includes('all bids') || q.includes('summary') || q.includes('score')) {
      return {
        text: `### Technical Evaluation & Risk Summary for MOPNG-2026-001\n\n| Rank | Bidder ID | Company | Compliance | Risk Level | Officer Recommendation |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| 🥇 **1** | **BID-A01** | Alpha Energy Infrastructure | **92 / 100** | 🟢 Low (12) | **Recommended for Award** |\n| 🥈 **2** | **BID-B02** | Petroleum Logistics Corp | **81 / 100** | 🟡 Medium (38) | **Pending Officer Review** |\n| ❌ **3** | **BID-C03** | Apex Marine & Pipeline | **64 / 100** | 🔴 High (68) | **High Risk Flagged (Disqualify)** |\n\n**Summary**:\n- **Alpha Energy** cleared all 4/4 mandatory requirements and scored 92% with zero document contradictions and complete DigiLocker verification.\n- **Apex Marine** failed mandatory safety criteria and has 2 unresolved risk contradictions.`,
        tags: ['Comparative Evaluation', 'Tender: MOPNG-2026-001', '3 Bidders Evaluated'],
        actionLink: {
          label: 'Open Full Bidders Summary',
          path: '/officer/tenders/bidders',
        },
        recommendation: 'Alpha Energy emerges as the highest technical rank (H1). Proceed with commercial envelope opening for BID-A01 and BID-B02.',
      };
    }

    // 7. Alpha Energy specific queries (BID-A01)
    if (q.includes('alpha') || (bidId === 'BID-A01' && (q.includes('detail') || q.includes('score') || q.includes('why')))) {
      return {
        text: `### Bidder Assessment: Alpha Energy Infrastructure (BID-A01)\n\n- **Status**: Evaluated & Recommended\n- **Compliance Score**: **92 / 100**\n- **Risk Score**: **12 / 100 (Low Risk)**\n- **Mandatory Requirements**: **4 of 4 Passed**\n- **DigiLocker Authentication**: **VERIFIED**\n\n### Scoring Breakdown:\n- **REQ-001 (Turnover)**: 18 / 20 (₹87 Cr average)\n- **REQ-002 (Experience)**: 22 / 25 (4 completed pipeline projects)\n- **REQ-003 (ISO/OISD)**: Passed (Valid ISO 45001 & OISD-STD-137)\n- **Technical Staffing & Equipment**: 48 / 51\n- **Document Discrepancies**: 0 Contradictions detected.`,
        tags: ['BID-A01', 'Recommended', 'DigiLocker Verified', 'Score: 92%'],
        actionLink: {
          label: 'View Alpha Energy Dossier',
          path: '/officer/bids/compliance',
        },
        recommendation: 'Bidder is fully compliant with all tender stipulations. No legal or financial impediments found.',
      };
    }

    // 8. Petroleum Logistics specific queries (BID-B02)
    if (q.includes('petroleum') || (bidId === 'BID-B02' && (q.includes('detail') || q.includes('why') || q.includes('flag')))) {
      return {
        text: `### Bidder Assessment: Petroleum Logistics Corp (BID-B02)\n\n- **Status**: Needs Officer Review\n- **Compliance Score**: **81 / 100**\n- **Risk Score**: **38 / 100 (Medium Risk)**\n- **Mandatory Requirements**: **4 of 4 Passed**\n- **DigiLocker Authentication**: **VERIFIED**\n\n### Active Notice:\n- **Flagged Contradiction**: Minor variance of ₹1.4 Cr in declared FY24 turnover between self-declaration letter vs CA signed Annexure 3.\n- **Mandatory Clauses**: Cleared ISO 45001 & OISD requirements.\n- **Action Required**: Procurement Officer may seek a 24-hour clarification via the platform's audit workflow.`,
        tags: ['BID-B02', 'Needs Review', 'Medium Risk', 'Score: 81%'],
        actionLink: {
          label: 'Review BID-B02 Audit Trail',
          path: '/officer/audit',
        },
        recommendation: 'Clarification query can be dispatched directly under GeM Rule 173 without invalidating the bid.',
      };
    }

    // 9. DigiLocker / Verification Questions
    if (q.includes('digilocker') || q.includes('ocr') || q.includes('authenticate')) {
      return {
        text: `### DigiLocker & Automated Cross-Verification Engine\n\nOur platform integrates directly with government databases:\n1. **PAN & GSTIN**: Authenticated in real-time via DigiLocker API and GSTN database.\n2. **Financials**: Cross-referenced against Ministry of Corporate Affairs (MCA21) filings.\n3. **Experience & Certificates**: OCR text extraction matches registration numbers, tax IDs, and executive signatories.\n\n*Alpha Energy (BID-A01)* and *Petroleum Logistics (BID-B02)* completed DigiLocker API handshake. *Apex Marine (BID-C03)* uploaded unauthenticated scanned copies.`,
        tags: ['DigiLocker API', 'GSTN Verification', 'MCA21', 'Anti-Fraud'],
        actionLink: {
          label: 'View System Audit Logs',
          path: '/officer/audit',
        },
        recommendation: 'DigiLocker verified documents require zero manual physical notarization check.',
      };
    }

    // 10. Default contextual answer
    return {
      text: `### Clause & Doubt Evaluation: "${query}"\n\nBased on the parsed tender repository for **MOPNG-2026-001** and current bidder evaluation files:\n\n- **Active Bid Context**: ${bidId === 'ALL'
        ? 'All Bidders in Pipeline Maintenance Tender'
        : `${bidId} (${MOCK_BIDDERS_SUMMARY.find((b) => b.bidderId === bidId)?.companyName || bidId})`
        }\n- **Applicable Legal Framework**: General Financial Rules (GFR 2017) Rule 173 & GeM Special Terms & Conditions (STC).\n- **Guidance**: All mandatory clauses (such as safety certificates, earnest money deposits, and statutory filings) are strictly evaluated on a binary **Pass / Fail** basis with zero officer discretion.\n- **Evaluation Marks**: Applicable only to qualified bidders on turnover (REQ-001) and executed technical experience (REQ-002).\n\nYou can click any of the suggested query chips or specify a clause number (e.g. *REQ-001*, *Clause 4.2*, *Turnover*, *High Risk Flags*).`,
      tags: ['GeM Assistant', 'GFR 2017', 'Clause Engine'],
      actionLink: {
        label: 'Open Compliance Dashboard',
        path: '/officer/dashboard',
      },
      recommendation: 'If this doubt pertains to a legal disqualification, verify audit logs before confirming decision.',
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text,
      bidContext: selectedBidId,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI reasoning delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text, selectedBidId);
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botResponse.text,
        bidContext: selectedBidId,
        tags: botResponse.tags,
        actionLink: botResponse.actionLink,
        recommendation: botResponse.recommendation,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Chat session refreshed for **${selectedBidId === 'ALL'
          ? 'All Bids'
          : MOCK_BIDDERS_SUMMARY.find((b) => b.bidderId === selectedBidId)?.companyName || selectedBidId
          }**.\n\nAsk any doubt regarding technical clauses, scoring criteria, or risk verification.`,
        bidContext: selectedBidId,
        tags: ['Ready', 'Clause Engine v2.4'],
      },
    ]);
  };

  const copyMessageText = (txt) => {
    navigator.clipboard?.writeText(txt);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/60 backdrop-blur-md transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Clause & Risk Query Chatbot"
    >
     
      <div className="relative w-full max-w-[94vw] sm:max-w-[85vw] md:max-w-[65vw] lg:w-[50vw] h-[85vh] md:h-[65vh] min-h-[500px] max-h-[820px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-slate-900/10">

        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 px-4 py-3 text-white flex items-center justify-between border-b border-blue-950/40 shadow-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-200 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold tracking-tight">Clause & Risk Query Chatbot</h3>
               
              </div>
             
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Clear button */}
            <button
              onClick={handleClearChat}
              title="Clear conversation"
              className="p-1.5 text-blue-200/70 hover:text-white hover:bg-white/10 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            {/* Close button with Esc hint */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-white/15 rounded-lg text-xs font-semibold transition-colors cursor-pointer ml-1"
            >
              <span className="text-[10px] hidden sm:inline px-1 py-0.5 rounded bg-white/10 text-slate-300">ESC</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bid Selection & Context Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[11px] font-bold text-slate-600 shrink-0">Select Target Bid:</span>
            <select
              value={selectedBidId}
              onChange={(e) => setSelectedBidId(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-800 focus:border-blue-800 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Bids • Tender MOPNG-2026-001</option>
              {MOCK_BIDDERS_SUMMARY.map((bid) => (
                <option key={bid.bidderId} value={bid.bidderId}>
                  {bid.bidderId} - {bid.companyName} ({bid.riskLevel} Risk • Score: {bid.complianceScore})
                </option>
              ))}
            </select>
          </div>

          {/* Quick status indicator for selected bid */}
          {currentBidData ? (
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-500 font-medium">Score:</span>
              <span className="font-extrabold text-blue-900">{currentBidData.complianceScore}/100</span>
              <span className="text-slate-300">|</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${currentBidData.riskLevel === 'High'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : currentBidData.riskLevel === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
              >
                {currentBidData.riskLevel} Risk
              </span>
              {currentBidData.contradictionCount > 0 && (
                <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-1 py-0.5 rounded">
                  ⚠️ {currentBidData.contradictionCount} Contradiction
                </span>
              )}
            </div>
          ) : (
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            </div>
          )}
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-100/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ring-2 ring-blue-100">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs transition-all ${isUser
                    ? 'bg-blue-900 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs'
                    }`}
                >
                  {/* Sender & Timestamp Header */}
                  <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-current/10 text-[10px] opacity-75">
                    <span className="font-bold">
                      {isUser ? `Officer ${CURRENT_USER_OFFICER.name}` : 'GeM Compliance Engine'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span>{msg.time}</span>
                      {!isUser && (
                        <button
                          onClick={() => copyMessageText(msg.text)}
                          title="Copy response"
                          className="hover:opacity-100 opacity-60 cursor-pointer"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Content with Markdown Parsing */}
                  <div className="font-sans text-xs space-y-1.5">
                    {msg.text.split('\n\n').map((paragraph, idx) =>
                      renderMessageBlock(paragraph, idx, isUser)
                    )}
                  </div>

                  {/* Recommendation Callout (for assistant responses) */}
                  {msg.recommendation && (
                    <div className="mt-2.5 p-2 bg-blue-50/80 border border-blue-200/80 rounded-lg text-[11px] text-blue-950 font-medium">
                      <span className="font-bold text-blue-900">💡 Officer Recommendation: </span>
                      {msg.recommendation}
                    </div>
                  )}

                  {/* Clause and Evidence Tags */}
                  {msg.tags && msg.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2.5 pt-1.5 border-t border-slate-100">
                      {msg.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link button */}
                  {msg.actionLink && (
                    <div className="mt-2 pt-1">
                      <button
                        onClick={() => {
                          if (navigate) navigate(msg.actionLink.path);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded text-[10px] font-bold shadow-2xs transition-colors cursor-pointer"
                      >
                        <span>{msg.actionLink.label}</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-xs ring-2 ring-slate-200">
                    RK
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2.5 items-center">
              <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold shrink-0 ring-2 ring-blue-100">
                AI
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-800 animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-blue-800 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-blue-800 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Cross-referencing tender clauses and bidder evidence...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>



        {/* Bottom Input Box */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  selectedBidId === 'ALL'
                    ? 'Ask doubt for any bid, clause, turnover criteria, or risk contradiction...'
                    : `Ask doubt regarding ${currentBidData?.companyName || selectedBidId}...`
                }
                className="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-300 focus:border-blue-800 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800/20 transition-all font-medium"
              />
              {inputQuery && (
                <button
                  type="button"
                  onClick={() => setInputQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${inputQuery.trim()
                ? 'bg-blue-900 hover:bg-blue-800 text-white shadow-xs active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
              <span>Send</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
