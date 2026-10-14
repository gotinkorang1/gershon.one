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
  role: "IT Infrastructure & Systems Specialist",
  location: "St. John's, NL, Canada",
  relocation: {
    note: "Relocated August 2026 · MSc student at Memorial University",
  },
  timezone: "Newfoundland Time",
  email: "contact@gershon.one",
  // Shown alongside the domain address wherever contact details are listed.
  emailAlt: "gotinkorang@gmail.com",
  phone: "+1 (709) 219-5364",
  phoneHref: "+17092195364",
  // Must match the host Vercel actually serves. The apex redirects to www, so
  // www is canonical — every canonical tag, og:url, sitemap entry and the
  // robots.txt Host directive derive from this one value.
  url: "https://www.gershon.one",
  headline:
    "I keep the systems people depend on working — from client infrastructure and cloud workspaces to a fibre backbone across 1,200 acres.",
  summary:
    "IT infrastructure and systems specialist and Memorial University Computer Science MSc student with five years keeping users, devices and enterprise infrastructure running. Based in St. John's, NL. Providing remote IT consulting at Sabaoth across hardware, networks, firewalls and Microsoft 365/Google Workspace; previously engineered the multi-WAN satellite link and GPON fibre backbone across a 1,200-acre industrial park in Ghana.",
  // Search-snippet length (~155 chars). `summary` above is the on-page bio and
  // runs far past what Google shows, so the meta description is authored
  // separately — leading with the strongest hook before the truncation point.
  metaDescription:
    "IT infrastructure and systems specialist in St. John's, NL: 5+ years running networks, servers and IT support. MSc Computer Science student at Memorial.",
  availability: "Available now · part-time in term, full-time in breaks",
  /**
   * When the page content last meaningfully changed — bump by hand when you
   * edit experience, skills or credentials. Deliberately not derived from the
   * build, which would claim a modification on every redeploy.
   *
   * Must be a full ISO 8601 datetime with an offset; Google rejects a
   * date-only value for schema.org dateModified.
   */
  contentUpdated: "2026-10-14T00:00:00-02:30",
  resumeUrl: "/gershon-otinkorang-cv.pdf",
  contactCard: {
    url: "/gershon-otinkorang.vcf",
    fileName: "gershon-otinkorang.vcf",
    labels: {
      en: {
        save: "Save contact",
        description: "Add my details to your contacts",
      },
      fr: {
        save: "Enregistrer le contact",
        description: "Ajouter mes coordonnées à vos contacts",
      },
    },
  },
  briefActions: {
    print: "Print / save PDF",
    share: "Share brief",
    linkCopied: "Link copied",
    copyDetails: "Copy all details",
    detailsCopied: "Details copied",
    copyFailed: "Could not copy",
    shareTitle: "Gershon Otinkorang — candidate brief",
    shareText:
      "Availability, work authorisation, experience and core skills for Gershon Otinkorang.",
    detailsLabels: {
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      portfolio: "Portfolio",
      compensation: "Compensation",
      summary: "Summary",
    },
  },
  socials: {
    github: "https://github.com/gotinkorang1",
    linkedin: "https://www.linkedin.com/in/gaotinkorang",
  },
} as const;

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

/* -------------------------------------------------------------------------- */
/*  Facts — the scannable strip a recruiter reads first                       */
/* -------------------------------------------------------------------------- */

export const facts = [
  // `countable` marks values that are quantities. Dates and place names are
  // identifiers — animating them produces nonsense like "Aug 1256".
  { label: "Experience", value: "5+ years", countable: true },
  { label: "Site supported", value: "1,200 acres", countable: false },
  // Availability and location live in the hero's status line; these two are
  // scale, from the resume, that the hero doesn't already say.
  { label: "Sites rolled out", value: "47", countable: true },
  { label: "Team led", value: "4 people", countable: true },
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
  /** Outside IT. Sorts after IT roles unless a role-focus view asks for it. */
  secondary?: boolean;
};

export const experience: Job[] = [
  {
    company: "SABAOTH",
    role: "Information Technology Consultant",
    start: "2026-09",
    end: null,
    location: "Alberta, Canada (Remote, freelance)",
    summary:
      "Remote IT consulting and technical support for client hardware, software, networking, and cloud workspace infrastructure.",
    highlights: [
      "Provided remote IT consulting and technical support for hardware, software, and network issues, ensuring seamless connectivity.",
      "Configured and troubleshot routers, switches, and firewalls, enhancing infrastructure reliability for clients.",
      "Supported Microsoft 365 and Google Workspace, managing user accounts and permissions for optimal functionality.",
      "Assisted with cybersecurity measures and system maintenance, contributing to a secure IT environment.",
    ],
    stack: [
      "Microsoft 365",
      "Google Workspace",
      "Routers & switches",
      "Firewalls",
      "Remote support",
      "Cybersecurity",
    ],
  },
  {
    company: "Greenhouse International Development Group Ghana Ltd.",
    division: "Engineering & Design Department",
    role: "Lead IT Officer",
    start: "2023-10",
    end: "2026-08",
    location: "Bright Industrial Park, Ghana",
    summary:
      "Led IT support for a 1,200-acre industrial park and its branches and factories — end users, POS, servers, CCTV and the site-wide network — supervising a four-member team.",
    highlights: [
      "Supervised a four-member IT team supporting staff across the park, head office and branches — around 36 staff per branch or factory — for hardware, software, printers, accounts and access, from triage to resolution.",
      "Personally installed and supervised CCTV and Starlink deployments across 47 branches and factories in Ghana — 15 to 45 cameras per site with remote viewing for management, and Starlink brought up in about two hours per site.",
      "Supported POS setup, staff training and equipment tracking across 23 Bright Afrimall sales points, with remote fault resolution.",
      "Managed the handheld PDA estate used for stock and operations — provisioning, application deployment and day-to-day fault resolution.",
      "Designed and deployed the park's fibre backbone — installing and terminating overhead fibre-optic cable — carrying CCTV footage and POS data from factories and remote buildings to head office, and distributing internet back out to the factories.",
      "Built the site's internet capacity by aggregating eight individually mounted Starlink terminals into a MikroTik router as eight WAN links, feeding a Huawei S5735 enterprise switch and a GPON distribution layer with 1:4 splitters across the fibre panel.",
      "Extended coverage beyond the park boundary with point-to-point wireless links and VPN tunnels, keeping a public-IP path as a backup remote-access route alongside the VPNs and MTN fibre.",
      "Installed and managed indoor and outdoor access points with centralised controllers, covering offices, factory floors and open ground.",
      "Administered 3 physical servers and around 9 VMs on Proxmox, plus 2 production and 3 development/test servers online — Odoo, OpenMAINT, Tailscale, OPNsense, file and proxy services and DNS-level filtering, using Docker and Portainer.",
      "Ran bare-metal backups every Sunday evening and event-triggered automated POS and database backups, using Proxmox VE backups and Proxmox Backup Server.",
      "Migrated on-premises email to Microsoft 365, moved a local POS server to AWS, and transferred company websites from Namecheap to Hostinger.",
      "Administered NingDun Identity Domain Management for a year — directory services, Windows authentication, computers and password policies.",
      "Ran IT stores and asset control in Odoo: inventory, stock movements and equipment issue for the IT warehouse.",
      "Supported the survey team by converting CAD site plans into OpenStreetMap data with JOSM, giving the park an accurate digital basemap.",
      "Acted as departmental supervisor in the Engineering & Design Manager's absence, and led technical interviews for IT Officer hires.",
    ],
    stack: [
      "MikroTik RouterOS",
      "Starlink",
      "Huawei S5735",
      "GPON / fibre",
      "Proxmox",
      "Proxmox Backup Server",
      "Docker / Portainer",
      "OPNsense",
      "Odoo",
      "Microsoft 365",
      "NingDun",
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
      "Provide remote IT administration and technical support for company digital infrastructure, explaining solutions to non-technical stakeholders.",
      "Manage company websites, domains, hosting platforms, SSL certificates and business email systems.",
      "Perform website maintenance, security updates, performance optimisation and troubleshooting.",
      "Support digital platforms used across hospitality, transportation, logistics and real estate operations.",
      "Manage online services and ensure availability of critical business systems.",
      "Develop websites and support SEO for the group's businesses.",
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
    role: "Information Technology Specialist",
    start: "2022-04",
    end: "2023-09",
    location: "Accra, Ghana",
    summary:
      "Built and ran the company's WordPress listing platform and the IT around it, coordinating an eight-member digital team.",
    highlights: [
      "Developed and maintained the WordPress real-estate listing platform, supporting property publishing and the customer search experience.",
      "Maintained hosting, backups and website security to protect business information, and resolved staff hardware, software and connectivity issues.",
      "Coordinated an eight-member multidisciplinary team on website and digital content delivery, including newsletters and SEO reporting.",
    ],
    stack: ["WordPress", "PHP", "MySQL", "SEO", "Backup systems", "IT support"],
  },
  {
    company: "Kwaaba Foundation",
    secondary: true,
    role: "Project Assistant",
    start: "2021-03",
    end: "2022-02",
    location: "Accra, Ghana",
    summary:
      "Project operations, documentation control, and web and digital communications for community initiatives.",
    highlights: [
      "Supported health and community initiatives at Kwaaba Foundation, empowering individuals to reach their full potential.",
      "Assisted in organizing events and programs that align with the Foundation's mission of promoting good causes.",
      "Collaborated with team members on project plans, personnel structures, timelines, and day-to-day project-office operations.",
      "Managed documentation, internal and external communications, meetings, presentations, and follow-up actions; acted as stand-in for the Project Manager when required.",
      "Supported website development, graphic content, and social-media communication for project activities.",
    ],
    stack: ["Project coordination", "Documentation", "Web design", "Communications"],
  },
  {
    company: "Origin8 Limited",
    role: "Information Technology Specialist Intern",
    start: "2020-04",
    end: "2021-03",
    location: "Greater Accra Region, Ghana",
    summary: "Designed websites, provided staff hardware/network support, and integrated digital tools into campaign deliverables.",
    highlights: [
      "Designed and maintained websites for client and internal projects.",
      "Provided staff support for hardware, software, and network issues and helped reduce downtime through practical troubleshooting.",
      "Collaborated with creative staff to integrate digital tools and technical solutions into campaign deliverables.",
    ],
    stack: ["HTML/CSS/JS", "WordPress", "IT support", "Troubleshooting"],
  },
  {
    company: "GCB Bank Limited",
    role: "Information Technology Specialist Intern",
    start: "2019-10",
    end: "2020-01",
    location: "Amasaman, Ghana",
    summary:
      "Server, account and end-user support alongside currency-counter maintenance at one of Ghana's largest commercial banks.",
    highlights: [
      "Supported Windows and Linux servers, user and email accounts, access privileges, file servers, printers and VPNs.",
      "Troubleshot hardware, CCTV and software faults for staff, minimising banking disruptions.",
      "Maintained and repaired currency counters used across banking operations.",
      "Assisted customers with account inquiries and service requests.",
      "Used Google Forms and other digital tools to collect and process information efficiently.",
    ],
    stack: ["Windows / Linux servers", "Accounts & access", "VPN", "CCTV", "Hardware maintenance", "Google Forms"],
  },
  {
    company: "Volta River Authority",
    role: "Management Information Systems Intern",
    start: "2017-09",
    end: "2018-01",
    location: "Aboadze, Western Region, Ghana",
    summary:
      "First exposure to enterprise infrastructure, at Ghana's national power utility.",
    highlights: [
"Configured server and client operating systems, and supported Windows and Linux servers, accounts, permissions, file services and VPNs.",
      "Resolved computer, printer, network and CCTV issues for staff.",
      "Managed and updated the organisation's website.",
    ],
    stack: ["Windows Server", "Linux", "Networking", "CCTV", "Web"],
  },
  {
    company: "RichWorld Mobile Devices",
    secondary: true,
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
      "Microsoft 365 & Google Workspace",
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
    blurb: "Site-wide fibre, multi-WAN aggregation and wireless coverage at scale.",
    skills: [
      "MikroTik RouterOS",
      "Multi-WAN aggregation",
      "Starlink deployment",
      "Fibre / GPON distribution",
      "Huawei enterprise switching",
      "VLANs & firewall policy",
      "OPNsense",
      "Point-to-point wireless",
      "WireGuard / Tailscale VPN",
      "Indoor & outdoor APs",
    ],
  },
  {
    title: "Security",
    blurb:
      "Keeping infrastructure and data defensible — the practised side, and the foundations the MSc builds on.",
    skills: [
      "Network segmentation (VLANs)",
      "Firewall policy & hardening",
      "VPN-gated admin access",
      "DNS content filtering",
      "PII & data protection",
      "Access & identity management",
      "Security monitoring (SIEM) fundamentals",
      "Threat & attack analysis",
    ],
  },
  {
    title: "Servers & services",
    blurb: "The platforms behind the support desk.",
    skills: [
      "Windows Server & Active Directory",
      "Group Policy",
      "Proxmox virtualisation",
      "Proxmox Backup Server",
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
      "AWS IAM (roles, policies, MFA)",
      "Google Cloud Platform",
      "Cloudflare",
      "Domain & DNS management",
      "Email hosting",
      "WordPress",
      "cPanel",
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
  /** Workplace safety rather than professional skill: listed compactly, last. */
  safety?: boolean;
  /**
   * A public image of the certificate itself, shown in a viewer. Only for
   * certificates that are already verifiable online and carry nothing private.
   * Degrees and anything with ID numbers, photos or a date of birth stay off
   * the site: those get a "Request a copy" link instead.
   */
  preview?: { src: string; width: number; height: number };
};

export const credentials: Credential[] = [
  {
    title: "MSc Computer Science",
    issuer: "Memorial University of Newfoundland",
    date: "2026-09-01",
    detail: "Course-based · focus on network security and intrusion detection (2026–2028)",
    kind: "degree",
  },
  {
    title: "BSc Information Technology",
    issuer: "Kwame Nkrumah University of Science and Technology",
    date: "2024-11-01",
    detail: "Second Class Honours, Upper Division",
    kind: "degree",
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google (Coursera)",
    date: "2026-08-02",
    detail: "Part of the Google Cybersecurity Professional Certificate — security controls, SIEM, network and cyber-attack analysis",
    credentialId: "KVMKSBBS97UR",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/KVMKSBBS97UR",
    preview: { src: "/certificates/google-foundations-of-cybersecurity.webp", width: 1400, height: 1082 },
    kind: "certification",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024-07-14",
    expires: "2027-07-14",
    credentialId: "22299d8c82674d9fa309d05ac2c872a6",
    verifyUrl: "https://aws.amazon.com/verification",
    preview: { src: "/certificates/aws-cloud-practitioner.webp", width: 1400, height: 1082 },
    kind: "certification",
  },
  {
    title: "ALX Cloud Computing",
    issuer: "ALX Africa",
    date: "2025-07-28",
    detail: "Two-month ALX Cloud Practitioner course, powered by AWS Academy, with professional development skills for the digital age · completed June 2025",
    credentialId: "HrRxBsfZLz",
    verifyUrl: "https://savanna.alxafrica.com/certificates/HrRxBsfZLz",
    preview: { src: "/certificates/alx-cloud-computing.webp", width: 1280, height: 720 },
    kind: "certification",
  },
  {
    title: "ALX Professional Foundations",
    issuer: "ALX Africa",
    date: "2025-04-15",
    detail: "Professional Development Skills for the Digital Age",
    credentialId: "59XFYHsMer",
    verifyUrl: "https://savanna.alxafrica.com/certificates/59XFYHsMer",
    preview: { src: "/certificates/alx-professional-foundations.webp", width: 1280, height: 720 },
    kind: "certification",
  },
  {
    title: "Intermediate First Aid CPR C/AED (Standard)",
    issuer: "St. John Ambulance",
    date: "2026-09-27",
    expires: "2029-09-27",
    credentialId: "1561996292",
    detail: "Class COUR-1164-NL-260926-7265 · St. John Council for Newfoundland & Labrador · CPR Level C & AED",
    preview: { src: "/certificates/st-john-first-aid.webp", width: 1400, height: 847 },
    kind: "certification",
    safety: true,
  },
  {
    title: "Sexual Violence Awareness and Prevention",
    issuer: "Memorial University of Newfoundland",
    date: "2026-09-11",
    detail: "Sexual Harassment Office · campus and workplace safety certification",
    kind: "certification",
    safety: true,
  },
  {
    title: "Fire Safety, Prevention, Evacuation and Basic Firefighting",
    issuer: "Ghana National Fire Service",
    date: "2025-09-26",
    detail: "Amasaman Fire Station · workplace fire prevention, emergency evacuation, fire warden duties and basic firefighting for Bright Industrial Park",
    kind: "certification",
    safety: true,
  },
  {
    title: "HND Information & Communication Technology",
    issuer: "Takoradi Technical University (NABPTEX)",
    date: "2020-10-13",
    detail: "Second Class, Upper Division",
    kind: "degree",
  },
  {
    title: "Google Digital Skills",
    issuer: "Google",
    date: "2020-10-04",
    detail: "The Fundamentals of Digital Marketing · Google Digital Skills for Africa, endorsed by IAB Europe and The Open University",
    credentialId: "58H 54V V9H",
    // Google retired the Digital Garage certificate validator — every
    // learndigital.withgoogle.com link now redirects to grow.google — so
    // "verify" points to the LinkedIn certifications section instead.
    verifyUrl: "https://www.linkedin.com/in/gaotinkorang/details/certifications/",
    preview: { src: "/certificates/google-digital-marketing.webp", width: 1400, height: 991 },
    kind: "certification",
  },
  {
    title: "Certificate II, Electrical Engineering Technology",
    issuer: "Twumasi Boateng Technical Institute",
    date: "2016-06-01",
    detail: "Ghana Education Service / NABPTEX · technical and core subject examinations",
    kind: "degree",
  },
];

/* -------------------------------------------------------------------------- */
/*  References                                                                 */
/*                                                                            */
/*  Real quotes only. The section self-hides while this array is empty, so    */
/*  nothing fabricated ever ships. Add a reference by copying the shape below  */
/*  — ideally with a `link` to the person's public LinkedIn recommendation so  */
/*  a recruiter can verify it.                                                 */
/* -------------------------------------------------------------------------- */

export type Reference = {
  /** The quote, in the referee's own words. */
  quote: string;
  /** Who said it. */
  name: string;
  /** Their role and organisation, e.g. "Engineering Manager, Greenhouse Intl.". */
  title: string;
  /** Optional link to the public recommendation (LinkedIn, email screenshot, etc.). */
  link?: string;
};

export const references: Reference[] = [
  {
    quote:
      "Gershon has been a great asset to my companies in every aspect of our digital space.",
    name: "Theophilus",
    title: "CEO, Nii Plants Group",
    link: "https://www.linkedin.com/in/theo-ayitey-adjin-b1b87030/",
  },
  {
    quote:
      "Gershon has a solution to all your digital needs. He is multitalented in IT, and I have worked with him for many years.",
    name: "Michael Donkor",
    title: "IS Analyst, Avenue Living",
    link: "https://www.linkedin.com/in/michael-boansi-donkor/",
  },
  // Add more here as { quote, name, title, link? }.
];

/**
 * Copy for the error boundaries (app/error.tsx, app/global-error.tsx).
 *
 * Deliberately plain strings, not locale-switched i18n: an error boundary must
 * not depend on context (locale, providers) that may be the very thing that
 * failed. English-only here is an acceptable trade for a rare, robust fallback.
 */
export const errorFallback = {
  eyebrow: "Something broke",
  title: "This page hit an unexpected error.",
  description:
    "That's on me, not you. Try again, or head back to the homepage — the rest of the site is fine.",
  retry: "Try again",
  home: "Back to homepage",
} as const;

/* -------------------------------------------------------------------------- */
/*  Interactive portfolio features                                             */
/* -------------------------------------------------------------------------- */

export const portfolioFeatures = {
  navigation: { projects: "Projects", lab: "Lab", blog: "Blog" },
  lab: {
    eyebrow: "Interactive proof",
    title: "See how I diagnose, connect and improve systems.",
    lede:
      "Four working views of the portfolio: guided troubleshooting, evidence behind each skill, system architecture and a chronological activity record.",
    open: "Open Systems Lab",
    homeTitle: "Don’t just read the claims. Inspect the systems thinking.",
    homeLede:
      "Run a troubleshooting scenario, connect skills to evidence, inspect architectures and review current professional activity.",
    tabs: {
      troubleshoot: "Troubleshoot",
      evidence: "Evidence",
      architecture: "Architecture",
      activity: "Activity",
    },
    troubleshooting: {
      title: "Troubleshooting simulator",
      lede:
        "Choose the next diagnostic move. These simulations use the production patterns I work with: isolate first, change second, verify last.",
      principleTitle: "Diagnostic principle",
      principle:
        "Preserve evidence, reduce the fault domain, and make one justified change at a time.",
      progress: "Diagnostic progress",
      next: "Next check",
      restart: "Restart scenario",
      complete: "Incident resolved",
      scenarios: [
        {
          id: "slow-network",
          title: "The network is slow",
          symptom: "Users in one building report intermittent latency while the main internet link remains online.",
          environment: "MikroTik · Huawei switching · GPON fibre · multi-WAN",
          resolution:
            "The fault domain is narrowed from user impact to one fibre branch, physical health is measured, and the repaired path is verified continuously before closure.",
          proofHref: "/work/diagnosing-fibre-latency",
          proofLabel: "Read the fibre latency case study",
          checks: [
            {
              prompt: "What should be established first?",
              choices: [
                { label: "Restart every access point", feedback: "That changes several variables before the fault domain is known.", correct: false },
                { label: "Compare affected users, media and segments", feedback: "Correct. Scope identifies the layer that deserves measurement.", correct: true },
                { label: "Replace the internet router", feedback: "Replacement is not a diagnostic step and the upstream link is still online.", correct: false },
              ],
            },
            {
              prompt: "The issue is isolated to one GPON branch. What comes next?",
              choices: [
                { label: "Inspect errors, optical levels and link flaps", feedback: "Correct. These measurements distinguish congestion from a degraded physical path.", correct: true },
                { label: "Increase every bandwidth limit", feedback: "Bandwidth does not repair loss, poor optical power or interface errors.", correct: false },
                { label: "Change DNS providers", feedback: "DNS does not explain packet loss isolated to one fibre branch.", correct: false },
              ],
            },
          ],
        },
        {
          id: "erp-print",
          title: "ERPNext print output is broken",
          symptom: "An ID card looks correct in preview, but photographs disappear and dimensions drift in the PDF.",
          environment: "ERPNext · Frappe · Jinja · HTML/CSS · PDF",
          resolution:
            "Browser and PDF rendering are tested as separate environments. Asset URLs become absolute, physical units replace screen units, and the exported PDF is measured.",
          proofHref: "/work/erpnext-bilingual-id-cards",
          proofLabel: "Read the ERPNext ID card case study",
          checks: [
            {
              prompt: "What should be reproduced first?",
              choices: [
                { label: "The exact PDF with the same employee record", feedback: "Correct. Constant data isolates the renderer as the changing variable.", correct: true },
                { label: "A completely new print format", feedback: "Rewriting removes evidence before the current failure is understood.", correct: false },
                { label: "Only the working browser preview", feedback: "The failing output path is the generated PDF.", correct: false },
              ],
            },
            {
              prompt: "Why might the photo disappear only in the PDF?",
              choices: [
                { label: "The renderer cannot resolve a relative URL", feedback: "Correct. Frappe's abs_url filter gives the PDF process a complete path.", correct: true },
                { label: "The image needs a CSS filter", feedback: "Styling cannot load an asset the renderer cannot locate.", correct: false },
                { label: "The employee must be duplicated", feedback: "Duplicating data does not change URL resolution.", correct: false },
              ],
            },
          ],
        },
        {
          id: "user-sign-in",
          title: "A user cannot sign in",
          symptom: "One employee cannot access a workstation after a password change; other users are unaffected.",
          environment: "Windows endpoint · identity · LAN · business applications",
          resolution:
            "Account, endpoint and network state are tested independently. Access is restored without collecting credentials, then the cause and preventive action are documented.",
          proofHref: "/for/it-support",
          proofLabel: "View the IT support portfolio",
          checks: [
            {
              prompt: "What is the safest first action?",
              choices: [
                { label: "Ask the user to send their password", feedback: "Passwords should never be collected or shared during support.", correct: false },
                { label: "Confirm the error, account and scope", feedback: "Correct. This separates an account issue from a device or service outage.", correct: true },
                { label: "Reinstall Windows", feedback: "A destructive change is disproportionate before the failure is isolated.", correct: false },
              ],
            },
            {
              prompt: "The account works elsewhere. What should be checked here?",
              choices: [
                { label: "Connectivity, time, cached state and input", feedback: "Correct. Each can break authentication while the account remains healthy.", correct: true },
                { label: "The office printer queue", feedback: "The print service is outside the sign-in path.", correct: false },
                { label: "Disable account protections", feedback: "Removing safeguards is not an acceptable workaround.", correct: false },
              ],
            },
          ],
        },
      ],
    },
    evidence: {
      title: "Skills evidence map",
      lede: "Select a capability to trace it to production experience, case studies and role-focused views.",
      select: "Select a capability",
      experience: "Production experience",
      caseStudies: "Case studies",
      roles: "Role matches",
      credentials: "Credentials",
      none: "No dedicated case study yet; the experience record is the supporting evidence.",
      noResults: "No capability matches that search.",
    },
    architecture: {
      title: "Architecture explorer",
      lede: "Move through each system from source to outcome, then select a component to inspect its responsibility.",
      selected: "Selected component",
      systems: [
        {
          id: "industrial-network",
          name: "Industrial network",
          summary: "Resilient upstream connectivity feeding fibre distribution across a 1,200-acre site.",
          nodes: [
            { id: "wan", label: "8 satellite WANs", kind: "Ingress", metric: "8 uplinks", detail: "Independent terminals provide aggregate capacity and reduce reliance on one upstream path." },
            { id: "router", label: "MikroTik CCR2004", kind: "Control", metric: "Multi-WAN", detail: "Routing, health checks and traffic policy bring the uplinks together." },
            { id: "core", label: "Huawei S5735", kind: "Core", metric: "Distribution", detail: "The core separates and forwards services toward fibre distribution." },
            { id: "gpon", label: "GPON fibre", kind: "Access", metric: "1:4 split", detail: "Passive optical distribution carries connectivity over long campus distances." },
            { id: "services", label: "Factories and services", kind: "Outcome", metric: "1,200 acres", detail: "Factories, CCTV, point of sale and remote links consume the shared infrastructure." },
          ],
        },
        {
          id: "erp-identity",
          name: "ERP identity workflow",
          summary: "One employee record becomes a bilingual, physically printable identification card.",
          nodes: [
            { id: "record", label: "Employee record", kind: "Source", metric: "ERPNext", detail: "HR owns names, photographs, departments, roles and identifiers in one record." },
            { id: "template", label: "Jinja format", kind: "Transform", metric: "Frappe", detail: "The template retrieves fields, resolves asset URLs and repeats the printable layout." },
            { id: "layout", label: "Bilingual layout", kind: "Presentation", metric: "EN + 中文", detail: "A fixed grid keeps Chinese and English readable within physical card dimensions." },
            { id: "pdf", label: "A4 PDF", kind: "Output", metric: "2 cards", detail: "Physical units and page-break control produce two complete cards per sheet." },
            { id: "card", label: "Issued ID card", kind: "Outcome", metric: "Print-ready", detail: "Cards can be reprinted directly whenever the employee record changes." },
          ],
        },
        {
          id: "support-loop",
          name: "Support operations loop",
          summary: "A repeatable path from user report to verified restoration and reusable knowledge.",
          nodes: [
            { id: "report", label: "User report", kind: "Signal", metric: "Impact", detail: "Capture the exact symptom, timing, scope and business consequence." },
            { id: "scope", label: "Triage and scope", kind: "Decision", metric: "Priority", detail: "Separate isolated faults from shared outages and choose the safest path." },
            { id: "isolate", label: "Measure and isolate", kind: "Diagnosis", metric: "Evidence", detail: "Test one layer at a time and preserve observations before changing state." },
            { id: "restore", label: "Restore service", kind: "Action", metric: "Recovery", detail: "Apply the smallest justified repair while maintaining controls and rollback." },
            { id: "verify", label: "Verify and document", kind: "Outcome", metric: "Knowledge", detail: "Confirm the user journey, record the cause and make the next response faster." },
          ],
        },
      ],
    },
    activity: {
      title: "Professional activity",
      lede: "Published case studies, technical writing, credentials and public engineering activity in one record.",
      filters: { all: "All", writing: "Writing", caseStudy: "Case studies", credential: "Credentials" },
    },
  },
  reading: {
    save: "Save article",
    saved: "Saved",
    savedArticles: "Saved articles",
    continueReading: "Continue reading",
    progress: "read",
    remove: "Remove from saved articles",
    empty: "Save an article to keep it available in this browser.",
  },
  pwa: {
    install: "Install portfolio",
    installing: "Installing…",
    ready: "Offline reading ready",
    installed: "Portfolio installed",
    updateReady: "Update available",
    refresh: "Refresh",
    shortcuts: {
      lab: "Open Systems Lab",
      brief: "Open candidate brief",
      blog: "Open technical writing",
    },
  },
  recruiterPack: {
    eyebrow: "Role-specific recruiter pack",
    title: "Evidence selected for",
    lede: "A print-ready package combining role fit, availability, strongest experience, relevant projects, credentials and contact details.",
    open: "Open recruiter pack",
    back: "Back to focused portfolio",
    availability: "Availability and eligibility",
    experience: "Relevant experience",
    capabilities: "Matching capabilities",
    caseStudies: "Selected case studies",
    credentials: "Relevant credentials",
    contact: "Contact",
    downloadCv: "Download CV",
    print: "Print / save PDF",
    present: "Present",
    linkedin: "LinkedIn",
    metaTitle: (role: string) => `${role} recruiter pack`,
  },
} as const;

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

/* -------------------------------------------------------------------------- */
/*  Projects page                                                              */
/* -------------------------------------------------------------------------- */

export type Website = {
  slug: string;
  name: string;
  url: string;
  /** What the site is for, in a few words. */
  summary: string;
  /** Screenshot in public/projects/, 960×600. Absent when the site is down. */
  image?: string;
  /** The live site currently errors; shown without a link. */
  offline?: boolean;
};

export const websites: Website[] = [
  { slug: "nii-plants-logistics", name: "Nii Plants Logistics", url: "https://niiplantslogistics.com/", summary: "Freight and logistics across Ghana and West Africa", image: "/projects/nii-plants-logistics.webp" },
  { slug: "papersource-ghana", name: "PaperSource Ghana", url: "https://www.papersourcegh.com/", summary: "Catalogue and storefront delivering across Accra and Tema", image: "/projects/papersource-ghana.webp" },
  { slug: "nii-plants-group", name: "Nii Plants Group", url: "https://www.niiplantsgroup.com/", summary: "Group site for mobility, hospitality and business services", image: "/projects/nii-plants-group.webp" },
  { slug: "nii-plants-car-rentals", name: "Nii Plants Car Rentals", url: "https://www.niiplantsghana.com/", summary: "Self-drive and chauffeur car rental in Accra", image: "/projects/nii-plants-car-rentals.webp" },
  { slug: "nbc-ghana-trust", name: "NBC Ghana Trust", url: "https://nbcghanatrust.com/", summary: "Employee benefits trust company", image: "/projects/nbc-ghana-trust.webp" },
  { slug: "akosombo-textiles", name: "Akosombo Textiles", url: "https://www.akosombotextiles.com/", summary: "Textile manufacturer and fashion collections", image: "/projects/akosombo-textiles.webp" },
  { slug: "kwaaba-foundation", name: "Kwaaba Foundation", url: "https://kwaabafoundation.org/about-kwaaba/", summary: "Non-profit for health and community initiatives", image: "/projects/kwaaba-foundation.webp" },
  { slug: "greenhouse-international", name: "Greenhouse International Development", url: "https://greenhouseintdev.com/en/", summary: "Corporate site for the industrial park developer", image: "/projects/greenhouse-international.webp" },
  { slug: "proptisgh", name: "Prop-Tis GH", url: "https://www.proptisgh.com/", summary: "Real estate listing platform", image: "/projects/proptisgh.webp" },
  { slug: "autism-destigma", name: "Autism Destigma", url: "https://autismdestigma.org/", summary: "Autism awareness non-profit", offline: true },
  { slug: "plantsville-ghana", name: "Plantsville Ghana", url: "https://plantsvillegh.com/", summary: "Residences and lounge", image: "/projects/plantsville-ghana.webp" },
  { slug: "the-home-of-beads", name: "The Home of Beads", url: "https://thehomeofbeads.myshopify.com/", summary: "Shopify store for African beads and jewellery", image: "/projects/the-home-of-beads.webp" },
];

export type ProjectCategory = "network" | "infrastructure" | "software" | "business" | "study";

export type Project = {
  title: string;
  /** Who it was for. */
  context: string;
  category: ProjectCategory;
  summary: string;
  tags: string[];
  /** A live site or a case study that shows the work. */
  href?: string;
  status?: "in-progress";
};

export const projects: Project[] = [
  {
    title: "Multi-site Starlink deployment",
    context: "Greenhouse International",
    category: "network",
    summary: "Installed and activated Starlink across company locations, and managed the subscriptions, billing, cancellations and refunds behind them.",
    tags: ["Starlink", "Multi-site", "Vendor management"],
  },
  {
    title: "Head office Wi-Fi and network",
    context: "Greenhouse International",
    category: "network",
    summary: "Configured routers, switches, access points and a separate network per floor on TP-Link Omada equipment, with Starlink as the uplink.",
    tags: ["TP-Link Omada", "Wi-Fi", "Switching"],
  },
  {
    title: "Industrial park fibre network",
    context: "Bright Industrial Park",
    category: "network",
    summary: "Fibre connectivity across the park on an eight-core main cable, with two-core runs to individual buildings.",
    tags: ["Fibre", "GPON", "Cabling"],
    href: "/work/industrial-park-network-1200-acres",
  },
  {
    title: "Industrial park wireless and VLANs",
    context: "Bright Industrial Park",
    category: "network",
    summary: "VLANs and point-to-point wireless links connecting buildings and operational areas, on equipment such as CPE510 and M5 radios.",
    tags: ["VLANs", "Point-to-point", "CPE510"],
  },
  {
    title: "Centralised POS server and branch connectivity",
    context: "Bright Afrimall",
    category: "infrastructure",
    summary: "Supported a Windows Server point-of-sale environment serving 23 sales points, including branch connectivity and public-IP requirements.",
    tags: ["Windows Server", "POS", "Public IP"],
  },
  {
    title: "Server administration and backups",
    context: "Greenhouse International",
    category: "infrastructure",
    summary: "Ran two online production servers and three development and test servers, with weekly bare-metal backups and automated database backups.",
    tags: ["Proxmox", "Backups", "Linux"],
  },
  {
    title: "Hikvision CCTV deployment and support",
    context: "Greenhouse International",
    category: "infrastructure",
    summary: "Installed, connected, maintained and troubleshot surveillance across company facilities.",
    tags: ["Hikvision", "CCTV", "IP cameras"],
  },
  {
    title: "KIRIKOU AI chatbot",
    context: "KNUST final-year project",
    category: "software",
    summary: "A support chatbot built with Next.js, LangChain and OpenAI, with Upstash Redis for memory, Scrapy and Botpress resources for its knowledge, and Zendesk to hand conversations to a person.",
    tags: ["Next.js", "LangChain", "OpenAI", "Zendesk"],
  },
  {
    title: "Car rental booking app",
    context: "Web application",
    category: "software",
    summary: "A booking application built with Next.js, Drizzle and Supabase, with mock Paystack payments, database migrations and end-to-end tests.",
    tags: ["Next.js", "Drizzle", "Supabase", "Paystack"],
  },
  {
    title: "PaperSource Ghana website",
    context: "PaperSource Ghana",
    category: "software",
    summary: "Worked on the catalogue and storefront for delivery across Accra and Tema, including product content and troubleshooting.",
    tags: ["E-commerce", "Content", "Support"],
    href: "https://www.papersourcegh.com/",
  },
  {
    title: "Real estate website and digital marketing",
    context: "Prop-Tis GH",
    category: "software",
    summary: "Built and maintained the website, ran its backups and security, and supported SEO, newsletters and HubSpot CRM.",
    tags: ["WordPress", "SEO", "HubSpot"],
    href: "https://www.proptisgh.com/",
  },
  {
    title: "Group website and IT support",
    context: "Nii Plants Group",
    category: "software",
    summary: "Website development and SEO, alongside help-desk support and hardware and software troubleshooting.",
    tags: ["Web", "SEO", "Help desk"],
    href: "https://www.niiplantsgroup.com/",
  },
  {
    title: "ERPNext HR implementation",
    context: "Greenhouse International",
    category: "business",
    summary: "Supported the HR system setup and employee data imports for about 8,000 employees.",
    tags: ["ERPNext", "HR", "Data import"],
    href: "/work/erpnext-administration",
  },
  {
    title: "openMAINT pilot",
    context: "Greenhouse International",
    category: "business",
    summary: "A pilot for managing maintenance activities and organisational assets.",
    tags: ["openMAINT", "Assets", "Maintenance"],
  },
  {
    title: "IT and CCTV inventory",
    context: "Greenhouse International",
    category: "business",
    summary: "Organised and tracked IT equipment, CCTV devices and warehouse stock.",
    tags: ["Inventory", "Odoo", "Asset tracking"],
  },
  {
    title: "POS and business operations support",
    context: "Kaysens Gaisie",
    category: "business",
    summary: "Point-of-sale setup, ERP-based order processing, inventory records, fleet coordination and customer-service workflows.",
    tags: ["POS", "ERP", "Operations"],
  },
  {
    title: "IT operations handover and documentation",
    context: "Greenhouse International",
    category: "business",
    summary: "Prepared the operational handover, supported my replacement through it, and wrote technical notices and bilingual communications.",
    tags: ["Documentation", "Handover", "Bilingual"],
  },
  {
    title: "Microsoft enterprise infrastructure lab",
    context: "Personal lab",
    category: "study",
    summary: "A hands-on Windows Server lab covering Active Directory, DNS, DHCP, Group Policy, file services and domain-joined clients. AD DS is up on corp.gershonlab.test, with the NETLOGON and SYSVOL shares verified.",
    tags: ["Active Directory", "Group Policy", "DNS / DHCP"],
    status: "in-progress",
  },
  {
    title: "Software engineering team project",
    context: "COMP 6905 · Memorial University",
    category: "study",
    summary: "Collaborated in the Asgn1TeamD GitHub repository in JavaScript, working through branches, merges, pull requests, team profiles and sprint planning.",
    tags: ["JavaScript", "Git", "Scrum"],
  },
];

export const projectsPage = {
  eyebrow: "Projects",
  title: "Things I've built, deployed and kept running",
  lede: "Websites that are live today, and the infrastructure, software and operations work behind the roles on my CV.",
  websitesTitle: "Websites",
  websitesLede: "Live sites I've built or maintained. Each card opens the real site.",
  projectsTitle: "Projects",
  projectsLede: "Filter by the kind of work.",
  visit: "Visit site",
  offline: "Currently offline",
  inProgress: "In progress",
  readMore: "Read the write-up",
  all: "All",
  categories: {
    network: "Networking",
    infrastructure: "Infrastructure",
    software: "Software & web",
    business: "Business systems",
    study: "Study & labs",
  } as Record<ProjectCategory, string>,
  homeLink: "See all projects and websites",
  metaTitle: "Projects and websites",
  homepageAlt: (name: string) => `${name} homepage`,
  metaDescription: "Websites I've built and maintained, plus networking, infrastructure, ERP and software projects across Ghana and Canada.",
};

export type ProjectsPageCopy = typeof projectsPage;
