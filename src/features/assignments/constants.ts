export interface Agent {
  id: string;
  name: string;
  initials: string;
  colorClass: string;
  company: string;
}

export interface Company {
  id: string;
  name: string;
  agentsCount: number;
}

export interface SalesManager {
  id: string;
  name: string;
}

export const INITIAL_AGENTS: Agent[] = [
  { id: "1", name: "Alex Johnson", initials: "AJ", colorClass: "bg-emerald-600", company: "TechVision Solutions" },
  { id: "2", name: "Maya Patel", initials: "MP", colorClass: "bg-emerald-600", company: "TechVision Solutions" },
  { id: "3", name: "Ryan Foster", initials: "RF", colorClass: "bg-teal-600", company: "TechVision Solutions" },
  { id: "4", name: "Chloe Martin", initials: "CM", colorClass: "bg-indigo-600", company: "Global Commerce Ltd" },
  { id: "5", name: "Jordan Lee", initials: "JL", colorClass: "bg-purple-600", company: "Global Commerce Ltd" },
  { id: "6", name: "Sarah Kim", initials: "SK", colorClass: "bg-pink-600", company: "Nexus Retail Group" },
  { id: "7", name: "David Miller", initials: "DM", colorClass: "bg-blue-600", company: "Prime Digital Agency" },
  { id: "8", name: "Emily Watson", initials: "EW", colorClass: "bg-amber-600", company: "Apex Market Partners" }
];

export const COMPANIES: Company[] = [
  { id: "c1", name: "TechVision Solutions", agentsCount: 3 },
  { id: "c2", name: "Global Commerce Ltd", agentsCount: 2 },
  { id: "c3", name: "Nexus Retail Group", agentsCount: 3 },
  { id: "c4", name: "Prime Digital Agency", agentsCount: 2 },
  { id: "c5", name: "Apex Market Partners", agentsCount: 1 }
];

export const SALES_MANAGERS: SalesManager[] = [
  { id: "m1", name: "Sarah Chen" },
  { id: "m2", name: "Marcus Rodriguez" },
  { id: "m3", name: "Emma Thompson" }
];
