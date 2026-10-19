/** Education and certifications. Re-exported from lib/site.ts. */

/* -------------------------------------------------------------------------- */
/*  Education & certifications                                                */
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
  upcoming?: boolean;
  /** Workplace safety rather than professional skill: listed compactly, last. */
  safety?: boolean;
  /**
   * A public image of the certificate itself, shown in a viewer. Only for
   * certificates that are already verifiable online and carry nothing private.
   * Degrees and anything with ID numbers, photos or a date of birth stay off
   * the site: those get a "Request a copy" link instead.
   */
  preview?: { src: string; width: number; height: number };
};

export const credentials: Credential[] = [
  {
    title: "MSc Computer Science",
    issuer: "Memorial University of Newfoundland",
    date: "2026-09-01",
    detail: "Course-based · focus on network security and intrusion detection (2026–2028)",
    kind: "degree",
  },
  {
    title: "BSc Information Technology",
    issuer: "Kwame Nkrumah University of Science and Technology",
    date: "2024-11-01",
    detail: "Second Class Honours, Upper Division",
    kind: "degree",
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google (Coursera)",
    date: "2026-08-02",
    detail: "Part of the Google Cybersecurity Professional Certificate — security controls, SIEM, network and cyber-attack analysis",
    credentialId: "KVMKSBBS97UR",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/KVMKSBBS97UR",
    preview: { src: "/certificates/google-foundations-of-cybersecurity.webp", width: 1400, height: 1082 },
    kind: "certification",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024-07-14",
    expires: "2027-07-14",
    credentialId: "22299d8c82674d9fa309d05ac2c872a6",
    verifyUrl: "https://aws.amazon.com/verification",
    preview: { src: "/certificates/aws-cloud-practitioner.webp", width: 1400, height: 1082 },
    kind: "certification",
  },
  {
    title: "ALX Cloud Computing",
    issuer: "ALX Africa",
    date: "2025-07-28",
    detail: "Two-month ALX Cloud Practitioner course, powered by AWS Academy, with professional development skills for the digital age · completed June 2025",
    credentialId: "HrRxBsfZLz",
    verifyUrl: "https://savanna.alxafrica.com/certificates/HrRxBsfZLz",
    preview: { src: "/certificates/alx-cloud-computing.webp", width: 1280, height: 720 },
    kind: "certification",
  },
  {
    title: "ALX Professional Foundations",
    issuer: "ALX Africa",
    date: "2025-04-15",
    detail: "Professional Development Skills for the Digital Age",
    credentialId: "59XFYHsMer",
    verifyUrl: "https://savanna.alxafrica.com/certificates/59XFYHsMer",
    preview: { src: "/certificates/alx-professional-foundations.webp", width: 1280, height: 720 },
    kind: "certification",
  },
  {
    title: "Intermediate First Aid CPR C/AED (Standard)",
    issuer: "St. John Ambulance",
    date: "2026-09-27",
    expires: "2029-09-27",
    credentialId: "1561996292",
    detail: "Class COUR-1164-NL-260926-7265 · St. John Council for Newfoundland & Labrador · CPR Level C & AED",
    preview: { src: "/certificates/st-john-first-aid.webp", width: 1400, height: 847 },
    kind: "certification",
    safety: true,
  },
  {
    title: "Sexual Violence Awareness and Prevention",
    issuer: "Memorial University of Newfoundland",
    date: "2026-09-11",
    detail: "Sexual Harassment Office · campus and workplace safety certification",
    kind: "certification",
    safety: true,
  },
  {
    title: "Fire Safety, Prevention, Evacuation and Basic Firefighting",
    issuer: "Ghana National Fire Service",
    date: "2025-09-26",
    detail: "Amasaman Fire Station · workplace fire prevention, emergency evacuation, fire warden duties and basic firefighting for Bright Industrial Park",
    kind: "certification",
    safety: true,
  },
  {
    title: "HND Information & Communication Technology",
    issuer: "Takoradi Technical University (NABPTEX)",
    date: "2020-10-13",
    detail: "Second Class, Upper Division",
    kind: "degree",
  },
  {
    title: "Google Digital Skills",
    issuer: "Google",
    date: "2020-10-04",
    detail: "The Fundamentals of Digital Marketing · Google Digital Skills for Africa, endorsed by IAB Europe and The Open University",
    credentialId: "58H 54V V9H",
    // Google retired the Digital Garage certificate validator — every
    // learndigital.withgoogle.com link now redirects to grow.google — so
    // "verify" points to the LinkedIn certifications section instead.
    verifyUrl: "https://www.linkedin.com/in/gaotinkorang/details/certifications/",
    preview: { src: "/certificates/google-digital-marketing.webp", width: 1400, height: 991 },
    kind: "certification",
  },
  {
    title: "Certificate II, Electrical Engineering Technology",
    issuer: "Twumasi Boateng Technical Institute",
    date: "2016-06-01",
    detail: "Ghana Education Service / NABPTEX · technical and core subject examinations",
    kind: "degree",
  },
];
