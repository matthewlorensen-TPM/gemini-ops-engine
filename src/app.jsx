import React, { useState, useMemo, useRef } from 'react';
import {
  DollarSign,
  ShieldCheck,
  FileText,
  Layers,
  Mic,
  Square,
  Upload,
  Play,
  Copy,
  Check,
  Download,
  RefreshCw,
  Sparkles,
  Cpu,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  Lock,
  ArrowUpRight,
  Calculator,
  Volume2,
  Palette,
  Target,
  Briefcase,
  Compass,
  FileCode
} from 'lucide-react';

// ==========================================
// VALUE LADDER PACKAGES DEFINITION
// ==========================================
const PACKAGES = [
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
    id: 'contract',
    title: 'Contract & Estimate Pack',
    price: 200,
    tag: 'Legal Asset',
    icon: ShieldCheck,
    color: 'teal',
    description: 'Master Services Agreement (MSA), itemized SOW template, and scope-creep protection rules.',
    deliverables: ['Modular MSA + SOW Template', 'Scope Change & Deposit Boilerplate', 'Branded Quote Layout']
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
    deliverables: ['All Core $200 Packages', 'Custom Master Documents', '1-on-1 Strategy Sprint Review']
  }
];

// ==========================================
// DEFAULT GEMINI PROMPTS FOR PACKAGES
// ==========================================
const PROMPTS = {
  financial: `You are a Senior Financial Analyst for small business underwriting. Extract financial metrics from the intake data or transcript provided and return ONLY a valid JSON object strictly matching this schema without markdown fences:
{
  "client_name": "String",
  "business_name": "String",
  "average_job_price": number,
  "monthly_job_volume": number,
  "cogs_percentage": number,
  "payment_processing_fee_percentage": number,
  "tax_reserve_percentage": number,
  "fixed_monthly_opex": number,
  "opex_breakdown": [{"category": "String", "monthly_cost": number}],
  "gross_monthly_revenue": number,
  "net_monthly_profit": number,
  "annual_projected_revenue": number,
  "break_even_monthly_revenue": number,
  "underwriter_notes": "String"
}`,

  contract: `You are a Commercial Contract Specialist for small service businesses and trade contractors. Using the client intake information provided, construct a formal, legally sound Master Services Agreement (MSA) and Statement of Work (SOW) in clear Markdown format. Include deposit terms, scope-change rules, liability limits, and itemized billing.`,

  sop: `You are an Operations Engineer. Process the intake notes, voice notes, or transcript to generate a complete Standard Operating Procedure (SOP) in strict Markdown format with: Title, Department, Owner, Purpose, Roles & Responsibilities, Step-by-Step Procedure, Exception Handling, and a 5-item Quality Control Checklist.`,

  branding: `You are a Brand Strategist and Creative Director. Using the client's business details, create a complete Brand Identity & Messaging Guide in Markdown. Include Brand Positioning, Mission, USP, Color Palette (HEX codes), Font Directives, AI Image Generation Prompts for logos, 30-Second Commercial Pitch, and Social Media Headlines.`,

  marketing: `You are a Local Marketing Strategist. Create a tailored Marketing & Customer Acquisition Playbook in Markdown based on the client's services and location. Include Top 3 Channels, Promotional Flyer Copy, Direct Ad Script, and a 30-Day Step-by-Step Growth Roadmap.`,

  business_plan: `You are a Small Business Consultant specializing in bank loan applications and startup strategies. Generate a concise, bank-ready Executive Business Plan Narrative in Markdown covering Executive Summary, Market Analysis, Competitive Advantage, Revenue Model, Unit Economics, and Capital Deployment.`,

  consulting: `You are a Fractional Chief Technology & Operations Officer. Analyze the client's current setup and deliver an Operations & Tech Stack Audit Report in Markdown. Include Current State Diagnostic, Software Audit, System Automations (Quick Wins), and a Prioritized Action Plan.`
};

export default function App() {
  // Navigation & Config State
  const [selectedPackageId, setSelectedPackageId] = useState('financial');
  const [apiKey, setApiKey] = useState('');
  const [modelChoice, setModelChoice] = useState('gemini-2.0-flash');

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

  const [contractInputs, setContractInputs] = useState({
    clientName: 'Highland Park Real Estate Mgmt',
    siteLocation: '1420 E 104th Ave, Thornton CO',
    scopeDescription: 'Full electrical sub-panel upgrade, 200A main service hookup, and dedicated 50A EV charger installation in west garage.',
    totalPrice: 4200,
    depositPct: 50,
    timelineDays: 5,
    exclusions: 'Utility permit fees excluded; ungrounded legacy knob-and-tube rewiring requires separate change order.'
  });

  const [sopInputs, setSopInputs] = useState({
    department: 'Field Service',
    sopTitle: 'Customer Site Intake & Estimate Approval',
    processOwner: 'Lead Dispatcher / Crew Lead',
    systemsUsed: 'Google Sheets, Housecall Pro, Stripe Reader',
    inputTrigger: 'Signed customer quote or deposit receipt',
    voiceNotes: 'When a tech arrives on site, they do a 15-minute diagnostic, fill out the tablet checklist, show the homeowner the flat-rate pricing menu, get a digital signature before turning a wrench, and record any pre-existing damage.'
  });

  const [brandingInputs, setBrandingInputs] = useState({
    tagline: 'Precision Work Built to Last',
    targetAudience: 'Homeowners & Commercial Property Managers in Adams County',
    visualVibe: 'Clean, modern, dependable, premium dark navy and emerald theme',
    keyServices: 'Emergency plumbing, panel upgrades, routine preventive maintenance'
  });

  const [marketingInputs, setMarketingInputs] = useState({
    monthlyBudget: 400,
    mainChannels: 'Google Maps Local Pack, Direct Contractor Flyers, Local Facebook Groups',
    uniqueOffer: '$50 off first service call or free diagnostic with panel inspection'
  });

  const [bizPlanInputs, setBizPlanInputs] = useState({
    fundingRequired: 15000,
    useOfFunds: 'Work truck equipment, initial licensing/insurance, local marketing launch',
    competitiveAdvantage: '48-hour estimate turnaround, direct owner-operated quality guarantee'
  });

  const [consultingInputs, setConsultingInputs] = useState({
    mainBottleneck: 'Owner spends 15 hours a week doing quotes and manual invoice follow-ups after hours',
    currentTechStack: 'Pen and paper, personal Gmail, paper receipts, square card reader'
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

  // Handle Recording Toggle (Mock UI / Real Audio Capture ready)
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

  // Run Gemini API Pipeline
  const runGeminiIntakePipeline = async () => {
    setIsGenerating(true);
    const startTime = performance.now();

    try {
      const targetApiKey = apiKey || '';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelChoice}:generateContent?key=${targetApiKey}`;
      const systemPrompt = PROMPTS[selectedPackageId] || PROMPTS.financial;

      let userContextText = `CLIENT PROFILE:
Business: ${clientProfile.businessName}
Owner: ${clientProfile.contactName}
Email: ${clientProfile.email}
Phone: ${clientProfile.phone}
Location: ${clientProfile.location}

`;

      if (inputTab === 'transcript' && transcriptText.trim()) {
        userContextText += `CALL TRANSCRIPT / INTENDED WORKFLOW:
${transcriptText}`;
      } else if (selectedPackageId === 'financial') {
        userContextText += `FINANCIAL INTAKE DATA:
- Average Price per Job: $${finInputs.avgJobPrice}
- Expected Monthly Jobs: ${finInputs.monthlyVolume}
- Direct COGS Rate: ${finInputs.cogsPct}%
- Payment Processing Fee: ${finInputs.processingFeePct}%
- Tax Reserve Withholding: ${finInputs.taxReservePct}%
- Debt / Loan Payments: $${finInputs.loanPayments}
- Fixed OPEX Items: ${JSON.stringify(finInputs.opexItems)}
- Calculated Gross Monthly Revenue: $${finCalculations.grossRev}
- Calculated Monthly Fixed OPEX: $${finCalculations.totalFixedOpex}
- Calculated Net Monthly Profit: $${finCalculations.netTakeHome}`;
      } else if (selectedPackageId === 'contract') {
        userContextText += `CONTRACT & SOW INTAKE DATA:
- Customer Name: ${contractInputs.clientName}
- Work Site Address: ${contractInputs.siteLocation}
- Scope of Work Description: ${contractInputs.scopeDescription}
- Total Price Quoted: $${contractInputs.totalPrice}
- Deposit Percentage: ${contractInputs.depositPct}%
- Target Duration: ${contractInputs.timelineDays} Days
- Explicit Exclusions / Terms: ${contractInputs.exclusions}`;
      } else if (selectedPackageId === 'branding') {
        userContextText += `BRANDING INTAKE DATA:
- Tagline Concept: ${brandingInputs.tagline}
- Target Audience: ${brandingInputs.targetAudience}
- Visual Vibe & Style: ${brandingInputs.visualVibe}
- Primary Services: ${brandingInputs.keyServices}`;
      } else if (selectedPackageId === 'marketing') {
        userContextText += `MARKETING INTAKE DATA:
- Monthly Marketing Budget: $${marketingInputs.monthlyBudget}
- Preferred Channels: ${marketingInputs.mainChannels}
- Special Offer / Hook: ${marketingInputs.uniqueOffer}`;
      } else if (selectedPackageId === 'business_plan') {
        userContextText += `BUSINESS PLAN INTAKE DATA:
- Capital Required: $${bizPlanInputs.fundingRequired}
- Planned Allocation: ${bizPlanInputs.useOfFunds}
- Core Differentiation: ${bizPlanInputs.competitiveAdvantage}`;
      } else if (selectedPackageId === 'consulting') {
        userContextText += `OPS CONSULTING INTAKE DATA:
- Primary Friction Point: ${consultingInputs.mainBottleneck}
- Current Software Tools: ${consultingInputs.currentTechStack}`;
      } else {
        userContextText += `SOP INTAKE DATA:
- Department: ${sopInputs.department}
- SOP Title: ${sopInputs.sopTitle}
- Process Owner: ${sopInputs.processOwner}
- Systems & Software Used: ${sopInputs.systemsUsed}
- Input Trigger: ${sopInputs.inputTrigger}
- Raw Spoken Walkthrough / Transcript Notes: ${sopInputs.voiceNotes}`;
      }

      if (!targetApiKey) {
        // Mock fallback simulation if no API key is provided
        await new Promise(res => setTimeout(res, 1200));
        let mockOutput = `# ${PACKAGES.find(p => p.id === selectedPackageId)?.title.toUpperCase()}\n\n`;
        mockOutput += `**Client:** ${clientProfile.businessName} (${clientProfile.contactName})\n`;
        mockOutput += `**Location:** ${clientProfile.location}\n`;
        mockOutput += `**Date:** ${new Date().toLocaleDateString()}\n\n`;
        mockOutput += `### Executive Summary & Scope\n`;
        mockOutput += `Generated asset framework ready for hand-off. Connect your Gemini API Key in the top toolbar to run real-time AI generation.\n\n`;
        mockOutput += `### Primary Deliverable Matrix\n`;
        mockOutput += `- **Status:** Verified & Formatted\n- **Target Turnaround:** 48 Hours\n- **Value Tier:** $${PACKAGES.find(p => p.id === selectedPackageId)?.price}\n`;
        
        setGeneratedContent(mockOutput);
      } else {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\n${userContextText}` }]
            }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: selectedPackageId === 'financial' ? 'application/json' : 'text/plain'
            }
          })
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message || 'Gemini API Error');
        }

        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        setGeneratedContent(rawText);
      }

      const endTime = performance.now();
      setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
    } catch (err) {
      setGeneratedContent(`### API Execution Error\n\n\`\`\`\n${err.message}\n\`\`\`\nPlease check your Gemini API key and try again.`);
    } finally {
      setIsGenerating(false);
    }
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
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-50">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-100 tracking-tight">Gemini Ops Engine</h1>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  v2.0 Flash
                </span>
              </div>
              <p className="text-xs text-slate-400">Micro-Consulting & Startup Asset Generator</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Model Selector */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 mr-2" />
              <select
                value={modelChoice}
                onChange={(e) => setModelChoice(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
              >
                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro</option>
              </select>
            </div>

            {/* API Key Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="password"
                placeholder="Enter Gemini API Key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
              <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors px-2 py-1"
            >
              Get Key <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

        </div>
      </header>

      {/* VALUE LADDER BAR */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 px-4 sm:px-8 py-3">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Flexible Service Menu:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full">
            {PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              const isSelected = selectedPackageId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-slate-100 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-bold block truncate text-slate-200">{pkg.title}</span>
                    <span className="text-[9px] font-mono text-emerald-400 font-semibold">${pkg.price}</span>
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
                <span className="text-[10px] block text-slate-500">48-Hr Delivery</span>
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
                Client & Business Profile
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">15-Min Intake</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">Business Name</label>
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
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">Owner / Contact</label>
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
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">City / Service Area</label>
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

          {/* DYNAMIC FORM / INTAKE SELECTOR */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                Deliverable Intake Specifications
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

            {/* TAB CONTENT: VOICE / AUDIO RECORDING */}
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
                    {isRecording ? `Recording Live... ${recordingTime}s` : 'Tap to Record Spoken Walkthrough (Gemini Native Audio)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Speak raw notes naturally: "Average job is $1500, we do 8 jobs a month, truck is $850..."
                </p>
              </div>
            )}

            {/* TAB CONTENT: CALL TRANSCRIPT PASTE */}
            {inputTab === 'transcript' && (
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-400 block">Paste Zoom / Teams / Call Transcript (.txt / .vtt)</label>
                <textarea
                  rows={6}
                  value={transcriptText}
                  onChange={(e) => setTranscriptText(e.target.value)}
                  placeholder="Paste unstructured raw call transcript or email notes here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 font-mono"
                />
              </div>
            )}

            {/* TAB CONTENT: FORM INPUTS (PACKAGE DEPENDENT) */}
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
                    <label className="text-[10px] font-medium text-slate-400 mb-1 block">Stripe %</label>
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

            {inputTab === 'form' && selectedPackageId === 'contract' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Customer Name</label>
                    <input
                      type="text"
                      value={contractInputs.clientName}
                      onChange={(e) => setContractInputs({ ...contractInputs, clientName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Total Contract Price ($)</label>
                    <input
                      type="number"
                      value={contractInputs.totalPrice}
                      onChange={(e) => setContractInputs({ ...contractInputs, totalPrice: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Scope of Work</label>
                  <textarea
                    rows={3}
                    value={contractInputs.scopeDescription}
                    onChange={(e) => setContractInputs({ ...contractInputs, scopeDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
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
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Raw Workflow Description</label>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Brand Tagline / Concept</label>
                    <input
                      type="text"
                      value={brandingInputs.tagline}
                      onChange={(e) => setBrandingInputs({ ...brandingInputs, tagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Target Audience</label>
                    <input
                      type="text"
                      value={brandingInputs.targetAudience}
                      onChange={(e) => setBrandingInputs({ ...brandingInputs, targetAudience: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'marketing' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Monthly Ad Budget ($)</label>
                    <input
                      type="number"
                      value={marketingInputs.monthlyBudget}
                      onChange={(e) => setMarketingInputs({ ...marketingInputs, monthlyBudget: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Primary Channels</label>
                    <input
                      type="text"
                      value={marketingInputs.mainChannels}
                      onChange={(e) => setMarketingInputs({ ...marketingInputs, mainChannels: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'business_plan' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Capital Required ($)</label>
                    <input
                      type="number"
                      value={bizPlanInputs.fundingRequired}
                      onChange={(e) => setBizPlanInputs({ ...bizPlanInputs, fundingRequired: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Use of Funds</label>
                    <input
                      type="text"
                      value={bizPlanInputs.useOfFunds}
                      onChange={(e) => setBizPlanInputs({ ...bizPlanInputs, useOfFunds: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {inputTab === 'form' && selectedPackageId === 'consulting' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Primary Operations Bottleneck</label>
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
              onClick={runGeminiIntakePipeline}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing through Gemini 2.0...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate {activePkg.title} (${activePkg.price})
                </>
              )}
            </button>
          </div>

        </section>

        {/* RIGHT COLUMN: GENERATED ASSET WORKSPACE (7 cols) */}
        <section className="lg:col-span-7 space-y-6 flex flex-col">
          
          {/* FINANCIAL LIVE PREVIEW CARDS (ONLY WHEN FINANCIAL SELECTED) */}
          {selectedPackageId === 'financial' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Gross Monthly Rev</span>
                <span className="text-base font-bold text-slate-100 font-mono">${finCalculations.grossRev.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Monthly Net Take-Home</span>
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
                  {selectedPackageId.toUpperCase()} Deliverable Output
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
                  <p className="text-xs">Extracting data & formatting Markdown via Gemini 2.0 Flash...</p>
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
                      Select a service package from the menu above, review the intake parameters, and click Generate to run the AI engine.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CANVAS FOOTER BAR */}
            <div className="bg-slate-950/80 px-4 py-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Status: {generatedContent ? 'Render Complete' : 'Idle'}</span>
              <span>48-Hour Zero-Risk Guarantee Active</span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}