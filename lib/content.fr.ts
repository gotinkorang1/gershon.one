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
      "Seul administrateur d'un réseau multi-sites, des serveurs de production qui le sous-tendent et de la plateforme ERP dont dépendent les équipes d'ingénierie et d'exploitation.",
    highlights: [
      "Administration et sécurisation d'un réseau multi-sites sur routeurs MikroTik CCR2004 — double WAN Starlink avec bascule par port, gestion de bande passante et durcissement du pare-feu sous RouterOS 7.x.",
      "Maintenance des serveurs de production et de l'ERP de l'entreprise (Frappe/ERPNext, Odoo), en garantissant l'intégrité des données et la disponibilité des flux d'ingénierie et d'exploitation.",
      "Diagnostic de pannes de connectivité complexes, dont des ruptures de fibre optique et des latences liées au routage, en réduisant les interruptions dans tous les services.",
      "Conception, déploiement et gestion des systèmes de caméras IP et de vidéosurveillance pour la sécurité du site.",
      "Remplacement du responsable ingénierie et conception en son absence, avec encadrement du personnel local et des flux de travail.",
      "Pilotage du recrutement et des entretiens techniques structurés pour les postes d'agent informatique, y compris la rédaction des offres et des guides d'entretien.",
      "Achat de matériel et de licences logicielles, et application de la politique informatique et de la conformité des licences.",
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
  "Network administration": {
    title: "Administration réseau",
    blurb: "Le cœur du poste actuel — multi-sites, appuyé sur le satellite, durci.",
  },
  "Systems & ERP": {
    title: "Systèmes et ERP",
    blurb: "Les serveurs, et les plateformes métier qui en dépendent.",
  },
  Cloud: {
    title: "Infonuagique",
    blurb: "Là où la périphérie du réseau rencontre l'infrastructure infogérée.",
  },
  "Web & development": {
    title: "Web et développement",
    blurb: "Construire les plateformes, pas seulement les héberger.",
  },
  Professional: {
    title: "Compétences professionnelles",
    blurb: "Ce qui détermine si le travail technique porte ses fruits.",
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
  "Current role": { label: "Poste actuel", value: "Chargé de support informatique" },
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
  // Networking
  "Dual-WAN failover": "Bascule double-WAN",
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
