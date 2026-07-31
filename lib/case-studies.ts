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
  /** Public repository, when the work is independently inspectable. */
  repo?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "erpnext-bilingual-id-cards",
    title: "ID cards two languages had to agree on",
    summary:
      "ERPNext prints documents, not cards. A Jinja print format that puts two bilingual employee ID cards — front and back — on a single A4 sheet, at dimensions a guard can check at a gate.",
    role: "IT Support Officer",
    context: "Greenhouse International Development Group Ghana Ltd.",
    period: "2026",
    published: "2026-07-30",
    readingMinutes: 5,
    tags: ["ERPNext", "Frappe", "Jinja", "CSS", "Print", "HR"],
    repo: "https://github.com/gotinkorang1/erpnext-id-card-print-format",
    outcomes: [
      { value: "2", label: "cards per A4 sheet" },
      { value: "2", label: "languages on every card" },
      { value: "MIT", label: "published and reusable" },
    ],
    draft: false,
    sections: [
      {
        heading: "Why build this at all",
        body: [
          "Staff needed identification cards. The employee records already existed in ERPNext — names, photographs, departments, job titles — so the data was not the problem. Getting it onto a piece of plastic was.",
          "The options were a commissioned card design, which means paying for every subsequent change and waiting on someone else to make it, or a print format that reads the ERP directly. A print format costs an afternoon and then costs nothing. New employee, print a card. Someone changes department, print a card. No design round-trip.",
          "ERPNext is built to print invoices and purchase orders — documents that fill a page. A credit-card-sized object with a front and a back is not what the print engine expects, and most of the work was in that gap.",
        ],
      },
      {
        heading: "Two languages that both had to be readable",
        body: [
          "The workplace runs in English and Chinese. A card that only one group can read is not an identification card for half the people holding it, so both languages had to appear on every card rather than printing two separate batches.",
          "Every field label carries both: 姓名 Name, 工号 ID, 职位 Role, 部门 Dept., 授权签名 Authorized Signature. Chinese first, English second, consistently — an inconsistent order makes a card harder to scan quickly, which is the one thing an ID card must be good at.",
          "This is the constraint that shaped the layout. Bilingual labels are roughly twice as wide as monolingual ones, on a card that cannot grow. The labels sit in a fixed 80px column so the values align down the card no matter how long the label is, and the type drops to 11px for the data. It reads as a deliberate grid rather than text that happened to fit.",
        ],
      },
      {
        heading: "Making a browser produce a card, not a page",
        body: [
          "The whole thing renders through a PDF engine driving a browser, so the layout problems are print problems that web layout does not usually have to solve.",
          "Everything is specified in centimetres, not pixels. The page is declared A4 with zero margin, and each card is 9.2 × 5.7cm — dimensions that survive the trip through the renderer to a physical sheet. Pixels would have been at the mercy of whatever the engine assumed about screen density.",
          "Employee photographs broke first. A relative image path resolves fine in the browser preview and then arrives empty in the PDF, because the rendering process does not share the page's origin. Passing the image through Frappe's `abs_url` filter makes the path absolute and the photograph appears. It is a one-word fix that is invisible until you look at a printed card and find a blank rectangle where a face should be.",
          "Two cards per sheet comes from a Jinja loop that renders the same card twice, with `page-break-inside: avoid` so the pair is never split across pages. Front and back stack in a column, which means one A4 sheet produces one complete card once cut and laminated — and the dashed border is a cutting guide, not decoration.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "The QR code is the weakest part. It is fetched from a third-party generator at print time and encodes the company website — so it is identical on every card, and printing depends on an external service being reachable. It should encode the employee ID and be generated locally. Right now it is decoration that looks like a feature, which is worse than no QR at all.",
          "The card is 9.2 × 5.7cm, slightly larger than the ID-1 standard that wallets, badge holders and card printers are built around. It prints and cuts correctly on A4, but anyone feeding it to a PVC card printer would need to adjust it first.",
          "The published README also documents a `src/` directory that does not exist — the files sit at the repository root. Anyone following the installation steps hits a dead end at the second one. That is a five-minute fix I have not yet made, and it is the kind of small inaccuracy that quietly makes shared work useless to the person who found it.",
        ],
      },
    ],
  },
  {
    slug: "batch-invoice-pdf-processor",
    title: "The invoice pile that was being retyped by hand",
    summary:
      "The commercial team re-keyed machinery and vehicle line items from a folder of scanned invoices into a Word template, one PDF at a time. A Windows batch tool reads each PDF, keeps only the qualifying items, and exports a finished invoice named by its BOE number — with an AI fallback for the scans plain text can't reach.",
    role: "IT Support Officer",
    context: "Bright Industrial Park — Commercial Department",
    period: "2026",
    published: "2026-07-31",
    readingMinutes: 7,
    tags: ["Python", "Automation", "pdfplumber", "python-docx", "Vision AI", "Windows"],
    repo: "https://github.com/gotinkorang1/batch-invoice-pdf-processor",
    outcomes: [
      { value: "3", label: "AI providers for unreadable scans" },
      { value: "1", label: "clean PDF per source invoice" },
      { value: "0", label: "values invented when uncertain" },
    ],
    draft: false,
    sections: [
      {
        heading: "The job before the script",
        body: [
          "The commercial department received customs invoices as a folder of scanned PDFs — one per Bill of Entry, each named with its BOE number. Someone had to open each file, read down the line items, and copy only the machinery and vehicle entries into a fresh copy of a master Word invoice, leaving out parts, spares, accessories and anything ambiguous.",
          "Then the totals: sum the qualifying lines into an FOB figure, derive freight and insurance from it, and save the finished document as a PDF named after the BOE number. Multiply that by a full folder and it is an afternoon of careful, repetitive copying in which a single mis-keyed amount is a wrong invoice.",
          "None of it is hard. All of it is slow, and slow work done by hand is where errors live. The task was a machine's job wearing a person's afternoon.",
        ],
      },
      {
        heading: "Keeping only what qualifies",
        body: [
          "The core of the tool is a classifier that decides, line by line, whether an item is machinery or a vehicle. It reads each description against a configurable list of inclusion keywords, and an exclusion list overrides them — so “engine oil” is dropped even though “engine” would have matched.",
          "It is deliberately conservative. Ambiguous or weakly described items are excluded rather than guessed at. On a commercial invoice a wrong inclusion is a defect someone has to catch downstream, while a missed line is visible and easy to add back — so the tool errs toward leaving things out and being obvious about it.",
          "The rules live in a JSON file, not in the code, so the vocabulary can be tuned to a new supplier's wording without touching the parser.",
        ],
      },
      {
        heading: "A fresh template every time",
        body: [
          "Every invoice is built from a clean copy of the master Word template rather than by editing the previous output, so nothing leaks from one file into the next. The tool finds the line-items table by its header labels, copies the formatting of a sample row, and fills one row per qualifying item in the source order.",
          "Metadata and totals go into named placeholders — invoice number, reference, and the three calculated figures: FOB as the sum of line totals, freight at a fixed percentage of FOB, insurance derived from FOB plus freight. The arithmetic is identical every time, which is exactly why a person should not be doing it.",
          "Export runs through Word itself rather than a PDF library, because the finished invoice has to match the template's layout exactly, and the surest way to guarantee that is to let the application that owns the format produce the PDF.",
        ],
      },
      {
        heading: "When the PDF is a photograph",
        body: [
          "Some invoices arrive as scans — an image with no text layer for the parser to read. Rather than fail on those, the tool can fall back to a vision model, and it treats that as a last resort: it runs the ordinary text parser first and only calls a model when it cannot confidently find qualifying items.",
          "Three providers are supported — OpenAI, Gemini and Claude — because a department may already pay for one and not the others. The model is asked to return only items it is confident about, each with a readable description, unit total, line total and page number, and to exclude anything uncertain rather than invent a value.",
          "That last rule is the important one. A tool that guesses at a number on a customs invoice is worse than one that leaves a gap, so the AI path is held to the same conservative standard as the keyword classifier: when in doubt, leave it out and let a human see the gap.",
        ],
      },
      {
        heading: "Built to be interrupted",
        body: [
          "A batch that runs over a large folder, driving Word once per file, will eventually hit one that stalls. If that meant starting the whole folder again, the tool would be a liability on exactly the runs it was built for.",
          "So it checkpoints. Each source file's state is written to the output folder as it goes — processed, skipped, failed — alongside an append-only event log and a per-file CSV. Rerun against the same folder and it continues from where it stopped: finished files are left alone, failed and interrupted ones are retried, and a flag forces a clean run when you want one.",
          "It is the unglamorous part, and it is the difference between a demo and something the commercial team can actually leave running.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "The Word dependency ties the tool to a Windows machine with Office installed. That was right for where it runs, but it means the export step cannot move to a server without swapping the engine — and I would isolate that boundary more cleanly so a headless renderer could drop in.",
          "The classifier is keyword-based, which is transparent and easy to audit but blind to synonyms it has not been told about. The AI fallback quietly compensates for that on the scans; the honest version of the design would apply the same confidence-scored judgement to the text path too, rather than two different mechanisms doing the same job.",
          "And because uncertain items are excluded by design, the tool still assumes a human reviews what it left out. That is the correct default, but the summary it writes could do more to surface exactly which lines were dropped and why, so the review is a two-minute check rather than a re-read of the original.",
        ],
      },
    ],
  },
  {
    slug: "industrial-park-network-1200-acres",
    title: "Bringing a 1,200-acre industrial park online",
    summary:
      "No fibre to the door, no single satellite link fast enough, and CCTV plus point-of-sale data to move from factories to head office. Eight Starlink terminals aggregated into a fibre distribution layer.",
    role: "IT Support Officer",
    context: "Bright Industrial Park, Ghana",
    period: "2024",
    published: "2026-06-10",
    readingMinutes: 8,
    tags: ["MikroTik", "RouterOS", "Starlink", "GPON", "Fibre", "Networking"],
    outcomes: [
      { value: "8", label: "Starlink terminals aggregated" },
      { value: "2.5 Gbps", label: "aggregate throughput over fibre" },
      { value: "500+", label: "CCTV cameras carried" },
    ],
    draft: false,
    sections: [
      {
        heading: "The constraint",
        body: [
          "An international industrial park of 1,200 acres at Afienya – Shai Hills, home to many international manufacturers and producers, with factories, offices and a head office spread across it. Every building needed internet. Head office needed CCTV footage and point-of-sale data flowing back from all of them. And there was no terrestrial fibre reaching the site.",
          "That rules out the obvious answer. A single satellite terminal cannot carry a whole park — not the aggregate bandwidth of dozens of cameras uploading continuously, plus POS transactions, plus ordinary office traffic. Buying a bigger link was not an option, because there was no bigger link to buy.",
          "The park is built in four phases; this network covers the two that are live. Between them sit twelve factories and eight warehouses, plus the facilities that keep a park of this size running: a hotel, the head office, a hospital, a bank, a supermarket, a shopping mall, a restaurant, a KTV, and hostels for both local and foreign staff. Each factory and warehouse alone carries between 26 and 38 CCTV cameras — well over five hundred streams — and every location runs a point-of-sale terminal. All of it uploads to head office without pause.",
        ],
      },
      {
        heading: "Aggregating what was available",
        body: [
          "If one terminal is not enough, the question becomes whether eight can be made to behave like one larger link. Starlink gives you a consumer-grade connection with no native bonding, so the aggregation has to happen at the router.",
          "Eight terminals are mounted individually with clear sky view and each lands on its own port of a MikroTik router as a separate WAN. RouterOS handles the distribution across them, so no single terminal carries the whole site and losing one degrades capacity rather than causing an outage.",
          "Distribution runs on per-connection classifier — PCC — in RouterOS. Each new connection is hashed to one of the eight terminals and pinned there, so a single download stays on one link while the overall load spreads evenly across all eight. Because the split is per connection rather than per packet, sessions never arrive out of order. When a terminal drops, PCC redistributes its share across the terminals still up: the park slows fractionally instead of losing connectivity, which is the whole reason for bonding eight consumer links rather than trusting one.",
        ],
      },
      {
        heading: "Getting it across 1,200 acres",
        body: [
          "Aggregated bandwidth at head office is worthless if it cannot reach a factory a kilometre away. Wireless alone would not carry continuous CCTV upload at that distance, so the park needed fibre.",
          "The router feeds a Huawei S5735 enterprise switch, which feeds a GPON unit whose four fibre ports run to a fibre distribution panel. Each port is split 1:4 through passive splitters, fanning out across the park to the buildings that need service. Passive splitters matter here: no power and no active equipment in the field, which is one less thing to fail in an industrial environment.",
          "Traffic runs both directions on the same backbone. CCTV and POS data travel inbound to the head office servers; internet service is distributed back outbound to the factories.",
          "Across that backbone the fibre carries roughly 2.5 Gbps, and each device on it sees 20–50 Mbps — enough for the hundreds of cameras uploading continuously, plus POS and ordinary office traffic, without them starving one another.",
        ],
      },
      {
        heading: "Where fibre stopped, radio took over",
        body: [
          "Fibre earns its cost where the density of factories and warehouses justifies trenching it — the first two phases. Phases three and four sit further out, and there the answer is point-to-point radio instead: around 800 Mbps over the air, with VPN tunnels carrying whatever has to reach internal head-office systems.",
          "It is a deliberate match of tool to distance — fibre where the density earns it, radio where it does not — and it means the later phases came online without waiting on a trench.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "Monitoring is the weakest part. With eight WAN links, one degrading quietly is easy to miss — the site stays up, just slower, and nobody reports a fault. Per-link health metrics and an alert on state change would close that gap cheaply, and it is the first thing I would add.",
          "The configuration also lives on the router rather than in version control. It is backed up, but rebuilding from scratch would mean restoring a file rather than applying a known-good configuration from source.",
          "The next step is bonding rather than balancing. PCC spreads sessions across the eight terminals but cannot make one session faster than a single link, and failover happens per connection rather than instantly. Moving to a true bonding layer such as SpeedFusion would aggregate the terminals into one logical pipe and fail over sub-second — the upgrade I would make next.",
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
