/** Capabilities, grouped. Re-exported from lib/site.ts. */

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
