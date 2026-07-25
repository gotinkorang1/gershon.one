/**
 * Technical case studies.
 *
 * ⚠️  IMPORTANT — READ BEFORE PUBLISHING
 *
 * These are drafted from the bullet points on your CV. The shape of each story
 * is right, but the specific figures, model numbers and timings marked with
 * `TODO` are placeholders. Anything published here you must be able to defend
 * in an interview, so replace every TODO with a real number or delete the
 * sentence containing it.
 */

export type Section = { heading: string; body: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  context: string;
  period: string;
  published: string;
  readingMinutes: number;
  tags: string[];
  outcomes: { value: string; label: string }[];
  sections: Section[];
  draft: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dual-wan-starlink-failover",
    title: "Building automatic failover between fibre and Starlink",
    summary:
      "A single fibre link meant every cut took the business offline. Dual-WAN routing on RouterOS moved traffic to Starlink without anyone touching a router.",
    role: "IT Support Officer",
    context: "Greenhouse International Development Group Ghana Ltd.",
    period: "2024",
    published: "2026-06-10",
    readingMinutes: 7,
    tags: ["MikroTik", "RouterOS 7", "Starlink", "Failover", "Networking"],
    outcomes: [
      { value: "TODO", label: "measured failover time" },
      { value: "TODO", label: "uptime since deployment" },
      { value: "0", label: "manual interventions required" },
    ],
    draft: true,
    sections: [
      {
        heading: "The problem",
        body: [
          "The office ran on a single fibre connection. When the line was cut — which happened often enough to matter — everything stopped: the ERP system, email, the CCTV uplink, and any engineering work that depended on file access.",
          "Recovery meant someone physically switching over to a backup connection. That person was usually me, and it was rarely convenient. The gap between a link failing and someone noticing was often longer than the switchover itself.",
          "TODO: add how frequently outages occurred and roughly what they cost in lost working hours. Concrete numbers make this section land.",
        ],
      },
      {
        heading: "Why not just buy a second fibre line",
        body: [
          "A second fibre run from a different provider would have been the textbook answer, but both would likely share physical infrastructure for part of the route, so a single backhoe could still take out both. It was also the more expensive option.",
          "Starlink solved the shared-path problem completely. A satellite uplink fails for entirely different reasons than a buried fibre line does, which is the property you actually want in a backup.",
        ],
      },
      {
        heading: "How the failover works",
        body: [
          "The design runs on a MikroTik CCR2004 under RouterOS 7.x. Both WANs terminate on separate ports, with the fibre link carrying all traffic by default and Starlink held as a standby route at a higher distance.",
          "Health checking is the part that matters. Watching whether the interface is up is not enough — a fibre link can stay electrically up while passing no traffic. Instead the router probes a target beyond the ISP's own equipment, so the check fails when real connectivity fails rather than only when the cable is cut.",
          "When probes fail, the backup route takes over and traffic continues over Starlink. When the primary recovers and stays stable, traffic returns automatically.",
          "TODO: describe your actual check interval, failure threshold and probe target. This is the detail an interviewer will ask about.",
        ],
      },
      {
        heading: "Segmentation and shaping",
        body: [
          "Failover alone would have been a false economy. Starlink has less headroom than the fibre line, so moving everything across unshaped would degrade the ERP system while CCTV footage saturated the uplink.",
          "Traffic is split across VLANs — staff, ERP, CCTV and guest — with queues that protect the ERP and staff traffic when the network is running on the backup link. Guest and camera traffic yield first.",
          "TODO: your actual VLAN numbering and queue limits.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "The configuration lives on the router and is backed up, but it is not version-controlled or reproducible from scratch. If the hardware died, rebuilding would mean restoring a backup file rather than applying a known-good configuration from source.",
          "Monitoring is also thinner than I would like. The failover works, but I find out about it by noticing, not by being told. An alert on state change would close that gap cheaply.",
        ],
      },
    ],
  },
  {
    slug: "erpnext-administration",
    title: "Keeping ERPNext and Odoo running for an engineering team",
    summary:
      "Administering the ERP platform that engineering and operations depend on — upgrades, data integrity, backups that have actually been restored.",
    role: "IT Support Officer",
    context: "Greenhouse International Development Group Ghana Ltd.",
    period: "2023 — present",
    published: "2026-05-22",
    readingMinutes: 6,
    tags: ["ERPNext", "Frappe", "Odoo", "Linux", "Backups"],
    outcomes: [
      { value: "TODO", label: "users supported" },
      { value: "TODO", label: "tested recovery time" },
      { value: "TODO", label: "uptime" },
    ],
    draft: true,
    sections: [
      {
        heading: "What the system does",
        body: [
          "The ERP is where engineering and operations work actually lives — jobs, procurement, and the records that tie them together. When it is unavailable, people stop working rather than work around it.",
          "TODO: describe which modules are in real use and roughly how many people depend on them daily.",
        ],
      },
      {
        heading: "Backups you have actually restored",
        body: [
          "An untested backup is a guess. The useful question is not whether backups are running but how long a restore takes and whether the restored system is complete.",
          "TODO: describe your backup schedule, where copies are held, and the last time you performed a full restore. If you have never rehearsed one, that is worth doing before you write this section — and worth doing regardless.",
        ],
      },
      {
        heading: "Upgrades without downtime you have to apologise for",
        body: [
          "TODO: describe how you stage and apply updates, and any upgrade that went badly and what you changed afterwards. Interviewers value the second part more than the first.",
        ],
      },
    ],
  },
  {
    slug: "diagnosing-fibre-latency",
    title: "Finding a fault that was not where everyone was looking",
    summary:
      "Intermittent slowness blamed on the ERP system turned out to be a routing problem. A short piece on diagnosing by layer rather than by suspicion.",
    role: "IT Support Officer",
    context: "Greenhouse International Development Group Ghana Ltd.",
    period: "2024",
    published: "2026-04-15",
    readingMinutes: 5,
    tags: ["Troubleshooting", "Fibre", "Routing", "Latency"],
    outcomes: [
      { value: "TODO", label: "time to resolution" },
      { value: "TODO", label: "affected users" },
    ],
    draft: true,
    sections: [
      {
        heading: "The reported symptom",
        body: [
          "The complaint was that the ERP system was slow. It usually is the application, so that is where people look first — and where I would have wasted a day if I had started there.",
          "TODO: describe what users actually reported, and what made you doubt the obvious explanation.",
        ],
      },
      {
        heading: "Working down the layers",
        body: [
          "Application slowness and network latency present identically to a user. The difference shows up as soon as you measure rather than ask.",
          "TODO: describe the sequence you actually followed — what you measured, what each result ruled out, and the point at which the picture changed.",
        ],
      },
      {
        heading: "The actual fault",
        body: [
          "TODO: what it turned out to be, how you fixed it, and what you put in place so it would be caught sooner next time.",
        ],
      },
    ],
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => !c.draft);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
