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
  "Greenhouse International Development Group Ghana Ltd.": {
    role: "Chargé de support informatique",
    division: "Département ingénierie et conception",
    summary:
      "Seul responsable du support informatique pour un parc industriel de 1 200 acres et les points de vente de sa filiale — utilisateurs, systèmes de caisse et terminaux portables, serveurs, et le réseau du site qui relie l'ensemble.",
    highlights: [
      "Premier et unique niveau de support informatique pour le personnel du parc et du siège : matériel, logiciels, imprimantes, comptes et accès, du diagnostic à la résolution.",
      "Configuration, déploiement et support des systèmes de point de vente de Bright Afrimall sur plusieurs sites commerciaux au Ghana, y compris la formation du personnel et le dépannage à distance.",
      "Gestion du parc de terminaux portables utilisés pour les stocks et l'exploitation — approvisionnement, déploiement d'applications et résolution des pannes.",
      "Conception et déploiement de la dorsale en fibre optique du parc, acheminant les flux de vidéosurveillance et les données de caisse depuis les usines et bâtiments distants vers le siège, et redistribuant l'accès internet vers les usines.",
      "Augmentation de la capacité internet du site en agrégeant huit terminaux Starlink installés individuellement sur un routeur MikroTik comme huit liens WAN, alimentant un commutateur d'entreprise Huawei S5735 puis une couche de distribution GPON avec des répartiteurs 1:4 sur le panneau de brassage.",
      "Extension de la couverture au-delà du périmètre du parc par liaisons sans fil point à point et tunnels VPN, permettant aux sites distants d'accéder aux ressources du siège.",
      "Installation et gestion de points d'accès intérieurs et extérieurs avec contrôleurs centralisés, couvrant bureaux, ateliers et espaces ouverts.",
      "Déploiement et maintenance des services internes sur Proxmox et serveurs Linux via Docker et Portainer — Odoo, OpenMAINT, Tailscale et filtrage DNS des publicités et contenus.",
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
      "Administration et support technique à distance de l'infrastructure numérique de l'entreprise.",
      "Gestion des sites web, des domaines, des plateformes d'hébergement, des certificats SSL et de la messagerie d'entreprise.",
      "Maintenance des sites, mises à jour de sécurité, optimisation des performances et dépannage.",
      "Support des plateformes numériques utilisées dans l'hôtellerie, le transport, la logistique et l'immobilier.",
      "Gestion des services en ligne et maintien de la disponibilité des systèmes critiques.",
    ],
  },
  "Prop-Tis GH Limited": {
    role: "Responsable informatique",
    division: "Département informatique et publicité",
    summary:
      "Responsable de la plateforme d'annonces immobilières de l'entreprise et de la fonction informatique qui l'entoure, aux côtés de l'équipe de production créative.",
    highlights: [
      "Développement et gestion de la plateforme d'annonces immobilières, avec amélioration des performances et de l'expérience utilisateur.",
      "Mise en place de stratégies de référencement ayant accru la visibilité organique et le trafic web.",
      "Encadrement des équipes de production créative en vidéo, photographie et graphisme.",
      "Mise en place et maintenance des systèmes de sauvegarde protégeant les données de l'entreprise.",
      "Compilation et analyse de rapports de performance sur les plateformes numériques pour orienter les décisions marketing et opérationnelles.",
    ],
  },
  "Kaysens Group & Kwaaba Foundation": {
    role: "Assistant de projet (contrat)",
    summary:
      "Coordination de projets et gestion des opérations de bureau, avec le travail web et graphique qui les accompagnait.",
    highlights: [
      "Coordination des plans de projet, des échéanciers et de l'affectation du personnel.",
      "Gestion quotidienne des opérations de bureau, du contrôle documentaire et des communications avec les parties prenantes.",
      "Remplacement du chef de projet au besoin pour respecter les échéances.",
      "Conception et développement de sites web et de contenus graphiques pour l'image de marque des projets.",
    ],
  },
  "Origin8 Advertising Ltd.": {
    role: "Spécialiste informatique (service national)",
    division: "Département création",
    summary:
      "Développement web et support informatique interne au sein d'une agence de création.",
    highlights: [
      "Conception et développement de sites web pour des projets clients et internes.",
      "Support informatique au personnel, avec résolution des problèmes matériels et logiciels pour limiter les interruptions.",
      "Production de contenus créatifs pour des campagnes marketing et publicitaires.",
    ],
  },
  "Volta River Authority": {
    role: "Stagiaire en systèmes d'information de gestion",
    summary:
      "Première expérience des infrastructures d'entreprise, à la compagnie nationale d'électricité du Ghana.",
    highlights: [
      "Gestion et mise à jour du site web de l'organisation.",
      "Diagnostic et résolution de problèmes de connectivité réseau, et configuration du matériel du personnel.",
      "Installation et configuration de systèmes d'exploitation serveur et client.",
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
    detail: "Avec cours · axée sur la sécurité réseau et la détection d'intrusion",
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
  "LinkedIn Marketing Strategy": { title: "Stratégie marketing LinkedIn" },
  "LinkedIn Marketing Fundamentals": { title: "Fondements du marketing LinkedIn" },
  "HND Information & Communication Technology": {
    title: "Diplôme supérieur en technologies de l'information et de la communication",
    detail: "Mention bien, division supérieure",
  },
  "Google Digital Skills": { title: "Compétences numériques Google" },
};

export const factsFr: Record<string, { label: string; value: string }> = {
  Experience: { label: "Expérience", value: "Plus de 5 ans" },
  "Site supported": { label: "Site couvert", value: "1 200 acres" },
  Available: { label: "Disponible", value: "Août 2026" },
  Based: { label: "Basé à", value: "Accra → St. John's" },
};

export const issuersFr: Record<string, string> = {
  "Memorial University of Newfoundland": "Université Memorial de Terre-Neuve",
  "Kwame Nkrumah University of Science and Technology":
    "Université des sciences et technologies Kwame Nkrumah",
  "Amazon Web Services": "Amazon Web Services",
  LinkedIn: "LinkedIn",
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
