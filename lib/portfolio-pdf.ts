import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { site, type ProjectCategory } from "@/lib/site";
import { getProjectsContent } from "@/lib/localised-content";
import type { Locale } from "@/lib/i18n";

/**
 * The projects page as a downloadable A4 PDF. Built from the same content as
 * /projects, so it can never drift out of sync with the site. Uses the PDF
 * standard fonts, so nothing is embedded and the file stays small.
 */

const CATEGORIES: ProjectCategory[] = ["network", "infrastructure", "software", "design", "business", "study"];

const A4 = { width: 595.28, height: 841.89 };
const MARGIN = { x: 56, top: 64, bottom: 60 };
const WIDTH = A4.width - MARGIN.x * 2;

const INK = rgb(0.07, 0.07, 0.08);
const MUTED = rgb(0.38, 0.38, 0.42);
const FAINT = rgb(0.6, 0.6, 0.64);
const ACCENT = rgb(0.1, 0.36, 0.86);
const RULE = rgb(0.85, 0.85, 0.87);

// The standard fonts only cover WinAnsi; swap the few characters the content
// uses outside it rather than letting pdf-lib throw on them.
const REPLACEMENTS: Record<string, string> = { "→": "->", "←": "<-", "≈": "~", "‑": "-", " ": " " };

function textFor(font: PDFFont) {
  const supported = new Set(font.getCharacterSet());
  return (value: string) =>
    Array.from(value, (ch) => REPLACEMENTS[ch] ?? (supported.has(ch.codePointAt(0)!) ? ch : "")).join("");
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(next, size) > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const absolute = (href: string) => (href.startsWith("/") ? `${site.url}${href}` : href);
const domain = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export async function buildPortfolioPdf(locale: Locale): Promise<Uint8Array> {
  const { copy, websites, projects } = getProjectsContent(locale);
  const pdfCopy = copy.pdf;

  const doc = await PDFDocument.create();
  doc.setTitle(`${pdfCopy.title} — ${site.name}`);
  doc.setAuthor(site.name);
  doc.setSubject(copy.metaDescription);
  doc.setLanguage(locale === "fr" ? "fr-CA" : "en-CA");
  doc.setCreator(site.url);

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const clean = textFor(regular);

  let page: PDFPage = doc.addPage([A4.width, A4.height]);
  let y = A4.height - MARGIN.top;

  const ensure = (height: number) => {
    if (y - height >= MARGIN.bottom) return;
    page = doc.addPage([A4.width, A4.height]);
    y = A4.height - MARGIN.top;
  };

  const draw = (text: string, opts: { font?: PDFFont; size: number; color?: typeof INK; x?: number; gap?: number }) => {
    const font = opts.font ?? regular;
    const x = opts.x ?? MARGIN.x;
    const leading = opts.size * 1.4;
    for (const line of wrap(clean(text), font, opts.size, WIDTH - (x - MARGIN.x))) {
      ensure(leading);
      page.drawText(line, { x, y: y - opts.size, size: opts.size, font, color: opts.color ?? INK });
      y -= leading;
    }
    y -= opts.gap ?? 0;
  };

  const rule = () => {
    page.drawLine({ start: { x: MARGIN.x, y }, end: { x: A4.width - MARGIN.x, y }, thickness: 0.6, color: RULE });
  };

  /** Measures an entry first so it never splits across a page break. */
  const entry = (title: string, meta: string, summary: string, footer: string, link?: string) => {
    const height =
      [
        [title, bold, 10.5],
        [meta, regular, 8.5],
        [summary, regular, 9.5],
        [footer, regular, 8],
        [link ?? "", regular, 8],
      ].reduce(
        (sum, [text, font, size]) =>
          text ? sum + wrap(clean(text as string), font as PDFFont, size as number, WIDTH).length * (size as number) * 1.4 : sum,
        0,
      ) + 12;
    ensure(Math.min(height, A4.height - MARGIN.top - MARGIN.bottom));
    draw(title, { font: bold, size: 10.5 });
    if (meta) draw(meta, { size: 8.5, color: MUTED, gap: 1 });
    draw(summary, { size: 9.5, gap: 1 });
    if (footer) draw(footer, { size: 8, color: FAINT });
    if (link) draw(link, { size: 8, color: ACCENT });
    y -= 12;
  };

  const section = (heading: string, count: number) => {
    ensure(64);
    y -= 10;
    draw(`${heading}  (${count})`, { font: bold, size: 14, gap: 4 });
    rule();
    y -= 12;
  };

  // ------------------------------------------------------------- header
  draw(site.name, { font: bold, size: 22, gap: 2 });
  draw(pdfCopy.role, { size: 11, color: MUTED, gap: 2 });
  draw(`${domain(site.url)}  ·  ${site.email}  ·  ${site.location}`, { size: 9, color: ACCENT, gap: 18 });
  draw(pdfCopy.title, { font: bold, size: 16, gap: 4 });
  draw(pdfCopy.intro, { size: 10, color: MUTED, gap: 4 });
  const updated = new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", { month: "long", year: "numeric" }).format(new Date());
  draw(`${pdfCopy.updated} ${updated}`, { size: 8.5, color: FAINT, gap: 8 });

  // ----------------------------------------------------------- websites
  const live = websites.filter((w) => !w.offline);
  section(copy.websitesTitle, live.length);
  for (const w of live) entry(w.name, "", w.summary, "", w.url);

  // ----------------------------------------------------------- projects
  for (const category of CATEGORIES) {
    const items = projects.filter((p) => p.category === category);
    if (!items.length) continue;
    section(copy.categories[category], items.length);
    for (const p of items) {
      const meta = p.status === "in-progress" ? `${p.context}  ·  ${copy.inProgress}` : p.context;
      entry(p.title, meta, p.summary, p.tags.join("  ·  "), p.href ? absolute(p.href) : undefined);
    }
  }

  // ------------------------------------------------------------ footers
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    const left = clean(`${site.name}  ·  ${pdfCopy.title}`);
    const right = `${i + 1} / ${pages.length}`;
    p.drawText(left, { x: MARGIN.x, y: 32, size: 7.5, font: regular, color: FAINT });
    p.drawText(right, {
      x: A4.width - MARGIN.x - regular.widthOfTextAtSize(right, 7.5),
      y: 32,
      size: 7.5,
      font: regular,
      color: FAINT,
    });
  });

  return doc.save();
}

export async function portfolioPdfResponse(locale: Locale): Promise<Response> {
  const { copy } = getProjectsContent(locale);
  const body = await buildPortfolioPdf(locale);
  return new Response(body as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${copy.pdf.fileName}"`,
    },
  });
}
