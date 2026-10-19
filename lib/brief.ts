/**
 * Content for the recruiter brief at /brief.
 *
 * These are the facts a Canadian screener asks in the first call. Keep the
 * work-authorisation, notice and compensation values current — re-check the
 * permit hour limits and the CAD range against Job Bank before each round of
 * applications so nothing here goes stale.
 */

export const brief = {
  // Page chrome. French in lib/content.fr.ts (briefFr.page).
  page: {
    metaTitle: "Candidate brief",
    metaDescription: (name: string, role: string) =>
      `Availability, work authorisation and core skills for ${name}, ${role}.`,
    back: "Full site",
    eyebrow: "Candidate brief",
    downloadCv: "Download CV",
    eligibility: "Eligibility and availability",
    compensation: "Compensation expectation",
    pitch: "In one paragraph",
    strengths: "Core skills, ranked",
    targetRoles: "Roles I'm a match for",
    current: "Current role",
    credentials: "Education and certification",
    education: "Education",
    certifications: "Certifications",
    contact: "Contact",
  },

  // The three facts that decide whether you get a call at all.
  eligibility: [
    {
      label: "Available from",
      value: "Now",
      note: "Part-time in term, full-time in scheduled breaks · MSc student at Memorial University (2026–2028)",
    },
    {
      label: "Work authorisation",
      // Canadian study permit approved (S-1, valid to Dec 2028).
      value: "Canadian study permit (valid to 2028)",
      note: "Off-campus work up to 24 hrs/week in term, full-time in scheduled breaks · PGWP-eligible upon graduation",
    },
    {
      label: "Notice period",
      value: "Immediate / Flexible",
      note: "Available for part-time, contract, or scheduled work in Canada",
    },
    {
      label: "Location",
      value: "St. John's, NL",
      note: "Open to on-site/hybrid in St. John's, or remote across Canada",
    },
  ],

  // Target range in CAD. Canadian postings usually expect a stated figure;
  // the note keeps it open to negotiation on scope and level.
  compensation: {
    value: "CAD 45,000–60,000",
    note: "Open to discussing based on scope and level",
  },

  // What you'd want a screener to read out to a hiring manager.
  pitch:
    "IT infrastructure and systems specialist and Memorial University Computer Science MSc student with five years' experience running network, server, and end-user infrastructure end to end. Currently providing remote IT consulting at Sabaoth across hardware, switching, firewalls, and Microsoft 365/Google Workspace in Canada. Previously led IT support for a 1,200-acre industrial park in Ghana, supervising a four-member team and delivering CCTV and Starlink across 47 branches and factories.",

  // Ranked for a screener matching against a job description.
  strengths: [
    { skill: "IT Consulting & Remote Support", years: "5 yrs", level: "Daily, production" },
    { skill: "Microsoft 365 & Google Workspace", years: "3 yrs", level: "Daily, production" },
    { skill: "MikroTik RouterOS / Networking", years: "3 yrs", level: "Daily, production" },
    { skill: "ERPNext / Odoo administration", years: "3 yrs", level: "Daily, production" },
    { skill: "Network troubleshooting & firewalls", years: "5 yrs", level: "Daily" },
    { skill: "Server & systems administration", years: "5 yrs", level: "Daily" },
    { skill: "Starlink / satellite networking", years: "2 yrs", level: "Deployed and maintained" },
    { skill: "AWS", years: "2 yrs", level: "Certified Cloud Practitioner" },
    { skill: "CCTV / IP camera systems", years: "3 yrs", level: "Designed and deployed" },
    { skill: "Web development (PHP, MySQL, JS)", years: "5 yrs", level: "Working" },
  ],

  // Titles worth matching against, in the screener's vocabulary.
  targetRoles: [
    "Network Administrator",
    "IT Systems Administrator",
    "Network Support Specialist",
    "IT Support Analyst",
    "Systems Analyst",
    "Infrastructure Technician",
    "Network Security Analyst",
  ],
} as const;
