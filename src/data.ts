import { Product, Partner, Milestone, TeamMember } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "umrah",
    name: "Umrah Financing",
    category: "lifestyle",
    tag: "Faith, Growth & Experience",
    status: "live",
    statusText: "Live now",
    description: "Perform your holy pilgrimage today without financial burden. Pay a 30% down payment and spread the rest over up to 36 months, 100% interest-free.",
    downPaymentPct: 30,
    maxMonths: 36,
    itemCost: 2500000,
    features: [
      "Co-designed with Nigeria's leading non-interest banking institution.",
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
    name: "Studies Financing",
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
    name: "[Name TBC]",
    role: "Capital Partner",
    description: "Non-Interest Banking. Powers Umrah Financing. Expanding to solar and rent financing products.",
    logo: "C",
    type: "capital"
  },
  {
    name: "New Crescent Travel",
    role: "Merchant Partner",
    description: "Travel & pilgrimage logistics. Handles coordination, booking, and on-ground pilgrimage services.",
    logo: "N",
    type: "merchant"
  },
  {
    name: "Solar Merchants",
    role: "Product Partners",
    description: "Two merchants engaged for Q3 2026 solar financing pilot. Average ticket size ₦1M.",
    logo: "SM",
    type: "product"
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: "2019",
    title: "Founding & Accion Venture Lab Winner",
    description: "Founded Credence. Selected for Accion Venture Lab global incubation programme."
  },
  {
    year: "2020",
    title: "Domain Preparation inside Non-Interest Bank",
    description: "Joined non-interest financial institution. Deliberate inside competence building."
  },
  {
    year: "2021",
    title: "Academic Specialization & Partnerships",
    description: "Completed PGD in Islamic Finance. Established early partnerships."
  },
  {
    year: "2025",
    title: "Umrah Financing Launch",
    description: "Umrah Financing product designed. Solar financing pilot secured for Q3 2026."
  }
];

export const TEAM: TeamMember[] = [
  {
    name: "Eb'rahim Durosimi",
    role: "Founder & CEO",
    bio: [
      "Four years of deliberate preparation. A PGD in Islamic Finance, a 2019 Accion Venture Lab alumnus, and a strategic career inside a non-interest institution to build domain expertise from within. Deep experience in product innovation, growth marketing, and business model design — previously built an EdTech startup and a digital marketing agency."
    ]
  }
];
