/**
 * Minimal locale layer.
 *
 * Next's built-in i18n routing does not apply to the App Router, and a library
 * like next-intl would add a dependency for what is, here, two languages and
 * about sixty strings. This keeps translations typed — a missing French key is
 * a compile error, not a silent fallback to English at runtime.
 */

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

type Dictionary = {
  localeName: string;
  nav: { experience: string; work: string; capabilities: string; credentials: string; contact: string };
  hero: {
    role: string;
    headline: string;
    summary: string;
    availability: string;
    status: string;
    downloadCv: string;
    getInTouch: string;
    location: string;
    topologyMode: string;
    currentlyLabel: string;
    currently: string;
    stackLabel: string;
  };
  facts: { experience: string; currentRole: string; available: string; based: string };
  sections: {
    experienceTitle: string;
    experienceLede: string;
    workTitle: string;
    workLede: string;
    capabilitiesTitle: string;
    capabilitiesLede: string;
    credentialsTitle: string;
    credentialsLede: string;
    referencesEyebrow: string;
    referencesTitle: string;
    referencesLede: string;
    contactTitle: string;
    contactLede: string;
  };
  common: {
    current: string;
    upcoming: string;
    draft: string;
    verify: string;
    viewCertificate: string;
    openFullSize: string;
    requestCopy: string;
    requestCopySubject: (title: string) => string;
    certificateAlt: (title: string, issuer: string) => string;
    validTo: string;
    expired: string;
    stack: string;
    minRead: string;
    allCaseStudies: string;
    onThisPage: string;
    viewSource: string;
    summary: string;
  };
  ui: {
    skipToContent: string;
    search: string;
    openPalette: string;
    commandPalette: string;
    searchPlaceholder: string;
    close: string;
    keyboardShortcuts: string;
    sections: string;
    mainNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    footerNav: string;
    portfolioFocus: string;
    focusPrompt: string;
    focusHint: string;
    focusOverview: string;
    focusMatch: string;
    candidateBrief: string;
    terminalInput: string;
    topologyLabel: string;
    githubActivity: string;
    recentEvents: string;
    githubFallback: string;
    visit: string;
    bookCall: string;
    bookCallBody: string;
    findTime: string;
    copyEmail: string;
    emailCopied: string;
    caseStudyEyebrow: string;
    certifiedBy: string;
    educatedAt: string;
    currentlyAt: string;
    yearsExperience: string;
    topologyCaption: string;
    securityLabel: string;
    educationLabel: string;
    certificationsLabel: string;
    securityStatement: string;
    aboutMe: string;
    metaDescription: string;
    present: string;
    eyebrowExperience: string;
    eyebrowWork: string;
    eyebrowCapabilities: string;
    eyebrowCredentials: string;
    eyebrowContact: string;
    verified: string;
    proofAws: string;
    proofAwsSub: string;
    proofDegree: string;
    proofDegreeSub: string;
    proofMsc: string;
    proofMscSub: string;
    basedIn: (timezone: string) => string;
    noResults: (query: string) => string;
    failedOver: (seconds: string, live: string) => string;
    failedOverAnnounce: (seconds: string, live: string) => string;
    wansHealthy: (live: string) => string;
    linkDown: string;
    terminalDown: string;
    allUplinksDown: string;
    allUplinksDownAnnounce: string;
    switchToEnglish: string;
    switchToFrench: string;
    terminalIntro: (location: string) => string;
    themeSet: (theme: string) => string;
    themeDark: string;
    themeLight: string;
    switchToLightTheme: string;
    switchToDarkTheme: string;
    toggleTheme: string;
    topologyDescFailed: string;
    topologyDescHealthy: string;
    simulateFailure: string;
    restoreLink: string;
    uplinkCount: (n: string) => string;
    somethingWentWrong: string;
    sendEmail: string;
    viewCv: string;
    cvActions: string;
    openInNewTab: string;
    downloadPdf: string;
    cvDialogTitle: string;
    cvDialogBody: string;
    viewInBrowser: string;
    viewInBrowserHint: string;
    viewInBrowserHintMobile: string;
    downloadPdfHint: (size: string) => string;
    downloadStarted: string;
    cvViewerTitle: string;
    openInNewTabShort: string;
    pdfFallback: string;
    pdfNotShowing: string;
    protectedBy: string;
    verifying: string;
    loadingPdf: string;
    shortcuts: {
      openPalette: string;
      showHelp: string;
      goExperience: string;
      goCapabilities: string;
      goCredentials: string;
      goContact: string;
      goBlog: string;
      goTop: string;
      toggleDark: string;
      downloadCv: string;
      closeOverlay: string;
    };
    terminal: {
      help: string;
      whoami: string;
      experience: string;
      skills: string;
      certs: string;
      contact: string;
      cv: string;
      theme: string;
      clear: string;
      hint: string;
      notFound: (cmd: string) => string;
    };
  };
  contact: {
    name: string;
    email: string;
    company: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
    reply: string;
    phone: string;
    availability: string;
  };
};

const en: Dictionary = {
  localeName: "English",
  nav: {
    experience: "Experience",
    work: "Case studies",
    capabilities: "Capabilities",
    credentials: "Credentials",
    contact: "Contact",
  },
  hero: {
    role: "IT Infrastructure & Systems Specialist",
    headline:
      "I keep the systems people depend on working — from client infrastructure and cloud workspaces to a fibre backbone across 1,200 acres.",
    summary:
      "IT infrastructure and systems specialist and Memorial University Computer Science MSc student with five years keeping users, devices and enterprise infrastructure running. Based in St. John's, NL. Providing remote IT consulting at Sabaoth across hardware, networks, firewalls and Microsoft 365/Google Workspace; previously engineered the multi-WAN satellite link and GPON fibre backbone across a 1,200-acre industrial park in Ghana.",
    availability: "Available now · part-time in term, full-time in breaks",
    status: "Available now · St. John's, NL",
    downloadCv: "Download CV",
    getInTouch: "Get in touch",
    location: "St. John's, NL, Canada",
    topologyMode: "Aggregated multi-WAN",
    currentlyLabel: "Currently",
    currently: "IT Consultant at Sabaoth · MSc student at Memorial University",
    stackLabel: "Stack",
  },
  facts: {
    experience: "Experience",
    currentRole: "Current role",
    available: "Available",
    based: "Based",
  },
  sections: {
    experienceTitle: "Where I've done the work",
    experienceLede:
      "Roles across IT consulting, enterprise infrastructure, banking, real estate, and power utilities.",
    workTitle: "How the work actually went",
    workLede:
      "Longer write-ups of problems worth explaining, rather than screenshots that age badly.",
    capabilitiesTitle: "What I actually reach for",
    capabilitiesLede:
      "Grouped by use, in rough order of how central each is to the current role.",
    credentialsTitle: "Education and certification",
    credentialsLede:
      "Newest first. Open a certificate to see the document, check it with the issuer, or ask me for a copy of anything not shown.",
    referencesEyebrow: "References",
    referencesTitle: "What people I've worked with say",
    referencesLede: "People who managed or worked alongside me, in their own words.",
    contactTitle: "Tell me what you're building",
    contactLede:
      "Available for IT consulting, systems, and network roles in St. John's and remotely across Canada.",
  },
  common: {
    current: "Current",
    upcoming: "Upcoming",
    draft: "Draft",
    verify: "Verify",
    viewCertificate: "View certificate",
    openFullSize: "Open full size",
    requestCopy: "Request a copy",
    requestCopySubject: (title) => `Copy of certificate: ${title}`,
    certificateAlt: (title, issuer) => `${title} certificate issued by ${issuer}`,
    validTo: "Valid to",
    expired: "Expired",
    stack: "Stack",
    minRead: "min read",
    allCaseStudies: "All case studies",
    onThisPage: "On this page",
    viewSource: "View the source on GitHub",
    summary: "Summary",
  },
  ui: {
    skipToContent: "Skip to content",
    search: "Search",
    openPalette: "Open command palette",
    commandPalette: "Command palette",
    searchPlaceholder: "Search experience, skills, case studies…",
    close: "Close",
    keyboardShortcuts: "Keyboard shortcuts",
    sections: "Sections",
    mainNav: "Main",
    mobileNav: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    footerNav: "Footer",
    portfolioFocus: "Role-focused portfolio views",
    focusPrompt: "View for a target role",
    focusHint: "Relevant evidence moves first. Nothing is hidden.",
    focusOverview: "Overview",
    focusMatch: "Best match",
    candidateBrief: "Candidate brief",
    terminalInput: "Terminal input",
    topologyLabel: "Aggregated multi-WAN network topology",
    githubActivity: "GitHub activity",
    recentEvents: "Recent public events",
    githubFallback: "Code and infrastructure notes on GitHub",
    visit: "Visit",
    bookCall: "Book a call",
    bookCallBody:
      "Skip the back-and-forth — pick a slot that suits you and it lands in both our calendars.",
    findTime: "Find a time",
    copyEmail: "Copy email address",
    emailCopied: "Email address copied",
    caseStudyEyebrow: "CASE STUDY",
    certifiedBy: "AWS Certified",
    educatedAt: "BSc, KNUST",
    currentlyAt: "Currently",
    yearsExperience: "Experience",
    topologyCaption:
      "A design I built and maintain: eight satellite terminals bonded into one uplink, feeding fibre across a 1,200-acre site. Drop a terminal and watch capacity rebalance instead of cutting over.",
    securityLabel: "How I approach security",
    educationLabel: "Education",
    certificationsLabel: "Certifications",
    securityStatement:
      "I treat security as part of running the network, not a separate project. At Bright Industrial Park that meant segmenting the network with VLANs and firewall policy, putting administrator access to internal systems behind a VPN, and keeping the HR system that holds 8,000 people's personal data off the public internet entirely. It also meant the unglamorous parts: weekly bare-metal backups, event-triggered database backups, identity and password policy, and MFA on cloud accounts. I'm now building on that with Google's Foundations of Cybersecurity course and an MSc at Memorial University focused on network security and intrusion detection.",
    aboutMe: "In short",
    metaDescription:
      "IT infrastructure and systems specialist in St. John's, NL: 5+ years running networks, servers and IT support. MSc Computer Science student at Memorial.",
    present: "Present",
    eyebrowExperience: "01 — Experience",
    eyebrowWork: "02 — Case studies",
    eyebrowCapabilities: "03 — Capabilities",
    eyebrowCredentials: "04 — Credentials",
    eyebrowContact: "05 — Contact",
    verified: "Verified",
    proofAws: "AWS Certified Cloud Practitioner",
    proofAwsSub: "Valid to July 2027",
    proofDegree: "BSc Information Technology",
    proofDegreeSub: "KNUST · Second Class Upper",
    proofMsc: "MSc Computer Science",
    proofMscSub: "Memorial University · 2026–2028",
    basedIn: (timezone) =>
      `Based in St. John's, NL (${timezone}) · MSc student at Memorial University. Comfortable working across Canadian and North American timezones.`,
    noResults: (query) => `No results for “${query}”`,
    failedOver: (seconds, live) =>
      `Rebalanced across ${live} uplinks · ${seconds}s`,
    failedOverAnnounce: (seconds, live) =>
      `Terminal offline. Traffic rebalanced across ${live} remaining uplinks in ${seconds} seconds.`,
    wansHealthy: (live) => `Live · ${live} of 8 uplinks healthy`,
    linkDown: "Link down",
    terminalDown: "Terminal down",
    allUplinksDown: "All uplinks down · site offline",
    allUplinksDownAnnounce:
      "All eight terminals are offline. The site has no upstream connectivity.",
    switchToEnglish: "Switch to English",
    switchToFrench: "Passer en français",
    terminalIntro: (location) =>
      `${location} · MSc student at Memorial University`,
    themeSet: (theme) => `Theme set to ${theme}.`,
    themeDark: "dark",
    themeLight: "light",
    switchToLightTheme: "Switch to light theme",
    switchToDarkTheme: "Switch to dark theme",
    toggleTheme: "Toggle theme",
    topologyDescFailed:
      "One satellite terminal is offline. Traffic has rebalanced across the remaining uplinks with no interruption downstream. The MikroTik router continues to feed the core switch, and fibre carries service across the site to factories, CCTV, point of sale and off-site links.",
    topologyDescHealthy:
      "Eight satellite terminals aggregate into a MikroTik router across eight WAN ports. The router feeds a Huawei core switch, then a GPON distribution layer with one-to-four splitters, which carries fibre across the site to factories, CCTV, point of sale and off-site links.",
    simulateFailure: "Drop a terminal",
    restoreLink: "Restore terminal",
    uplinkCount: (n) => `${n} × WAN`,
    somethingWentWrong: "Something went wrong.",
    sendEmail: "Send an email",
    viewCv: "View CV",
    cvActions: "CV options",
    openInNewTab: "Open in a new tab",
    downloadPdf: "Download PDF",
    cvDialogTitle: "Curriculum vitae",
    cvDialogBody: "Read it here, or take a copy with you.",
    viewInBrowser: "View here",
    viewInBrowserHint: "Opens in this window",
    viewInBrowserHintMobile: "Opens the PDF in a new tab",
    downloadPdfHint: (size) => `PDF · ${size}`,
    downloadStarted: "Download started",
    cvViewerTitle: "CV",
    openInNewTabShort: "New tab",
    pdfFallback:
      "If the CV is not visible, your browser may be set to download PDFs rather than display them.",
    pdfNotShowing: "Not showing?",
    protectedBy: "Protected by Cloudflare Turnstile",
    verifying: "Verifying you're human…",
    loadingPdf: "Loading CV…",
    shortcuts: {
      openPalette: "Open command palette",
      showHelp: "Show this help",
      goExperience: "Go to experience",
      goCapabilities: "Go to capabilities",
      goCredentials: "Go to credentials",
      goContact: "Go to contact",
      goBlog: "Go to blog",
      goTop: "Go to top",
      toggleDark: "Toggle dark mode",
      downloadCv: "Download CV",
      closeOverlay: "Close any overlay",
    },
    terminal: {
      help: "List available commands",
      whoami: "Who I am, briefly",
      experience: "Employment history",
      skills: "Technical capabilities",
      certs: "Education and certifications",
      contact: "How to reach me",
      cv: "Download my CV",
      theme: "Toggle light and dark",
      clear: "Clear the screen",
      hint: "Type `help` for available commands.",
      notFound: (cmd) => `command not found: ${cmd}. Try \`help\`.`,
    },
  },
  contact: {
    name: "Name",
    email: "Email",
    company: "Company or role",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    companyPlaceholder: "What's this about?",
    messagePlaceholder: "A few sentences about the role or the problem.",
    send: "Send message",
    sending: "Sending",
    sent: "Message sent",
    reply: "I'll reply within a day or two.",
    phone: "Phone",
    availability: "Availability",
  },
};

const fr: Dictionary = {
  localeName: "Français",
  nav: {
    experience: "Expérience",
    work: "Études de cas",
    capabilities: "Compétences",
    credentials: "Diplômes",
    contact: "Contact",
  },
  hero: {
    role: "Spécialiste en infrastructure et systèmes informatiques",
    headline:
      "Je maintiens en service les systèmes dont dépendent les utilisateurs — des espaces infonuagiques à une dorsale fibre sur 1 200 acres.",
    summary:
      "Spécialiste en infrastructure et systèmes informatiques et étudiant à la maîtrise en informatique à l'Université Memorial avec cinq ans d'expérience. Basé à St. John's, T.-N.-L. Conseil IT à distance chez Sabaoth (matériel, réseaux, pare-feu, Microsoft 365/Google Workspace) ; conception antérieure de la dorsale fibre et de la liaison multi-WAN satellite sur un parc de 1 200 acres au Ghana.",
    availability: "Disponible maintenant · temps partiel en session, temps plein pendant les pauses",
    status: "Disponible maintenant · St. John's, T.-N.-L.",
    downloadCv: "Télécharger le CV",
    getInTouch: "Me contacter",
    location: "St. John's, T.-N.-L., Canada",
    topologyMode: "Multi-WAN agrégé",
    currentlyLabel: "En poste",
    currently: "Consultant IT chez Sabaoth · Étudiant à la maîtrise à l'Université Memorial",
    stackLabel: "Stack",
  },
  facts: {
    experience: "Expérience",
    currentRole: "Poste actuel",
    available: "Disponible",
    based: "Basé à",
  },
  sections: {
    experienceTitle: "Où j'ai fait mes preuves",
    experienceLede:
      "Des postes en conseil informatique, infrastructure d'entreprise, secteur bancaire, immobilier et services publics.",
    workTitle: "Comment le travail s'est réellement déroulé",
    workLede:
      "Des analyses détaillées de problèmes qui méritent d'être expliqués, plutôt que des captures d'écran qui vieillissent mal.",
    capabilitiesTitle: "Ce que j'utilise vraiment",
    capabilitiesLede:
      "Regroupé par usage, approximativement selon l'importance de chaque domaine dans mon poste actuel.",
    credentialsTitle: "Formation et certifications",
    credentialsLede:
      "Du plus récent au plus ancien. Ouvrez un certificat pour voir le document, vérifiez-le auprès de l'émetteur, ou demandez-moi une copie de ce qui n'est pas affiché.",
    referencesEyebrow: "Références",
    referencesTitle: "Ce que disent mes collègues et responsables",
    referencesLede: "Des personnes qui m'ont encadré ou avec qui j'ai travaillé, dans leurs propres mots.",
    contactTitle: "Parlez-moi de votre projet",
    contactLede:
      "Disponible pour des postes en conseil informatique, systèmes et réseaux à St. John's et à distance à travers le Canada.",
  },
  common: {
    current: "Actuel",
    upcoming: "À venir",
    draft: "Brouillon",
    verify: "Vérifier",
    viewCertificate: "Voir le certificat",
    openFullSize: "Ouvrir en taille réelle",
    requestCopy: "Demander une copie",
    requestCopySubject: (title) => `Copie du certificat : ${title}`,
    certificateAlt: (title, issuer) => `Certificat ${title} délivré par ${issuer}`,
    validTo: "Valide jusqu'en",
    expired: "Expiré",
    stack: "Technologies",
    minRead: "min de lecture",
    allCaseStudies: "Toutes les études de cas",
    onThisPage: "Sur cette page",
    viewSource: "Voir le code source sur GitHub",
    summary: "Résumé",
  },
  ui: {
    skipToContent: "Aller au contenu",
    search: "Rechercher",
    openPalette: "Ouvrir la palette de commandes",
    commandPalette: "Palette de commandes",
    searchPlaceholder: "Rechercher expérience, compétences, études de cas…",
    close: "Fermer",
    keyboardShortcuts: "Raccourcis clavier",
    sections: "Sections",
    mainNav: "Navigation principale",
    mobileNav: "Menu mobile",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    footerNav: "Pied de page",
    portfolioFocus: "Vues du portfolio par métier",
    focusPrompt: "Voir pour un poste cible",
    focusHint: "Les éléments les plus pertinents passent en premier. Rien n'est masqué.",
    focusOverview: "Vue d'ensemble",
    focusMatch: "Meilleure correspondance",
    candidateBrief: "Fiche candidat",
    terminalInput: "Saisie du terminal",
    topologyLabel: "Topologie réseau multi-WAN agrégée",
    githubActivity: "Activité GitHub",
    recentEvents: "Activité publique récente",
    githubFallback: "Code et notes d'infrastructure sur GitHub",
    visit: "Consulter",
    bookCall: "Réserver un appel",
    bookCallBody:
      "Évitons les allers-retours — choisissez un créneau qui vous convient et il apparaîtra dans nos deux agendas.",
    findTime: "Trouver un créneau",
    copyEmail: "Copier l'adresse courriel",
    emailCopied: "Adresse courriel copiée",
    caseStudyEyebrow: "ÉTUDE DE CAS",
    certifiedBy: "Certifié AWS",
    educatedAt: "Licence, KNUST",
    currentlyAt: "Actuellement",
    yearsExperience: "Expérience",
    topologyCaption:
      "Une architecture que j'ai conçue et que je maintiens : huit terminaux satellite agrégés en une seule liaison, alimentant la fibre sur un site de 1 200 acres. Coupez un terminal et observez la capacité se rééquilibrer au lieu de basculer.",
    securityLabel: "Ma façon d'aborder la sécurité",
    educationLabel: "Formation",
    certificationsLabel: "Certifications",
    securityStatement:
      "Pour moi, la sécurité fait partie de l'exploitation du réseau, pas d'un projet à part. Au parc industriel Bright, cela voulait dire segmenter le réseau par VLAN et règles de pare-feu, placer l'accès administrateur aux systèmes internes derrière un VPN, et garder le système RH qui contient les données personnelles de 8 000 personnes entièrement hors de l'internet public. Cela voulait aussi dire le travail moins visible : sauvegardes complètes hebdomadaires, sauvegardes de bases de données déclenchées par événement, politiques d'identité et de mots de passe, et MFA sur les comptes infonuagiques. Je prolonge aujourd'hui ce travail avec le cours Foundations of Cybersecurity de Google et une maîtrise à l'Université Memorial axée sur la sécurité réseau et la détection d'intrusion.",
    aboutMe: "En bref",
    metaDescription:
      "Spécialiste en infrastructure et systèmes informatiques à St. John's (T.-N.-L.) : 5 ans de réseaux, serveurs et support. Maîtrise en informatique à Memorial.",
    present: "aujourd'hui",
    eyebrowExperience: "01 — Expérience",
    eyebrowWork: "02 — Études de cas",
    eyebrowCapabilities: "03 — Compétences",
    eyebrowCredentials: "04 — Diplômes",
    eyebrowContact: "05 — Contact",
    verified: "Vérifié",
    proofAws: "AWS Certified Cloud Practitioner",
    proofAwsSub: "Valide jusqu'en juillet 2027",
    proofDegree: "Licence en technologies de l'information",
    proofDegreeSub: "KNUST · Mention bien",
    proofMsc: "Maîtrise en informatique",
    proofMscSub: "Université Memorial · 2026–2028",
    basedIn: (timezone) =>
      `Basé à St. John's, T.-N.-L. (${timezone}) · étudiant à la maîtrise à l'Université Memorial. À l'aise sur les fuseaux horaires canadiens et nord-américains.`,
    noResults: (query) => `Aucun résultat pour « ${query} »`,
    failedOver: (seconds, live) =>
      `Rééquilibrage sur ${live} liaisons · ${seconds} s`,
    failedOverAnnounce: (seconds, live) =>
      `Terminal hors service. Trafic rééquilibré sur ${live} liaisons restantes en ${seconds} secondes.`,
    wansHealthy: (live) => `En direct · ${live} liaisons sur 8 sont saines`,
    linkDown: "Lien hors service",
    terminalDown: "Terminal hors service",
    allUplinksDown: "Toutes les liaisons hors service · site déconnecté",
    allUplinksDownAnnounce:
      "Les huit terminaux sont hors service. Le site n'a plus de connectivité amont.",
    switchToEnglish: "Switch to English",
    switchToFrench: "Passer en français",
    terminalIntro: (location) =>
      `${location} · étudiant à la maîtrise à l'Université Memorial`,
    themeSet: (theme) => `Thème réglé sur ${theme}.`,
    themeDark: "sombre",
    themeLight: "clair",
    switchToLightTheme: "Passer au thème clair",
    switchToDarkTheme: "Passer au thème sombre",
    toggleTheme: "Changer de thème",
    topologyDescFailed:
      "Un terminal satellite est hors service. Le trafic s'est rééquilibré sur les liaisons restantes sans interruption en aval. Le routeur MikroTik continue d'alimenter le commutateur central, et la fibre dessert le site : usines, vidéosurveillance, points de vente et liaisons distantes.",
    topologyDescHealthy:
      "Huit terminaux satellite sont agrégés sur un routeur MikroTik via huit ports WAN. Le routeur alimente un commutateur central Huawei, puis une couche de distribution GPON avec des répartiteurs un vers quatre, qui achemine la fibre sur le site : usines, vidéosurveillance, points de vente et liaisons distantes.",
    simulateFailure: "Couper un terminal",
    restoreLink: "Rétablir le terminal",
    uplinkCount: (n) => `${n} × WAN`,
    somethingWentWrong: "Une erreur est survenue.",
    sendEmail: "Envoyer un courriel",
    viewCv: "Consulter le CV",
    cvActions: "Options du CV",
    openInNewTab: "Ouvrir dans un nouvel onglet",
    downloadPdf: "Télécharger le PDF",
    cvDialogTitle: "Curriculum vitæ",
    cvDialogBody: "Consultez-le ici, ou emportez-en une copie.",
    viewInBrowser: "Consulter ici",
    viewInBrowserHint: "S'ouvre dans cette fenêtre",
    viewInBrowserHintMobile: "Ouvre le PDF dans un nouvel onglet",
    downloadPdfHint: (size) => `PDF · ${size}`,
    downloadStarted: "Téléchargement lancé",
    cvViewerTitle: "CV",
    openInNewTabShort: "Nouvel onglet",
    pdfFallback:
      "Si le CV ne s'affiche pas, votre navigateur est peut-être configuré pour télécharger les PDF au lieu de les afficher.",
    pdfNotShowing: "Rien ne s'affiche ?",
    protectedBy: "Protégé par Cloudflare Turnstile",
    verifying: "Vérification en cours…",
    loadingPdf: "Chargement du CV…",
    shortcuts: {
      openPalette: "Ouvrir la palette de commandes",
      showHelp: "Afficher cette aide",
      goExperience: "Aller à l'expérience",
      goCapabilities: "Aller aux compétences",
      goCredentials: "Aller aux diplômes",
      goContact: "Aller au contact",
      goBlog: "Aller au blog",
      goTop: "Revenir en haut",
      toggleDark: "Basculer le mode sombre",
      downloadCv: "Télécharger le CV",
      closeOverlay: "Fermer toute fenêtre",
    },
    terminal: {
      help: "Lister les commandes disponibles",
      whoami: "Qui je suis, en bref",
      experience: "Parcours professionnel",
      skills: "Compétences techniques",
      certs: "Formation et certifications",
      contact: "Comment me joindre",
      cv: "Télécharger mon CV",
      theme: "Basculer clair et sombre",
      clear: "Effacer l'écran",
      hint: "Tapez `help` pour voir les commandes disponibles.",
      notFound: (cmd) => `commande introuvable : ${cmd}. Essayez \`help\`.`,
    },
  },
  contact: {
    name: "Nom",
    email: "Courriel",
    company: "Entreprise ou poste",
    message: "Message",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "vous@entreprise.com",
    companyPlaceholder: "De quoi s'agit-il ?",
    messagePlaceholder: "Quelques phrases sur le poste ou le problème.",
    send: "Envoyer le message",
    sending: "Envoi en cours",
    sent: "Message envoyé",
    reply: "Je réponds sous un ou deux jours.",
    phone: "Téléphone",
    availability: "Disponibilité",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fr };

/** CV path for the active locale. Both live in /public. */
export function resumeUrlFor(locale: Locale) {
  return locale === "fr"
    ? "/gershon-otinkorang-cv-fr.pdf"
    : "/gershon-otinkorang-cv.pdf";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
