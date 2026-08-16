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
  // Ticker of real tools shown under the hero summary. Kept short and true —
  // every item appears in the experience section's stacks.
  heroStack: [
    "MikroTik RouterOS",
    "Starlink",
    "GPON / fibre",
    "Huawei S5735",
    "Proxmox",
    "Docker",
    "Odoo",
    "Ubiquiti",
    "Tailscale",
    "Linux",
    "CCTV",
    "GIS / JOSM",
  ],
  relocation: {
    to: "St. John's, NL, Canada",
    when: "August 2026",
    note: "Arriving August 2026 for an MSc at Memorial University",
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
    "IT support specialist with five years keeping users, devices and infrastructure running across a 1,200-acre industrial park and multiple retail sites in Ghana. Day to day that means end-user support, POS and PDA systems, and the servers behind them; it has also meant designing the site-wide fibre network and the multi-WAN satellite link that carries it. Comfortable at both ends — the helpdesk ticket and the distribution panel.",
  // Professional statement for security-focused positioning
  securityStatement:
    "I help organizations protect their infrastructure without sacrificing velocity. With hands-on experience in cloud security, compliance operations, and SOC monitoring, I believe security works best when it enables teams to move fast. I design layered defenses that catch threats early, keep systems compliant, and let people do their jobs. Whether building secure cloud architectures, operationalizing threat detection, or bridging security and engineering teams, I focus on outcomes: reduced risk, faster incident response, and sustainable security culture.",
  // Search-snippet length (~155 chars). `summary` above is the on-page bio and
  // runs far past what Google shows, so the meta description is authored
  // separately — leading with the strongest hook before the truncation point.
  metaDescription:
    "IT support specialist who runs the helpdesk and the fibre backbone — 5 years across a 1,200-acre park in Ghana. Arriving in St. John's, Canada, Aug 2026.",
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
    linkedin: "https://www.linkedin.com/in/gotinkorang",
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
      "Greenhouse International Development Group Ghana Ltd.",
      "Origin8 Advertising Ltd.",
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
    title: "Infrastructure Engineer",
    shortTitle: "Infrastructure",
    description:
      "Servers, virtualisation, Linux, containers, cloud, network security and resilient connectivity for distributed operations.",
    experience: [
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
      "Greenhouse International Development Group Ghana Ltd.",
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
      "Kaysens Group & Kwaaba Foundation",
      "Origin8 Advertising Ltd.",
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
      "Sole IT support for a 1,200-acre industrial park and the retail sites of its subsidiary — end users, POS and PDA systems, servers, and the site-wide network that connects all of it.",
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
    blurb: "Site-wide fibre, multi-WAN aggregation and wireless coverage at scale.",
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
    title: "Foundations of Cybersecurity",
    issuer: "Google (Coursera)",
    date: "2026-08-02",
    detail: "Part of the Google Cybersecurity Professional Certificate — security controls, SIEM, network and cyber-attack analysis",
    credentialId: "KVMKSBBS97UR",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/KVMKSBBS97UR",
    kind: "certification",
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
    title: "Google Digital Skills",
    issuer: "Google",
    date: "2020-10-04",
    // Google retired the Digital Garage certificate validator — every
    // learndigital.withgoogle.com link now redirects to grow.google — so
    // "verify" points to the LinkedIn certifications section instead.
    verifyUrl: "https://www.linkedin.com/in/gotinkorang/details/certifications/",
    kind: "certification",
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
  navigation: { lab: "Lab", blog: "Blog" },
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
    roleFit: "Role fit",
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
