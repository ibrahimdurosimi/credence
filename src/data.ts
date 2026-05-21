import { Product, Partner, Milestone, TeamMember } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "umrah",
    name: "UmrahNowPayLater",
    category: "lifestyle",
    tag: "Faith, Growth & Experience",
    status: "live",
    statusText: "Live now",
    description: "Perform your holy pilgrimage today without financial burden. Pay a 30% down payment and spread the rest over up to 36 months, 100% interest-free.",
    downPaymentPct: 30,
    maxMonths: 36,
    itemCost: 2500000,
    features: [
      "Co-designed with Sterling NIB",
      "Full flights, hotels & logistics included",
      "Zero riba, fully shariah-compliant structure",
      "Saves up to 15% booking volatility cost"
    ]
  },
  {
    id: "solar",
    name: "Solar & Renewable Energy",
    category: "household",
    tag: "Family, Home & Essentials",
    status: "soon",
    statusText: "Pilot Q3 2026",
    description: "Power your home or business with clean, constant solar energy. Swap expensive generator fuel for transparent monthly installments starting from ₦1M total cost.",
    downPaymentPct: 20,
    maxMonths: 24,
    itemCost: 1200000,
    features: [
      "Dual merchant partnerships pre-secured",
      "Covers multi-room power systems",
      "Installment tenure up to 24 months",
      "Full installation & 3-year warranty included"
    ]
  },
  {
    id: "education",
    name: "Higher Education — MSc/PhD",
    category: "lifestyle",
    tag: "Faith, Growth & Experience",
    status: "coming",
    statusText: "2027 Launch",
    description: "Invest in your career growth and intellectual capability with interest-free financing for professional degrees and advanced postgraduate programs.",
    downPaymentPct: 15,
    maxMonths: 18,
    itemCost: 3500000,
    features: [
      "Covers tuition & necessary learning assets",
      "Direct academic payment transfer",
      "Monthly installments aligned to income",
      "Partnership with selective top business schools"
    ]
  },
  {
    id: "rent",
    name: "Rent Financing",
    category: "household",
    tag: "Family, Home & Essentials",
    status: "soon",
    statusText: "Q4 2026",
    description: "Eliminate the painful 1-year upfront rent cycle in Nigerian cities. Credence pays your landlord upfront; you repay us monthly, completely interest-free.",
    downPaymentPct: 25,
    maxMonths: 12,
    itemCost: 2000000,
    features: [
      "Pay rent monthly instead of annually",
      "No inflated security fees from agents",
      "Fast approvals based on monthly salary check",
      "100% compliant under Ijarah structures"
    ]
  },
  {
    id: "hajj",
    name: "Hajj Financing",
    category: "lifestyle",
    tag: "Faith, Growth & Experience",
    status: "soon",
    statusText: "Q4 2026",
    description: "Plan your sacred obligatory annual pilgrimage with complete peace of mind, spreading package costs across pre-planned customizable tenures.",
    downPaymentPct: 30,
    maxMonths: 48,
    itemCost: 5500000,
    features: [
      "Approved pilgrims list placement priority",
      "Multi-year savings & installment booster",
      "Partnered with accredited national operators",
      "Shariah advisory board certification"
    ]
  },
  {
    id: "sme_inventory",
    name: "SME Inventory Financing",
    category: "business",
    tag: "SME Capital & Growth",
    status: "coming",
    statusText: "2027 launch",
    description: "Purchase wholesale merchandise or materials from approved suppliers, multiplying your business revenue without incurring high interest interest loans.",
    downPaymentPct: 10,
    maxMonths: 6,
    itemCost: 5000000,
    features: [
      "Supplier direct payments within 24hr",
      "Murabaha trade financing structure",
      "Up to ₦10,000,000 credit limits",
      "Repayments tied to invoice collections"
    ]
  }
];

export const PARTNERS: Partner[] = [
  {
    name: "Sterling NIB",
    role: "Capital & Custody Provider",
    description: "Nigeria's pioneer dedicated non-interest bank, providing robust, shariah-governed balance sheets to fund Credence's retail contracts.",
    logo: "S",
    type: "capital"
  },
  {
    name: "New Crescent Travel",
    role: "Pilgrimage Logistics",
    description: "An accredited flagship travel and tourism operator managing high-quality, verified hotel bookings, flight listings, and local Saudi logistics.",
    logo: "N",
    type: "merchant"
  },
  {
    name: "SolarMerch Ltd",
    role: "Household Product Pilot Partner",
    description: "Leading local manufacturer providing premium inverter solutions and batteries, carrying complete 3-year warranty cover for residential pilot users.",
    logo: "SM",
    type: "product"
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: "2019",
    title: "Founding & Accion Venture Lab Winner",
    description: "Credence was founded to rewrite interest-free access. Selected among elite world innovators for the Accion Venture Lab program."
  },
  {
    year: "2020",
    title: "Domain Preparation inside Non-Interest Bank",
    description: "To build competence from within, our founder spent years working actively inside a non-interest institution, refining product pipelines."
  },
  {
    year: "2021",
    title: "Academic Specialization & Partnerships",
    description: "Secured PGD in Islamic Finance and structured early strategic agreements with Sterling NIB and New Crescent Travel."
  },
  {
    year: "2025",
    title: "UmrahNowPayLater Launch",
    description: "Successfully launched our flagship pilgrimage package to enthusiastic Nigerian retail customers, maintaining perfect compliance."
  }
];

export const TEAM: TeamMember[] = [
  {
    name: "Eb'rahim Durosimi",
    role: "Founder & CEO",
    bio: [
      "Four years of deliberate preparation, holding a PGD in Islamic Finance and recognized as an Accion Venture Lab alumnus (2019).",
      "Gained deep operational competence inside Nigeria's leading non-interest banking system, developing an intricate grasp of murabaha, ijarah, and mudarabah structures.",
      "A seasoned product formulator and business model architect, with previous entrepreneurial success spanning growth marketing and EdTech."
    ]
  }
];
