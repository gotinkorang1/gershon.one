/** Identity, contact details and the headline facts strip. Re-exported from lib/site.ts. */

export const site = {
  name: "Gershon Adjei Otinkorang",
  shortName: "Gershon Otinkorang",
  initials: "GO",
  role: "IT Infrastructure & Systems Specialist",
  location: "St. John's, NL, Canada",
  relocation: {
    note: "Relocated August 2026 · MSc student at Memorial University",
  },
  timezone: "Newfoundland Time",
  email: "contact@gershon.one",
  // Shown alongside the domain address wherever contact details are listed.
  emailAlt: "gotinkorang@gmail.com",
  phone: "+1 (709) 219-5364",
  phoneHref: "+17092195364",
  // Must match the host Vercel actually serves. The apex redirects to www, so
  // www is canonical — every canonical tag, og:url, sitemap entry and the
  // robots.txt Host directive derive from this one value.
  url: "https://www.gershon.one",
  headline:
    "I keep the systems people depend on working — from client infrastructure and cloud workspaces to a fibre backbone across 1,200 acres.",
  summary:
    "IT infrastructure and systems specialist and Memorial University Computer Science MSc student with five years keeping users, devices and enterprise infrastructure running. Based in St. John's, NL. Providing remote IT consulting at Sabaoth across hardware, networks, firewalls and Microsoft 365/Google Workspace; previously engineered the multi-WAN satellite link and GPON fibre backbone across a 1,200-acre industrial park in Ghana.",
  // Search-snippet length (~155 chars). `summary` above is the on-page bio and
  // runs far past what Google shows, so the meta description is authored
  // separately — leading with the strongest hook before the truncation point.
  metaDescription:
    "IT infrastructure and systems specialist in St. John's, NL: 5+ years running networks, servers and IT support. MSc Computer Science student at Memorial.",
  availability: "Available now · part-time in term, full-time in breaks",
  /**
   * When the page content last meaningfully changed — bump by hand when you
   * edit experience, skills or credentials. Deliberately not derived from the
   * build, which would claim a modification on every redeploy.
   *
   * Must be a full ISO 8601 datetime with an offset; Google rejects a
   * date-only value for schema.org dateModified.
   */
  contentUpdated: "2026-10-14T00:00:00-02:30",
  resumeUrl: "/gershon-otinkorang-cv.pdf",
  contactCard: {
    url: "/gershon-otinkorang.vcf",
    fileName: "gershon-otinkorang.vcf",
    labels: {
      en: {
        save: "Save contact",
        description: "Add my details to your contacts",
      },
      fr: {
        save: "Enregistrer le contact",
        description: "Ajouter mes coordonnées à vos contacts",
      },
    },
  },
  briefActions: {
    print: "Print / save PDF",
    share: "Share brief",
    linkCopied: "Link copied",
    copyDetails: "Copy all details",
    detailsCopied: "Details copied",
    copyFailed: "Could not copy",
    shareTitle: "Gershon Otinkorang — candidate brief",
    shareText:
      "Availability, work authorisation, experience and core skills for Gershon Otinkorang.",
    detailsLabels: {
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      portfolio: "Portfolio",
      compensation: "Compensation",
      summary: "Summary",
    },
  },
  socials: {
    github: "https://github.com/gotinkorang1",
    linkedin: "https://www.linkedin.com/in/gaotinkorang",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Facts — the scannable strip a recruiter reads first                       */
/* -------------------------------------------------------------------------- */

export const facts = [
  // `countable` marks values that are quantities. Dates and place names are
  // identifiers — animating them produces nonsense like "Aug 1256".
  { label: "Experience", value: "5+ years", countable: true },
  { label: "Site supported", value: "1,200 acres", countable: false },
  // Availability and location live in the hero's status line; these two are
  // scale, from the resume, that the hero doesn't already say.
  { label: "Sites rolled out", value: "47", countable: true },
  { label: "Team led", value: "4 people", countable: true },
] as const;
