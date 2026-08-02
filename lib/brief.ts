/**
 * Content for the recruiter brief at /brief.
 *
 * These are the facts a Canadian screener asks in the first call. Keep the
 * work-authorisation, notice and compensation values current — re-check the
 * permit hour limits and the CAD range against Job Bank before each round of
 * applications so nothing here goes stale.
 */

export const brief = {
  // The three facts that decide whether you get a call at all.
  eligibility: [
    {
      label: "Available from",
      value: "August 2026",
      note: "Arriving in St. John's August 2026 for an MSc at Memorial University",
    },
    {
      label: "Work authorisation",
      // Canadian study permit approved (S-1, valid to Dec 2028). Verify the exact
      // hour limits against your permit's printed conditions before sharing.
      value: "Canadian study permit (from Aug 2026)",
      note: "Off-campus work up to 24 hrs/week in term, full-time in scheduled breaks · PGWP-eligible on completion",
    },
    {
      label: "Notice period",
      value: "One month",
      note: "From current role at Greenhouse · available in Canada from August 2026",
    },
    {
      label: "Location",
      value: "St. John's, NL",
      note: "Open to hybrid and on-site; remote across Atlantic Canada",
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
    "Five years running network and server infrastructure end to end — MikroTik RouterOS, dual-WAN failover with Starlink, ERPNext and Odoo administration, and the IT support function around all of it. Currently sole administrator for a multi-site network in Ghana. Arriving in St. John's in August 2026 for an MSc in Computer Science focused on network security and intrusion detection.",

  // Ranked for a screener matching against a job description.
  strengths: [
    { skill: "MikroTik RouterOS / CCR2004", years: "3 yrs", level: "Daily, production" },
    { skill: "ERPNext / Odoo administration", years: "3 yrs", level: "Daily, production" },
    { skill: "Network troubleshooting & diagnostics", years: "5 yrs", level: "Daily" },
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
  ],
} as const;
