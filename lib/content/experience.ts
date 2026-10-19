/** Work history. Re-exported from lib/site.ts. */

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
