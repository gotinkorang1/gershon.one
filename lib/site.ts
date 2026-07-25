/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — no component changes needed.
 *
 * Sourced from the CV. Items marked `TODO:` still need confirmation.
 */

export const site = {
  name: "Gershon Adjei Otinkorang",
  shortName: "Gershon Otinkorang",
  initials: "GO",
  role: "IT Systems & Network Administrator",
  location: "Accra, Ghana",
  relocation: {
    to: "St. John's, NL, Canada",
    when: "August 2026",
    note: "Relocating for an MSc at Memorial University",
  },
  timezone: "GMT",
  email: "contact@gershon.one",
  phone: "+233 (0) 55 466 4733",
  phoneHref: "+233554664733",
  url: "https://gershon.one",
  headline:
    "I keep networks, servers and ERP systems running for organisations that cannot afford downtime.",
  summary:
    "Five years administering enterprise network infrastructure, ERP platforms and IT operations across private and public sector organisations in Ghana. MikroTik RouterOS, dual-Starlink failover, Frappe/ERPNext and Odoo, across multi-site environments.",
  availability: "Available in Canada from August 2026",
  resumeUrl: "/gershon-otinkorang-cv.pdf",
  socials: {
    // TODO: confirm these handles
    github: "https://github.com/gotinkorang1",
    linkedin: "https://www.linkedin.com/in/gershonotinkorang",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Facts — the scannable strip a recruiter reads first                       */
/* -------------------------------------------------------------------------- */

export const facts = [
  { label: "Experience", value: "5+ years" },
  { label: "Current role", value: "IT Support Officer" },
  { label: "Available", value: "Aug 2026" },
  { label: "Based", value: "Accra → St. John's" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export type Job = {
  company: string;
  division?: string;
  role: string;
  start: string;
  end: string | null;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "Greenhouse International Development Group Ghana Ltd.",
    division: "Engineering & Design Department",
    role: "IT Support Officer",
    start: "2023-10",
    end: null,
    location: "Ghana",
    summary:
      "Sole administrator for a multi-site network, the production servers behind it, and the ERP platform the engineering and operations teams run on.",
    highlights: [
      "Administer and secure a multi-site network on MikroTik CCR2004 routers — dual Starlink WAN with port-based failover, bandwidth queuing and firewall hardening on RouterOS 7.x.",
      "Maintain production servers and the company ERP (Frappe/ERPNext, Odoo), protecting data integrity and uptime for engineering and operational workflows.",
      "Diagnose complex connectivity failures including fibre-optic link loss and routing-related latency, minimising downtime across departments.",
      "Design, deploy and manage IP camera and CCTV systems for facility security and monitoring.",
      "Act as departmental supervisor in the Engineering & Design Manager's absence, overseeing local staff and workflow.",
      "Lead recruitment and structured technical interviews for IT Officer hires, including job postings and interview guides.",
      "Procure hardware and software licences, and enforce IT policy and licensing compliance.",
    ],
    stack: [
      "MikroTik CCR2004",
      "RouterOS 7.x",
      "Starlink",
      "Frappe/ERPNext",
      "Odoo",
      "WireGuard",
      "CCTV",
    ],
  },
  {
    company: "Prop-Tis GH Limited",
    division: "IT / Advertising Department",
    role: "Lead IT Officer",
    start: "2022-03",
    end: "2023-10",
    location: "Ghana",
    summary:
      "Owned the company's real estate listing platform and the IT function around it, alongside the creative production team.",
    highlights: [
      "Developed and managed the real estate listing platform, improving performance and user experience.",
      "Implemented SEO strategies that increased organic visibility and web traffic.",
      "Supervised creative production teams across video, photography and graphic content.",
      "Implemented and maintained data backup systems to safeguard company information.",
      "Compiled and analysed performance reports across digital platforms to inform marketing and operational decisions.",
    ],
    stack: ["WordPress", "PHP", "MySQL", "SEO", "Backup systems"],
  },
  {
    company: "Kaysens Group & Kwaaba Foundation",
    role: "Project Assistant (Contract)",
    start: "2021-01",
    end: "2022-03",
    location: "Ghana",
    summary:
      "Project coordination and office operations, with the web and design work that supported them.",
    highlights: [
      "Coordinated project plans, timelines and personnel allocation.",
      "Managed daily project office operations, documentation control and stakeholder communications.",
      "Stood in for the Project Manager as needed to keep deadlines on track.",
      "Designed and developed websites and graphic content for project branding.",
    ],
    stack: ["Project coordination", "Documentation", "Web design"],
  },
  {
    company: "Origin8 Advertising Ltd.",
    division: "Creative Department",
    role: "IT Specialist (National Service)",
    start: "2020-09",
    end: "2020-12",
    location: "Ghana",
    summary: "Web development and internal IT support inside a creative agency.",
    highlights: [
      "Designed and developed websites for client and internal projects.",
      "Provided IT support for staff, resolving hardware and software issues to minimise downtime.",
      "Produced creative assets for marketing and advertising campaigns.",
    ],
    stack: ["HTML/CSS/JS", "WordPress", "IT support"],
  },
  {
    company: "Volta River Authority",
    role: "Management Information Systems Intern",
    start: "2017-09",
    end: "2018-01",
    location: "Ghana",
    summary:
      "First exposure to enterprise infrastructure, at Ghana's national power utility.",
    highlights: [
      "Managed and updated the organisation's website.",
      "Diagnosed and resolved network connectivity issues and configured staff hardware.",
      "Installed and configured server and client operating systems.",
    ],
    stack: ["Windows Server", "Networking", "Web"],
  },
  {
    company: "RichWorld Mobile Devices",
    role: "Sales Executive & Hardware Repair Technician",
    start: "2016-06",
    end: "2017-09",
    location: "Ghana",
    summary:
      "Hardware diagnostics and repair at component level, plus inventory and customer support.",
    highlights: [
      "Diagnosed and repaired mobile hardware faults, extending device lifespan.",
      "Maintained inventory records and supported customers through selection and after-sales.",
    ],
    stack: ["Hardware repair", "Diagnostics", "Inventory"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Capabilities                                                              */
/* -------------------------------------------------------------------------- */

export type SkillGroup = {
  title: string;
  blurb: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Network administration",
    blurb: "The core of the current role — multi-site, satellite-backed, hardened.",
    skills: [
      "MikroTik RouterOS 7.x",
      "CCR2004",
      "Dual-WAN failover",
      "Bandwidth queuing",
      "Firewall hardening",
      "WireGuard VPN",
      "Starlink deployment",
      "Fibre troubleshooting",
    ],
  },
  {
    title: "Systems & ERP",
    blurb: "Servers, and the business platforms that depend on them.",
    skills: [
      "Frappe / ERPNext",
      "Odoo",
      "Server administration",
      "Windows & Linux",
      "Backup & recovery",
      "CCTV / IP camera systems",
      "Hardware support",
    ],
  },
  {
    title: "Cloud",
    blurb: "Where the edge of the network meets managed infrastructure.",
    skills: [
      "AWS",
      "Google Cloud Platform",
      "Cloudflare Tunnel",
      "Domain management",
      "DNS",
    ],
  },
  {
    title: "Web & development",
    blurb: "Building the platforms, not just hosting them.",
    skills: [
      "PHP",
      "MySQL / SQL",
      ".NET Framework",
      "HTML5, CSS3, JavaScript",
      "C++",
      "WordPress",
      "Git / GitHub",
      "SEO",
    ],
  },
  {
    title: "Professional",
    blurb: "The parts that decide whether the technical work lands.",
    skills: [
      "Technical documentation",
      "Project coordination",
      "Technical interviewing",
      "IT policy & compliance",
      "Confidential data handling",
      "Cross-team collaboration",
      "Remote work",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Education & certifications                                                */
/* -------------------------------------------------------------------------- */

export type Credential = {
  title: string;
  issuer: string;
  date: string;
  expires?: string;
  detail?: string;
  credentialId?: string;
  verifyUrl?: string;
  kind: "degree" | "certification";
  upcoming?: boolean;
};

export const credentials: Credential[] = [
  {
    title: "MSc Computer Science",
    issuer: "Memorial University of Newfoundland",
    date: "2026-08-01",
    detail: "Course-based · focus on network security and intrusion detection",
    kind: "degree",
    upcoming: true,
  },
  {
    title: "BSc Information Technology",
    issuer: "Kwame Nkrumah University of Science and Technology",
    date: "2024-11-01",
    detail: "Second Class Honours, Upper Division",
    kind: "degree",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024-07-14",
    expires: "2027-07-14",
    credentialId: "22299d8c82674d9fa309d05ac2c872a6",
    verifyUrl: "https://aws.amazon.com/verification",
    kind: "certification",
  },
  {
    title: "LinkedIn Marketing Strategy",
    issuer: "LinkedIn",
    date: "2022-12-15",
    expires: "2024-12-15",
    credentialId: "swvppej77qan",
    verifyUrl: "https://verify.skilljar.com/c/swvppej77qan",
    kind: "certification",
  },
  {
    title: "LinkedIn Marketing Fundamentals",
    issuer: "LinkedIn",
    date: "2022-05-17",
    expires: "2024-05-17",
    credentialId: "3ppmhqxobvk8",
    verifyUrl: "https://verify.skilljar.com/c/3ppmhqxobvk8",
    kind: "certification",
  },
  {
    title: "HND Information & Communication Technology",
    issuer: "Takoradi Technical University (NABPTEX)",
    date: "2020-10-13",
    detail: "Second Class, Upper Division",
    kind: "degree",
  },
  {
    // TODO: confirm the exact course title on this Google certificate
    title: "Google Digital Skills",
    issuer: "Google",
    date: "2020-10-04",
    verifyUrl: "https://learndigital.withgoogle.com/link/1ar27gu2qdc",
    kind: "certification",
  },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { href: "#experience", label: "Experience", index: "01" },
  { href: "#capabilities", label: "Capabilities", index: "02" },
  { href: "#credentials", label: "Credentials", index: "03" },
  { href: "#contact", label: "Contact", index: "04" },
] as const;
