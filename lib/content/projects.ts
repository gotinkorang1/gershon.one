/** Projects page: live websites and project list. Re-exported from lib/site.ts. */

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
  { slug: "origin8", name: "Origin8", url: "https://origin8gh.com/", summary: "Marketing communication, technology and publishing agency", image: "/projects/origin8.webp" },
  { slug: "st-charles-shs", name: "St. Charles Senior High School", url: "https://stcharles.edu.gh/", summary: "School website with news and an alumni portal" },
  { slug: "fdi-ghana", name: "Foreign Direct International Group", url: "https://fdighana.com/", summary: "Investment and business setup services in Ghana", image: "/projects/fdi-ghana.webp" },
  { slug: "nii-plants-logistics", name: "Nii Plants Logistics", url: "https://niiplantslogistics.com/", summary: "Freight and logistics across Ghana and West Africa", image: "/projects/nii-plants-logistics.webp" },
  { slug: "papersource-ghana", name: "PaperSource Ghana", url: "https://www.papersourcegh.com/", summary: "Catalogue and storefront delivering across Accra and Tema", image: "/projects/papersource-ghana.webp" },
  { slug: "nii-plants-group", name: "Nii Plants Group", url: "https://www.niiplantsgroup.com/", summary: "Group site for mobility, hospitality and business services", image: "/projects/nii-plants-group.webp" },
  { slug: "nii-plants-car-rentals", name: "Nii Plants Car Rentals", url: "https://www.niiplantsghana.com/", summary: "Self-drive and chauffeur car rental in Accra", image: "/projects/nii-plants-car-rentals.webp" },
  { slug: "premium-rides-ghana", name: "Premium Rides Ghana", url: "https://premiumridesghana.com/", summary: "Car rental, chauffeur and airport transfer services", image: "/projects/premium-rides-ghana.webp" },
  { slug: "nbc-ghana-trust", name: "NBC Ghana Trust", url: "https://nbcghanatrust.com/", summary: "Employee benefits trust company", image: "/projects/nbc-ghana-trust.webp" },
  { slug: "akosombo-textiles", name: "Akosombo Textiles", url: "https://www.akosombotextiles.com/", summary: "Textile manufacturer and fashion collections", image: "/projects/akosombo-textiles.webp" },
  { slug: "kwaaba-foundation", name: "Kwaaba Foundation", url: "https://kwaabafoundation.org/about-kwaaba/", summary: "Non-profit for health and community initiatives", image: "/projects/kwaaba-foundation.webp" },
  { slug: "greenhouse-international", name: "Greenhouse International Development", url: "https://greenhouseintdev.com/en/", summary: "Corporate site for the industrial park developer", image: "/projects/greenhouse-international.webp" },
  { slug: "proptisgh", name: "Prop-Tis GH", url: "https://www.proptisgh.com/", summary: "Real estate listing platform", image: "/projects/proptisgh.webp" },
  { slug: "autism-destigma", name: "Autism Destigma", url: "https://autismdestigma.org/", summary: "Autism awareness non-profit", image: "/projects/autism-destigma.webp" },
  { slug: "plantsville-ghana", name: "Plantsville Ghana", url: "https://plantsvillegh.com/", summary: "Residences and lounge", image: "/projects/plantsville-ghana.webp" },
  { slug: "the-home-of-beads", name: "The Home of Beads", url: "https://thehomeofbeads.myshopify.com/", summary: "Shopify store for African beads and jewellery", image: "/projects/the-home-of-beads.webp" },
];

export type ProjectCategory = "network" | "infrastructure" | "software" | "design" | "business" | "study";

export type Project = {
  title: string;
  /** Who it was for. */
  context: string;
  category: ProjectCategory;
  summary: string;
  tags: string[];
  /** A live site or a case study that shows the work. */
  href?: string;
  /** External href points at videos rather than a site. */
  video?: boolean;
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
    title: "Green Ghana 2022 animations",
    context: "Ministry of Lands and Natural Resources",
    category: "design",
    summary: "Animated explainer videos for the national Green Ghana tree-planting campaign, including how to plant and nurture a seedling.",
    tags: ["Animation", "Motion graphics", "Public campaign"],
    href: "https://www.youtube.com/watch?v=TVsP4nOwh4U&list=PLBmJa_HUVahnwqpJNTGEGc1Waed7G_gre",
    video: true,
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
  watch: "Watch",
  offline: "Currently offline",
  inProgress: "In progress",
  readMore: "Read the write-up",
  all: "All",
  categories: {
    network: "Networking",
    infrastructure: "Infrastructure",
    software: "Software & web",
    design: "Motion & design",
    business: "Business systems",
    study: "Study & labs",
  } as Record<ProjectCategory, string>,
  writeUp: "Case study",
  stats: { websites: "live websites", projects: "projects", disciplines: "disciplines" },
  download: "Download portfolio (PDF)",
  downloadHint: "Every site and project on one printable page set.",
  pdf: {
    fileName: "gershon-otinkorang-portfolio.pdf",
    title: "Portfolio of work",
    role: "IT Infrastructure & Systems Specialist",
    intro: "Live websites I've built or maintained, followed by networking, infrastructure, software, design and business-systems projects, each with a short description.",
    updated: "Updated",
    contents: "Contents",
    contactTitle: "Let's talk",
    contactBody: "Every project here has more behind it than fits on a page. I'm happy to walk through any of them, put you in touch with references, or send my CV.",
    email: "Email",
    phone: "Phone",
    website: "Website",
    cv: "CV",
    cvLink: "Download PDF",
  },
  homeLink: "See all projects and websites",
  metaTitle: "Websites, networks and IT projects",
  homepageAlt: (name: string) => `${name} homepage`,
  metaDescription: "Websites I've built and maintained, plus networking, infrastructure, ERP and software projects across Ghana and Canada.",
};

export type ProjectsPageCopy = typeof projectsPage;
