/** Role-focused portfolio views (/for/[focus], /pack/[focus]). Re-exported from lib/site.ts. */

/* -------------------------------------------------------------------------- */
/*  Role-focused portfolio views                                               */
/* -------------------------------------------------------------------------- */

export type RoleFocusId =
  | "it-support"
  | "network"
  | "erp"
  | "infrastructure"
  | "it-operations"
  | "web";

export type RoleFocusProfile = {
  id: RoleFocusId;
  title: string;
  shortTitle: string;
  description: string;
  experience: readonly string[];
  skillGroups: readonly string[];
  caseStudies: readonly string[];
  credentials: readonly string[];
};

/**
 * Each view changes emphasis, never the underlying claims. Arrays are ordered
 * strongest match first and use stable content keys so the same rules work for
 * the English and French versions of the portfolio.
 */
export const roleFocusProfiles = [
  {
    id: "it-support",
    title: "IT Support Specialist",
    shortTitle: "IT Support",
    description:
      "End-user support, hardware, accounts, POS and handheld systems, troubleshooting and practical service ownership across multiple sites.",
    experience: [
      "SABAOTH",
      "Greenhouse International Development Group Ghana Ltd.",
      "GCB Bank Limited",
      "Origin8 Limited",
      "Volta River Authority",
      "RichWorld Mobile Devices",
    ],
    skillGroups: ["IT support", "Retail & field systems", "Servers & services"],
    caseStudies: [
      "diagnosing-fibre-latency",
      "batch-invoice-pdf-processor",
      "erpnext-administration",
    ],
    credentials: [
      "BSc Information Technology",
      "AWS Certified Cloud Practitioner",
      "HND Information & Communication Technology",
    ],
  },
  {
    id: "network",
    title: "Network Technician",
    shortTitle: "Network",
    description:
      "Fibre, GPON, MikroTik, multi-WAN aggregation, enterprise switching, wireless coverage and fault isolation at industrial-site scale.",
    experience: [
      "SABAOTH",
      "Greenhouse International Development Group Ghana Ltd.",
      "Volta River Authority",
    ],
    skillGroups: ["Networking", "Security", "Servers & services"],
    caseStudies: ["industrial-park-network-1200-acres", "diagnosing-fibre-latency"],
    credentials: [
      "AWS Certified Cloud Practitioner",
      "MSc Computer Science",
      "Foundations of Cybersecurity",
    ],
  },
  {
    id: "erp",
    title: "ERP Specialist",
    shortTitle: "ERP",
    description:
      "ERPNext, Frappe and Odoo administration, HR data, print formats, asset control, access management and process automation.",
    experience: [
      "Greenhouse International Development Group Ghana Ltd.",
      "Prop-Tis GH Limited",
    ],
    skillGroups: ["Servers & services", "Retail & field systems", "IT support"],
    caseStudies: [
      "erpnext-bilingual-id-cards",
      "erpnext-administration",
      "batch-invoice-pdf-processor",
    ],
    credentials: [
      "BSc Information Technology",
      "AWS Certified Cloud Practitioner",
      "Foundations of Cybersecurity",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure Specialist",
    shortTitle: "Infrastructure",
    description:
      "Servers, virtualisation, Linux, containers, cloud, network security and resilient connectivity for distributed operations.",
    experience: [
      "SABAOTH",
      "Greenhouse International Development Group Ghana Ltd.",
      "Volta River Authority",
      "Nii Plants Group",
    ],
    skillGroups: ["Servers & services", "Networking", "Security", "Cloud & web"],
    caseStudies: [
      "industrial-park-network-1200-acres",
      "diagnosing-fibre-latency",
      "erpnext-administration",
    ],
    credentials: [
      "AWS Certified Cloud Practitioner",
      "ALX Cloud Computing",
      "MSc Computer Science",
      "Foundations of Cybersecurity",
    ],
  },
  {
    id: "it-operations",
    title: "IT Operations Technician",
    shortTitle: "IT Operations",
    description:
      "Day-to-day ownership across users, devices, vendors, assets, business systems, documentation and distributed locations.",
    experience: [
      "SABAOTH",
      "Greenhouse International Development Group Ghana Ltd.",
      "GCB Bank Limited",
      "Nii Plants Group",
      "Prop-Tis GH Limited",
    ],
    skillGroups: ["IT support", "Servers & services", "Retail & field systems", "Cloud & web"],
    caseStudies: [
      "batch-invoice-pdf-processor",
      "erpnext-administration",
      "industrial-park-network-1200-acres",
    ],
    credentials: [
      "BSc Information Technology",
      "AWS Certified Cloud Practitioner",
      "HND Information & Communication Technology",
    ],
  },
  {
    id: "web",
    title: "Website Developer",
    shortTitle: "Web",
    description:
      "Websites, hosting, DNS, email, WordPress, PHP and MySQL, SEO, maintenance and front-end implementation for working organisations.",
    experience: [
      "Nii Plants Group",
      "Prop-Tis GH Limited",
      "Kwaaba Foundation",
      "Origin8 Limited",
      "Volta River Authority",
    ],
    skillGroups: ["Cloud & web", "IT support"],
    caseStudies: ["erpnext-bilingual-id-cards", "batch-invoice-pdf-processor"],
    credentials: [
      "BSc Information Technology",
      "Google Digital Skills",
      "HND Information & Communication Technology",
    ],
  },
] as const satisfies readonly RoleFocusProfile[];
