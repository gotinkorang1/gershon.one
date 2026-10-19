/** Copy for the interactive features: lab, reading, PWA, recruiter pack. Re-exported from lib/site.ts. */

/* -------------------------------------------------------------------------- */
/*  Interactive portfolio features                                             */
/* -------------------------------------------------------------------------- */

export const portfolioFeatures = {
  navigation: { projects: "Projects", lab: "Lab", blog: "Blog", now: "Now" },
  lab: {
    metaTitle: "Interactive IT troubleshooting lab",
    eyebrow: "Interactive proof",
    title: "See how I diagnose, connect and improve systems.",
    lede:
      "Four working views of the portfolio: guided troubleshooting, evidence behind each skill, system architecture and a chronological activity record.",
    open: "Open Systems Lab",
    homeTitle: "Don’t just read the claims. Inspect the systems thinking.",
    homeLede:
      "Run a troubleshooting scenario, connect skills to evidence, inspect architectures and review current professional activity.",
    tabs: {
      troubleshoot: "Troubleshoot",
      evidence: "Evidence",
      architecture: "Architecture",
      activity: "Activity",
    },
    troubleshooting: {
      title: "Troubleshooting simulator",
      lede:
        "Choose the next diagnostic move. These simulations use the production patterns I work with: isolate first, change second, verify last.",
      principleTitle: "Diagnostic principle",
      principle:
        "Preserve evidence, reduce the fault domain, and make one justified change at a time.",
      progress: "Diagnostic progress",
      next: "Next check",
      restart: "Restart scenario",
      complete: "Incident resolved",
      scenarios: [
        {
          id: "slow-network",
          title: "The network is slow",
          symptom: "Users in one building report intermittent latency while the main internet link remains online.",
          environment: "MikroTik · Huawei switching · GPON fibre · multi-WAN",
          resolution:
            "The fault domain is narrowed from user impact to one fibre branch, physical health is measured, and the repaired path is verified continuously before closure.",
          proofHref: "/work/diagnosing-fibre-latency",
          proofLabel: "Read the fibre latency case study",
          checks: [
            {
              prompt: "What should be established first?",
              choices: [
                { label: "Restart every access point", feedback: "That changes several variables before the fault domain is known.", correct: false },
                { label: "Compare affected users, media and segments", feedback: "Correct. Scope identifies the layer that deserves measurement.", correct: true },
                { label: "Replace the internet router", feedback: "Replacement is not a diagnostic step and the upstream link is still online.", correct: false },
              ],
            },
            {
              prompt: "The issue is isolated to one GPON branch. What comes next?",
              choices: [
                { label: "Inspect errors, optical levels and link flaps", feedback: "Correct. These measurements distinguish congestion from a degraded physical path.", correct: true },
                { label: "Increase every bandwidth limit", feedback: "Bandwidth does not repair loss, poor optical power or interface errors.", correct: false },
                { label: "Change DNS providers", feedback: "DNS does not explain packet loss isolated to one fibre branch.", correct: false },
              ],
            },
          ],
        },
        {
          id: "erp-print",
          title: "ERPNext print output is broken",
          symptom: "An ID card looks correct in preview, but photographs disappear and dimensions drift in the PDF.",
          environment: "ERPNext · Frappe · Jinja · HTML/CSS · PDF",
          resolution:
            "Browser and PDF rendering are tested as separate environments. Asset URLs become absolute, physical units replace screen units, and the exported PDF is measured.",
          proofHref: "/work/erpnext-bilingual-id-cards",
          proofLabel: "Read the ERPNext ID card case study",
          checks: [
            {
              prompt: "What should be reproduced first?",
              choices: [
                { label: "The exact PDF with the same employee record", feedback: "Correct. Constant data isolates the renderer as the changing variable.", correct: true },
                { label: "A completely new print format", feedback: "Rewriting removes evidence before the current failure is understood.", correct: false },
                { label: "Only the working browser preview", feedback: "The failing output path is the generated PDF.", correct: false },
              ],
            },
            {
              prompt: "Why might the photo disappear only in the PDF?",
              choices: [
                { label: "The renderer cannot resolve a relative URL", feedback: "Correct. Frappe's abs_url filter gives the PDF process a complete path.", correct: true },
                { label: "The image needs a CSS filter", feedback: "Styling cannot load an asset the renderer cannot locate.", correct: false },
                { label: "The employee must be duplicated", feedback: "Duplicating data does not change URL resolution.", correct: false },
              ],
            },
          ],
        },
        {
          id: "user-sign-in",
          title: "A user cannot sign in",
          symptom: "One employee cannot access a workstation after a password change; other users are unaffected.",
          environment: "Windows endpoint · identity · LAN · business applications",
          resolution:
            "Account, endpoint and network state are tested independently. Access is restored without collecting credentials, then the cause and preventive action are documented.",
          proofHref: "/for/it-support",
          proofLabel: "View the IT support portfolio",
          checks: [
            {
              prompt: "What is the safest first action?",
              choices: [
                { label: "Ask the user to send their password", feedback: "Passwords should never be collected or shared during support.", correct: false },
                { label: "Confirm the error, account and scope", feedback: "Correct. This separates an account issue from a device or service outage.", correct: true },
                { label: "Reinstall Windows", feedback: "A destructive change is disproportionate before the failure is isolated.", correct: false },
              ],
            },
            {
              prompt: "The account works elsewhere. What should be checked here?",
              choices: [
                { label: "Connectivity, time, cached state and input", feedback: "Correct. Each can break authentication while the account remains healthy.", correct: true },
                { label: "The office printer queue", feedback: "The print service is outside the sign-in path.", correct: false },
                { label: "Disable account protections", feedback: "Removing safeguards is not an acceptable workaround.", correct: false },
              ],
            },
          ],
        },
      ],
    },
    evidence: {
      title: "Skills evidence map",
      lede: "Select a capability to trace it to production experience, case studies and role-focused views.",
      select: "Select a capability",
      experience: "Production experience",
      caseStudies: "Case studies",
      roles: "Role matches",
      credentials: "Credentials",
      none: "No dedicated case study yet; the experience record is the supporting evidence.",
      noResults: "No capability matches that search.",
    },
    architecture: {
      title: "Architecture explorer",
      lede: "Move through each system from source to outcome, then select a component to inspect its responsibility.",
      selected: "Selected component",
      systems: [
        {
          id: "industrial-network",
          name: "Industrial network",
          summary: "Resilient upstream connectivity feeding fibre distribution across a 1,200-acre site.",
          nodes: [
            { id: "wan", label: "8 satellite WANs", kind: "Ingress", metric: "8 uplinks", detail: "Independent terminals provide aggregate capacity and reduce reliance on one upstream path." },
            { id: "router", label: "MikroTik CCR2004", kind: "Control", metric: "Multi-WAN", detail: "Routing, health checks and traffic policy bring the uplinks together." },
            { id: "core", label: "Huawei S5735", kind: "Core", metric: "Distribution", detail: "The core separates and forwards services toward fibre distribution." },
            { id: "gpon", label: "GPON fibre", kind: "Access", metric: "1:4 split", detail: "Passive optical distribution carries connectivity over long campus distances." },
            { id: "services", label: "Factories and services", kind: "Outcome", metric: "1,200 acres", detail: "Factories, CCTV, point of sale and remote links consume the shared infrastructure." },
          ],
        },
        {
          id: "erp-identity",
          name: "ERP identity workflow",
          summary: "One employee record becomes a bilingual, physically printable identification card.",
          nodes: [
            { id: "record", label: "Employee record", kind: "Source", metric: "ERPNext", detail: "HR owns names, photographs, departments, roles and identifiers in one record." },
            { id: "template", label: "Jinja format", kind: "Transform", metric: "Frappe", detail: "The template retrieves fields, resolves asset URLs and repeats the printable layout." },
            { id: "layout", label: "Bilingual layout", kind: "Presentation", metric: "EN + 中文", detail: "A fixed grid keeps Chinese and English readable within physical card dimensions." },
            { id: "pdf", label: "A4 PDF", kind: "Output", metric: "2 cards", detail: "Physical units and page-break control produce two complete cards per sheet." },
            { id: "card", label: "Issued ID card", kind: "Outcome", metric: "Print-ready", detail: "Cards can be reprinted directly whenever the employee record changes." },
          ],
        },
        {
          id: "support-loop",
          name: "Support operations loop",
          summary: "A repeatable path from user report to verified restoration and reusable knowledge.",
          nodes: [
            { id: "report", label: "User report", kind: "Signal", metric: "Impact", detail: "Capture the exact symptom, timing, scope and business consequence." },
            { id: "scope", label: "Triage and scope", kind: "Decision", metric: "Priority", detail: "Separate isolated faults from shared outages and choose the safest path." },
            { id: "isolate", label: "Measure and isolate", kind: "Diagnosis", metric: "Evidence", detail: "Test one layer at a time and preserve observations before changing state." },
            { id: "restore", label: "Restore service", kind: "Action", metric: "Recovery", detail: "Apply the smallest justified repair while maintaining controls and rollback." },
            { id: "verify", label: "Verify and document", kind: "Outcome", metric: "Knowledge", detail: "Confirm the user journey, record the cause and make the next response faster." },
          ],
        },
      ],
    },
    activity: {
      title: "Professional activity",
      lede: "Published case studies, technical writing, credentials and public engineering activity in one record.",
      filters: { all: "All", writing: "Writing", caseStudy: "Case studies", credential: "Credentials" },
    },
  },
  reading: {
    save: "Save article",
    saved: "Saved",
    savedArticles: "Saved articles",
    continueReading: "Continue reading",
    progress: "read",
    remove: "Remove from saved articles",
    empty: "Save an article to keep it available in this browser.",
  },
  pwa: {
    install: "Install portfolio",
    installing: "Installing…",
    ready: "Offline reading ready",
    installed: "Portfolio installed",
    updateReady: "Update available",
    refresh: "Refresh",
    shortcuts: {
      lab: "Open Systems Lab",
      brief: "Open candidate brief",
      blog: "Open technical writing",
    },
  },
  recruiterPack: {
    eyebrow: "Role-specific recruiter pack",
    title: "Evidence selected for",
    lede: "A print-ready package combining role fit, availability, strongest experience, relevant projects, credentials and contact details.",
    open: "Open recruiter pack",
    back: "Back to focused portfolio",
    availability: "Availability and eligibility",
    experience: "Relevant experience",
    capabilities: "Matching capabilities",
    caseStudies: "Selected case studies",
    credentials: "Relevant credentials",
    contact: "Contact",
    downloadCv: "Download CV",
    print: "Print / save PDF",
    present: "Present",
    linkedin: "LinkedIn",
    metaTitle: (role: string) => `${role} recruiter pack`,
  },
} as const;
