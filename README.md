SIH26100 --- AI-Powered Integrated Bid Compliance Verification Platform

Purpose of this file: This is the single source of truth for the
project.
Any AI coding agent (including Antigravity) must read this file before
making changes so that it understands the existing product flow,
architecture, features, roles, and technical decisions.

1. Project Goal

Build an AI-assisted procurement platform for SIH26100 (Ministry of
Petroleum & Natural Gas) that helps procurement officers evaluate
bidder submissions against tender requirements.

The system should not simply decide "eligible/not eligible". It should
support requirement-based evaluation and scoring, while keeping any
truly mandatory conditions as Pass/Fail where the tender defines
them as mandatory.

Core idea

Tender PDF
   ↓
PDF Parsing / OCR
   ↓
Gemini AI + NLP
   ↓
Structured Tender Requirements
   ↓
Bidder Submission
   ↓
Document Extraction + Verification
   ↓
Cross-Document Checks
   ↓
Requirement-wise Compliance + Score
   ↓
Risk / Red Flags + Evidence
   ↓
Procurement Officer Review
   ↓
Final Decision
   ↓
Audit Trail + Compliance Report

2. Main User Roles

Procurement Officer

Can: - Create/manage tenders - Upload tender PDFs - View AI-extracted
requirements - Configure/confirm requirement weights and scoring rules -
Review bidder submissions - View compliance scores and risk flags -
Inspect exact evidence/document/page - Approve / Reject / Send for
Review - Compare multiple bidders - Generate reports - View audit
history

Bidder

Can: - Register/login - View open tenders - Submit a bid - Upload
required/supporting documents - Connect DigiLocker where supported -
View document verification status - View submission status - Respond to
clarification requests if implemented

Admin

Can: - Manage users/roles - Manage system configuration - Manage
verification/integration settings - Monitor system health - View
system-wide audit information

3. Tender Creation Flow

Step 1 --- Officer creates tender

Officer enters: - Tender title - Tender ID - Department/organization -
Description - Submission deadline - Tender category

Then uploads the tender PDF.

Step 2 --- PDF processing

Backend receives the PDF.

Upload
 ↓
AWS S3
 ↓
PyMuPDF
 ↓
Is text available?
 ├── YES → Direct text extraction
 └── NO  → Page/image extraction → PaddleOCR

Step 3 --- AI clause extraction

Extracted text is sent to Gemini AI + NLP.

Gemini should identify: - Requirements - Mandatory conditions -
Evaluation criteria - Weight/marks - Thresholds - Required
documents/evidence - Dates/validity conditions - Relevant tender
clauses - Scoring rules where explicitly available

Example structured output

{
  "requirement": "Average annual turnover",
  "type": "evaluation",
  "target": "50 crore",
  "period": "last 3 financial years",
  "weight": 20,
  "evidence_required": [
    "CA certificate",
    "financial statements"
  ],
  "source_page": 12
}

Important

The LLM must not invent a scoring rule if the tender does not
specify one.

If the tender says:

Minimum turnover = ₹50 Cr

then it should not automatically invent:

₹40--49 Cr = 16 marks

unless such scoring is explicitly defined or configured/confirmed by the
officer.

4. Requirement Model

Each tender requirement should have:

Requirement ID

Tender ID

Requirement name

Description

Type:

Mandatory

Evaluation

Target/threshold

Unit

Weight/marks

Scoring rule

Required evidence/document types

Source document page

Extracted clause

Confidence

Officer confirmation status

Two evaluation modes

Mandatory

Requirement → Pass / Fail / Needs Review

Failure may make the bid non-compliant if the tender explicitly defines
it as mandatory.

Evaluation

Requirement → Evidence → Score → Explanation

This supports the project's intended model where bidders can submit bids
while stronger satisfaction of evaluation requirements earns more score,
subject to the actual tender rules.

5. Bidder Submission Flow

Bidder Login
    ↓
Browse Open Tenders
    ↓
Select Tender
    ↓
View Requirements
    ↓
Upload Documents
    ↓
Optional DigiLocker Verification
    ↓
Submit Bid

Possible documents: - PAN - GST certificate - Turnover/financial
certificate - Experience certificates - Work orders/contracts -
Technical certificates - Safety certificates - Licenses - Other
tender-specific evidence

Actual document requirements must come from the tender.

6. Document Processing Flow

For every uploaded document:

Document Upload
      ↓
AWS S3
      ↓
File Validation
      ↓
PyMuPDF
      ↓
Text PDF?
 ┌────┴────┐
 YES       NO
 ↓          ↓
Text      PaddleOCR
 ↓          ↓
 └────┬─────┘
      ↓
Gemini AI + NLP
      ↓
Structured Fields
      ↓
PostgreSQL

The system should preserve: - Document ID - File URL/key - Document
type - Extracted fields - Page numbers - OCR text - Evidence snippets -
Processing status - Verification status

7. Document Classification

Gemini/NLP should classify uploaded documents into categories such as:

PAN

GST

Turnover certificate

Financial statement

Experience certificate

Work order

Technical certificate

Safety certificate

License

Other

If confidence is low:

⚠️ Document classification uncertain
→ Needs Human Review

Do not force an uncertain classification.

8. DigiLocker Verification

DigiLocker is an external verification source, not the whole
compliance system.

Intended flow

Bidder
 ↓
"Verify with DigiLocker"
 ↓
DigiLocker OAuth / Consent
 ↓
Authorized access
 ↓
Verified/available government-issued records
 ↓
Our Backend
 ↓
Compare with Submitted Documents

Result examples

✅ Verified
⚠️ Submitted data differs from verified record
❌ Verification unavailable/not found

DigiLocker access is consent-based and depends on supported
documents/issuers and authorized requester integration.

Hackathon fallback

If production DigiLocker credentials/integration are unavailable:

Frontend
 ↓
Mock DigiLocker API / Sandbox
 ↓
Simulated verified records
 ↓
Same comparison pipeline

The production architecture should remain compatible with the real
Requester API.

9. Multi-Document Cross-Verification

This is one of the core differentiating features.

Extract important entities/fields from all documents:

Company name

PAN

GSTIN

Address

Registration details

Turnover

Dates

Project names

Contract values

Experience duration

Then compare them.

Example

GST Certificate:
Company = ABC Pvt Ltd
Address = Mumbai

PAN:
Company = ABC Pvt Ltd
Address = Mumbai

Experience Certificate:
Company = ABC Pvt Ltd
Address = Delhi

Result:

⚠️ Contradiction detected
Address differs across submitted documents.

Every flag must link back to the relevant documents/pages.

10. Compliance Engine

The compliance engine should be deterministic wherever possible.

Gemini extracts/understands information.

Node.js business logic applies the actual rules.

Gemini
 ↓
Structured Requirement + Extracted Bidder Data
 ↓
Node.js Compliance Engine
 ↓
Compliance / Score / Risk

Example

Tender:

Turnover target = ₹50 Cr
Weight = 20 marks

Bidder:

Verified turnover = ₹60 Cr

If tender scoring rule says ₹50 Cr+ gets 20 marks:

Score = 20/20

If tender only says a threshold and does not specify evaluation scoring:

Mandatory threshold → Pass

Do not invent scoring logic.

11. Requirement-wise Evaluation

For every requirement, show:

Requirement
↓
Required Evidence
↓
Submitted Evidence
↓
Verification
↓
Score / Status
↓
Explanation

Possible statuses:

✅ Complied

❌ Not Complied

⚠️ Needs Review

⏳ Processing

ℹ️ Not Applicable

12. Evidence-Linked Scoring

Every result should be explainable.

Example:

Requirement:
Average Annual Turnover

Result:
18/20

Evidence:
Turnover Certificate
Page 2

Extracted value:
₹45 Cr

Source:
Bidder_Turnover_Certificate.pdf

The officer should be able to click the evidence and open the relevant
document/page.

This is a major project differentiator.

13. Explainable Risk Score

Risk should not be a random LLM-generated number.

Use weighted deterministic signals.

Example:

Missing required evidence       +20
Official record mismatch        +30
Cross-document contradiction    +15
Expired certificate             +15
Suspicious document signal      +20

Then calculate:

0–20    → Low Risk
21–50   → Medium Risk
51+     → High Risk

Exact thresholds can be configurable.

The UI must explain:

Risk Score: 62 — High Risk

Reasons:
• GST address mismatch
• Experience certificate requires review
• One certificate expired

14. Document Tampering / Authenticity Risk

This should be presented as risk detection, not guaranteed forgery
detection.

Possible checks:

PDF metadata

PDF text vs OCR text mismatch

Font/formatting anomalies

Image-level anomaly checks

QR/digital signature verification where available

DigiLocker/official-source mismatch

Cross-document contradictions

Example:

⚠️ Potential document authenticity issue
Reason:
Submitted turnover differs from verified source.

Final authenticity decision should remain with the responsible
officer/authority.

15. Missing Document Detection

Compare:

Tender Required Evidence
          VS
Bidder Uploaded Documents

Example:

Required:
✅ PAN
✅ GST
✅ Turnover Certificate
❌ Safety Certificate

System:

Safety Certificate appears to be missing.

16. Bid Comparison

Officer can select multiple bidders.

Example:

                 Bidder A   Bidder B   Bidder C
Turnover           20/20      15/20      10/20
Experience         20/20      18/20      12/20
Technical          18/20      16/20      14/20
Risk              Low        Medium     High
Overall Score      92         81         64

Do not rank bidders using hidden or invented criteria. Ranking must be
based on the configured/tender-defined evaluation rules.

17. Natural-Language Procurement Query

Officer can ask questions such as:

"Which bidders failed the turnover requirement?"

or:

"Show bidders with high risk."

or:

"Why did Bidder A receive 88 marks?"

Architecture:

Officer Question
 ↓
Gemini / NLP
 ↓
Intent + Structured Query
 ↓
PostgreSQL / Application Data
 ↓
Answer + Evidence

The answer should always be grounded in stored project data.

18. Human-in-the-Loop

AI must assist, not replace the procurement officer.

AI Analysis
    ↓
Recommendation
    ↓
Officer Review
 ┌────┼──────┐
 ↓    ↓      ↓
Approve Reject Review

For low-confidence extraction, contradictions, authenticity concerns, or
unclear clauses:

⚠️ Needs Human Review

19. Audit Trail

Record important events:

User login

Tender created

Tender uploaded

AI extraction completed

Requirement edited/confirmed

Bid submitted

Document uploaded

Verification performed

DigiLocker result received

Compliance calculated

Risk score generated

Officer decision

Report generated

Example:

10:32 — Officer uploaded Tender_001.pdf
10:33 — AI extraction completed
10:35 — Requirement R-04 confirmed
11:10 — Bidder A submitted bid
11:11 — GST verification completed
11:12 — Contradiction detected
11:18 — Officer marked "Needs Review"

Audit records should be immutable from the normal UI.

20. Automated Compliance Report

After evaluation:

Tender Details
↓
Bidder Details
↓
Requirement-wise Results
↓
Scores
↓
Risk Flags
↓
Evidence References
↓
Officer Decision
↓
Final Report

Generate a structured PDF report.

Use ReportLab if generated by the backend/report service.

Store generated reports in AWS S3.

21. What-If Compliance Simulator

This is an optional advanced feature.

It should be based on available bidder/vendor data, not claim to
predict companies that never submitted a bid.

Example:

Current evaluation:
Turnover weight = 20

Scenario:
Change configured evaluation threshold/rule

↓
Recalculate available bidder data
↓
Show impact

If historical/vendor data is available:

"Based on available historical/vendor data, 7 additional vendors may
satisfy this condition."

Always label such results as estimates.

If no historical/vendor data exists, simulate only on current submitted
bidders.

22. Recommended Tech Stack

Frontend

React.js + Tailwind CSS - Web application - Officer dashboard -
Bidder portal - Responsive UI

Chart.js - Compliance charts - Risk visualization - Bid comparison
graphs - Heatmaps/analytical views

Backend

Node.js + Express.js - REST APIs - Authentication - Tender/bid
workflows - Compliance logic - External API integration

Note: Node.js is a runtime; Express.js is the backend web framework.

Database

PostgreSQL - Users - Tenders - Requirements - Bidders - Bids -
Documents metadata - Extracted fields - Compliance results - Scores -
Audit logs

Cache / Queue

Redis - Caching - Temporary processing state - Asynchronous
AI/document-processing jobs

File Storage

AWS S3 - Tender PDFs - Bidder documents - Extracted/processed files
where required - Generated compliance reports

AI

Gemini AI + NLP - Tender clause extraction - Requirement
understanding - Document understanding - Conversational procurement
queries - Structured extraction

OCR

PaddleOCR - Scanned PDFs - Image-based certificates - OCR text
extraction

PDF Processing

PyMuPDF - PDF parsing - Direct text extraction - Page handling -
Page-level evidence mapping - Rendering pages for OCR

Verification

DigiLocker Requester API - Consent-based verification of authentic
government-issued documents - Production integration subject to
requester onboarding/authorization

Authentication

JWT - Secure authentication - Role-based access control

Monitoring

Sentry - Real-time error tracking - Performance monitoring

23. High-Level System Architecture

                         ┌─────────────────────┐
                         │      React UI       │
                         │   + Tailwind CSS    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Node.js + Express   │
                         │    Backend/API      │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      ┌────────────┐         ┌────────────┐         ┌────────────┐
      │ PostgreSQL │         │   Redis    │         │   AWS S3   │
      │ Structured │         │ Cache/Jobs │         │ Documents  │
      │    Data    │         │            │         │   & PDFs   │
      └────────────┘         └────────────┘         └────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Document Processing │
                         └──────────┬──────────┘
                                    │
                       ┌────────────┴────────────┐
                       ▼                         ▼
                 ┌──────────┐              ┌────────────┐
                 │ PyMuPDF  │              │ PaddleOCR  │
                 │ PDF/Text │              │ Scanned    │
                 └────┬─────┘              └─────┬──────┘
                      └────────────┬──────────────┘
                                   ▼
                         ┌─────────────────────┐
                         │ Gemini AI + NLP     │
                         │ Clause & Document   │
                         │ Intelligence        │
                         └──────────┬──────────┘
                                    ▼
                         ┌─────────────────────┐
                         │ Compliance Engine   │
                         │ Scoring + Risk      │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  ▼                 ▼                 ▼
            DigiLocker         Evidence          Audit Trail
            Verification       Mapping           & Reports

24. Suggested Backend Modules

src/
├── auth/
├── users/
├── tenders/
├── requirements/
├── bidders/
├── bids/
├── documents/
├── ocr/
├── ai/
├── compliance/
├── scoring/
├── risk/
├── digilocker/
├── reports/
├── audit/
├── notifications/
└── common/

Keep modules separated so another developer/AI agent can modify one area
without breaking the complete system.

25. Suggested Database Entities

Core tables:

users
roles
tenders
tender_requirements
tender_clauses
bidders
bids
documents
document_extractions
document_evidence
verifications
compliance_results
scores
risk_flags
audit_logs
reports

Potential relationships:

Tender
 ├── Requirements
 ├── Clauses
 └── Bids
       └── Bidder
            └── Documents
                 ├── Extraction
                 ├── Evidence
                 └── Verification

Requirement
 └── Compliance Result
       ├── Score
       ├── Evidence
       └── Risk Flags

26. API-Level Flow

Example endpoints:

POST   /api/auth/login
POST   /api/auth/register

POST   /api/tenders
GET    /api/tenders
GET    /api/tenders/:id
POST   /api/tenders/:id/upload

GET    /api/tenders/:id/requirements
PUT    /api/requirements/:id

POST   /api/bids
GET    /api/bids/:id
POST   /api/bids/:id/documents

POST   /api/documents/:id/process
GET    /api/documents/:id/status

POST   /api/verifications/digilocker/start
GET    /api/verifications/digilocker/callback

POST   /api/bids/:id/evaluate
GET    /api/bids/:id/compliance
GET    /api/bids/:id/risk

GET    /api/tenders/:id/compare
POST   /api/reports/:bidId/generate
GET    /api/reports/:id

GET    /api/audit/:entityId

These are proposed routes, not immutable requirements. Keep the API
consistent if routes are changed.

27. Processing States

Document processing:

UPLOADED
   ↓
QUEUED
   ↓
PARSING
   ↓
OCR_PROCESSING (if required)
   ↓
AI_EXTRACTION
   ↓
VERIFICATION
   ↓
COMPLETED

Failure:

ANY STATE
   ↓
FAILED
   ↓
Retry / Human Review

Bid evaluation:

SUBMITTED
   ↓
PROCESSING
   ↓
EVALUATED
   ↓
OFFICER_REVIEW
   ↓
APPROVED / REJECTED / NEEDS_REVIEW

28. Core Differentiators

Do not position the project as just:

"Upload PDF + Chatbot"

The strongest differentiators are:

1. Requirement-to-Evidence Traceability

Every evaluation result connects to the exact document/page/evidence.

2. Multi-Document Contradiction Detection

The system compares information across
GST/PAN/certificates/contracts/etc.

3. Explainable Compliance Scoring

Every score has a reason and evidence.

4. Human-in-the-Loop

AI recommends; procurement officer makes the final decision.

5. Official-Source Verification

DigiLocker can provide consent-based verification where supported.

6. Deterministic Compliance Engine

LLM extracts information, while application rules perform
scoring/validation.

7. Audit-Ready Workflow

AI checks and officer actions are recorded.

29. Important AI Rules

AI agents/developers must follow these principles:

Never silently invent tender requirements.

Never invent scoring weights not present in the tender or officer
configuration.

Never claim a document is authentic with 100% certainty based only
on AI.

Never let the LLM directly make the final procurement decision.

Preserve source page/document references.

Store confidence for AI-extracted fields.

Send uncertain cases to human review.

Keep sensitive documents secure.

Never expose AWS credentials, JWT secrets, Gemini keys, or
DigiLocker client secrets in frontend code.

Keep business rules separate from UI code.

Prefer deterministic calculations for scores and thresholds.

Use mock DigiLocker data only when clearly marked as demo/sandbox
data.

30. MVP Priority for SIH

Must Have

Officer login

Bidder login

Tender PDF upload

PDF parsing

OCR for scanned documents

AI clause/requirement extraction

Requirement confirmation

Bidder document upload

Document classification

Data extraction

Requirement-wise compliance

Cross-document mismatch detection

Evidence/page references

Score + risk

Officer dashboard

Audit trail

Report generation

Strong Differentiators

DigiLocker integration/mock

Explainable scoring

Human-in-the-loop

Bid comparison

Natural-language procurement query

Optional

What-if simulator

Historical bidder profiling

Duplicate/fraud pattern analysis

Advanced document-forensics/tampering detection

Sentry monitoring

Do not sacrifice core workflow just to add optional features.

31. UI Pages

Public

Landing page

Login

Register

Officer

Dashboard

Create Tender

Tender Details

Requirements

Bidders

Bid Comparison

Bid Detail

Document Viewer

Compliance Matrix

Risk Analysis

Audit Trail

Reports

Profile

Bidder

Dashboard

Open Tenders

Tender Details

Submit Bid

Upload Documents

DigiLocker Verification

Submission Status

Notifications/Profile

32. Officer Dashboard Concept

Show:

Tender: Pipeline Maintenance Procurement

Total Bids: 12
Average Compliance: 84%
High Risk: 2
Needs Review: 4
Verified Documents: 86%

Then:

Compliance chart

Risk heatmap

Bidder ranking

Missing documents

Contradictions

Verification status

Recent audit activity

33. Document Viewer Concept

Split screen:

┌──────────────────────┬──────────────────────────┐
│                      │ Requirement: Turnover    │
│     PDF Viewer       │                          │
│                      │ Status: ✅ Complied      │
│       Page 2         │ Score: 20/20             │
│                      │                          │
│ [highlight evidence] │ Evidence: ₹62 Cr        │
│                      │ Source: Page 2           │
└──────────────────────┴──────────────────────────┘

This is important for explainability.

34. Coding Rules for AI Agents

When modifying the project:

Before changing code

Read this PROJECT_CONTEXT.md.

Inspect the current repository structure.

Identify existing implementation before creating new files.

Reuse existing components/services where possible.

Do not replace the architecture without explicit instruction.

When adding a feature

Identify affected frontend module.

Identify affected backend module.

Identify database changes.

Identify API changes.

Preserve existing flows.

Update this file if the architecture/feature behavior changes.

Never

Delete working features without approval.

Change database schema blindly.

Hard-code API keys.

Put secrets in React/frontend code.

Replace PostgreSQL with MongoDB unless explicitly requested.

Replace Node.js/Express with another backend without explicit
approval.

Add unnecessary technologies only to make the stack look bigger.

35. Current Technology Decisions --- DO NOT CHANGE CASUALLY

Frontend       → React.js + Tailwind CSS
Charts         → Chart.js
Backend        → Node.js + Express.js
Database       → PostgreSQL
Caching/Queue  → Redis
Storage        → AWS S3
Authentication → JWT
LLM/NLP        → Gemini AI + NLP
OCR            → PaddleOCR
PDF Processing → PyMuPDF
Verification   → DigiLocker Requester API
Monitoring     → Sentry

36. One-Line Project Definition

An AI-assisted, evidence-driven procurement platform that extracts
tender requirements, verifies bidder documents, detects
inconsistencies, calculates explainable compliance scores, and
supports procurement officers with transparent, auditable
decision-making.

37. Golden Rule for Future Changes

Understand the existing workflow first. Make the smallest change
required. Preserve all existing features unless the user explicitly
asks to remove or replace them.

If a requested change conflicts with this architecture, explain the
conflict before making a destructive change.