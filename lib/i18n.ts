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

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type Dictionary = {
  localeName: string;
  nav: { experience: string; work: string; capabilities: string; credentials: string; contact: string };
  hero: {
    role: string;
    headline: string;
    summary: string;
    availability: string;
    downloadCv: string;
    getInTouch: string;
    movingTo: (city: string, when: string) => string;
    topologyLabel: string;
    topologyMode: string;
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
    contactTitle: string;
    contactLede: (city: string, when: string) => string;
  };
  common: {
    current: string;
    upcoming: string;
    draft: string;
    verify: string;
    validTo: string;
    expired: string;
    stack: string;
    minRead: string;
    allCaseStudies: string;
    summary: string;
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
    role: "IT Systems & Network Administrator",
    headline:
      "I keep networks, servers and ERP systems running for organisations that cannot afford downtime.",
    summary:
      "Five years administering enterprise network infrastructure, ERP platforms and IT operations across private and public sector organisations in Ghana. MikroTik RouterOS, dual-Starlink failover, Frappe/ERPNext and Odoo, across multi-site environments.",
    availability: "Available in Canada from August 2026",
    downloadCv: "Download CV",
    getInTouch: "Get in touch",
    movingTo: (city, when) => `Accra, Ghana — moving to ${city}, ${when}`,
    topologyLabel: "Production topology · Greenhouse",
    topologyMode: "Dual-WAN failover",
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
      "Six roles across engineering, real estate, advertising and Ghana's national power utility.",
    workTitle: "How the work actually went",
    workLede:
      "Longer write-ups of problems worth explaining, rather than screenshots that age badly.",
    capabilitiesTitle: "What I actually reach for",
    capabilitiesLede:
      "Grouped by use, in rough order of how central each is to the current role.",
    credentialsTitle: "Education and certification",
    credentialsLede:
      "In order, from the first diploma to the MSc that starts in 2026. Every item links to the issuing body.",
    contactTitle: "Tell me what you're building",
    contactLede: (city, when) =>
      `Available for IT and network administration roles in ${city} from ${when}.`,
  },
  common: {
    current: "Current",
    upcoming: "Upcoming",
    draft: "Draft",
    verify: "Verify",
    validTo: "Valid to",
    expired: "Expired",
    stack: "Stack",
    minRead: "min read",
    allCaseStudies: "All case studies",
    summary: "Summary",
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
    role: "Administrateur systèmes et réseaux",
    headline:
      "Je maintiens en service les réseaux, serveurs et systèmes ERP d'organisations qui ne peuvent pas se permettre d'interruption.",
    summary:
      "Cinq ans d'administration d'infrastructures réseau, de plateformes ERP et d'opérations informatiques pour des organisations privées et publiques au Ghana. MikroTik RouterOS, bascule automatique double-WAN avec Starlink, Frappe/ERPNext et Odoo, sur des environnements multi-sites.",
    availability: "Disponible au Canada à partir d'août 2026",
    downloadCv: "Télécharger le CV",
    getInTouch: "Me contacter",
    movingTo: (city, when) => `Accra, Ghana — déménagement à ${city}, ${when}`,
    topologyLabel: "Topologie en production · Greenhouse",
    topologyMode: "Bascule double-WAN",
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
      "Six postes en ingénierie, immobilier, publicité et à la compagnie nationale d'électricité du Ghana.",
    workTitle: "Comment le travail s'est réellement déroulé",
    workLede:
      "Des analyses détaillées de problèmes qui méritent d'être expliqués, plutôt que des captures d'écran qui vieillissent mal.",
    capabilitiesTitle: "Ce que j'utilise vraiment",
    capabilitiesLede:
      "Regroupé par usage, approximativement selon l'importance de chaque domaine dans mon poste actuel.",
    credentialsTitle: "Formation et certifications",
    credentialsLede:
      "Dans l'ordre, du premier diplôme jusqu'à la maîtrise qui débute en 2026. Chaque élément renvoie à l'organisme émetteur.",
    contactTitle: "Parlez-moi de votre projet",
    contactLede: (city, when) =>
      `Disponible pour des postes en administration systèmes et réseaux à ${city} à partir d'${when}.`,
  },
  common: {
    current: "Actuel",
    upcoming: "À venir",
    draft: "Brouillon",
    verify: "Vérifier",
    validTo: "Valide jusqu'en",
    expired: "Expiré",
    stack: "Technologies",
    minRead: "min de lecture",
    allCaseStudies: "Toutes les études de cas",
    summary: "Résumé",
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

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
