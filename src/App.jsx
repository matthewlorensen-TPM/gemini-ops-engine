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
  Square as SquareIcon,
  ExternalLink,
  Lightbulb
} from 'lucide-react';

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

// Available services to pick from when creating a Client Contract
const CONTRACT_SERVICE_OPTIONS = [
  { id: 'financial', name: 'Simple Business Numbers & Monthly Profit Tracker' },
  { id: 'sop', name: 'Step-by-Step How-To Work Checklists for Crew/Staff' },
  { id: 'branding', name: 'Business Name, Tagline & Logo Design Guide' },
  { id: 'marketing', name: 'Local Customer Lead & Ad Campaign Plan' },
  { id: 'business_plan', name: 'Bank-Ready Business Plan Narrative' },
  { id: 'consulting', name: 'Time-Saver Tech & App Recommendation Review' },
  { id: 'advisory', name: 'Ongoing Monthly Business Support & Check-ins' }
];

// Service-Specific Probing Questions & Discovery Checklist
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

export default function App() {
  // Navigation & Config State
  const [selectedPackageId, setSelectedPackageId] = useState('contract');

  // Execution & Output State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [executionTime, setExecutionTime] = useState(null);
  const [copied, setCopied] = useState(false);
  const [docsCopied, setDocsCopied] = useState(false);
  const [inputTab, setInputTab] = useState('form');

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
    clientSignerTitle: 'Owner / Operator',
    totalContractValue: 600,
    depositPct: 50,
    paymentTerms: '50% upfront deposit, 50% upon final delivery',
    selectedServices: ['financial', 'sop', 'consulting'],
    specialTerms: 'Includes weekly 30-minute status check-ins while work is underway. Target completion within 10 business days.',
    exclusions: 'Software subscriptions, state filing fees, and direct ad spending are paid directly by the client.'
  });

  const [finInputs, setFinInputs] = useState({
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

  const [sopInputs, setSopInputs] = useState({
    department: 'Field Work',
    sopTitle: 'Job Site Arrival & Customer Sign-Off',
    processOwner: 'Lead Tech / Owner',
    systemsUsed: 'Google Sheets, Card Reader, Phone Scheduling App',
    inputTrigger: 'Customer accepts estimate or pays deposit',
    voiceNotes: 'When arriving at a customer site, do a 15-minute walkthrough, fill out the digital checklist, review job options with the homeowner, get a digital sign-off before starting work, and take pre-work photos.'
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

  // Audio Recording State
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

  // Toggle Recording
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

**PROVIDER:** Rooted Solutions LLC  
**CLIENT:** ${clientProfile.businessName}  
**DATE:** ${dateStr}  

---

### PARTIES & CONTACT DETAILS

| PROVIDER INFORMATION | CLIENT INFORMATION |
| :--- | :--- |
| **Company:** Rooted Solutions LLC | **Company:** ${clientProfile.businessName} |
| **Representative:** Matthew Lorensen | **Representative:** ${clientProfile.contactName} (${contractInputs.clientSignerTitle}) |
| **Service Region:** Colorado, USA | **Location:** ${clientProfile.location} |
| **Contact Email:** info@rootedsolutions.com | **Contact Email:** ${clientProfile.email} |
| **Contact Phone:** (720) 555-0199 | **Contact Phone:** ${clientProfile.phone} |

---

### 1. SCOPE OF AGREED SERVICES
Rooted Solutions LLC shall perform the following customized business advisory deliverables for **${clientProfile.businessName}**:

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
- **Confidentiality:** Rooted Solutions LLC maintains strict non-disclosure of all client financial numbers and business processes.

---

### 6. AUTHORIZATION & SIGNATURES

By signing below, the parties agree to the terms, scope, and payment schedule set forth in this Agreement.

**ROOTED SOLUTIONS LLC**

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
**Prepared by:** Rooted Solutions LLC
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert Markdown into Executive HTML for Google Docs pasting
  const convertToExecutiveHtml = (text) => {
    let html = text
      .replace(/^# (.*$)/gim, '<h1 style="color: #065f46; font-size: 22pt; font-family: Arial, sans-serif; font-weight: bold; border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-top: 10px; margin-bottom: 15px; text-transform: uppercase;">$1</h1>')
      .replace(/^### (.*$)/gim, '<h2 style="color: #0f172a; font-size: 13pt; font-family: Arial, sans-serif; font-weight: bold; margin-top: 22px; margin-bottom: 10px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; text-transform: uppercase;">$1</h2>')
      .replace(/^## (.*$)/gim, '<h3 style="color: #047857; font-size: 11pt; font-family: Arial, sans-serif; font-weight: bold; margin-top: 16px; margin-bottom: 8px;">$1</h3>')
      .replace(/^---$/gim, '<hr style="border: none; border-top: 1px solid #94a3b8; margin: 24px 0;" />')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/^- (.*$)/gim, '<li style="margin-bottom: 6px; font-family: Arial, sans-serif; font-size: 10.5pt; color: #334155;">$1</li>');

    // Convert Markdown Table for Google Docs
    if (html.includes('| PROVIDER INFORMATION |')) {
      const tableHtml = `
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-family: Arial, sans-serif; font-size: 10pt;">
          <thead>
            <tr style="background-color: #065f46; color: #ffffff;">
              <th style="padding: 10px; text-align: left; border: 1px solid #065f46; width: 50%;">PROVIDER INFORMATION</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #065f46; width: 50%;">CLIENT INFORMATION</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; vertical-align: top;">
                <strong>Company:</strong> Rooted Solutions LLC<br/>
                <strong>Representative:</strong> Matthew Lorensen<br/>
                <strong>Region:</strong> Colorado, USA<br/>
                <strong>Email:</strong> info@rootedsolutions.com<br/>
                <strong>Phone:</strong> (720) 555-0199
              </td>
              <td style="padding: 10px; border: 1px solid #cbd5e1; vertical-align: top;">
                <strong>Company:</strong> ${clientProfile.businessName}<br/>
                <strong>Representative:</strong> ${clientProfile.contactName} (${contractInputs.clientSignerTitle})<br/>
                <strong>Location:</strong> ${clientProfile.location}<br/>
                <strong>Email:</strong> ${clientProfile.email}<br/>
                <strong>Phone:</strong> ${clientProfile.phone}
              </td>
            </tr>
          </tbody>
        </table>
      `;
      html = html.replace(/\| PROVIDER INFORMATION \|[\s\S]*?\| \(720\) 555-0199 \|/gim, tableHtml);
    }

    // Convert Investment Section into a Highlighted Executive Callout Box
    if (html.includes('INVESTMENT & PAYMENT TERMS')) {
      const depositAmount = Math.round(contractInputs.totalContractValue * (contractInputs.depositPct / 100));
      const remainingBalance = contractInputs.totalContractValue - depositAmount;
      const calloutBox = `
        <div style="background-color: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; padding: 16px; margin: 18px 0; font-family: Arial, sans-serif;">
          <div style="font-size: 12pt; font-weight: bold; color: #065f46; margin-bottom: 8px;">FINANCIAL SUMMARY & DEPOSIT</div>
          <div style="font-size: 11pt; color: #1e293b; margin-bottom: 4px;"><strong>Total Contract Price:</strong> $${contractInputs.totalContractValue.toLocaleString()} USD</div>
          <div style="font-size: 11pt; color: #047857; font-weight: bold; margin-bottom: 4px;"><strong>Upfront Deposit Required (${contractInputs.depositPct}%):</strong> $${depositAmount.toLocaleString()} USD</div>
          <div style="font-size: 10.5pt; color: #475569;"><strong>Remaining Balance:</strong> $${remainingBalance.toLocaleString()} USD</div>
          <div style="font-size: 10pt; color: #64748b; margin-top: 6px; border-top: 1px solid #bbf7d0; padding-top: 6px;"><strong>Payment Terms:</strong> ${contractInputs.paymentTerms}</div>
        </div>
      `;
      html = html.replace(/- \*\*Total Contract Price:\*\*[\s\S]*?- \*\*Payment Structure:\*\* .*/gim, calloutBox);
    }

    // Convert Signatures into a Professional 2-Column Signature Block Table
    if (html.includes('AUTHORIZATION & SIGNATURES')) {
      const sigBlock = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 40px; font-family: Arial, sans-serif; font-size: 10pt;">
          <tr>
            <td style="width: 48%; vertical-align: top; padding-right: 15px;">
              <strong style="color: #0f172a; font-size: 11pt;">ROOTED SOLUTIONS LLC</strong><br/><br/><br/>
              <div style="border-top: 1px solid #334155; padding-top: 5px;">
                <strong>Authorized Representative Signature</strong><br/>
                <span style="color: #64748b; font-size: 9pt;">Date: ${new Date().toLocaleDateString()}</span>
              </div>
            </td>
            <td style="width: 4%;"></td>
            <td style="width: 48%; vertical-align: top; padding-left: 15px;">
              <strong style="color: #0f172a; font-size: 11pt;">${clientProfile.businessName.toUpperCase()}</strong><br/><br/><br/>
              <div style="border-top: 1px solid #334155; padding-top: 5px;">
                <strong>${clientProfile.contactName}, ${contractInputs.clientSignerTitle}</strong><br/>
                <span style="color: #64748b; font-size: 9pt;">Date: ________________________</span>
              </div>
            </td>
          </tr>
        </table>
      `;
      html = html.replace(/AUTHORIZATION & SIGNATURES[\s\S]*/gim, 'AUTHORIZATION & SIGNATURES<br/>By signing below, the parties agree to the terms, scope, and payment schedule set forth in this Agreement.<br/>' + sigBlock);
    }

    // Group List Items
    html = html.replace(/(<li style=".*?">.*?<\/li>)/gim, '<ul style="margin-top: 6px; margin-bottom: 14px; padding-left: 22px;">$1</ul>');
    html = html.replace(/<\/ul>\s*<ul style=".*?">/gim, '');

    return `
      <div style="font-family: Arial, sans-serif; font-size: 10.5pt; color: #1e293b; line-height: 1.6; max-width: 800px; margin: 0 auto;">
        ${html}
      </div>
    `;
  };

  // ONE-CLICK GOOGLE DOCS WORKFLOW WITH RICH HTML PASTE FORMATTING
  const openInGoogleDocs = async () => {
    if (!generatedContent) return;

    const htmlContent = convertToExecutiveHtml(generatedContent);

    try {
      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const blobText = new Blob([generatedContent], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText
      });
      await navigator.clipboard.write([item]);
    } catch (e) {
      await navigator.clipboard.writeText(generatedContent);
    }

    setDocsCopied(true);
    setTimeout(() => setDocsCopied(false), 3000);

    window.open('https://docs.new', '_blank');
  };

  const activePkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  const activeProbingQuestions = PROBING_QUESTIONS[selectedPackageId] || PROBING_QUESTIONS.contract;

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
                    Services Included in This Contract:
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
                    <label className="text-[11px] font-medium text-slate-400 mb-1 block">Total Contract Price ($)</label>
                    <input
                      type="number"
                      value={contractInputs.totalContractValue}
                      onChange={(e) => setContractInputs({ ...contractInputs, totalContractValue: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 mb-1 block">Payment Terms & Upfront Deposit</label>
                  <input
                    type="text"
                    value={contractInputs.paymentTerms}
                    onChange={(e) => setContractInputs({ ...contractInputs, paymentTerms: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            )}

            {/* DYNAMIC PROBING QUESTIONS SECTION */}
            <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Key Discovery Probing Questions:
                </span>
                <span className="text-[9px] font-mono text-slate-500">Ask Client Before Notes</span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {activeProbingQuestions.map((pq, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-xs space-y-0.5">
                    <span className="font-semibold text-slate-200 block text-[11px]">{pq.question}</span>
                    <p className="text-[10.5px] text-slate-400 leading-snug">{pq.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* GENERAL INTAKE NOTES TEXT AREA */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Special Terms & Discovery Notes</label>
              <textarea
                rows={3}
                value={selectedPackageId === 'contract' ? contractInputs.specialTerms : sopInputs.voiceNotes}
                onChange={(e) => {
                  if (selectedPackageId === 'contract') {
                    setContractInputs({ ...contractInputs, specialTerms: e.target.value });
                  } else {
                    setSopInputs({ ...sopInputs, voiceNotes: e.target.value });
                  }
                }}
                placeholder="Record discovery answers, client payment system restrictions, special conditions..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* GENERATE ACTION BUTTON */}
            <button
              onClick={generateDocument}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Formatting Executive Agreement...
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
                <span className="text-[10px] text-slate-400 font-medium block">Total Monthly Sales</span>
                <span className="text-base font-bold text-slate-100 font-mono">${finCalculations.grossRev.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Money You Keep</span>
                <span className="text-base font-bold text-emerald-400 font-mono">${finCalculations.netTakeHome.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Profit Margin %</span>
                <span className="text-base font-bold text-teal-300 font-mono">{finCalculations.marginPct}%</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-medium block">Minimum Sales Goal</span>
                <span className="text-base font-bold text-amber-400 font-mono">${finCalculations.breakEvenMonthlyRev.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* DELIVERABLE CANVAS CONTAINER */}
          <div className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm min-h-[550px]">
            
            {/* CANVAS BAR WITH RICH GOOGLE DOCS BUTTON */}
            <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
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
                {/* OPEN IN GOOGLE DOCS BUTTON */}
                <button
                  onClick={openInGoogleDocs}
                  disabled={!generatedContent}
                  title="Copies rich formatted contract HTML to clipboard and opens Google Docs ready to paste (Ctrl + V)"
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-500/10 disabled:opacity-40"
                >
                  {docsCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  {docsCopied ? 'Formatted & Copied!' : 'Open in Google Docs'}
                </button>

                {/* COPY BUTTON */}
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
                  <p className="text-xs">Structuring executive agreement...</p>
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