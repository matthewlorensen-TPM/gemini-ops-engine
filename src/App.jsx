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
  Mic,
  Square,
  Copy,
  RefreshCw,
  User,
  MapPin,
  Calculator,
  Palette,
  Briefcase,
  Compass,
  FileCode,
  FileCheck2,
  CheckSquare,
  Square as SquareIcon,
  ExternalLink,
  Lightbulb,
  Cpu
} from 'lucide-react';

// ==========================================
// BRAND LOGO COMPONENT
// ==========================================
function BrandLogo({ onClick, className = "h-10 w-auto sm:h-12" }) {
  const [imgError, setImgError] = useState(false);

  return imgError ? (
    <div 
      className="p-2.5 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl text-slate-950 font-black shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center shrink-0"
      onDoubleClick={onClick}
      title="Admin Access"
    >
       <Building className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950" />
    </div>
  ) : (
    <img 
      src="/logo.jpg" 
      alt="Rooted Solutions Logo" 
      className={`${className} cursor-pointer rounded-full border-2 border-emerald-500/30 hover:border-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 shrink-0`}
      onError={() => setImgError(true)}
      onDoubleClick={onClick}
      title="Admin Access"
    />
  );
}

// ==========================================
// VALUE LADDER PACKAGES DEFINITION
// ==========================================
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
    icon: Palette,
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
    icon: Briefcase,
    color: 'indigo',
    description: 'Straight-to-the-point business plan designed for bank loan officers, partners, or setting your business goals.',
    deliverables: ['Bank & SBA Loan Narrative', 'Local Competition Overview', 'Simple Financial Strategy']
  },
  {
    id: 'consulting',
    title: 'Time-Saver & Tech Audit',
    price: 200,
    tag: 'Time Saver',
    icon: Compass,
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

// ==========================================
// APP CONSOLE (ADMIN WORKSPACE)
// ==========================================
function AppConsole({ clientProfile, setClientProfile }) {
  const [selectedPackageId, setSelectedPackageId] = React.useState('contract');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState('');
  const [executionTime, setExecutionTime] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [docsCopied, setDocsCopied] = React.useState(false);

  const [contractInputs, setContractInputs] = React.useState({
    clientSignerTitle: 'Owner / Operator',
    totalContractValue: 600,
    depositPct: 50,
    paymentTerms: '50% upfront deposit, 50% upon final delivery',
    selectedServices: ['financial', 'sop', 'consulting'],
    specialTerms: 'Includes weekly 30-minute status check-ins while work is underway. Target completion within 10 business days.',
    exclusions: 'Software subscriptions, state filing fees, and direct ad spending are paid directly by the client. Any additional custom consulting outside this initial scope will be billed at our standard rate of $50/hour.'
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

  const finCalculations = React.useMemo(() => {
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

      output = `# CLIENT SERVICES & CONSULTING AGREEMENT

**PROVIDER:** Rooted Solutions  
**CLIENT:** ${clientProfile.businessName}  
**DATE:** ${dateStr}  

---

### PARTIES & CONTACT DETAILS

| PROVIDER INFORMATION | CLIENT INFORMATION |
| :--- | :--- |
| **Company:** Rooted Solutions | **Company:** ${clientProfile.businessName} |
| **Representative:** Matthew Lorensen | **Representative:** ${clientProfile.contactName} (${contractInputs.clientSignerTitle}) |
| **Service Region:** Commerce City, CO | **Location:** ${clientProfile.address || 'Address on file'} |
| **Contact Email:** info@rootedsolutions.com | **Contact Email:** ${clientProfile.email} |
| **Contact Phone:** (720) 555-0199 | **Contact Phone:** ${clientProfile.phone} |

---

### 1. SCOPE OF AGREED SERVICES
Rooted Solutions shall perform the following customized business advisory deliverables for **${clientProfile.businessName}**:

${includedList || '- Custom Business Advisory & Setup'}

---

### 2. INVESTMENT & PAYMENT TERMS

- **Total Contract Price:** $${contractInputs.totalContractValue.toLocaleString()} USD
- **Upfront Deposit (${contractInputs.depositPct}%):** $${depositAmount.toLocaleString()} USD (Due prior to project launch)
- **Remaining Balance:** $${remainingBalance.toLocaleString()} USD (Due upon final deliverable hand-off)
- **Payment Structure:** ${contractInputs.paymentTerms}

---

### 3. TIMELINE & PROJECT MILESTONES
- **Project Kickoff:** Immediately following receipt of deposit and completed intake profile.
- **Communication Schedule:** ${contractInputs.specialTerms}

---

### 4. EXCLUSIONS & BOUNDARIES
${contractInputs.exclusions}

---

### 5. GENERAL BUSINESS TERMS
- **Scope Changes:** Any services requested outside this agreement will be documented in a separate written addendum.
- **Intellectual Property:** Upon final payment receipt, all custom documents, models, and checklists belong 100% to **${clientProfile.businessName}**.
- **Confidentiality:** Rooted Solutions maintains strict non-disclosure of all client financial numbers and business processes.

---

### 6. AUTHORIZATION & SIGNATURES

By signing below, the parties agree to the terms, scope, and payment schedule set forth in this Agreement.

**ROOTED SOLUTIONS**

__________________________________________  
Authorized Representative  
Date: ${dateStr}  


**CLIENT: ${clientProfile.businessName.toUpperCase()}**

__________________________________________  
${clientProfile.contactName}, ${contractInputs.clientSignerTitle}  
Date: ________________________`;
    } else if (selectedPackageId === 'financial') {
      output = `# SIMPLE NUMBERS & PROFIT TRACKER
**Business:** ${clientProfile.businessName} (${clientProfile.contactName})
**Date:** ${dateStr}

---

### 1. MONTHLY SALES & JOB PRICING
- **Average Price per Job:** $${finInputs.avgJobPrice.toLocaleString()}
- **Jobs Done Per Month:** ${finInputs.monthlyVolume} jobs
- **Total Monthly Sales:** $${finCalculations.grossRev.toLocaleString()}
- **Estimated Yearly Sales:** $${(finCalculations.grossRev * 12).toLocaleString()}

---

### 2. DIRECT JOB COSTS
- **Materials & Supplies (${finInputs.cogsPct}%):** $${finCalculations.directCogs.toLocaleString()} / month
- **Card Payment Fees (${finInputs.processingFeePct}%):** $${finCalculations.processingFees.toLocaleString()} / month
- **Money Left After Job Costs:** $${finCalculations.grossProfit.toLocaleString()} / month

---

### 3. MONTHLY BUSINESS BILLS (FIXED EXPENDITURES)
${finInputs.opexItems.map(item => `- **${item.name}:** $${item.cost}/month`).join('\n')}
- **Equipment / Loan Payments:** $${finInputs.loanPayments}/month
- **Total Monthly Business Bills:** $${finCalculations.totalFixedOpex.toLocaleString()}

---

### 4. MONEY YOU KEEP & MINIMUM SALES GOAL
- **Profit Before Taxes:** $${finCalculations.netEbit.toLocaleString()} / month
- **Tax Savings Set-Aside (${finInputs.taxReservePct}%):** $${finCalculations.taxReserve.toLocaleString()} / month
- **Estimated Money You Keep (Take-Home):** $${finCalculations.netTakeHome.toLocaleString()} / month (${finCalculations.marginPct}% profit margin)
- **Minimum Monthly Sales Goal (Break-Even):** $${finCalculations.breakEvenMonthlyRev.toLocaleString()} / month`;
    } else if (selectedPackageId === 'sop') {
      output = `# STEP-BY-STEP HOW-TO GUIDE
**Guide ID:** GUIDE-${Math.floor(1000 + Math.random() * 9000)}
**Title:** ${sopInputs.sopTitle}
**Department / Area:** ${sopInputs.department}
**Who Manages This:** ${sopInputs.processOwner}
**Apps / Tools Used:** ${sopInputs.systemsUsed}
**Date:** ${dateStr}

---

### 1. WHY WE DO THIS
This guide lays out the step-by-step steps for completing site diagnostics, giving quotes, getting customer sign-off, and taking pre-job photos for ${clientProfile.businessName}.

### 2. WHEN TO START THIS PROCESS
- **Trigger:** ${sopInputs.inputTrigger}

### 3. STEP-BY-STEP INSTRUCTIONS
1. **Arrive & Greet:** Arrive on time, introduce yourself, and walk the customer through what you will be inspecting.
2. **Check the Site:** Run through your standard job checklist on your phone or tablet.
3. **Show Pricing Options:** Show the customer clear, upfront pricing before starting any work.
4. **Get Digital Sign-Off:** Get the customer's signature and deposit on your phone/tablet.
5. **Take Photos:** Take clear photos of existing site conditions and save them to the job file.

### 4. HOW TO HANDLE PROBLEMS OR SCOPE CHANGES
- **Unexpected Work Needed:** Stop work immediately, explain the issue to the customer, show them the updated price, and get sign-off before doing any extra work.

### 5. QUICK QUALITY CHECKLIST
- [ ] Job photos saved to customer file
- [ ] Upfront pricing reviewed with customer
- [ ] Digital signature collected
- [ ] Deposit payment verified
- [ ] Work area cleaned up before leaving site`;
    } else {
      const activePkg = PACKAGES.find(p => p.id === selectedPackageId);
      output = `# ${activePkg.title.toUpperCase()}
**Prepared by:** Rooted Solutions
**Prepared for:** ${clientProfile.businessName} (${clientProfile.contactName})
**Date:** ${dateStr}

---

### SUMMARY OVERVIEW
This practical business document was created specifically for **${clientProfile.businessName}** to help keep operations simple, organized, and profitable.

### KEY HIGHLIGHTS & DELIVERABLES
1. **Deliverable Name:** ${activePkg.title}
2. **Package Price:** $${activePkg.price}
3. **Status:** Ready for Action

#### Included Items:
${activePkg.deliverables.map(d => `- [x] ${d}`).join('\n')}

---
*Created by Rooted Solutions Small Business Tool.*`;
    }

    setGeneratedContent(output);
    const endTime = performance.now();
    setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const exportToGoogleDocs = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setDocsCopied(true);
      window.open('https://docs.new', '_blank');
      setTimeout(() => setDocsCopied(false), 4000);
    } catch (err) {
      console.error('Clipboard copy failed before opening docs!', err);
    }
  };

  const activePkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  const activeProbingQuestions = PROBING_QUESTIONS[selectedPackageId] || PROBING_QUESTIONS.contract;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 pb-20">
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* TOP ROW: CLIENT PROFILE SPANNING FULL WIDTH */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-md">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800/60 pb-3">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            Client CRM Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Business Name</label>
              <input
                type="text"
                value={clientProfile.businessName}
                onChange={(e) => setClientProfile({ ...clientProfile, businessName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Primary Contact</label>
              <input
                type="text"
                value={clientProfile.contactName}
                onChange={(e) => setClientProfile({ ...clientProfile, contactName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Phone</label>
              <input
                type="text"
                value={clientProfile.phone}
                onChange={(e) => setClientProfile({ ...clientProfile, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Email</label>
              <input
                type="email"
                value={clientProfile.email}
                onChange={(e) => setClientProfile({ ...clientProfile, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Full Address</label>
              <input
                type="text"
                value={clientProfile.address || ''}
                onChange={(e) => setClientProfile({ ...clientProfile, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
             <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Website</label>
              <input
                type="text"
                value={clientProfile.website || ''}
                onChange={(e) => setClientProfile({ ...clientProfile, website: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Social Media Handles</label>
              <input
                type="text"
                value={clientProfile.socialMedia || ''}
                onChange={(e) => setClientProfile({ ...clientProfile, socialMedia: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: DELIVERABLE SELECTOR & DISCOVERY NOTES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-md flex flex-col h-[400px]">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800/60 pb-3 mb-3 shrink-0">
              <Layers className="w-4 h-4 text-emerald-400" />
              Target Deliverable
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {PACKAGES.map((pkg) => {
                const Icon = pkg.icon;
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/60 text-slate-100 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold truncate text-slate-200">{pkg.title}</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">${pkg.price}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-md flex flex-col h-[400px]">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800/60 pb-3 shrink-0">
               <Lightbulb className="w-4 h-4 text-emerald-400" />
               Discovery Workflow: {activePkg.title}
            </h3>

            <div className="flex-1 flex flex-col pt-4 gap-4 min-h-0">
              <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3.5 space-y-2.5 shrink-0">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  Probing Questions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1">
                  {activeProbingQuestions.map((pq, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-xs space-y-0.5">
                      <span className="font-semibold text-slate-200 block text-[11px]">{pq.question}</span>
                      <p className="text-[10.5px] text-slate-400 leading-snug">{pq.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">Special Terms & Discovery Notes</label>
                <textarea
                  value={selectedPackageId === 'contract' ? contractInputs.specialTerms : sopInputs.voiceNotes}
                  onChange={(e) => {
                    if (selectedPackageId === 'contract') {
                      setContractInputs({ ...contractInputs, specialTerms: e.target.value });
                    } else {
                      setSopInputs({ ...sopInputs, voiceNotes: e.target.value });
                    }
                  }}
                  placeholder="Record discovery answers, client payment system restrictions, special conditions..."
                  className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FULL WIDTH: GENERATOR CANVAS */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl shadow-xl flex flex-col overflow-hidden backdrop-blur-sm h-[600px]">
          
          <div className="bg-slate-950/80 px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={generateDocument}
                disabled={isGenerating}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate {activePkg.title}
              </button>
              {executionTime && (
                <span className="text-[10px] font-mono text-slate-500">Rendered in {executionTime}s</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                disabled={!generatedContent}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-xs flex items-center gap-1.5 transition-colors disabled:opacity-30"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              
              <button
                onClick={exportToGoogleDocs}
                disabled={!generatedContent}
                className={`px-4 py-2 border rounded-lg text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-30 ${
                  docsCopied 
                    ? 'bg-amber-500 border-amber-400 text-slate-950 animate-pulse' 
                    : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950'
                }`}
              >
                {docsCopied ? <CheckSquare className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {docsCopied ? 'Ready to Paste (Ctrl+V)!' : 'Open in Google Docs'}
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto font-mono text-[13px] text-slate-300 leading-relaxed bg-slate-950/30">
            {generatedContent ? (
              <pre className="whitespace-pre-wrap font-mono text-slate-200">{generatedContent}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <FileCode className="w-12 h-12 text-slate-800 mb-3" />
                <p className="text-sm font-semibold text-slate-400">Executive Preview Canvas</p>
                <p className="text-xs mt-1">Review your inputs and click Generate to run the engine.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

// ==========================================
// COMPONENT: MAIN ENTRY APPLICATION
// ==========================================
export default function App() {
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
  const [submitError, setSubmitError] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  // Shared Console CRM State
  const [clientProfile, setClientProfile] = useState({
    businessName: 'Apex Plumbing & HVAC',
    contactName: 'John Smith',
    email: 'john@apexplumbingco.com',
    phone: '(303) 555-0192',
    address: '1420 E 104th Ave, Thornton CO',
    website: 'www.apexplumbingco.com',
    socialMedia: 'FB/IG: @apexplumbingco'
  });

  // LIVE GOOGLE SCRIPT WEB APP URL
  const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwrUtjKOIwOiqIlltVCV3ZQDRPamC9m05_yhTS50M45Mb-r6QAD1ha42gUGKGkht9oN/exec';

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
    setSubmitError(false);
    
    const newLead = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      name: formData.name,
      businessName: formData.businessName,
      phone: formData.phone,
      email: formData.email,
      packageInterest: formData.packageInterest,
      notes: formData.notes
    };

    const updatedLeads = [newLead, ...savedLeads];
    setSavedLeads(updatedLeads);
    try {
      localStorage.setItem('rooted_leads', JSON.stringify(updatedLeads));
    } catch (err) {
      console.error('Failed to save lead locally:', err);
    }

    // Send to Google Drive Sheet if webhook URL is configured
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const formParams = new URLSearchParams();
        formParams.append('date', newLead.date);
        formParams.append('name', newLead.name);
        formParams.append('businessName', newLead.businessName);
        formParams.append('phone', newLead.phone);
        formParams.append('email', newLead.email);
        formParams.append('packageInterest', newLead.packageInterest);
        formParams.append('notes', newLead.notes);

        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formParams.toString()
        });
      } catch (err) {
        console.error('Failed to post lead to Google Drive Sheet:', err);
        setSubmitError(true);
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
    
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      packageInterest: 'Complete Business Starter Pack ($600)',
      notes: ''
    });
  };

  const loadLeadIntoConsole = (lead) => {
    setClientProfile(prev => ({
      ...prev,
      businessName: lead.businessName || prev.businessName,
      contactName: lead.name || prev.contactName,
      email: lead.email || prev.email,
      phone: lead.phone || prev.phone
    }));
    setShowAdmin(false);
    setShowConsole(true);
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPin === '313423') {
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAdmin(true)}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg transition-colors font-sans font-semibold flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              View Leads Vault ({savedLeads.length})
            </button>
            <button
              onClick={() => setShowConsole(false)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1 rounded-lg transition-colors font-sans font-semibold flex items-center gap-1.5"
            >
              ← Back to Public Website
            </button>
          </div>
        </div>
        <AppConsole
          clientProfile={clientProfile}
          setClientProfile={setClientProfile}
        />
      </div>

      {/* --- PUBLIC LANDING PAGE VIEW --- */}
      <div className={`${showConsole ? 'hidden' : 'block'}`}>
        
        {/* NAVIGATION BAR - MASSIVE BRANDING ENHANCEMENT */}
        <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            <div className="flex items-center gap-3 sm:gap-4">
              <BrandLogo onClick={() => setShowAdmin(true)} />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-slate-100 text-xl sm:text-2xl tracking-tight leading-none uppercase">Rooted Solutions</span>
                <span className="text-emerald-400 font-mono text-[9px] sm:text-[11px] tracking-[0.2em] font-bold uppercase mt-1">Operational Partners</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
              <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
              <a href="#process" className="hover:text-emerald-400 transition-colors">How It Works</a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 hidden sm:inline-block"
              >
                Free 15-Min Chat
              </a>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-800/60">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">

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

        {/* ABOUT & MISSION SECTION */}
        <section id="about" className="py-20 border-b border-slate-800/60 bg-slate-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  About the Founder
                </span>
                
                <h2 className="text-3xl font-extrabold text-slate-100">Enterprise-Grade Operations.<br/>Local Roots.</h2>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  With over 15 years leading complex technology delivery and operations for global enterprises and fast-moving SaaS companies, I’ve seen exactly what it takes to make a business scale—and what causes it to break. I've managed $20M+ software ecosystems, built custom AI-powered automation workflows, and modernized operations for companies like Viasat, Spectrum, and DISH.
                </p>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  But my passion isn't in the corporate boardroom; it's right here in the Commerce City area. I built Rooted Solutions to take the exact same operational strategies, AI capabilities, and workflow tools used by global tech giants and deliver them directly to local trade contractors and service providers. You don't need a massive corporate budget to run a highly profitable, streamlined business. 
                </p>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5"><Cpu className="w-4 h-4"/> Certified AI & Tech Expertise</h4>
                    <ul className="text-xs text-slate-400 space-y-2 font-medium">
                      <li>• Anthropic AI Fluency & Claude Code</li>
                      <li>• AWS Generative AI & LLM Workflows</li>
                      <li>• Python, LangChain & Chroma DB</li>
                      <li>• Workflow Modernization & Automation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                    <h4 className="text-teal-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5"><Briefcase className="w-4 h-4"/> Enterprise Leadership</h4>
                    <ul className="text-xs text-slate-400 space-y-2 font-medium">
                      <li>• 15+ Years Technical Program Delivery</li>
                      <li>• Directed $20M+ Global SaaS Ecosystems</li>
                      <li>• End-to-End Systems Implementation</li>
                      <li>• Risk Mitigation & Business Handoffs</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-emerald-500/30 rounded-xl p-5 mt-4 border-l-4 border-l-emerald-500">
                  <h3 className="text-emerald-400 font-bold text-sm mb-2">Our Mission</h3>
                  <p className="text-slate-300 text-sm italic">
                    "I am not successful unless you are. My mission is to build practical, straight-to-the-point operational tools that free up your time so you can focus on increasing sales, harvesting new leads, and growing your business—without the corporate fluff."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-2 flex flex-col items-center justify-center">
                    <div className="text-4xl font-black text-emerald-400 font-mono">15+</div>
                    <div className="text-xs text-slate-400 font-medium">Years of Tech & Ops Delivery</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-2 flex flex-col items-center justify-center">
                    <div className="text-4xl font-black text-teal-400 font-mono">5</div>
                    <div className="text-xs text-slate-400 font-medium">Global Enterprises Modernized</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-2 col-span-2 flex flex-col items-center justify-center">
                    <div className="text-xl font-bold text-slate-200">Commerce City, CO</div>
                    <div className="text-xs text-slate-400 font-medium">Proudly Local, Transparent & Community Driven</div>
                </div>
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

            {/* CUSTOM HOURLY RATE CALLOUT */}
            <div className="mt-6 border border-slate-800/60 bg-slate-900/40 rounded-2xl p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left shadow-lg">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-full shrink-0 text-slate-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Custom Consulting & Out-of-Scope Support</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Need something not listed above? Custom operational support is available at a benchmark rate of <strong className="text-emerald-400">$50 per hour</strong> (our standard $200 packages represent about 4 hours of dedicated work). Final rates may vary based on engagement duration and technical complexity.
                </p>
              </div>
              <div className="sm:ml-auto shrink-0 mt-3 sm:mt-0">
                <a
                  href="#contact"
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-colors block"
                >
                  Discuss Custom Project
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

        {/* LEAD INTAKE FORM */}
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
                  <p className="text-xs text-slate-400">Your information was received and saved. We will reach out shortly to schedule your quick 15-minute intake call.</p>
                  
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-emerald-400 underline hover:text-emerald-300 pt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2">
                      <Zap className="w-4 h-4 shrink-0" />
                      We had a network issue saving your lead. Please try again!
                    </div>
                  )}

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
                      <option value="Custom Consulting ($50/hr)">Custom Consulting ($50/hr)</option>
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
      </div>

      {/* ADMIN LEADS MODAL (Available from both Landing Page and Console) */}
      {showAdmin && (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Private Client Leads Database</h3>
                  <p className="text-xs text-slate-400">Locally saved web leads & 1-click Console loader</p>
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

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => loadLeadIntoConsole(lead)}
                              className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1"
                              title="Populate this lead directly into the Consulting Console CRM"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Load in Console
                            </button>
                            <span className="text-[10px] text-slate-500 font-mono">{lead.date}</span>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                          <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <a href={`tel:${lead.phone}`} className="hover:text-emerald-400 font-mono">{lead.phone}</a>
                          </div>

                          <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                            <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            <a href={`mailto:${lead.email}`} className="hover:text-teal-400 truncate">{lead.email}</a>
                          </div>
                        </div>

                        {lead.notes && (
                          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 text-xs text-slate-400">
                            <span className="font-semibold text-slate-300 block mb-1">Operational Headache Notes:</span>
                            <p className="leading-relaxed">{lead.notes}</p>
                          </div>
                        )}

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
  );
}