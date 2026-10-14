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
  Available: { label: "Disponible", value: "Maintenant" },
  Based: { label: "Basé à", value: "St. John's, T.-N.-L." },
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
