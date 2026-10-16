/**
 * French content.
 *
 * Only the prose that differs is stored here — dates, company names, stack
 * entries and credential IDs are locale-independent and stay in `lib/site.ts`.
 * Keys match the English records so a missing translation is a type error
 * rather than a silent fallback.
 */

export const experienceFr: Record<
  string,
  { role: string; summary: string; highlights: string[]; division?: string }
> = {
  SABAOTH: {
    role: "Consultant en technologies de l'information",
    summary:
      "Conseil et support informatique à distance pour le matériel, les logiciels, les réseaux et les espaces de travail infonuagiques des clients.",
    highlights: [
      "Conseil informatique et assistance technique à distance pour les pannes matérielles, logicielles et réseau, garantissant une connectivité continue.",
      "Configuration et dépannage de routeurs, commutateurs et pare-feu, améliorant la fiabilité de l'infrastructure des clients.",
      "Support et administration de Microsoft 365 et Google Workspace, gestion des comptes utilisateurs et des permissions.",
      "Contribution aux mesures de cybersécurité et à la maintenance préventive pour un environnement informatique sécurisé.",
    ],
  },
  "Greenhouse International Development Group Ghana Ltd.": {
    role: "Responsable informatique principal",
    division: "Département ingénierie et conception",
    summary:
      "Responsable du support informatique d'un parc industriel de 1 200 acres, de ses succursales et de ses usines — utilisateurs, caisses, serveurs, vidéosurveillance et réseau du site — à la tête d'une équipe de quatre personnes.",
    highlights: [
      "Encadrement d'une équipe informatique de quatre personnes assurant le support du personnel du parc, du siège et des succursales — environ 36 employés par succursale ou usine — pour le matériel, les logiciels, les imprimantes, les comptes et les accès, du diagnostic à la résolution.",
      "Installation et supervision en personne des déploiements de vidéosurveillance et de Starlink dans 47 succursales et usines au Ghana — de 15 à 45 caméras par site avec visionnement à distance pour la direction, et Starlink mis en service en deux heures environ par site.",
      "Appui à la mise en place des caisses, à la formation du personnel et au suivi des équipements dans 23 points de vente Bright Afrimall, avec dépannage à distance.",
      "Gestion du parc de terminaux portables utilisés pour les stocks et l'exploitation — approvisionnement, déploiement d'applications et résolution des pannes.",
      "Conception et déploiement de la dorsale en fibre optique du parc — pose et raccordement de câble aérien — acheminant les flux de vidéosurveillance et les données de caisse depuis les usines et bâtiments distants vers le siège, et redistribuant l'accès internet vers les usines.",
      "Augmentation de la capacité internet du site en agrégeant huit terminaux Starlink installés individuellement sur un routeur MikroTik comme huit liens WAN, alimentant un commutateur d'entreprise Huawei S5735 puis une couche de distribution GPON avec des répartiteurs 1:4 sur le panneau de brassage.",
      "Extension de la couverture au-delà du périmètre du parc par liaisons sans fil point à point et tunnels VPN, avec une adresse IP publique comme accès distant de secours en plus des VPN et de la fibre MTN.",
      "Installation et gestion de points d'accès intérieurs et extérieurs avec contrôleurs centralisés, couvrant bureaux, ateliers et espaces ouverts.",
      "Administration de 3 serveurs physiques et d'environ 9 machines virtuelles sous Proxmox, ainsi que de 2 serveurs de production et 3 serveurs de développement et de test en ligne — Odoo, OpenMAINT, Tailscale, OPNsense, services de fichiers et de proxy et filtrage DNS, via Docker et Portainer.",
      "Sauvegardes complètes chaque dimanche soir et sauvegardes automatiques des caisses et bases de données déclenchées par événement, avec les sauvegardes Proxmox VE et Proxmox Backup Server.",
      "Migration de la messagerie sur site vers Microsoft 365, d'un serveur de caisse local vers AWS, et des sites web de l'entreprise de Namecheap vers Hostinger.",
      "Administration de NingDun Identity Domain Management pendant un an — services d'annuaire, authentification Windows, ordinateurs et politiques de mots de passe.",
      "Gestion du magasin informatique et du parc matériel dans Odoo : inventaire, mouvements de stock et attribution des équipements.",
      "Appui à l'équipe de géomètres par la conversion de plans CAO en données OpenStreetMap avec JOSM, dotant le parc d'un fond de plan numérique fiable.",
      "Remplacement du responsable ingénierie et conception en son absence, et conduite des entretiens techniques pour le recrutement d'agents informatiques.",
    ],
  },
  "Nii Plants Group": {
    role: "Consultant informatique à distance",
    summary:
      "Administration et support informatiques à distance de l'infrastructure numérique du groupe, en parallèle de l'emploi principal.",
    highlights: [
      "Administration et support technique à distance de l'infrastructure numérique de l'entreprise, avec explication des solutions aux interlocuteurs non techniques.",
      "Gestion des sites web, des domaines, des plateformes d'hébergement, des certificats SSL et de la messagerie d'entreprise.",
      "Maintenance des sites, mises à jour de sécurité, optimisation des performances et dépannage.",
      "Support des plateformes numériques utilisées dans l'hôtellerie, le transport, la logistique et l'immobilier.",
      "Gestion des services en ligne et maintien de la disponibilité des systèmes critiques.",
      "Développement de sites web et appui au référencement pour les entreprises du groupe.",
    ],
  },
  "Prop-Tis GH Limited": {
    role: "Spécialiste en technologies de l'information",
    division: "Département informatique et publicité",
    summary:
      "Création et gestion de la plateforme d'annonces WordPress de l'entreprise et de l'informatique qui l'entoure, avec la coordination d'une équipe numérique de huit personnes.",
    highlights: [
      "Développement et maintenance de la plateforme WordPress d'annonces immobilières, au service de la publication des biens et de la recherche client.",
      "Maintenance de l'hébergement, des sauvegardes et de la sécurité du site pour protéger les données de l'entreprise, et résolution des problèmes matériels, logiciels et de connectivité du personnel.",
      "Coordination d'une équipe pluridisciplinaire de huit personnes pour la livraison du site et des contenus numériques, y compris les infolettres et les rapports de référencement.",
    ],
  },
  "Kwaaba Foundation": {
    role: "Assistant de projet",
    summary:
      "Coordination de projets, gestion des opérations de bureau et communication numérique au profit d'initiatives communautaires.",
    highlights: [
      "Appui aux initiatives de santé et d'action communautaire de la Fondation Kwaaba.",
      "Organisation d'événements et de programmes alignés sur les missions de la fondation.",
      "Collaboration à la planification de projets, aux structures d'équipe, aux échéanciers et aux opérations quotidiennes.",
      "Gestion documentaire, communications internes et externes, réunions, présentations et suivi.",
      "Soutien au développement de sites web, aux contenus graphiques et à la communication sur les réseaux sociaux.",
    ],
  },
  "Origin8 Limited": {
    role: "Stagiaire spécialiste en informatique",
    summary:
      "Conception de sites web, assistance informatique au personnel et intégration d'outils numériques aux projets de campagne.",
    highlights: [
      "Conception et maintenance de sites web pour les projets internes et clients.",
      "Support technique aux employés pour le matériel, les logiciels et le réseau afin de limiter les interruptions.",
      "Collaboration avec les équipes créatives pour intégrer les solutions techniques aux livrables.",
    ],
  },
  "GCB Bank Limited": {
    role: "Stagiaire spécialiste en informatique",
    summary:
      "Support des serveurs, des comptes et des utilisateurs, ainsi que maintenance des compteuses de billets, dans l'une des plus grandes banques commerciales du Ghana.",
    highlights: [
      "Support des serveurs Windows et Linux, des comptes utilisateurs et de messagerie, des droits d'accès, des serveurs de fichiers, des imprimantes et des VPN.",
      "Dépannage du matériel, de la vidéosurveillance et des logiciels pour le personnel, limitant les interruptions des opérations bancaires.",
      "Entretien et réparation des compteuses de billets utilisées dans les opérations bancaires.",
      "Assistance aux clients pour leurs demandes de renseignements sur les comptes et les services.",
      "Utilisation de Google Forms et d'autres outils numériques pour collecter et traiter efficacement l'information.",
    ],
  },
  "Volta River Authority": {
    role: "Stagiaire en systèmes d'information de gestion",
    summary:
      "Première expérience des infrastructures d'entreprise, à la compagnie nationale d'électricité du Ghana.",
    highlights: [
"Configuration de systèmes d'exploitation serveur et client, et support des serveurs Windows et Linux, des comptes, des permissions, des services de fichiers et des VPN.",
      "Résolution des problèmes d'ordinateurs, d'imprimantes, de réseau et de vidéosurveillance pour le personnel.",
      "Gestion et mise à jour du site web de l'organisation.",
    ],
  },
  "RichWorld Mobile Devices": {
    role: "Chargé de vente et technicien en réparation matérielle",
    summary:
      "Diagnostic et réparation de matériel au niveau des composants, avec gestion des stocks et service à la clientèle.",
    highlights: [
      "Diagnostic et réparation de pannes matérielles sur mobiles, prolongeant la durée de vie des appareils.",
      "Tenue des registres d'inventaire et accompagnement des clients dans le choix des produits et le suivi après-vente.",
    ],
  },
};

export const skillGroupsFr: Record<string, { title: string; blurb: string }> = {
  "IT support": {
    title: "Support informatique",
    blurb: "Le cœur du poste — les personnes, les postes de travail et tout ce qui ne fonctionne plus.",
  },
  "Retail & field systems": {
    title: "Systèmes de vente et de terrain",
    blurb: "Caisses et terminaux portables répartis sur plusieurs sites.",
  },
  Networking: {
    title: "Réseaux",
    blurb: "Fibre à l'échelle du site, agrégation multi-WAN et couverture sans fil à grande échelle.",
  },
  Security: {
    title: "Sécurité",
    blurb:
      "Garder l'infrastructure et les données défendables — le côté pratiqué, et les fondations sur lesquelles la maîtrise s'appuie.",
  },
  "Servers & services": {
    title: "Serveurs et services",
    blurb: "Les plateformes derrière le support.",
  },
  "Cloud & web": {
    title: "Infonuagique et web",
    blurb: "Hébergement, domaines et les sites qui tournent dessus.",
  },
  "GIS & other": {
    title: "SIG et divers",
    blurb: "Le travail qui ne figurait dans aucune fiche de poste mais qu'il fallait faire.",
  },
};

export const credentialsFr: Record<string, { title: string; detail?: string }> = {
  "MSc Computer Science": {
    title: "Maîtrise en informatique",
    detail: "Avec cours · axée sur la sécurité réseau et la détection d'intrusion (2026–2028)",
  },
  "BSc Information Technology": {
    title: "Baccalauréat en technologies de l'information",
    detail: "Mention bien, division supérieure",
  },
  "Foundations of Cybersecurity": {
    title: "Fondements de la cybersécurité",
    detail: "Extrait du certificat professionnel Google Cybersecurity — contrôles de sécurité, SIEM, analyse réseau et des cyberattaques",
  },
  "AWS Certified Cloud Practitioner": {
    title: "AWS Certified Cloud Practitioner",
  },
  "ALX Cloud Computing": {
    title: "ALX Infonuagique",
    detail: "Cours ALX Cloud Practitioner de deux mois, propulsé par AWS Academy, avec des compétences de développement professionnel pour l'ère numérique · terminé en juin 2025",
  },
  "ALX Professional Foundations": {
    title: "ALX Fondements professionnels",
    detail: "Compétences de développement professionnel pour l'ère numérique",
  },
  "Intermediate First Aid CPR C/AED (Standard)": {
    title: "Secourisme intermédiaire RCR niveau C / DEA (standard)",
    detail: "Cours COUR-1164-NL-260926-7265 · Conseil de Terre-Neuve-et-Labrador d'Ambulance Saint-Jean · RCR niveau C et DEA",
  },
  "Sexual Violence Awareness and Prevention": {
    title: "Sensibilisation et prévention de la violence sexuelle",
    detail: "Bureau du harcèlement sexuel · certification de sécurité institutionnelle",
  },
  "Fire Safety, Prevention, Evacuation and Basic Firefighting": {
    title: "Sécurité incendie, prévention, évacuation et lutte contre l'incendie",
    detail: "Caserne d'Amasaman · prévention, évacuation d'urgence, fonctions de garde d'incendie pour le parc industriel de Bright",
  },
  "HND Information & Communication Technology": {
    title: "Diplôme supérieur en technologies de l'information et de la communication",
    detail: "Mention bien, division supérieure",
  },
  "Google Digital Skills": {
    title: "Compétences numériques Google",
    detail: "Les fondamentaux du marketing numérique · Google Digital Skills for Africa, reconnu par IAB Europe et The Open University",
  },
  "Certificate II, Electrical Engineering Technology": {
    title: "Certificat II, technologie du génie électrique",
    detail: "Service de l'éducation du Ghana / NABPTEX · examens des matières techniques et de base",
  },
};

export const factsFr: Record<string, { label: string; value: string }> = {
  Experience: { label: "Expérience", value: "Plus de 5 ans" },
  "Site supported": { label: "Site couvert", value: "1 200 acres" },
  "Sites rolled out": { label: "Sites déployés", value: "47" },
  "Team led": { label: "Équipe dirigée", value: "4 personnes" },
};

export const issuersFr: Record<string, string> = {
  "Memorial University of Newfoundland": "Université Memorial de Terre-Neuve",
  "Kwame Nkrumah University of Science and Technology":
    "Université des sciences et technologies Kwame Nkrumah",
  "Amazon Web Services": "Amazon Web Services",
  "St. John Ambulance": "Ambulance Saint-Jean",
  "Ghana National Fire Service": "Service national des incendies du Ghana",
  "Takoradi Technical University (NABPTEX)": "Université technique de Takoradi (NABPTEX)",
  Google: "Google",
};

/**
 * Skill and stack terms that are descriptions rather than product names.
 * MikroTik, Odoo, WireGuard, AWS and similar are proper nouns and stay in
 * English — translating them would look wrong to a French-speaking engineer.
 */
export const termsFr: Record<string, string> = {
  "SSL / TLS": "SSL / TLS",
  "End-user support": "Support aux utilisateurs",
  "Hardware diagnostics & repair": "Diagnostic et réparation matériels",
  "Windows & Linux desktops": "Postes Windows et Linux",
  "Printers & peripherals": "Imprimantes et périphériques",
  "Account & access management": "Gestion des comptes et des accès",
  "Software deployment": "Déploiement logiciel",
  "User training": "Formation des utilisateurs",
  "POS configuration & rollout": "Configuration et déploiement de caisses",
  "PDA / handheld provisioning": "Approvisionnement de terminaux portables",
  "Multi-site deployment": "Déploiement multi-sites",
  "Remote fault resolution": "Dépannage à distance",
  "Asset & inventory control (Odoo)": "Gestion des actifs et stocks (Odoo)",
  "Multi-WAN aggregation": "Agrégation multi-WAN",
  "Fibre / GPON distribution": "Distribution fibre / GPON",
  "Huawei enterprise switching": "Commutation Huawei entreprise",
  "VLANs & firewall policy": "VLAN et règles de pare-feu",
  "Point-to-point wireless": "Liaisons sans fil point à point",
  "Indoor & outdoor APs": "Points d'accès intérieurs et extérieurs",
  "Proxmox virtualisation": "Virtualisation Proxmox",
  "Linux server administration": "Administration de serveurs Linux",
  "DNS filtering": "Filtrage DNS",
  "Domain & DNS management": "Gestion des domaines et du DNS",
  "Email hosting": "Hébergement de messagerie",
  "CAD to GIS conversion": "Conversion CAO vers SIG",
  "Site mapping support": "Appui à la cartographie du site",
  "Structured cabling": "Câblage structuré",
  "Site supported": "Site couvert",
  "POS systems": "Systèmes de caisse",
  "Remote support": "Support à distance",
  // Networking
  "Aggregated multi-WAN": "Multi-WAN agrégé",
  "Bandwidth queuing": "Gestion de bande passante",
  "Firewall hardening": "Durcissement du pare-feu",
  "Starlink deployment": "Déploiement Starlink",
  "Fibre troubleshooting": "Dépannage fibre",
  // Security
  "Network segmentation (VLANs)": "Segmentation réseau (VLAN)",
  "Firewall policy & hardening": "Politique et durcissement du pare-feu",
  "VPN-gated admin access": "Accès admin protégé par VPN",
  "DNS content filtering": "Filtrage de contenu DNS",
  "PII & data protection": "Protection des données personnelles",
  "Access & identity management": "Gestion des accès et des identités",
  "Security monitoring (SIEM) fundamentals": "Bases de la surveillance de sécurité (SIEM)",
  "Threat & attack analysis": "Analyse des menaces et des attaques",
  // Systems
  "Server administration": "Administration de serveurs",
  "Windows & Linux": "Windows et Linux",
  "Backup & recovery": "Sauvegarde et restauration",
  "CCTV / IP camera systems": "Vidéosurveillance et caméras IP",
  "Hardware support": "Support matériel",
  // Cloud
  "Domain management": "Gestion de domaines",
  // Professional
  "Technical documentation": "Documentation technique",
  "Project coordination": "Coordination de projets",
  "Technical interviewing": "Entretiens techniques",
  "IT policy & compliance": "Politique et conformité informatique",
  "Confidential data handling": "Traitement de données confidentielles",
  "Cross-team collaboration": "Collaboration inter-équipes",
  "Remote work": "Travail à distance",
  // Stack entries
  "Backup systems": "Systèmes de sauvegarde",
  "Documentation": "Documentation",
  "Web design": "Conception web",
  "IT support": "Support informatique",
  "Networking": "Réseaux",
  "Hardware repair": "Réparation matérielle",
  "Diagnostics": "Diagnostic",
  "Inventory": "Gestion des stocks",
  "Web": "Web",
};

export const roleFocusFr = {
  "it-support": {
    title: "Spécialiste du support informatique",
    shortTitle: "Support IT",
    description:
      "Support aux utilisateurs, matériel, comptes, systèmes de caisse et terminaux portables, dépannage et gestion opérationnelle sur plusieurs sites.",
  },
  network: {
    title: "Technicien réseau",
    shortTitle: "Réseau",
    description:
      "Fibre, GPON, MikroTik, agrégation multi-WAN, commutation d'entreprise, couverture sans fil et localisation de pannes à l'échelle d'un site industriel.",
  },
  erp: {
    title: "Spécialiste ERP",
    shortTitle: "ERP",
    description:
      "Administration d'ERPNext, Frappe et Odoo, données RH, formats d'impression, gestion des actifs, contrôle des accès et automatisation.",
  },
  infrastructure: {
    title: "Spécialiste en infrastructure",
    shortTitle: "Infrastructure",
    description:
      "Serveurs, virtualisation, Linux, conteneurs, cloud, sécurité réseau et connectivité résiliente pour des opérations distribuées.",
  },
  "it-operations": {
    title: "Technicien des opérations IT",
    shortTitle: "Opérations IT",
    description:
      "Gestion quotidienne des utilisateurs, appareils, fournisseurs, actifs, systèmes métier, documentation et sites distribués.",
  },
  web: {
    title: "Développeur web",
    shortTitle: "Web",
    description:
      "Sites web, hébergement, DNS, messagerie, WordPress, PHP et MySQL, SEO, maintenance et intégration front-end.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Site features, references and the projects page                           */
/* -------------------------------------------------------------------------- */

export const featuresFr = {
  navigation: { projects: "Projets", lab: "Labo", blog: "Blog" },
  lab: {
    eyebrow: "Preuve interactive",
    homeTitle: "Ne vous contentez pas de lire. Examinez la démarche.",
    homeLede:
      "Lancez un scénario de dépannage, reliez chaque compétence à ses preuves, examinez les architectures et l'activité professionnelle récente.",
    open: "Ouvrir le labo",
    tabs: {
      troubleshoot: "Dépannage",
      evidence: "Preuves",
      architecture: "Architecture",
      activity: "Activité",
    },
  },
  recruiterPack: {
    eyebrow: "Dossier recruteur par poste",
    title: "Preuves sélectionnées pour",
    lede: "Un dossier prêt à imprimer : adéquation au poste, disponibilité, expérience la plus pertinente, projets, certifications et coordonnées.",
    open: "Ouvrir le dossier recruteur",
    back: "Retour au portfolio ciblé",
    availability: "Disponibilité et admissibilité",
    experience: "Expérience pertinente",
    capabilities: "Compétences correspondantes",
    caseStudies: "Études de cas choisies",
    credentials: "Certifications pertinentes",
    contact: "Contact",
    downloadCv: "Télécharger le CV",
    print: "Imprimer / enregistrer en PDF",
    present: "aujourd'hui",
    linkedin: "LinkedIn",
    metaTitle: (role: string) => `Dossier recruteur — ${role}`,
  },
};

export const briefActionsFr = {
  print: "Imprimer / enregistrer en PDF",
  share: "Partager le dossier",
  linkCopied: "Lien copié",
  shareTitle: "Gershon Otinkorang — dossier candidat",
  shareText:
    "Disponibilité, autorisation de travail, expérience et compétences clés de Gershon Otinkorang.",
};

/** Same order as `brief.eligibility` in lib/brief.ts. */
export const eligibilityFr = [
  {
    label: "Disponible à partir de",
    value: "Maintenant",
    note: "Temps partiel en session, temps plein pendant les pauses prévues · Étudiant à la maîtrise à l'Université Memorial (2026–2028)",
  },
  {
    label: "Autorisation de travail",
    value: "Permis d'études canadien (valide jusqu'en 2028)",
    note: "Travail hors campus jusqu'à 24 h/semaine en session, temps plein pendant les pauses prévues · Admissible au PTPD après l'obtention du diplôme",
  },
  {
    label: "Préavis",
    value: "Immédiat / flexible",
    note: "Disponible pour du travail à temps partiel, contractuel ou planifié au Canada",
  },
  {
    label: "Lieu",
    value: "St. John's (T.-N.-L.)",
    note: "Ouvert au travail sur place ou hybride à St. John's, ou à distance partout au Canada",
  },
];

/** Keyed by the reference's name. */
export const referencesFr: Record<string, { title: string }> = {
  Theophilus: { title: "PDG, Nii Plants Group" },
  "Michael Donkor": { title: "Analyste SI, Avenue Living" },
};

/** Keyed by website slug. */
export const websitesFr: Record<string, { summary: string }> = {
  "nii-plants-logistics": { summary: "Fret et logistique au Ghana et en Afrique de l'Ouest" },
  "papersource-ghana": { summary: "Catalogue et boutique en ligne livrant à Accra et Tema" },
  "nii-plants-group": { summary: "Site du groupe : mobilité, hôtellerie et services aux entreprises" },
  "nii-plants-car-rentals": { summary: "Location de voitures avec ou sans chauffeur à Accra" },
  "nbc-ghana-trust": { summary: "Société fiduciaire d'avantages sociaux" },
  "akosombo-textiles": { summary: "Fabricant textile et collections de mode" },
  "kwaaba-foundation": { summary: "Organisme sans but lucratif pour la santé et les initiatives communautaires" },
  "greenhouse-international": { summary: "Site institutionnel du promoteur du parc industriel" },
  proptisgh: { summary: "Plateforme d'annonces immobilières" },
  "autism-destigma": { summary: "Organisme de sensibilisation à l'autisme" },
  "plantsville-ghana": { summary: "Résidences et salon" },
  "the-home-of-beads": { summary: "Boutique Shopify de perles et bijoux africains" },
};

/** Keyed by the English project title. */
export const projectsFr: Record<
  string,
  { title: string; context?: string; summary: string; tags: string[] }
> = {
  "Multi-site Starlink deployment": {
    title: "Déploiement Starlink multi-sites",
    summary: "Installation et activation de Starlink sur les sites de l'entreprise, avec la gestion des abonnements, de la facturation, des résiliations et des remboursements.",
    tags: ["Starlink", "Multi-sites", "Gestion fournisseurs"],
  },
  "Head office Wi-Fi and network": {
    title: "Wi-Fi et réseau du siège",
    summary: "Configuration des routeurs, commutateurs, points d'accès et d'un réseau distinct par étage sur équipement TP-Link Omada, avec Starlink comme liaison montante.",
    tags: ["TP-Link Omada", "Wi-Fi", "Commutation"],
  },
  "Industrial park fibre network": {
    title: "Réseau fibre du parc industriel",
    summary: "Connectivité fibre à travers le parc sur un câble principal à huit brins, avec des liaisons à deux brins vers chaque bâtiment.",
    tags: ["Fibre", "GPON", "Câblage"],
  },
  "Industrial park wireless and VLANs": {
    title: "Sans-fil et VLAN du parc industriel",
    summary: "VLAN et liaisons sans fil point à point reliant bâtiments et zones d'exploitation, sur des équipements comme les radios CPE510 et M5.",
    tags: ["VLAN", "Point à point", "CPE510"],
  },
  "Centralised POS server and branch connectivity": {
    title: "Serveur de caisse centralisé et connectivité des succursales",
    summary: "Support d'un environnement de caisse sous Windows Server desservant 23 points de vente, y compris la connectivité des succursales et les besoins en IP publique.",
    tags: ["Windows Server", "Caisses", "IP publique"],
  },
  "Server administration and backups": {
    title: "Administration des serveurs et sauvegardes",
    summary: "Exploitation de deux serveurs de production en ligne et de trois serveurs de développement et de test, avec sauvegardes complètes hebdomadaires et sauvegardes automatiques des bases de données.",
    tags: ["Proxmox", "Sauvegardes", "Linux"],
  },
  "Hikvision CCTV deployment and support": {
    title: "Déploiement et support de la vidéosurveillance Hikvision",
    summary: "Installation, raccordement, maintenance et dépannage de la vidéosurveillance dans les installations de l'entreprise.",
    tags: ["Hikvision", "Vidéosurveillance", "Caméras IP"],
  },
  "KIRIKOU AI chatbot": {
    title: "Agent conversationnel IA KIRIKOU",
    context: "Projet de fin d'études, KNUST",
    summary: "Un agent conversationnel de support construit avec Next.js, LangChain et OpenAI, avec Upstash Redis pour la mémoire, Scrapy et des ressources Botpress pour ses connaissances, et Zendesk pour transférer la conversation à une personne.",
    tags: ["Next.js", "LangChain", "OpenAI", "Zendesk"],
  },
  "Car rental booking app": {
    title: "Application de réservation de voitures",
    context: "Application web",
    summary: "Une application de réservation construite avec Next.js, Drizzle et Supabase, avec paiements Paystack simulés, migrations de base de données et tests de bout en bout.",
    tags: ["Next.js", "Drizzle", "Supabase", "Paystack"],
  },
  "PaperSource Ghana website": {
    title: "Site web de PaperSource Ghana",
    summary: "Travail sur le catalogue et la boutique en ligne livrant à Accra et Tema, y compris le contenu produit et le dépannage.",
    tags: ["Commerce en ligne", "Contenu", "Support"],
  },
  "Real estate website and digital marketing": {
    title: "Site immobilier et marketing numérique",
    summary: "Création et maintenance du site, gestion de ses sauvegardes et de sa sécurité, et appui au référencement, aux infolettres et au CRM HubSpot.",
    tags: ["WordPress", "Référencement", "HubSpot"],
  },
  "Group website and IT support": {
    title: "Site du groupe et support informatique",
    summary: "Développement web et référencement, en parallèle du support aux utilisateurs et du dépannage matériel et logiciel.",
    tags: ["Web", "Référencement", "Assistance"],
  },
  "ERPNext HR implementation": {
    title: "Mise en place des RH dans ERPNext",
    summary: "Appui à la configuration du système RH et à l'import des données d'environ 8 000 employés.",
    tags: ["ERPNext", "RH", "Import de données"],
  },
  "openMAINT pilot": {
    title: "Projet pilote openMAINT",
    summary: "Un projet pilote de gestion des activités de maintenance et des actifs de l'organisation.",
    tags: ["openMAINT", "Actifs", "Maintenance"],
  },
  "IT and CCTV inventory": {
    title: "Inventaire informatique et vidéosurveillance",
    summary: "Organisation et suivi du matériel informatique, des équipements de vidéosurveillance et du stock d'entrepôt.",
    tags: ["Inventaire", "Odoo", "Suivi des actifs"],
  },
  "POS and business operations support": {
    title: "Support des caisses et des opérations",
    summary: "Mise en place des caisses, traitement des commandes dans l'ERP, registres d'inventaire, coordination de la flotte et processus de service à la clientèle.",
    tags: ["Caisses", "ERP", "Opérations"],
  },
  "IT operations handover and documentation": {
    title: "Passation et documentation des opérations informatiques",
    summary: "Préparation de la passation opérationnelle, accompagnement de mon remplaçant, et rédaction d'avis techniques et de communications bilingues.",
    tags: ["Documentation", "Passation", "Bilingue"],
  },
  "Microsoft enterprise infrastructure lab": {
    title: "Labo d'infrastructure d'entreprise Microsoft",
    context: "Labo personnel",
    summary: "Un labo Windows Server pratique couvrant Active Directory, DNS, DHCP, les stratégies de groupe, les services de fichiers et les postes joints au domaine. AD DS fonctionne sur corp.gershonlab.test, avec les partages NETLOGON et SYSVOL vérifiés.",
    tags: ["Active Directory", "Stratégies de groupe", "DNS / DHCP"],
  },
  "Software engineering team project": {
    title: "Projet d'équipe en génie logiciel",
    context: "COMP 6905 · Université Memorial",
    summary: "Collaboration dans le dépôt GitHub Asgn1TeamD en JavaScript : branches, fusions, demandes de tirage, profils d'équipe et planification de sprints.",
    tags: ["JavaScript", "Git", "Scrum"],
  },
};

export const projectsPageFr = {
  eyebrow: "Projets",
  title: "Ce que j'ai construit, déployé et maintenu en service",
  lede: "Des sites web en ligne aujourd'hui, et le travail d'infrastructure, de logiciel et d'exploitation derrière les postes de mon CV.",
  websitesTitle: "Sites web",
  websitesLede: "Des sites que j'ai construits ou maintenus. Chaque carte ouvre le vrai site.",
  projectsTitle: "Projets",
  projectsLede: "Filtrer par type de travail.",
  visit: "Voir le site",
  offline: "Hors ligne pour le moment",
  inProgress: "En cours",
  readMore: "Lire l'étude de cas",
  all: "Tous",
  categories: {
    network: "Réseaux",
    infrastructure: "Infrastructure",
    software: "Logiciel et web",
    business: "Systèmes de gestion",
    study: "Études et labos",
  },
  homeLink: "Voir tous les projets et sites web",
  metaTitle: "Sites web, réseaux et projets informatiques",
  metaDescription: "Des sites web que j'ai construits et maintenus, et des projets réseau, infrastructure, ERP et logiciels au Ghana et au Canada.",
  homepageAlt: (name: string) => `Page d'accueil de ${name}`,
};

/* -------------------------------------------------------------------------- */
/*  Systems Lab — same shape as portfolioFeatures.lab                          */
/* -------------------------------------------------------------------------- */

export const blogCopyFr = {
  eyebrow: "Rédaction",
  title: "Blog",
  metaTitle: "Notes de terrain : réseaux, ERPNext et systèmes",
  description: "Notes de terrain sur les réseaux, l'administration de systèmes et ce que je construis et exploite.",
  intro:
    "Des textes tirés du travail en informatique et des milieux qui l'entourent : pourquoi un réseau lent n'est souvent pas la faute de la fibre, comment imprimer deux badges bilingues par feuille A4 directement depuis ERPNext, et ce que les entreprises à capitaux étrangers représentent pour les travailleurs africains qui y travaillent. Chaque article est aussi publié en anglais.",
  subscribe: "S'abonner par RSS",
  empty: "Aucun article pour l'instant — revenez bientôt.",
  searchPlaceholder: "Rechercher des articles…",
  searchLabel: "Rechercher des articles",
  clearSearch: "Effacer la recherche",
  all: "Tous",
  latest: "Le plus récent",
  noResults: (query: string, tag: string) =>
    `Aucun article ne correspond${query ? ` à « ${query} »` : ""}${tag ? ` dans ${tag}` : ""}.`,
  minRead: "min de lecture",
  min: "min",
  allPosts: "Tous les articles",
  readNext: "À lire ensuite",
  olderPost: "Article précédent",
  newerPost: "Article suivant",
  share: "Partager",
  shareOnX: "Partager sur X",
  shareOnLinkedIn: "Partager sur LinkedIn",
  copyLink: "Copier le lien",
  linkCopied: "Lien copié",
  onThisPage: "Sur cette page",
  tableOfContents: "Table des matières",
  backToTop: "Retour en haut",
  copyCode: "Copier le code",
  copied: "Copié",
  linkToSection: "Lien vers cette section",
  home: "Accueil",
  blogName: "Rédaction",
};

export const readingFr = {
  save: "Enregistrer l'article",
  saved: "Enregistré",
  savedArticles: "Articles enregistrés",
  continueReading: "Reprendre la lecture",
  progress: "lu",
  remove: "Retirer des articles enregistrés",
  empty: "Enregistrez un article pour le garder dans ce navigateur.",
};

export const labFr = {
  metaTitle: "Labo interactif de dépannage informatique",
  eyebrow: "Preuve interactive",
  title: "Voyez comment je diagnostique, relie et améliore les systèmes.",
  lede:
    "Quatre vues fonctionnelles du portfolio : dépannage guidé, preuves derrière chaque compétence, architecture des systèmes et historique chronologique des activités.",
  open: "Ouvrir le labo",
  homeTitle: "Ne vous contentez pas de lire. Examinez la démarche.",
  homeLede:
    "Lancez un scénario de dépannage, reliez chaque compétence à ses preuves, examinez les architectures et l'activité professionnelle récente.",
  tabs: {
    troubleshoot: "Dépannage",
    evidence: "Preuves",
    architecture: "Architecture",
    activity: "Activité",
  },
  troubleshooting: {
    title: "Simulateur de dépannage",
    lede:
      "Choisissez la prochaine étape de diagnostic. Ces simulations reprennent les méthodes que j'applique en production : isoler d'abord, modifier ensuite, vérifier en dernier.",
    principleTitle: "Principe de diagnostic",
    principle:
      "Préserver les indices, réduire le domaine de la panne et n'effectuer qu'une modification justifiée à la fois.",
    progress: "Progression du diagnostic",
    next: "Vérification suivante",
    restart: "Recommencer le scénario",
    complete: "Incident résolu",
    scenarios: [
      {
        id: "slow-network",
        title: "Le réseau est lent",
        symptom: "Les utilisateurs d'un bâtiment signalent une latence intermittente alors que la liaison internet principale reste en ligne.",
        environment: "MikroTik · commutation Huawei · fibre GPON · multi-WAN",
        resolution:
          "Le domaine de la panne passe de l'impact utilisateur à une seule branche fibre, l'état physique est mesuré, et le chemin réparé est vérifié en continu avant la clôture.",
        proofHref: "/fr/work/diagnosing-fibre-latency",
        proofLabel: "Lire l'étude de cas sur la latence fibre",
        checks: [
          {
            prompt: "Que faut-il établir en premier ?",
            choices: [
              { label: "Redémarrer tous les points d'accès", feedback: "Cela modifie plusieurs variables avant que le domaine de la panne soit connu.", correct: false },
              { label: "Comparer les utilisateurs, supports et segments touchés", feedback: "Exact. Le périmètre indique la couche qui mérite d'être mesurée.", correct: true },
              { label: "Remplacer le routeur internet", feedback: "Remplacer n'est pas une étape de diagnostic, et la liaison amont est toujours en ligne.", correct: false },
            ],
          },
          {
            prompt: "Le problème est isolé à une branche GPON. Quelle est l'étape suivante ?",
            choices: [
              { label: "Examiner les erreurs, les niveaux optiques et les coupures de lien", feedback: "Exact. Ces mesures distinguent une congestion d'un chemin physique dégradé.", correct: true },
              { label: "Augmenter toutes les limites de bande passante", feedback: "La bande passante ne corrige ni les pertes, ni une puissance optique faible, ni les erreurs d'interface.", correct: false },
              { label: "Changer de fournisseur DNS", feedback: "Le DNS n'explique pas des pertes de paquets limitées à une branche fibre.", correct: false },
            ],
          },
        ],
      },
      {
        id: "erp-print",
        title: "L'impression ERPNext est défaillante",
        symptom: "Une carte d'identité paraît correcte en aperçu, mais les photos disparaissent et les dimensions dérivent dans le PDF.",
        environment: "ERPNext · Frappe · Jinja · HTML/CSS · PDF",
        resolution:
          "Le rendu navigateur et le rendu PDF sont testés comme deux environnements distincts. Les URL des ressources deviennent absolues, des unités physiques remplacent les unités d'écran, et le PDF exporté est mesuré.",
        proofHref: "/fr/work/erpnext-bilingual-id-cards",
        proofLabel: "Lire l'étude de cas sur les cartes ERPNext",
        checks: [
          {
            prompt: "Que faut-il reproduire en premier ?",
            choices: [
              { label: "Le PDF exact avec le même dossier d'employé", feedback: "Exact. Des données constantes isolent le moteur de rendu comme seule variable.", correct: true },
              { label: "Un tout nouveau format d'impression", feedback: "Réécrire efface les indices avant que la panne actuelle soit comprise.", correct: false },
              { label: "Seulement l'aperçu navigateur qui fonctionne", feedback: "Le chemin défaillant, c'est le PDF généré.", correct: false },
            ],
          },
          {
            prompt: "Pourquoi la photo disparaît-elle seulement dans le PDF ?",
            choices: [
              { label: "Le moteur de rendu ne peut pas résoudre une URL relative", feedback: "Exact. Le filtre abs_url de Frappe donne au processus PDF un chemin complet.", correct: true },
              { label: "L'image a besoin d'un filtre CSS", feedback: "Un style ne peut pas charger une ressource que le moteur de rendu ne trouve pas.", correct: false },
              { label: "Il faut dupliquer l'employé", feedback: "Dupliquer les données ne change pas la résolution des URL.", correct: false },
            ],
          },
        ],
      },
      {
        id: "user-sign-in",
        title: "Un utilisateur ne peut pas se connecter",
        symptom: "Un employé ne peut plus accéder à son poste après un changement de mot de passe ; les autres utilisateurs ne sont pas touchés.",
        environment: "Poste Windows · identité · réseau local · applications métier",
        resolution:
          "L'état du compte, du poste et du réseau est testé séparément. L'accès est rétabli sans recueillir d'identifiants, puis la cause et la mesure préventive sont documentées.",
        proofHref: "/fr/for/it-support",
        proofLabel: "Voir le portfolio support informatique",
        checks: [
          {
            prompt: "Quelle est la première action la plus sûre ?",
            choices: [
              { label: "Demander à l'utilisateur d'envoyer son mot de passe", feedback: "Un mot de passe ne doit jamais être recueilli ni partagé pendant le support.", correct: false },
              { label: "Confirmer l'erreur, le compte et le périmètre", feedback: "Exact. Cela distingue un problème de compte d'une panne de poste ou de service.", correct: true },
              { label: "Réinstaller Windows", feedback: "Une modification destructrice est disproportionnée avant que la panne soit isolée.", correct: false },
            ],
          },
          {
            prompt: "Le compte fonctionne ailleurs. Que faut-il vérifier sur ce poste ?",
            choices: [
              { label: "La connectivité, l'heure, l'état en cache et la saisie", feedback: "Exact. Chacun peut bloquer l'authentification alors que le compte est sain.", correct: true },
              { label: "La file d'impression du bureau", feedback: "Le service d'impression est hors du chemin de connexion.", correct: false },
              { label: "Désactiver les protections du compte", feedback: "Retirer les garde-fous n'est pas une solution de contournement acceptable.", correct: false },
            ],
          },
        ],
      },
    ],
  },
  evidence: {
    title: "Carte des preuves de compétences",
    lede: "Choisissez une compétence pour la relier à l'expérience en production, aux études de cas et aux vues par poste.",
    select: "Choisir une compétence",
    experience: "Expérience en production",
    caseStudies: "Études de cas",
    roles: "Postes correspondants",
    credentials: "Certifications",
    none: "Pas encore d'étude de cas dédiée ; l'expérience professionnelle sert de preuve.",
    noResults: "Aucune compétence ne correspond à cette recherche.",
  },
  architecture: {
    title: "Explorateur d'architecture",
    lede: "Parcourez chaque système de la source au résultat, puis choisissez un composant pour examiner son rôle.",
    selected: "Composant sélectionné",
    systems: [
      {
        id: "industrial-network",
        name: "Réseau industriel",
        summary: "Une connectivité amont résiliente qui alimente la distribution fibre sur un site de 1 200 acres.",
        nodes: [
          { id: "wan", label: "8 WAN satellite", kind: "Entrée", metric: "8 liaisons", detail: "Des terminaux indépendants fournissent une capacité agrégée et réduisent la dépendance à un seul chemin amont." },
          { id: "router", label: "MikroTik CCR2004", kind: "Contrôle", metric: "Multi-WAN", detail: "Le routage, les contrôles d'état et les règles de trafic réunissent les liaisons montantes." },
          { id: "core", label: "Huawei S5735", kind: "Cœur", metric: "Distribution", detail: "Le cœur sépare et achemine les services vers la distribution fibre." },
          { id: "gpon", label: "Fibre GPON", kind: "Accès", metric: "Répartition 1:4", detail: "La distribution optique passive transporte la connectivité sur de longues distances dans le parc." },
          { id: "services", label: "Usines et services", kind: "Résultat", metric: "1 200 acres", detail: "Usines, vidéosurveillance, caisses et liaisons distantes utilisent l'infrastructure commune." },
        ],
      },
      {
        id: "erp-identity",
        name: "Flux d'identité ERP",
        summary: "Un dossier d'employé devient une carte d'identité bilingue, imprimable aux dimensions réelles.",
        nodes: [
          { id: "record", label: "Dossier d'employé", kind: "Source", metric: "ERPNext", detail: "Les RH gèrent noms, photos, services, fonctions et identifiants dans un seul dossier." },
          { id: "template", label: "Format Jinja", kind: "Transformation", metric: "Frappe", detail: "Le modèle récupère les champs, résout les URL des ressources et répète la mise en page imprimable." },
          { id: "layout", label: "Mise en page bilingue", kind: "Présentation", metric: "EN + 中文", detail: "Une grille fixe garde le chinois et l'anglais lisibles dans les dimensions physiques de la carte." },
          { id: "pdf", label: "PDF A4", kind: "Sortie", metric: "2 cartes", detail: "Les unités physiques et le contrôle des sauts de page produisent deux cartes complètes par feuille." },
          { id: "card", label: "Carte d'identité remise", kind: "Résultat", metric: "Prête à imprimer", detail: "Les cartes se réimpriment directement dès que le dossier de l'employé change." },
        ],
      },
      {
        id: "support-loop",
        name: "Boucle d'opérations de support",
        summary: "Un parcours reproductible, du signalement de l'utilisateur au rétablissement vérifié et à des connaissances réutilisables.",
        nodes: [
          { id: "report", label: "Signalement", kind: "Signal", metric: "Impact", detail: "Noter le symptôme exact, le moment, le périmètre et la conséquence pour l'activité." },
          { id: "scope", label: "Tri et périmètre", kind: "Décision", metric: "Priorité", detail: "Séparer les pannes isolées des pannes partagées et choisir la voie la plus sûre." },
          { id: "isolate", label: "Mesurer et isoler", kind: "Diagnostic", metric: "Preuves", detail: "Tester une couche à la fois et conserver les observations avant de modifier quoi que ce soit." },
          { id: "restore", label: "Rétablir le service", kind: "Action", metric: "Rétablissement", detail: "Appliquer la plus petite réparation justifiée en gardant les contrôles et un retour arrière possible." },
          { id: "verify", label: "Vérifier et documenter", kind: "Résultat", metric: "Connaissance", detail: "Confirmer le parcours de l'utilisateur, consigner la cause et accélérer la prochaine intervention." },
        ],
      },
    ],
  },
  activity: {
    title: "Activité professionnelle",
    lede: "Études de cas publiées, rédaction technique, certifications et activité publique, réunies en un seul historique.",
    filters: { all: "Tout", writing: "Rédaction", caseStudy: "Études de cas", credential: "Certifications" },
  },
};
