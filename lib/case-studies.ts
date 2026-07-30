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
    slug: "campus-network-1200-acres",
    title: "Bringing a 1,200-acre industrial park online",
    summary:
      "No fibre to the door, no single satellite link fast enough, and CCTV plus point-of-sale data to move from factories to head office. Eight bonded Starlink terminals into a fibre distribution layer.",
    role: "IT Support Officer",
    context: "Bright Industrial Park, Ghana",
    period: "2024",
    published: "2026-06-10",
    readingMinutes: 8,
    tags: ["MikroTik", "RouterOS", "Starlink", "GPON", "Fibre", "Networking"],
    outcomes: [
      { value: "1,200", label: "acres covered by the backbone" },
      { value: "8", label: "Starlink terminals aggregated" },
      { value: "TODO", label: "measured aggregate throughput" },
    ],
    draft: true,
    sections: [
      {
        heading: "The constraint",
        body: [
          "An industrial park of 1,200 acres, with factories, offices and a head office spread across it. Every building needed internet. Head office needed CCTV footage and point-of-sale data flowing back from all of them. And there was no terrestrial fibre reaching the site.",
          "That rules out the obvious answer. A single satellite terminal cannot carry a whole park — not the aggregate bandwidth of dozens of cameras uploading continuously, plus POS transactions, plus ordinary office traffic. Buying a bigger link was not an option, because there was no bigger link to buy.",
          "TODO: add roughly how many buildings, cameras and POS terminals the network serves. Scale is the whole point of this story and specific numbers land harder than \"dozens\".",
        ],
      },
      {
        heading: "Aggregating what was available",
        body: [
          "If one terminal is not enough, the question becomes whether eight can be made to behave like one larger link. Starlink gives you a consumer-grade connection with no native bonding, so the aggregation has to happen at the router.",
          "Eight terminals are mounted individually with clear sky view and each lands on its own port of a MikroTik router as a separate WAN. RouterOS handles the distribution across them, so no single terminal carries the whole site and losing one degrades capacity rather than causing an outage.",
          "TODO: describe how you actually distribute traffic across the eight links — PCC load balancing, per-connection classifier, ECMP, or something else — and how you handle a terminal dropping out. This is the first thing a network interviewer will ask, and the answer is what separates this from \"we plugged in eight routers\".",
        ],
      },
      {
        heading: "Getting it across 1,200 acres",
        body: [
          "Aggregated bandwidth at head office is worthless if it cannot reach a factory a kilometre away. Wireless alone would not carry continuous CCTV upload at that distance, so the park needed fibre.",
          "The router feeds a Huawei S5735 enterprise switch, which feeds a GPON unit whose four fibre ports run to a fibre distribution panel. Each port is split 1:4 through passive splitters, fanning out across the park to the buildings that need service. Passive splitters matter here: no power and no active equipment in the field, which is one less thing to fail in an industrial environment.",
          "Traffic runs both directions on the same backbone. CCTV and POS data travel inbound to the head office servers; internet service is distributed back outbound to the factories.",
          "TODO: note the approximate fibre run length and whether it is single-mode. Also worth saying what the splitter ratio means in practice for the link budget.",
        ],
      },
      {
        heading: "Beyond the fence line",
        body: [
          "Not everything the business runs sits inside the 1,200 acres. Locations outside the boundary still need access to head office systems, and trenching fibre to them was not proportionate.",
          "Those sites connect over point-to-point wireless links, with VPN tunnels carrying the traffic that needs to reach internal resources. It is a deliberately different tool for a different distance — fibre where the density justifies it, wireless where it does not.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "Monitoring is the weakest part. With eight WAN links, one degrading quietly is easy to miss — the site stays up, just slower, and nobody reports a fault. Per-link health metrics and an alert on state change would close that gap cheaply, and it is the first thing I would add.",
          "The configuration also lives on the router rather than in version control. It is backed up, but rebuilding from scratch would mean restoring a file rather than applying a known-good configuration from source.",
          "TODO: if you have since added monitoring or changed the design, say so here. A case study that ends with what you learned reads better than one that ends with what you built.",
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

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
