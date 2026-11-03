import React, { useState } from 'react';
import {
  ShieldCheck,
  DollarSign,
  FileText,
  Target,
  CheckCircle2,
  ArrowRight,
  Clock,
  Building,
  Phone,
  Mail,
  Check,
  Sparkles,
  Award,
  Zap,
  Database,
  Lock,
  Download,
  Trash2,
  X,
  UserCheck,
  Sliders,
  Layers,
  Copy,
  RefreshCw,
  ExternalLink,
  Lightbulb
} from 'lucide-react';

// ==========================================
// CENTRAL CONFIGURATION & CONSTANTS
// ==========================================
const ADMIN_PASSCODE = '313423';

const PACKAGES = [
  {
    id: 'contract',
    title: 'Simple Work Agreement',
    price: 200,
    tag: 'Client Agreement',
    icon: ShieldCheck,
    color: 'teal',
    description: 'Clear, plain-English contract showing agreed work, payment terms, and deposit requirements so everyone stays on the same page.',
    deliverables: ['Professional Client Agreement', 'Selected Services List', 'Deposit & Extra Work Rules']
  },
  {
    id: 'financial',
    title: 'Simple Numbers & Profit Tracker',
    price: 200,
    tag: 'Financial Tracker',
    icon: DollarSign,
    color: 'emerald',
    description: 'Easy-to-understand monthly profit tracker, job pricing guide, business bills list, and minimum monthly sales goal.',
    deliverables: ['Simple Google Sheets Tracker', 'Minimum Monthly Sales Goal', 'Bank & Loan Ready Summary']
  },
  {
    id: 'sop',
    title: 'Step-by-Step How-To Guide',
    price: 200,
    tag: 'How-To Guide',
    icon: FileText,
    color: 'cyan',
    description: 'Turn voice notes or quick phone calls into a clear step-by-step checklist for your crew or staff to follow.',
    deliverables: ['Easy Printed Checklist', 'Crew Instructions', 'Common Problem Fixes']
  },
  {
    id: 'branding',
    title: 'Business Name, Logo & Pitch',
    price: 200,
    tag: 'Brand Ideas',
    icon: ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    color: 'purple',
    description: 'Clear business tagline, color style guide, quick elevator pitch, and logo design ideas for your local business.',
    deliverables: ['Business Tagline & Message', 'Color & Logo Directives', 'Quick Sales Pitches']
  },
  {
    id: 'marketing',
    title: 'Local Customer Lead Plan',
    price: 200,
    tag: 'Local Leads',
    icon: Target,
    color: 'rose',
    description: 'Simple plan to get local leads, word-of-mouth referrals, direct flyer wording, and a 30-day customer action plan.',
    deliverables: ['Local Outreach Playbook', 'Flyer & Ad Wording', '30-Day Customer Plan']
  },
  {
    id: 'business_plan',
    title: 'Simple Business & Loan Plan',
    price: 350,
    tag: 'Business Plan',
    icon: ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    color: 'indigo',
    description: 'Straight-to-the-point business plan designed for bank loan officers, partners, or setting your business goals.',
    deliverables: ['Bank & SBA Loan Narrative', 'Local Competition Overview', 'Simple Financial Strategy']
  },
  {
    id: 'consulting',
    title: 'Time-Saver & Tech Audit',
    price: 200,
    tag: 'Time Saver',
    icon: ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
    color: 'blue',
    description: 'Find out where you are losing hours every week and get a simple list of easy software or apps to fix it.',
    deliverables: ['Software & App Checkup', 'Weekly Hours Lost Review', 'Easy Step-by-Step Plan']
  },
  {
    id: 'suite',
    title: 'Complete Business Starter Pack',
    price: 600,
    tag: 'Full Bundle',
    icon: Layers,
    color: 'amber',
    description: 'Combines your contract, numbers tracker, how-to guides, and local marketing into one complete 10-day business launch setup.',
    deliverables: ['All Core $200 Services', 'Custom Master Documents', '1-on-1 Strategy Chat']
  }
];

const CONTRACT_SERVICE_OPTIONS = [
  { id: 'financial', name: 'Simple Business Numbers & Monthly Profit Tracker' },
  { id: 'sop', name: 'Step-by-Step How-To Work Checklists for Crew/Staff' },
  { id: 'branding', name: 'Business Name, Tagline & Logo Design Guide' },
  { id: 'marketing', name: 'Local Customer Lead & Ad Campaign Plan' },
  { id: 'business_plan', name: 'Bank-Ready Business Plan Narrative' },
  { id: 'consulting', name: 'Time-Saver Tech & App Recommendation Review' },
  { id: 'advisory', name: 'Ongoing Monthly Business Support & Check-ins' }
];

const PROBING_QUESTIONS = {
  contract: [
    { question: "Payment Systems:", detail: "How do you take payments (Stripe, Square, Check, Cash App)? What deposit % is required before work starts?" },
    { question: "Scope Boundaries:", detail: "What is explicitly NOT included in your services that clients frequently try to ask for?" },
    { question: "Licensing & Restrictions:", detail: "Are there local permit costs, HOA approvals, or sub-contractor insurance rules required on site?" },
    { question: "Change Orders:", detail: "If a job runs into unexpected issues, how do you handle pricing updates and approval?" }
  ],
  financial: [
    { question: "Merchant & Processing Fees:", detail: "What exact percentage do you pay on credit card processing (e.g., 2.9% + $0.30)?" },
    { question: "Fixed Operating Bills:", detail: "What are your exact monthly bills for truck loans, gas, liability insurance, software, and tools?" },
    { question: "Tax Reserves:", detail: "Do you currently set aside 20-30% of profit in a separate bank account for federal & state taxes?" },
    { question: "Owner Take-Home Goal:", detail: "What minimum dollar amount do you need to take home every month to cover personal living expenses?" }
  ],
  sop: [
    { question: "Workflow Bottlenecks:", detail: "Where does your team or crew consistently make mistakes or lose time on a job site?" },
    { question: "Software & App Hand-offs:", detail: "What apps are used from intake to invoice (e.g., Housecall Pro, Jobber, QuickBooks, Google Sheets)?" },
    { question: "Quality Verification:", detail: "What 5 specific items MUST be checked off and photographed before leaving a customer's property?" },
    { question: "Exception Protocols:", detail: "What happens if a customer is unhappy or not home when the technician arrives?" }
  ],
  branding: [
    { question: "Target Customer Persona:", detail: "Who is your ideal customer (residential homeowners, commercial property managers, luxury remodels)?" },
    { question: "Local Competition:", detail: "Who are your top 2 local competitors and what makes your work better or faster?" },
    { question: "Visual Tone & Colors:", detail: "What feeling should your brand give (dependable & rugged vs. high-end & modern)?" }
  ],
  marketing: [
    { question: "Current Lead Sources:", detail: "Where do your current customers come from (Google Maps, Facebook groups, referrals, flyers)?" },
    { question: "Customer Acquisition Budget:", detail: "How much are you willing to spend to acquire one paying customer ($50, $100, $200)?" },
    { question: "Special Opening Hook:", detail: "What quick introductory offer can we run to get new homeowners to call you today?" }
  ],
  business_plan: [
    { question: "Capital & Funding Needed:", detail: "How much capital are you seeking from a bank or investor, and what exact equipment will it buy?" },
    { question: "Market Size & Location:", detail: "What specific zip codes or counties will you serve, and how many target homes/businesses exist there?" }
  ],
  consulting: [
    { question: "Weekly Hours Lost:", detail: "How many hours per week are spent on admin, writing quotes, chasing unpaid invoices, and scheduling?" },
    { question: "Software Stack Review:", detail: "What software apps are you paying for monthly that you rarely or never use?" }
  ],
  suite: [
    { question: "Overall Business Strategy:", detail: "What is your main goal for the next 12 months (e.g., hire first employee, buy 2nd truck, double net profit)?" }
  ]
};

// SVG Fallback for Document Icon to prevent Lucide version conflicts
const DocumentIcon = ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CodeIcon = ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;

// ==========================================
// BRAND LOGO COMPONENT WITH FALLBACK
// ==========================================
function BrandLogo({ size = "w-9 h-9" }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${size} p-1.5 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0`}>
        <Building className="w-full h-full text-slate-950 p-1" />
      </div>
    );
  }

  return (
    <img
      src="/logo.jpg"
      alt="Rooted Solutions"
      onError={() => setHasError(true)}
      className={`${size} rounded-full object-cover border border-emerald-500/40 shadow-md shadow-emerald-500/20 shrink-0`}
    />
  );
}

// ==========================================
// INLINE APP CONSOLE COMPONENT
// ==========================================
function AppConsole() {
  const [selectedPackageId, setSelectedPackageId] = React.useState('contract');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState('');
  const [executionTime, setExecutionTime] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  const [clientProfile, setClientProfile] = React.useState({
    businessName: 'Apex Plumbing & HVAC',
    contactName: 'John Smith',
    email: 'john@apexplumbingco.com',
    phone: '(303) 555-0192',
    address: '1420 E 104th Ave, Thornton CO',
    website: 'www.apexplumbingco.com',
    socialMedia: 'FB/IG: @apexplumbingco'
  });

  const [contractInputs, setContractInputs] = React.useState({
    clientSignerTitle: 'Owner / Operator',
    totalContractValue: 600,
    depositPct: 50,
    paymentTerms: '50% upfront deposit, 50% upon final delivery',
    selectedServices: ['financial', 'sop', 'consulting'],
    specialTerms: 'Includes weekly 30-minute status check-ins while work is underway. Target completion within 10 business days.',
    exclusions: 'Software subscriptions, state filing fees, and direct ad spending are paid directly by the client.'
  });

  const [finInputs, setFinInputs] = React.useState({
    avgJobPrice: 1500,
    monthlyVolume: 8,
    cogsPct: 20,
    processingFeePct: 3,
    taxReservePct: 25,
    loanPayments: 350,
    opexItems: [
      { name: 'Truck Fuel & Maintenance', cost: 850 },
      { name: 'Business Insurance', cost: 450 },
      { name: 'Software & Phone Apps', cost: 250 },
      { name: 'Cell Phone & Internet', cost: 150 }
    ]
  });

  const [sopInputs, setSopInputs] = React.useState({
    department: 'Field Work',
    sopTitle: 'Job Site Arrival & Customer Sign-Off',
    processOwner: 'Lead Tech / Owner',
    systemsUsed: 'Google Sheets, Card Reader, Phone Scheduling App',
    inputTrigger: 'Customer accepts estimate or pays deposit',
    voiceNotes: 'When arriving at a customer site, do a 15-minute walkthrough, fill out the digital checklist, review job options with the homeowner, get a digital sign-off before starting work, and take pre-work photos.'
  });

  const generateDocument = async () => {
    setIsGenerating(true);
    const startTime = performance.now();
    await new Promise(res => setTimeout(res, 500));

    let output = '';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (selectedPackageId === 'contract') {
      const includedList = CONTRACT_SERVICE_OPTIONS
        .filter(opt => contractInputs.selectedServices.includes(opt.id))
        .map(opt => `- **${opt.name}**`)
        .join('\n');

      const depositAmount = Math.round(contractInputs.totalContractValue * (contractInputs.depositPct / 100));
      const remainingBalance = contractInputs.totalContractValue - depositAmount;

      output = `# CLIENT SERVICES & CONSULTING AGREEMENT\n\n**PROVIDER:** Rooted Solutions\n**CLIENT:** ${clientProfile.businessName}  \n**DATE:** ${dateStr}  \n\n---\n\n### PARTIES & CONTACT DETAILS\n\n| PROVIDER INFORMATION | CLIENT INFORMATION |\n| :--- | :--- |\n| **Company:** Rooted Solutions | **Company:** ${clientProfile.businessName} |\n| **Representative:** Matthew Lorensen | **Representative:** ${clientProfile.contactName} (${contractInputs.clientSignerTitle}) |\n| **Service Region:** Colorado, USA | **Address:** ${clientProfile.address} |\n| **Contact Email:** info@rootedsolutions.com | **Contact Email:** ${clientProfile.email} |\n| **Contact Phone:** (720) 555-0199 | **Contact Phone:** ${clientProfile.phone} |\n\n---\n\n### 1. SCOPE OF AGREED SERVICES\nRooted Solutions shall perform the following customized business advisory deliverables for **${clientProfile.businessName}**:\n\n${includedList || '- Custom Business Advisory & Setup'}\n\n---\n\n### 2. INVESTMENT & PAYMENT TERMS\n\n- **Total Contract Price:** $${contractInputs.totalContractValue.toLocaleString()} USD\n- **Upfront Deposit (${contractInputs.depositPct}%):** $${depositAmount.toLocaleString()} USD (Due prior to project launch)\n- **Remaining Balance:** $${remainingBalance.toLocaleString()} USD (Due upon final deliverable hand-off)\n- **Payment Structure:** ${contractInputs.paymentTerms}\n\n---\n\n### 3. TIMELINE & PROJECT MILESTONES\n- **Project Kickoff:** Immediately following receipt of deposit and completed intake profile.\n- **Communication Schedule:** ${contractInputs.specialTerms}\n\n---\n\n### 4. EXCLUSIONS & BOUNDARIES\n${contractInputs.exclusions}\n\n---\n\n### 5. GENERAL BUSINESS TERMS\n- **Scope Changes:** Any services requested outside this agreement will be documented in a separate written addendum.\n- **Intellectual Property:** Upon final payment receipt, all custom documents, models, and checklists belong 100% to **${clientProfile.businessName}**.\n- **Confidentiality:** Rooted Solutions maintains strict non-disclosure of all client financial numbers and business processes.\n\n---\n\n### 6. AUTHORIZATION & SIGNATURES\n\nBy signing below, the parties agree to the terms, scope, and payment schedule set forth in this Agreement.\n\n**ROOTED SOLUTIONS**\n\n__________________________________________  \nAuthorized Representative  \nDate: ${dateStr}  \n\n\n**CLIENT: ${clientProfile.businessName.toUpperCase()}**\n\n__________________________________________  \n${clientProfile.contactName}, ${contractInputs.clientSignerTitle}  \nDate: ________________________`;
    } else if (selectedPackageId === 'sop') {
      output = `# STEP-BY-STEP HOW-TO GUIDE\n**Guide ID:** GUIDE-${Math.floor(1000 + Math.random() * 9000)}\n**Title:** ${sopInputs.sopTitle}\n**Department / Area:** ${sopInputs.department}\n**Who Manages This:** ${sopInputs.processOwner}\n**Apps / Tools Used:** ${sopInputs.systemsUsed}\n**Date:** ${dateStr}\n\n---\n\n### 1. WHY WE DO THIS\nThis guide lays out the step-by-step steps for completing site diagnostics, giving quotes, getting customer sign-off, and taking pre-job photos for ${clientProfile.businessName}.\n\n### 2. WHEN TO START THIS PROCESS\n- **Trigger:** ${sopInputs.inputTrigger}\n\n### 3. STEP-BY-STEP INSTRUCTIONS\n1. **Arrive & Greet:** Arrive on time, introduce yourself, and walk the customer through what you will be inspecting.\n2. **Check the Site:** Run through your standard job checklist on your phone or tablet.\n3. **Show Pricing Options:** Show the customer clear, upfront pricing before starting any work.\n4. **Get Digital Sign-Off:** Get the customer's signature and deposit on your phone/tablet.\n5. **Take Photos:** Take clear photos of existing site conditions and save them to the job file.\n\n### 4. HOW TO HANDLE PROBLEMS OR SCOPE CHANGES\n- **Unexpected Work Needed:** Stop work immediately, explain the issue to the customer, show them the updated price, and get sign-off before doing any extra work.\n\n### 5. QUICK QUALITY CHECKLIST\n- [ ] Job photos saved to customer file\n- [ ] Upfront pricing reviewed with customer\n- [ ] Digital signature collected\n- [ ] Deposit payment verified\n- [ ] Work area cleaned up before leaving site`;
    } else {
      const activePkg = PACKAGES.find(p => p.id === selectedPackageId);
      output = `# ${activePkg.title.toUpperCase()}\n**Prepared by:** Rooted Solutions\n**Prepared for:** ${clientProfile.businessName} (${clientProfile.contactName})\n**Date:** ${dateStr}\n\n---\n\n### SUMMARY OVERVIEW\nThis practical business document was created specifically for **${clientProfile.businessName}** to help keep operations simple, organized, and profitable.\n\n### KEY HIGHLIGHTS & DELIVERABLES\n1. **Deliverable Name:** ${activePkg.title}\n2. **Package Price:** $${activePkg.price}\n3. **Status:** Ready for Action\n\n#### Included Items:\n${activePkg.deliverables.map(d => `- [x] ${d}`).join('\n')}\n\n---\n*Created by Rooted Solutions Small Business Tool.*`;
    }

    setGeneratedContent(output);
    const endTime = performance.now();
    setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
    setIsGenerating(false);
  };

  const exportToGoogleDocs = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    window.open('https://docs.new', '_blank');
    setTimeout(() => setCopied(false), 3000);
  };

  const activePkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  const activeProbingQuestions = PROBING_QUESTIONS[selectedPackageId] || PROBING_QUESTIONS.contract;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* CONSOLE HEADER */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-4 sticky top-0 z-50">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="w-9 h-9" />
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

      {/* CLIENT PROFILE (TOP BAR) - MOVED FROM GRID */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 px-4 sm:px-8 py-4">
        <div className="max-w-[1700px] mx-auto space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-400" />
            Client Profile (CRM)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Client Business Name</label>
              <input
                type="text"
                value={clientProfile.businessName}
                onChange={(e) => setClientProfile({ ...clientProfile, businessName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Primary Contact</label>
              <input
                type="text"
                value={clientProfile.contactName}
                onChange={(e) => setClientProfile({ ...clientProfile, contactName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Email</label>
              <input
                type="email"
                value={clientProfile.email}
                onChange={(e) => setClientProfile({ ...clientProfile, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Phone Number</label>
              <input
                type="tel"
                value={clientProfile.phone}
                onChange={(e) => setClientProfile({ ...clientProfile, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Full Address</label>
              <input
                type="text"
                value={clientProfile.address}
                onChange={(e) => setClientProfile({ ...clientProfile, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Website</label>
              <input
                type="text"
                value={clientProfile.website}
                onChange={(e) => setClientProfile({ ...clientProfile, website: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Social Media Links / Handles</label>
              <input
                type="text"
                value={clientProfile.socialMedia}
                onChange={(e) => setClientProfile({ ...clientProfile, socialMedia: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* ROW 1: MENU & PROBING QUESTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* SERVICE DELIVERABLE MENU (MOVED TO GRID) */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4 h-full flex flex-col shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Service Deliverable Menu
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1">
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
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{pkg.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC PROBING QUESTIONS SECTION */}
          <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-5 space-y-3 h-full flex flex-col shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Key Discovery Probing Questions
              </span>
              <span className="text-[10px] font-mono text-slate-500">Ask Client Before Notes</span>
            </div>

            <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-72">
              {activeProbingQuestions.map((pq, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-xs space-y-1">
                  <span className="font-semibold text-slate-200 block text-xs">{pq.question}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{pq.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: GENERAL INTAKE NOTES */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
          <label className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            Special Terms & Discovery Notes
          </label>
          <textarea
            rows={4}
            value={selectedPackageId === 'contract' ? contractInputs.specialTerms : sopInputs.voiceNotes}
            onChange={(e) => {
              if (selectedPackageId === 'contract') {
                setContractInputs({ ...contractInputs, specialTerms: e.target.value });
              } else {
                setSopInputs({ ...sopInputs, voiceNotes: e.target.value });
              }
            }}
            placeholder="Record discovery answers, client payment system restrictions, special conditions..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-y"
          />
        </div>

        {/* ROW 3: GENERATE ACTION BUTTON */}
        <button
          onClick={generateDocument}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-wider"
        >
          {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Generate {activePkg.title} Deliverable
        </button>

        {/* ROW 4: DOCUMENT GENERATOR CANVAS */}
        <div className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm min-h-[500px]">
          <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <CodeIcon className="w-4 h-4 text-emerald-400" />
              {activePkg.title} Output Preview
            </span>
            <div className="flex items-center gap-3">
              {executionTime && (
                <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                  Generated in {executionTime}s
                </span>
              )}
              <button
                onClick={exportToGoogleDocs}
                disabled={!generatedContent}
                className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/40 rounded-lg text-emerald-400 text-xs font-bold flex items-center gap-2 hover:bg-emerald-500 hover:text-slate-950 transition-all disabled:opacity-30"
              >
                {copied ? <Check className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {copied ? 'Copied & Opening...' : 'Open in Google Docs'}
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm text-slate-300 leading-relaxed bg-[#0a0f18]">
            {generatedContent ? (
              <pre className="whitespace-pre-wrap font-mono text-slate-200 max-w-4xl mx-auto">{generatedContent}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 py-20">
                <DocumentIcon className="w-12 h-12 text-slate-700" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-400">Workspace Ready</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-md">
                    Complete your discovery notes above and click the generate button to view the output.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

// ==========================================
// MAIN EXPORT (LANDING PAGE + APP CONSOLE)
// ==========================================
export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    packageInterest: 'Complete Business Starter Pack ($600)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [formError, setFormError] = useState('');

  const GOOGLE_SHEET_WEBHOOK_URL = '';

  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedLeads, setSavedLeads] = useState(() => {
    try {
      const stored = localStorage.getItem('rooted_leads');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    
    const newLead = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      ...formData
    };

    const updatedLeads = [newLead, ...savedLeads];
    setSavedLeads(updatedLeads);
    
    try {
      localStorage.setItem('rooted_leads', JSON.stringify(updatedLeads));
    } catch (err) {
      console.error('Failed to save lead locally:', err);
    }

    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (err) {
        console.error('Failed to post lead to Google Drive Sheet:', err);
        setFormError('Warning: Could not connect to the remote database, but your lead was saved locally!');
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPin === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied. Incorrect passcode.');
    }
  };

  const exportLeadsToCSV = () => {
    if (savedLeads.length === 0) return;
    const headers = ['Date', 'Name', 'Business Name', 'Phone', 'Email', 'Package', 'Headache Notes'];
    const csvRows = [
      headers.join(','),
      ...savedLeads.map(l => [
        `"${l.date}"`,
        `"${l.name}"`,
        `"${l.businessName}"`,
        `"${l.phone}"`,
        `"${l.email}"`,
        `"${l.packageInterest}"`,
        `"${(l.notes || '').replace(/"/g, '""')}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rooted_leads_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const deleteLead = (id) => {
    const filtered = savedLeads.filter(l => l.id !== id);
    setSavedLeads(filtered);
    localStorage.setItem('rooted_leads', JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* --- APP CONSOLE VIEW (Hidden via CSS toggle to preserve state) --- */}
      <div className={`${showConsole ? 'block' : 'hidden'} relative z-[100]`}>
        <div className="bg-slate-900 text-slate-200 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs sticky top-0 z-[100]">
          <span className="font-mono text-emerald-400 font-bold flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Rooted Solutions Consulting Tool (Admin View)
          </span>
          <button
            onClick={() => setShowConsole(false)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1 rounded-lg transition-colors font-sans font-semibold flex items-center gap-1.5"
          >
            ← Back to Public Website
          </button>
        </div>
        <AppConsole />
      </div>

      {/* --- PUBLIC LANDING PAGE VIEW --- */}
      <div className={`${showConsole ? 'hidden' : 'block'}`}>
        
        {/* NAVIGATION BAR */}
        <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer select-none" onDoubleClick={() => setShowAdmin(true)} title="Rooted Solutions">
              <BrandLogo size="w-9 h-9" />
              <span className="font-bold text-slate-100 text-lg tracking-tight">Rooted Solutions</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
              <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
              <a href="#process" className="hover:text-emerald-400 transition-colors">How It Works</a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
              >
                Free 15-Min Chat
              </a>
            </div>
          </div>
        </nav>

        {/* HERO SECTION WITH STRONGER BRANDING */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-800/60">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">

            <div className="flex flex-col items-center justify-center mb-4 space-y-4">
               <BrandLogo size="w-20 h-20" />
               <span className="text-emerald-400 font-mono text-sm tracking-[0.2em] font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">Operational Partners</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
              Simple Operations & Local Marketing — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">No Corporate Fluff.</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We simplify your paperwork, set up straightforward profit trackers, and build local lead systems so you can spend less time on admin after hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href="#contact"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                Book Free 15-Min Audit
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                View $200 Service Menu
              </a>
            </div>

            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-xs text-slate-400 font-medium">
              <div className="flex items-center justify-center gap-2 bg-slate-900/40 border border-slate-800/80 p-2.5 rounded-xl">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>10-Day Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-slate-900/40 border border-slate-800/80 p-2.5 rounded-xl">
                <Award className="w-4 h-4 text-teal-400" />
                <span>100% Owner Operated</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-slate-900/40 border border-slate-800/80 p-2.5 rounded-xl">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>No Retainer Traps</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-slate-900/40 border border-slate-800/80 p-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Plain English Guarantee</span>
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Transparent Pricing
              </span>
              <h2 className="text-3xl font-extrabold text-slate-100">Simple $200 Business Deliverables</h2>
              <p className="text-slate-400 text-sm">Pick individual operational tools or get the complete starter bundle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PACKAGES.filter(p => p.price === 200).slice(0, 4).map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-mono font-bold text-emerald-400">${service.price}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-100">{service.title}</h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{service.description}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-800/60 space-y-2">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a href="#contact" className="mt-6 w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold py-2.5 rounded-xl text-center block transition-colors">
                      Select Service
                    </a>
                  </div>
                );
              })}
            </div>

            {/* BUNDLE HIGHLIGHT BOX */}
            <div className="mt-12 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/40 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-500/5">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Best Value Bundle
                </span>
                <h3 className="text-2xl font-bold text-slate-100">Complete Business Starter Pack</h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Combines your Work Agreement, Profit Tracker, How-To Checklists, and Local Customer Plan into one complete 10-day business launch setup.
                </p>
              </div>

              <div className="text-center md:text-right shrink-0">
                <div className="text-3xl font-mono font-extrabold text-emerald-400">$600</div>
                <span className="text-[11px] text-slate-400 font-mono block">Saves $200 overall</span>
                <a href="#contact" className="mt-3 inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="process" className="py-20 border-b border-slate-800/60 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-100">Our 3-Step Simple Process</h2>
              <p className="text-slate-400 text-sm">No lengthy forms or complex onboardings.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold flex items-center justify-center text-sm mb-4">1</div>
                <h3 className="text-base font-bold text-slate-100 mb-2">15-Minute Intake Chat</h3>
                <p className="text-xs text-slate-400 leading-relaxed">We talk through your business over the phone or a quick voice note. We gather the key details without filling out hours of paperwork.</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold flex items-center justify-center text-sm mb-4">2</div>
                <h3 className="text-base font-bold text-slate-100 mb-2">48-Hour Asset Build</h3>
                <p className="text-xs text-slate-400 leading-relaxed">We build your custom agreements, Google Sheet profit trackers, and crew checklists formatted directly for your business.</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold flex items-center justify-center text-sm mb-4">3</div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Walkthrough & Hand-off</h3>
                <p className="text-xs text-slate-400 leading-relaxed">We review everything together, make any requested tweaks, and hand over ready-to-use Google Docs, Sheets, and PDFs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* LEAD INTAKE FORM (With Error State Implementation) */}
        <section id="contact" className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
              
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Book Your Free 15-Minute Chat</h2>
                <p className="text-slate-400 text-xs">Let us know what you need help with and we will follow up within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-100">Thank You!</h3>
                  <p className="text-xs text-slate-400">Your information was received. We will reach out shortly to schedule your quick 15-minute intake call.</p>
                  
                  {formError && (
                     <div className="mt-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-amber-400 text-[11px] flex items-center justify-center gap-2">
                        <Lightbulb className="w-4 h-4 shrink-0" />
                        {formError}
                     </div>
                  )}

                  <button
                    onClick={() => { setSubmitted(false); setFormError(''); }}
                    className="text-xs font-semibold text-emerald-400 underline hover:text-emerald-300 pt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Plumbing"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="(303) 555-0192"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400 mb-1 block">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@apexplumbingco.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1 block">Service Package Interest</label>
                    <select
                      value={formData.packageInterest}
                      onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="Complete Business Starter Pack ($600)">Complete Business Starter Pack ($600)</option>
                      <option value="Simple Work Agreement ($200)">Simple Work Agreement ($200)</option>
                      <option value="Simple Numbers & Profit Tracker ($200)">Simple Numbers & Profit Tracker ($200)</option>
                      <option value="Step-by-Step How-To Guide ($200)">Step-by-Step How-To Guide ($200)</option>
                      <option value="Local Customer Lead Plan ($200)">Local Customer Lead Plan ($200)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1 block">What is your biggest operational headache right now?</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Too much time spent writing quotes, missing deposit payments, disorganized job paperwork..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit & Schedule Free Chat'}
                  </button>
                </form>
              )}

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/80 bg-slate-900/60 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
            <p>© {new Date().getFullYear()} Rooted Solutions. All rights reserved.</p>
            <p>Commerce City & Denver Metro Area, Colorado • Plain-English Business Consulting</p>
          </div>
        </footer>

        {/* ADMIN LEADS MODAL */}
        {showAdmin && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">Private Client Leads Database</h3>
                    <p className="text-xs text-slate-400">Locally saved web leads ready for outreach</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAdmin(false)}
                  className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isAuthenticated ? (
                <form onSubmit={handleAdminAuth} className="py-8 max-w-sm mx-auto text-center space-y-4 w-full">
                  <Lock className="w-10 h-10 text-emerald-400 mx-auto" />
                  <div>
                    <h4 className="text-base font-bold text-slate-100">Admin Passcode Required</h4>
                  </div>
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter passcode..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-center text-slate-100 focus:outline-none focus:border-emerald-500/50 font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Unlock Leads Vault
                  </button>
                </form>
              ) : (
                <div className="flex-1 flex flex-col min-h-0 space-y-4">
                  
                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-mono">Total Saved Leads: <strong className="text-emerald-400">{savedLeads.length}</strong></span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setShowConsole(true); setShowAdmin(false); }}
                        className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        Open Consulting Console
                      </button>
                      <button
                        onClick={exportLeadsToCSV}
                        disabled={savedLeads.length === 0}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-all disabled:opacity-40"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {savedLeads.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 space-y-2">
                        <UserCheck className="w-8 h-8 mx-auto text-slate-600" />
                        <p className="text-xs font-medium">No leads submitted yet.</p>
                      </div>
                    ) : (
                      savedLeads.map((lead) => (
                        <div key={lead.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 relative group">
                          
                          <div className="flex items-start justify-between gap-4 border-b border-slate-800/60 pb-3">
                            <div>
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">
                                {lead.packageInterest}
                              </span>
                              <h4 className="text-sm font-bold text-slate-100 mt-1">{lead.businessName}</h4>
                              <p className="text-xs text-slate-400">Contact: {lead.name}</p>
                            </div>

                            <div className="text-right space-y-1">
                              <span className="text-[10px] text-slate-500 font-mono block">{lead.date}</span>
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}