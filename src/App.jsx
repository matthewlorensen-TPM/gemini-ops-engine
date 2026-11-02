import React, { useState, useMemo, useRef } from 'react';
import {
  DollarSign,
  ShieldCheck,
  FileText,
  Layers,
  Mic,
  Square,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Calculator,
  Palette,
  Target,
  Briefcase,
  Compass,
  FileCode,
  FileCheck2,
  CheckSquare,
  Square as SquareIcon
} from 'lucide-react';

// ==========================================
// VALUE LADDER PACKAGES DEFINITION
// ==========================================
const PACKAGES = [
  {
    id: 'contract',
    title: 'Client Engagement Contract',
    price: 200,
    tag: 'Agreement Asset',
    icon: ShieldCheck,
    color: 'teal',
    description: 'Formal Client Engagement Agreement for Rooted Solutions LLC, detailing agreed services, payment terms, and scope protection.',
    deliverables: ['Master Engagement Contract', 'Selected Services Schedule', 'Scope Change & Deposit Boilerplate']
  },
  {
    id: 'financial',
    title: 'Bank-Ready Financial Model',
    price: 200,
    tag: 'Financial Asset',
    icon: DollarSign,
    color: 'emerald',
    description: '3-Year P&L, 12-month cash flow forecast, and break-even analysis workbook in Google Sheets.',
    deliverables: ['Custom Google Sheets Workbook', 'Break-Even & Debt Service Model', 'SBA Loan Ready Summary']
  },
  {
    id: 'sop',
    title: 'Single-Workflow SOP Engine',
    price: 200,
    tag: 'Operations Asset',
    icon: FileText,
    color: 'cyan',
    description: 'Turn a 15-minute voice recording or call transcript into a clean, step-by-step SOP with QC checklists.',
    deliverables: ['Formatted Markdown SOP', 'Employee Printable Checklist', 'Exception Handling Matrix']
  },
  {
    id: 'branding',
    title: 'Brand Identity & Messaging',
    price: 200,
    tag: 'Brand Asset',
    icon: Palette,
    color: 'purple',
    description: 'Core brand positioning, color palette directives, elevator pitches, and visual prompt guidelines.',
    deliverables: ['Brand Value Proposition', 'Color Palette & Typography Directives', 'Elevator Pitches & Copy Samples']
  },
  {
    id: 'marketing',
    title: 'Marketing & Growth Strategy',
    price: 200,
    tag: 'Growth Asset',
    icon: Target,
    color: 'rose',
    description: 'Local lead-generation playbook, channel strategy, promo flyer copy, and 30-day action plan.',
    deliverables: ['Local Outreach Playbook', 'Flyer & Ad Campaign Copy', '30-Day Growth Roadmap']
  },
  {
    id: 'business_plan',
    title: 'Business Plan Development',
    price: 350,
    tag: 'Strategy Asset',
    icon: Briefcase,
    color: 'indigo',
    description: 'Complete narrative business plan covering market analysis, revenue model, and operational roadmap.',
    deliverables: ['Bank & SBA Pitch Narrative', 'Competitor Analysis', 'Operational Risk Strategy']
  },
  {
    id: 'consulting',
    title: 'General IT / Ops Consulting',
    price: 200,
    tag: 'Advisory Asset',
    icon: Compass,
    color: 'blue',
    description: 'Tech stack audit, administrative friction diagnostic, and actionable step-by-step advisory report.',
    deliverables: ['System & Software Audit', 'Process Friction Diagnostic', 'Prioritized Action Plan']
  },
  {
    id: 'suite',
    title: 'Full Operations Suite',
    price: 600,
    tag: 'Growth Bundle',
    icon: Layers,
    color: 'amber',
    description: 'Combines Financial Model, Contracts, SOPs, and Strategy into a complete 10-day business launchpad.',
    deliverables: ['All Core $200 Packages', 'Custom Master Documents', '1-on-1 Strategy Review']
  }
];

// Available services to pick from when creating a Client Contract
const CONTRACT_SERVICE_OPTIONS = [
  { id: 'financial', name: 'Bank-Ready Financial Modeling & P&L Workbook' },
  { id: 'sop', name: 'Standard Operating Procedure (SOP) Development' },
  { id: 'branding', name: 'Brand Identity, Messaging & Value Proposition Guide' },
  { id: 'marketing', name: 'Local Marketing Strategy & Campaign Playbook' },
  { id: 'business_plan', name: 'Bank-Ready Business Plan Narrative' },
  { id: 'consulting', name: 'IT Infrastructure & Operations Friction Diagnostic' },
  { id: 'advisory', name: 'Ongoing Fractional Ops & Strategic Advisory Support' }
];

export default function App() {
  // Navigation & Config State
  const [selectedPackageId, setSelectedPackageId] = useState('contract');

  // Execution & Output State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [executionTime, setExecutionTime] = useState(null);
  const [copied, setCopied] = useState(false);
  const [inputTab, setInputTab] = useState('form'); // 'form' | 'voice' | 'transcript'

  // Client Profile State
  const [clientProfile, setClientProfile] = useState({
    businessName: 'Apex Plumbing & HVAC',
    contactName: 'John Smith',
    email: 'john@apexplumbingco.com',
    phone: '(303) 555-0192',
    location: 'Adams County, CO'
  });

  // Dynamic Form States
  const [contractInputs, setContractInputs] = useState({
    clientSignerTitle: 'Owner / Principal',
    totalContractValue: 600,
    depositPct: 50,
    paymentTerms: '50% deposit upon signing, 50% upon final deliverable approval',
    selectedServices: ['financial', 'sop', 'consulting'],
    specialTerms: 'Weekly 30-minute status check-ins included during active sprint. Target project completion within 10 business days.',
    exclusions: 'Software licensing costs, filing fees, and third-party advertising spend are excluded from consulting fees.'
  });

  const [finInputs, setFinInputs] = useState({
    avgJobPrice: 1500,
    monthlyVolume: 8,
    cogsPct: 20,
    processingFeePct: 3,
    taxReservePct: 25,
    loanPayments: 350,
    opexItems: [
      { name: 'Commercial Truck & Fuel', cost: 850 },
      { name: 'General Liability Insurance', cost: 450 },
      { name: 'Software & Scheduling Apps', cost: 250 },
      { name: 'Cell & Internet', cost: 150 }
    ]
  });

  const [sopInputs, setSopInputs] = useState({
    department: 'Field Operations',
    sopTitle: 'Customer Site Intake & Service Approval',
    processOwner: 'Crew Lead / Operations Manager',
    systemsUsed: 'Google Sheets, Stripe Reader, Scheduling App',
    inputTrigger: 'Customer quote signature or deposit confirmation',
    voiceNotes: 'When a technician arrives on site, perform a 15-minute diagnostic, fill out the digital checklist, review flat-rate pricing options with the customer, obtain digital sign-off prior to commencing work, and document pre-existing job site conditions.'
  });

  const [brandingInputs, setBrandingInputs] = useState({
    tagline: 'Precision Solutions Built to Last',
    targetAudience: 'Homeowners and Commercial Property Managers in Adams County',
    visualVibe: 'Clean, modern, dependable, premium dark navy and emerald accents',
    keyServices: 'Emergency plumbing, electrical upgrades, preventive maintenance plans'
  });

  const [marketingInputs, setMarketingInputs] = useState({
    monthlyBudget: 400,
    mainChannels: 'Google Local Services Ads, Business Referral Partners, Direct Local Mailers',
    uniqueOffer: '$50 off initial diagnostic call with comprehensive panel inspection'
  });

  const [bizPlanInputs, setBizPlanInputs] = useState({
    fundingRequired: 15000,
    useOfFunds: 'Work vehicle setup, specialized tools, licensing, initial marketing launch',
    competitiveAdvantage: '48-hour response guarantee, direct owner oversight on all projects'
  });

  const [consultingInputs, setConsultingInputs] = useState({
    mainBottleneck: 'Owner spends 15+ hours weekly on manual quotes, invoice chasing, and scheduling',
    currentTechStack: 'Paper estimates, personal email, manual spreadsheet tracking'
  });

  // Audio Recording & Transcript State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcriptText, setTranscriptText] = useState('');
  const timerRef = useRef(null);

  // Financial Live Calculations
  const finCalculations = useMemo(() => {
    const grossRev = finInputs.avgJobPrice * finInputs.monthlyVolume;
    const directCogs = grossRev * (finInputs.cogsPct / 100);
    const processingFees = grossRev * (finInputs.processingFeePct / 100);
    const grossProfit = grossRev - directCogs - processingFees;
    
    const opexSum = finInputs.opexItems.reduce((acc, item) => acc + (Number(item.cost) || 0), 0);
    const totalFixedOpex = opexSum + Number(finInputs.loanPayments);
    const netEbit = grossProfit - totalFixedOpex;
    const taxReserve = netEbit > 0 ? netEbit * (finInputs.taxReservePct / 100) : 0;
    const netTakeHome = netEbit - taxReserve;
    const marginPct = grossRev > 0 ? ((netTakeHome / grossRev) * 100).toFixed(1) : 0;
    const contributionMarginPct = 1 - (finInputs.cogsPct / 100) - (finInputs.processingFeePct / 100);
    const breakEvenMonthlyRev = contributionMarginPct > 0 ? Math.round(totalFixedOpex / contributionMarginPct) : 0;

    return {
      grossRev,
      directCogs,
      processingFees,
      grossProfit,
      totalFixedOpex,
      netEbit,
      taxReserve,
      netTakeHome,
      marginPct,
      breakEvenMonthlyRev
    };
  }, [finInputs]);

  // Toggle Contract Included Service
  const toggleContractService = (serviceId) => {
    setContractInputs(prev => {
      const exists = prev.selectedServices.includes(serviceId);
      const updated = exists
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId];
      return { ...prev, selectedServices: updated };
    });
  };

  // Toggle Recording Mock / Web Audio
  const toggleRecording = () => {
    if (isRecording) {
      clearInterval(timerRef.current);
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  // Generate Document Action
  const generateDocument = async () => {
    setIsGenerating(true);
    const startTime = performance.now();

    // Brief UI delay simulation
    await new Promise(res => setTimeout(res, 800));

    let output = '';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (selectedPackageId === 'contract') {
      const includedList = CONTRACT_SERVICE_OPTIONS
        .filter(opt => contractInputs.selectedServices.includes(opt.id))
        .map(opt => `- **${opt.name}**`)
        .join('\n');

      const depositAmount = Math.round(contractInputs.totalContractValue * (contractInputs.depositPct / 100));

      output = `# CLIENT ENGAGEMENT AGREEMENT
**Consulting Firm:** Rooted Solutions LLC
**Client Business:** ${clientProfile.businessName}
**Client Representative:** ${clientProfile.contactName} (${contractInputs.clientSignerTitle})
**Email:** ${clientProfile.email} | **Phone:** ${clientProfile.phone}
**Location:** ${clientProfile.location}
**Date of Agreement:** ${dateStr}

---

### 1. SERVICES & SCOPE OF WORK
Rooted Solutions LLC agrees to perform professional consulting services for **${clientProfile.businessName}**. The agreed scope of deliverables includes:

${includedList || '- Custom Strategic Consulting & Advisory'}

---

### 2. COMPENSATION & PAYMENT TERMS
- **Total Project Fee:** $${contractInputs.totalContractValue.toLocaleString()} USD
- **Initial Deposit (${contractInputs.depositPct}%):** $${depositAmount.toLocaleString()} USD due prior to project commencement.
- **Payment Structure:** ${contractInputs.paymentTerms}

---

### 3. SPECIFIC DELIVERABLE & TIMELINE NOTES
${contractInputs.specialTerms}

---

### 4. EXCLUSIONS & CLIENT RESPONSIBILITIES
${contractInputs.exclusions}

---

### 5. GENERAL TERMS & CONDITIONS
- **Scope Protection:** Any additions or modifications to the deliverables specified above will be documented in a written Change Order and billed at standard consulting rates.
- **Intellectual Property:** Upon receipt of final payment, all custom assets created under this Agreement shall belong solely to **${clientProfile.businessName}**.
- **Confidentiality:** Both parties agree to maintain strict confidentiality regarding proprietary business information, operational data, and financials.

---

### 6. AUTHORIZATION & SIGNATURES

**ACCEPTED AND AGREED:**

**ROOTED SOLUTIONS LLC**

__________________________________________  
Authorized Representative  
Date: ${dateStr}  

**CLIENT: ${clientProfile.businessName.toUpperCase()}**

__________________________________________  
${clientProfile.contactName}, ${contractInputs.clientSignerTitle}  
Date: ________________________`;

    } else if (selectedPackageId === 'financial') {
      output = `# BANK-READY FINANCIAL MODEL & FORECAST
**Client:** ${clientProfile.businessName} (${clientProfile.contactName})
**Date:** ${dateStr}

---

### 1. REVENUE & UNIT ECONOMICS
- **Average Price per Job:** $${finInputs.avgJobPrice.toLocaleString()}
- **Monthly Job Volume:** ${finInputs.monthlyVolume} jobs
- **Gross Monthly Revenue:** $${finCalculations.grossRev.toLocaleString()}
- **Annualized Projected Revenue:** $${(finCalculations.grossRev * 12).toLocaleString()}

---

### 2. DIRECT COST & MARGIN STRUCTURE
- **Direct COGS (${finInputs.cogsPct}%):** $${finCalculations.directCogs.toLocaleString()} / month
- **Payment Processing (${finInputs.processingFeePct}%):** $${finCalculations.processingFees.toLocaleString()} / month
- **Gross Monthly Profit:** $${finCalculations.grossProfit.toLocaleString()}

---

### 3. FIXED OPERATING EXPENSES (OPEX)
${finInputs.opexItems.map(item => `- **${item.name}:** $${item.cost}/month`).join('\n')}
- **Debt Service / Loan Payments:** $${finInputs.loanPayments}/month
- **Total Monthly Fixed Operating Expenses:** $${finCalculations.totalFixedOpex.toLocaleString()}

---

### 4. NET PROFIT & BREAK-EVEN ANALYSIS
- **Net Pre-Tax Profit:** $${finCalculations.netEbit.toLocaleString()} / month
- **Estimated Tax Reserve (${finInputs.taxReservePct}%):** $${finCalculations.taxReserve.toLocaleString()} / month
- **Net Owner Take-Home:** $${finCalculations.netTakeHome.toLocaleString()} / month (Net Margin: ${finCalculations.marginPct}%)
- **Monthly Break-Even Sales Target:** $${finCalculations.breakEvenMonthlyRev.toLocaleString()} / month`;

    } else if (selectedPackageId === 'sop') {
      output = `# STANDARD OPERATING PROCEDURE (SOP)
**Document ID:** SOP-${Math.floor(1000 + Math.random() * 9000)}
**Title:** ${sopInputs.sopTitle}
**Department:** ${sopInputs.department}
**Process Owner:** ${sopInputs.processOwner}
**Systems Used:** ${sopInputs.systemsUsed}
**Date:** ${dateStr}

---

### 1. PURPOSE & SCOPE
This document defines the mandatory procedure for completing site diagnostics, presenting quotes, obtaining digital client sign-off, and recording pre-job conditions for ${clientProfile.businessName}.

### 2. TRIGGER & PREREQUISITES
- **Trigger:** ${sopInputs.inputTrigger}

### 3. STEP-BY-STEP WORKFLOW
1. **Site Arrival & Customer Greeting:** Arrive within scheduled window. Introduce team lead and outline job diagnostics.
2. **Initial Diagnostic Checklist:** Perform thorough inspection using approved tablet workflow.
3. **Menu Option Presentation:** Present standardized pricing packages to client prior to performing work.
4. **Digital Authorization:** Capture client signature and deposit payment via digital portal.
5. **Pre-Job Documentation:** Take clear photos of existing conditions and save to job record.

### 4. EXCEPTION HANDLING
- **Scope Creep / Additional Repairs:** Stop work immediately, explain findings to client, update job order, and secure digital sign-off before proceeding.

### 5. QUALITY CONTROL CHECKLIST
- [ ] Diagnostic photos uploaded to client profile
- [ ] Pricing menu reviewed with client
- [ ] Digital signature captured
- [ ] Deposit received and verified
- [ ] Post-job cleanup inspected by crew lead`;

    } else {
      const activePkg = PACKAGES.find(p => p.id === selectedPackageId);
      output = `# ${activePkg.title.toUpperCase()}
**Prepared by:** Rooted Solutions LLC
**Client:** ${clientProfile.businessName} (${clientProfile.contactName})
**Date:** ${dateStr}

---

### EXECUTIVE DELIVERABLE OVERVIEW
This custom strategic document has been compiled for **${clientProfile.businessName}** in accordance with Rooted Solutions LLC consulting standards.

### KEY HIGHLIGHTS & ACTION ITEMS
1. **Target Deliverable:** ${activePkg.title}
2. **Service Package Tier:** $${activePkg.price}
3. **Delivery Status:** Complete & Ready for Implementation

#### Deliverable Checklist:
${activePkg.deliverables.map(d => `- [x] ${d}`).join('\n')}

---
*Generated by Rooted Solutions Consulting Engine.*`;
    }

    setGeneratedContent(output);
    const endTime = performance.now();
    setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activePkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* TOP HEADER */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-4 sticky top-0 z-50">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Building className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-100 tracking-tight">Rooted Solutions Consulting Tool</h1>
              <p className="text-xs text-slate-400">Client Intake & Operations Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Active
          </div>

        </div>
      </header>

      {/* VALUE LADDER BAR: 2 ROWS OF TILES */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 px-4 sm:px-8 py-4">
        <div className="max-w-[1700px] mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              Service Deliverable Menu
            </span>
            <span className="text-[11px] text-slate-500">Select a deliverable to configure</span>
          </div>

          {/* 4 COLUMNS x 2 ROWS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              const isSelected = selectedPackageId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/60 text-slate-100 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:bg-slate-900/60'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate text-slate-200">{pkg.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">${pkg.price}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{pkg.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CLIENT INTAKE & PARAMS (5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* PACKAGE SUMMARY CARD */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">
                  {activePkg.tag}
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-2">{activePkg.title}</h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activePkg.description}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">${activePkg.price}</span>
                <span className="text-[10px] block text-slate-500">Rooted Solutions</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activePkg.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CLIENT PROFILE BLOCK */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                Client Profile
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">General Info</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">Client Business Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={clientProfile.businessName}
                    onChange={(e) => setClientProfile({ ...clientProfile, businessName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                  <Building className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">Primary Contact</label>
                <div className="relative">
                  <input
                    type="text"
                    value={clientProfile.contactName}
                    onChange={(e) => setClientProfile({ ...clientProfile, contactName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                  <User className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={clientProfile.email}
                    onChange={(e) => setClientProfile({ ...clientProfile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">Location / City</label>
                <div className="relative">
                  <input
                    type="text"
                    value={clientProfile.location}
                    onChange={(e) => setClientProfile({ ...clientProfile, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                  <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC INTAKE SPECIFICATIONS */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                Deliverable Inputs
              </h3>

              {/* INPUT MODE TABS */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setInputTab('form')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    inputTab === 'form' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Form
                </button>
                <button
                  onClick={() => setInputTab('voice')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    inputTab === 'voice' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Voice
                </button>
                <button
                  onClick={() => setInputTab('transcript')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    inputTab === 'transcript' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Transcript
                </button>
              </div>
            </div>

            {/* TAB CONTENT: VOICE / AUDIO */}
            {inputTab === 'voice' && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4 text-center">
                <div className="flex flex-col items-center justify-center py-4">
                  <button
                    onClick={toggleRecording}
                    className={`p-5 rounded-full transition-all ${
                      isRecording
                        ? 'bg-red-500/20 text-red-400 border-2 border-red-500 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:scale-105'
                    }`}
                  >
                    {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>
                  <span className="text-xs font-mono text-slate-400 mt-3">
                    {isRecording ? `Recording Live... ${recordingTime}s` : 'Tap to Record Voice Notes'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Record key project terms or notes verbally to automatically include in document generation.
                </p>
              </div>
            )}

            {/* TAB CONTENT: TRANSCRIPT */}
            {inputTab === 'transcript' && (
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-400 block">Paste Call Notes / Meeting Transcript</label>
                <textarea
                  rows={6}
                  value={transcriptText}
                  onChange={(e) => setTranscriptText(e.target.value)}
                  placeholder="Paste unstructured raw intake notes here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 font-mono"
                />
              </div>
            )}

            {/* TAB CONTENT: FORM INPUTS */}
            {inputTab === 'form' && selectedPackageId === 'contract' && (
              <div className="space-y-4">
                
                {/* SELECT INCLUDED SERVICES CHECKBOXES */}
                <div>
                  <label className="text-[11px] font-medium text-emerald-400 mb-2 block flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    Agreed Services to Include in Contract:
                  </label>
                  <div className="space-y-1.5 bg-slate-950 border border-slate-800 p-3 rounded-xl max-h-48 overflow-y-auto">
                    {CONTRACT_SERVICE_OPTIONS.map((opt) => {
                      const isChecked = contractInputs.selectedServices.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => toggleContractService(opt.id)}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                            isChecked ? 'bg-emerald-500/10 text-slate-200 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <SquareIcon className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate font-medium">{opt.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Client Contact Title</label>
                    <input
                      type="text"
                      value={contractInputs.clientSignerTitle}
                      onChange={(e) => setContractInputs({ ...contractInputs, clientSignerTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Total Contract Value ($)</label>
                    <input
                      type="number"
                      value={contractInputs.totalContractValue}
                      onChange={(e) => setContractInputs({ ...contractInputs, totalContractValue: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Payment Schedule & Deposit</label>
                  <input
                    type="text"
                    value={contractInputs.paymentTerms}
                    onChange={(e) => setContractInputs({ ...contractInputs, paymentTerms: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Special Deliverable Terms</label>
                  <textarea
                    rows={2}
                    value={contractInputs.specialTerms}
                    onChange={(e) => setContractInputs({ ...contractInputs, specialTerms: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'financial' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Avg Price / Job ($)</label>
                    <input
                      type="number"
                      value={finInputs.avgJobPrice}
                      onChange={(e) => setFinInputs({ ...finInputs, avgJobPrice: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Monthly Jobs Count</label>
                    <input
                      type="number"
                      value={finInputs.monthlyVolume}
                      onChange={(e) => setFinInputs({ ...finInputs, monthlyVolume: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-medium text-slate-400 mb-1 block">COGS %</label>
                    <input
                      type="number"
                      value={finInputs.cogsPct}
                      onChange={(e) => setFinInputs({ ...finInputs, cogsPct: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-400 mb-1 block">Processing %</label>
                    <input
                      type="number"
                      value={finInputs.processingFeePct}
                      onChange={(e) => setFinInputs({ ...finInputs, processingFeePct: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-400 mb-1 block">Tax Reserve %</label>
                    <input
                      type="number"
                      value={finInputs.taxReservePct}
                      onChange={(e) => setFinInputs({ ...finInputs, taxReservePct: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'sop' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">SOP Title</label>
                    <input
                      type="text"
                      value={sopInputs.sopTitle}
                      onChange={(e) => setSopInputs({ ...sopInputs, sopTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Process Owner</label>
                    <input
                      type="text"
                      value={sopInputs.processOwner}
                      onChange={(e) => setSopInputs({ ...sopInputs, processOwner: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Raw Workflow Walkthrough</label>
                  <textarea
                    rows={3}
                    value={sopInputs.voiceNotes}
                    onChange={(e) => setSopInputs({ ...sopInputs, voiceNotes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'branding' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Brand Tagline</label>
                  <input
                    type="text"
                    value={brandingInputs.tagline}
                    onChange={(e) => setBrandingInputs({ ...brandingInputs, tagline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'marketing' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Primary Growth Offer</label>
                  <input
                    type="text"
                    value={marketingInputs.uniqueOffer}
                    onChange={(e) => setMarketingInputs({ ...marketingInputs, uniqueOffer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'business_plan' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Capital Required ($)</label>
                  <input
                    type="number"
                    value={bizPlanInputs.fundingRequired}
                    onChange={(e) => setBizPlanInputs({ ...bizPlanInputs, fundingRequired: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'consulting' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Primary Bottleneck</label>
                  <input
                    type="text"
                    value={consultingInputs.mainBottleneck}
                    onChange={(e) => setConsultingInputs({ ...consultingInputs, mainBottleneck: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* GENERATE ACTION BUTTON */}
            <button
              onClick={generateDocument}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Building Document...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate {activePkg.title}
                </>
              )}
            </button>
          </div>

        </section>

        {/* RIGHT COLUMN: GENERATED DELIVERABLE OUTPUT (7 cols) */}
        <section className="lg:col-span-7 space-y-6 flex flex-col">
          
          {/* FINANCIAL PREVIEW CARDS (WHEN FINANCIAL IS ACTIVE) */}
          {selectedPackageId === 'financial' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Gross Monthly Rev</span>
                <span className="text-base font-bold text-slate-100 font-mono">${finCalculations.grossRev.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Monthly Take-Home</span>
                <span className="text-base font-bold text-emerald-400 font-mono">${finCalculations.netTakeHome.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Net Margin %</span>
                <span className="text-base font-bold text-teal-300 font-mono">{finCalculations.marginPct}%</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Break-Even Sales Target</span>
                <span className="text-base font-bold text-amber-400 font-mono">${finCalculations.breakEvenMonthlyRev.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* DELIVERABLE CANVAS CONTAINER */}
          <div className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm min-h-[550px]">
            
            {/* CANVAS BAR */}
            <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">
                  {activePkg.title} Deliverable Document
                </span>
                {executionTime && (
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                    Generated in {executionTime}s
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedContent}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* CANVAS TEXT AREA */}
            <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-4">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 py-20">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                  <p className="text-xs">Formatting document...</p>
                </div>
              ) : generatedContent ? (
                <pre className="whitespace-pre-wrap font-mono text-slate-200 selection:bg-emerald-500 selection:text-slate-950">
                  {generatedContent}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 py-20">
                  <Sparkles className="w-10 h-10 text-slate-700" />
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-400">Workspace Ready</p>
                    <p className="text-[11px] text-slate-600 mt-1 max-w-sm">
                      Select a deliverable from the top menu, configure options on the left, and click Generate.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CANVAS FOOTER BAR */}
            <div className="bg-slate-950/80 px-4 py-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Status: {generatedContent ? 'Render Complete' : 'Ready'}</span>
              <span>Rooted Solutions LLC</span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}