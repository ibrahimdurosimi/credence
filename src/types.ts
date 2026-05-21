export interface Product {
  id: string;
  name: string;
  category: "lifestyle" | "household" | "business";
  tag: string;
  status: "live" | "soon" | "coming";
  statusText: string;
  description: string;
  downPaymentPct: number;
  maxMonths: number;
  itemCost: number;
  features: string[];
}

export interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export interface Partner {
  name: string;
  role: string;
  description: string;
  logo: string;
  type: "capital" | "merchant" | "product";
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  imageUrl?: string;
}
