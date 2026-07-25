/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — no component changes needed.
 *
 * Items marked `TODO:` are placeholders awaiting real details.
 */

export const site = {
  name: "Gershon Adjei Otinkorang",
  shortName: "Gershon Otinkorang",
  initials: "GO",
  // TODO: confirm exact city
  location: "Accra, Ghana",
  timezone: "GMT",
  email: "gotinkorang@gmail.com",
  url: "https://gershon.one",
  headline: "I design, build and secure the infrastructure software runs on.",
  summary:
    "IT professional working across cloud infrastructure, enterprise networking and full-stack development. AWS certified, KNUST-trained, and happiest when a network diagram turns into something people can actually use.",
  roles: [
    "Cloud Engineer",
    "Network Architect",
    "Software Developer",
    "Cybersecurity Enthusiast",
    "AI Builder",
  ],
  availability: "Open to cloud & infrastructure roles",
  resumeUrl: "/gershon-otinkorang-cv.pdf", // TODO: drop your CV into /public
  socials: {
    // TODO: replace with your real handles
    github: "https://github.com/gershonotinkorang",
    linkedin: "https://www.linkedin.com/in/gershonotinkorang",
    x: "https://x.com/gershonotink",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Stats — the counters under the hero                                       */
/* -------------------------------------------------------------------------- */

export const stats = [
  { value: 5, suffix: "+", label: "Years in IT" },
  { value: 30, suffix: "+", label: "Networks deployed" },
  { value: 12, suffix: "", label: "Projects shipped" },
  { value: 99.9, suffix: "%", label: "Uptime maintained", decimals: 1 },
] as const;

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export type Job = {
  company: string;
  role: string;
  start: string;
  end: string | null;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

// TODO: replace the placeholder roles below with your real history.
export const experience: Job[] = [
  {
    company: "Independent / Freelance",
    role: "Cloud & Network Engineer",
    start: "2024-01",
    end: null,
    location: "Ghana — Remote",
    summary:
      "Design and deployment of small-business network and cloud infrastructure: routing, failover, monitoring and the web apps that sit on top.",
    highlights: [
      "Built MikroTik-based multi-WAN networks with Starlink and fibre failover for zero-downtime operations.",
      "Migrated on-premise workloads to AWS, cutting hardware maintenance overhead substantially.",
      "Automated provisioning and configuration backups, removing manual, error-prone steps.",
    ],
    stack: ["AWS", "MikroTik", "Docker", "Linux", "Next.js"],
  },
  {
    company: "TODO: Employer name",
    role: "IT Support / Network Administrator",
    start: "2021-01",
    end: "2023-12",
    location: "Ghana",
    summary:
      "Day-to-day operation of the corporate network, end-user systems and internal services.",
    highlights: [
      "Maintained LAN/WLAN infrastructure across multiple sites.",
      "Reduced repeat incidents by documenting fixes into a searchable runbook.",
      "Ran patching, backup and endpoint-security routines.",
    ],
    stack: ["Cisco", "Windows Server", "Active Directory", "VMware"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

export type SkillGroup = {
  title: string;
  icon: "cloud" | "network" | "shield" | "code" | "sparkles";
  blurb: string;
  skills: { name: string; level?: "core" | "working" | "learning" }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Cloud & Platform",
    icon: "cloud",
    blurb: "Designing and running workloads that survive their own success.",
    skills: [
      { name: "AWS", level: "core" },
      { name: "Azure", level: "working" },
      { name: "Google Cloud", level: "working" },
      { name: "Docker", level: "core" },
      { name: "Kubernetes", level: "learning" },
      { name: "Terraform", level: "working" },
      { name: "Vercel", level: "core" },
      { name: "Linux", level: "core" },
    ],
  },
  {
    title: "Networking",
    icon: "network",
    blurb: "Routing, switching and the unglamorous work that keeps packets moving.",
    skills: [
      { name: "MikroTik / RouterOS", level: "core" },
      { name: "Cisco", level: "working" },
      { name: "Huawei", level: "working" },
      { name: "Fibre & FTTH", level: "working" },
      { name: "VLANs & VPN", level: "core" },
      { name: "BGP / OSPF", level: "learning" },
      { name: "Starlink failover", level: "core" },
    ],
  },
  {
    title: "Security",
    icon: "shield",
    blurb: "Defensive fundamentals applied to real infrastructure.",
    skills: [
      { name: "Firewall design", level: "core" },
      { name: "Zero-trust access", level: "working" },
      { name: "Endpoint hardening", level: "working" },
      { name: "Network monitoring", level: "core" },
      { name: "Incident response", level: "learning" },
    ],
  },
  {
    title: "Development",
    icon: "code",
    blurb: "Shipping products end to end, not just prototypes.",
    skills: [
      { name: "TypeScript", level: "core" },
      { name: "React", level: "core" },
      { name: "Next.js", level: "core" },
      { name: "Node.js", level: "working" },
      { name: "PHP", level: "working" },
      { name: "WordPress", level: "working" },
      { name: "PostgreSQL", level: "working" },
      { name: "Tailwind CSS", level: "core" },
    ],
  },
  {
    title: "AI & Automation",
    icon: "sparkles",
    blurb: "Using models as tools, with an engineer's scepticism.",
    skills: [
      { name: "Prompt engineering", level: "core" },
      { name: "OpenAI API", level: "working" },
      { name: "Ollama / local models", level: "working" },
      { name: "AI-assisted development", level: "core" },
      { name: "Workflow automation", level: "working" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects — written as miniature case studies                              */
/* -------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string;
  outcome: { metric: string; label: string }[];
  stack: string[];
  links: { live?: string; repo?: string };
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "niiplants-logistics",
    name: "Niiplants Logistics",
    tagline: "Logistics operations platform for a Ghanaian delivery business",
    year: "2025",
    featured: true,
    problem:
      "Dispatch, driver assignment and customer updates were coordinated over phone calls and spreadsheets. Nobody could answer 'where is my package' without ringing three people, and pricing was recalculated by hand for every job.",
    solution:
      "A single operations dashboard where jobs are created once and tracked to delivery: automatic quoting from distance and weight, driver assignment, status timeline, and a customer-facing tracking page that needs no login.",
    architecture:
      "Next.js App Router with server components for the read-heavy dashboard, server actions for mutations, PostgreSQL for jobs and routing history, and edge-cached public tracking pages so customer lookups never touch the origin.",
    outcome: [
      { metric: "~70%", label: "less time spent on dispatch calls" },
      { metric: "<1s", label: "median tracking page load" },
      { metric: "100%", label: "of jobs auditable end to end" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Vercel"],
    links: { live: "", repo: "" }, // TODO: add links
    accent: "from-sky-500/20 to-blue-600/5",
  },
  {
    slug: "starlink-mikrotik-failover",
    name: "Multi-WAN Failover Network",
    tagline: "Starlink + fibre failover built on MikroTik RouterOS",
    year: "2025",
    featured: true,
    problem:
      "A business relying on a single fibre link lost connectivity — and revenue — every time the line was cut. Manual switchover to a backup took upwards of thirty minutes and required someone technical on site.",
    solution:
      "Dual-WAN routing with recursive gateway checks and netwatch-driven failover. Traffic moves to Starlink within seconds of fibre degrading and returns automatically once the primary link is stable, with no human in the loop.",
    architecture:
      "MikroTik RouterOS with policy-based routing, per-WAN health probes, VLAN segmentation for staff/guest/CCTV, IPsec site-to-site tunnel, and centralised logging to a monitoring host.",
    outcome: [
      { metric: "<10s", label: "failover time" },
      { metric: "99.9%", label: "measured uptime" },
      { metric: "0", label: "manual interventions needed" },
    ],
    stack: ["MikroTik", "RouterOS", "Starlink", "IPsec", "VLAN"],
    links: {},
    accent: "from-emerald-500/20 to-teal-600/5",
  },
  {
    slug: "cloud-migration",
    name: "On-Prem to AWS Migration",
    tagline: "Lifting a small business off ageing hardware",
    year: "2024",
    featured: true,
    problem:
      "Business-critical services ran on a single ageing server in an office cupboard, with backups nobody had tested. One hardware failure would have ended the company.",
    solution:
      "Phased migration to AWS: workloads containerised, storage moved to S3 with lifecycle rules, and automated snapshots with a documented, rehearsed restore procedure.",
    architecture:
      "EC2 for compute, RDS for the database, S3 + lifecycle policies for object storage and backups, IAM least-privilege roles, CloudWatch alarms, and infrastructure captured in Terraform.",
    outcome: [
      { metric: "0", label: "unplanned outages since cutover" },
      { metric: "15 min", label: "tested recovery objective" },
      { metric: "↓", label: "hardware maintenance overhead" },
    ],
    stack: ["AWS", "EC2", "RDS", "S3", "Terraform", "Docker"],
    links: {},
    accent: "from-orange-500/20 to-amber-600/5",
  },
  {
    slug: "homelab",
    name: "Homelab & Documentation",
    tagline: "A permanent laboratory for things that must not break in production",
    year: "Ongoing",
    featured: false,
    problem:
      "Learning new infrastructure on client systems is a bad idea. Every technique needs somewhere to fail safely first.",
    solution:
      "A self-hosted lab running containerised services behind a reverse proxy, with monitoring, automated backups, and written documentation for every service so the setup is reproducible from scratch.",
    architecture:
      "Proxmox host, Docker Compose stacks, Nginx Proxy Manager, Uptime Kuma monitoring, Tailscale for remote access, and restic for offsite backups.",
    outcome: [
      { metric: "20+", label: "services self-hosted" },
      { metric: "100%", label: "documented and reproducible" },
    ],
    stack: ["Proxmox", "Docker", "Nginx", "Tailscale", "Linux"],
    links: {},
    accent: "from-violet-500/20 to-purple-600/5",
  },
];

/* -------------------------------------------------------------------------- */
/*  Education & certifications — verified from source documents               */
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
};

export const credentials: Credential[] = [
  {
    title: "BSc Information Technology",
    issuer: "Kwame Nkrumah University of Science and Technology",
    date: "2024-11-01",
    detail: "Second Class Honours (Upper Division)",
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
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
] as const;
