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
  role: "IT Support Specialist",
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
  // Must match the host Vercel actually serves. The apex redirects to www, so
  // www is canonical — every canonical tag, og:url, sitemap entry and the
  // robots.txt Host directive derive from this one value.
  url: "https://www.gershon.one",
  headline:
    "I keep the systems people depend on working — from a jammed printer to a fibre backbone across 1,200 acres.",
  summary:
    "IT support specialist with five years keeping users, devices and infrastructure running across a 1,200-acre industrial park and multiple retail sites in Ghana. Day to day that means end-user support, POS and PDA systems, and the servers behind them; it has also meant designing the campus fibre network and the multi-WAN satellite link that carries it. Comfortable at both ends — the helpdesk ticket and the distribution panel.",
  // Search-snippet length (~155 chars). `summary` above is the on-page bio and
  // runs far past what Google shows, so the meta description is authored
  // separately — leading with the strongest hook before the truncation point.
  metaDescription:
    "IT support specialist who runs the helpdesk and the fibre backbone — 5 years across a 1,200-acre park in Ghana. Relocating to St. John's, Canada, Aug 2026.",
  availability: "Available in Canada from August 2026",
  /**
   * When the page content last meaningfully changed — bump by hand when you
   * edit experience, skills or credentials. Deliberately not derived from the
   * build, which would claim a modification on every redeploy.
   *
   * Must be a full ISO 8601 datetime with an offset; Google rejects a
   * date-only value for schema.org dateModified.
   */
  contentUpdated: "2026-07-30T00:00:00+00:00",
  resumeUrl: "/gershon-otinkorang-cv.pdf",
  socials: {
    github: "https://github.com/gotinkorang1",
    linkedin: "https://www.linkedin.com/in/gotinkorang",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Facts — the scannable strip a recruiter reads first                       */
/* -------------------------------------------------------------------------- */

export const facts = [
  // `countable` marks values that are quantities. Dates and place names are
  // identifiers — animating them produces nonsense like "Aug 1256".
  { label: "Experience", value: "5+ years", countable: true },
  { label: "Site supported", value: "1,200 acres", countable: false },
  { label: "Available", value: "Aug 2026", countable: false },
  { label: "Based", value: "Accra → St. John's", countable: false },
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
    location: "Bright Industrial Park, Ghana",
    summary:
      "Sole IT support for a 1,200-acre industrial park and the retail sites of its subsidiary — end users, POS and PDA systems, servers, and the campus network that connects all of it.",
    highlights: [
      "First and only line of IT support for staff across the park and head office: hardware, software, printers, accounts and access, from triage to resolution.",
      "Configure, deploy and support point-of-sale systems for Bright Afrimall across multiple retail locations in Ghana, including staff training and remote fault resolution.",
      "Manage the handheld PDA estate used for stock and operations — provisioning, application deployment and day-to-day fault resolution.",
      "Designed and deployed the park's fibre backbone, carrying CCTV footage and POS data from factories and remote buildings to the head office, and distributing internet back out to the factories.",
      "Built the site's internet capacity by aggregating eight individually mounted Starlink terminals into a MikroTik router as eight WAN links, feeding a Huawei S5735 enterprise switch and a GPON distribution layer with 1:4 splitters across the fibre panel.",
      "Extended coverage beyond the park boundary with point-to-point wireless links and VPN tunnels so off-site locations reach head office resources.",
      "Installed and manage indoor and outdoor access points with centralised controllers, covering offices, factory floors and open ground.",
      "Deploy and maintain internal services on Proxmox and Linux servers using Docker and Portainer — Odoo, OpenMAINT, Tailscale and DNS-level ad and content filtering.",
      "Run IT stores and asset control in Odoo: inventory, stock movements and equipment issue for the IT warehouse.",
      "Support the survey team by converting CAD site plans into OpenStreetMap data with JOSM, giving the park an accurate digital basemap.",
      "Act as departmental supervisor in the Engineering & Design Manager's absence, and lead technical interviews for IT Officer hires.",
    ],
    stack: [
      "MikroTik RouterOS",
      "Starlink",
      "Huawei S5735",
      "GPON / fibre",
      "Proxmox",
      "Docker / Portainer",
      "Odoo",
      "Tailscale",
      "Ubiquiti / APs",
      "POS systems",
      "CCTV",
      "JOSM / GIS",
    ],
  },
  {
    company: "Nii Plants Group",
    role: "Remote IT Consultant",
    start: "2021-01",
    end: null,
    location: "Ghana — Remote",
    summary:
      "Remote IT administration and technical support for the group's digital infrastructure, alongside full-time employment.",
    highlights: [
      "Provide remote IT administration and technical support for company digital infrastructure.",
      "Manage company websites, domains, hosting platforms, SSL certificates and business email systems.",
      "Perform website maintenance, security updates, performance optimisation and troubleshooting.",
      "Support digital platforms used across hospitality, transportation, logistics and real estate operations.",
      "Manage online services and ensure availability of critical business systems.",
    ],
    stack: [
      "WordPress",
      "Domain & DNS management",
      "Email hosting",
      "SSL / TLS",
      "Remote support",
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
    title: "IT support",
    blurb: "The core of the role — people, devices and whatever has stopped working.",
    skills: [
      "End-user support",
      "Hardware diagnostics & repair",
      "Windows & Linux desktops",
      "Printers & peripherals",
      "Account & access management",
      "Software deployment",
      "User training",
      "Technical documentation",
    ],
  },
  {
    title: "Retail & field systems",
    blurb: "Point-of-sale and handheld estates across multiple sites.",
    skills: [
      "POS configuration & rollout",
      "PDA / handheld provisioning",
      "Multi-site deployment",
      "Remote fault resolution",
      "CCTV / IP camera systems",
      "Asset & inventory control (Odoo)",
    ],
  },
  {
    title: "Networking",
    blurb: "Campus fibre, multi-WAN aggregation and wireless coverage at scale.",
    skills: [
      "MikroTik RouterOS",
      "Multi-WAN aggregation",
      "Starlink deployment",
      "Fibre / GPON distribution",
      "Huawei enterprise switching",
      "VLANs & firewall policy",
      "Point-to-point wireless",
      "WireGuard / Tailscale VPN",
      "Indoor & outdoor APs",
    ],
  },
  {
    title: "Servers & services",
    blurb: "The platforms behind the support desk.",
    skills: [
      "Proxmox virtualisation",
      "Linux server administration",
      "Docker & Portainer",
      "Odoo",
      "OpenMAINT",
      "Frappe / ERPNext",
      "DNS filtering",
      "Backup & recovery",
    ],
  },
  {
    title: "Cloud & web",
    blurb: "Hosting, domains and the sites that run on them.",
    skills: [
      "AWS",
      "Google Cloud Platform",
      "Cloudflare",
      "Domain & DNS management",
      "Email hosting",
      "WordPress",
      "PHP / MySQL",
      "HTML, CSS, JavaScript",
      "Git / GitHub",
    ],
  },
  {
    title: "GIS & other",
    blurb: "Work that did not fit a job description but needed doing.",
    skills: [
      "JOSM / OpenStreetMap",
      "CAD to GIS conversion",
      "Site mapping support",
      "Structured cabling",
      "Project coordination",
      "Technical interviewing",
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
  { href: "#experience", label: "Experience", key: "experience", index: "01" },
  { href: "#work", label: "Case studies", key: "work", index: "02" },
  { href: "#capabilities", label: "Capabilities", key: "capabilities", index: "03" },
  { href: "#credentials", label: "Credentials", key: "credentials", index: "04" },
  { href: "#contact", label: "Contact", key: "contact", index: "05" },
] as const;
