import {
  PDFDocument,
  PDFName,
  PDFNull,
  PDFNumber,
  PDFString,
  StandardFonts,
  rgb,
  type Color,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import { site, type Project, type ProjectCategory } from "@/lib/site";
import { getProjectsContent } from "@/lib/localised-content";
import { resumeUrlFor, type Locale } from "@/lib/i18n";

/**
 * The projects page as a downloadable A4 PDF. Built from the same content as
 * /projects, so it can never drift out of sync with the site. Uses the PDF
 * standard fonts, so nothing is embedded and the file stays small.
 *
 * Layout: a cover block (contact line, headline numbers, clickable contents),
 * live websites as a two-column card grid, then projects grouped by category,
 * and a closing contact panel. Every URL, email and contents row is a real
 * link. Blocks are measured before they are drawn so none splits across pages.
 */

export const PORTFOLIO_CATEGORIES: ProjectCategory[] = ["network", "infrastructure", "software", "design", "business", "study"];

const PAGE = { w: 595.28, h: 841.89 };
const M = { x: 50, top: 58, bottom: 58 };
const W = PAGE.w - M.x * 2;

const INK = rgb(0.07, 0.07, 0.09);
const MUTED = rgb(0.36, 0.37, 0.41);
const FAINT = rgb(0.58, 0.59, 0.63);
const ACCENT = rgb(0.1, 0.36, 0.86);
const ACCENT_SOFT = rgb(0.93, 0.95, 1);
const SOFT = rgb(0.955, 0.957, 0.965);
const RULE = rgb(0.86, 0.87, 0.89);

// The standard fonts only cover WinAnsi; swap the few characters the content
// uses outside it rather than letting pdf-lib throw on them.
const REPLACEMENTS: Record<string, string> = { "→": "›", "←": "‹", "≈": "~", "‑": "-", " ": " ", " ": " " };

function cleaner(font: PDFFont) {
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

type Rect = { x: number; y: number; w: number; h: number };

export async function buildPortfolioPdf(locale: Locale): Promise<Uint8Array> {
  const { copy, websites, projects } = getProjectsContent(locale);
  const t = copy.pdf;
  const live = websites.filter((w) => !w.offline);
  const groups = PORTFOLIO_CATEGORIES.map((category) => ({
    category,
    items: projects.filter((p) => p.category === category),
  })).filter((g) => g.items.length);

  const doc = await PDFDocument.create();
  doc.setTitle(`${t.title} — ${site.name}`);
  doc.setAuthor(site.name);
  doc.setSubject(copy.metaDescription);
  doc.setLanguage(locale === "fr" ? "fr-CA" : "en-CA");
  doc.setCreator(site.url);

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const clean = cleaner(regular);
  const lines = (text: string, font: PDFFont, size: number, width = W) => wrap(clean(text), font, size, width);
  const widthOf = (text: string, font: PDFFont, size: number) => font.widthOfTextAtSize(clean(text), size);

  let page: PDFPage = doc.addPage([PAGE.w, PAGE.h]);
  let y = PAGE.h - M.top;

  const ensure = (height: number) => {
    if (y - height >= M.bottom) return;
    page = doc.addPage([PAGE.w, PAGE.h]);
    y = PAGE.h - M.top;
  };

  /** Draws `text` with its top edge at `top`. */
  const put = (text: string, x: number, top: number, font: PDFFont, size: number, color: Color = INK) =>
    page.drawText(clean(text), { x, y: top - size * 0.8, size, font, color });

  const annotate = (target: PDFPage, rect: Rect, action: Record<string, unknown>) => {
    const annot = doc.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [rect.x, rect.y, rect.x + rect.w, rect.y + rect.h],
      Border: [0, 0, 0],
      ...action,
    });
    target.node.addAnnot(doc.context.register(annot));
  };
  const linkTo = (rect: Rect, url: string) =>
    annotate(page, rect, { A: { Type: "Action", S: "URI", URI: PDFString.of(url) } });

  // ---------------------------------------------------------------- cover
  page.drawRectangle({ x: 0, y: PAGE.h - 6, width: PAGE.w, height: 6, color: ACCENT });

  put(site.name, M.x, y, bold, 26);
  y -= 34;
  put(t.role, M.x, y, regular, 11.5, MUTED);
  y -= 20;

  // Contact line: each piece is its own link.
  {
    const parts: { text: string; url?: string }[] = [
      { text: domain(site.url), url: site.url },
      { text: site.email, url: `mailto:${site.email}` },
      { text: site.phone, url: `tel:${site.phoneHref}` },
      { text: site.location },
    ];
    let x = M.x;
    parts.forEach((part, i) => {
      if (i) {
        put("·", x + 6, y, regular, 9, FAINT);
        x += 18;
      }
      put(part.text, x, y, regular, 9, part.url ? ACCENT : MUTED);
      const w = widthOf(part.text, regular, 9);
      if (part.url) linkTo({ x, y: y - 10, w, h: 12 }, part.url);
      x += w;
    });
    y -= 34;
  }

  put(t.title, M.x, y, bold, 18);
  y -= 26;
  for (const line of lines(t.intro, regular, 10.5)) {
    put(line, M.x, y, regular, 10.5, MUTED);
    y -= 15;
  }
  y -= 2;
  const updated = new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", { month: "long", year: "numeric" }).format(new Date());
  put(`${t.updated} ${updated}`, M.x, y, regular, 8.5, FAINT);
  y -= 26;

  // Headline numbers.
  {
    const stats = [
      { value: live.length, label: copy.stats.websites },
      { value: projects.length, label: copy.stats.projects },
      { value: groups.length, label: copy.stats.disciplines },
    ];
    const gap = 10;
    const bw = (W - gap * (stats.length - 1)) / stats.length;
    const bh = 56;
    stats.forEach((s, i) => {
      const x = M.x + i * (bw + gap);
      page.drawRectangle({ x, y: y - bh, width: bw, height: bh, color: SOFT });
      page.drawRectangle({ x, y: y - bh, width: 3, height: bh, color: ACCENT });
      put(String(s.value), x + 14, y - 11, bold, 20, INK);
      put(s.label, x + 14, y - 37, regular, 8.5, MUTED);
    });
    y -= bh + 28;
  }

  // Contents: page numbers are filled in once the layout is known.
  const contents: { id: string; top: number }[] = [];
  const contentsPage = page;
  {
    put(t.contents, M.x, y, bold, 11);
    y -= 18;
    page.drawLine({ start: { x: M.x, y }, end: { x: M.x + W, y }, thickness: 0.6, color: RULE });
    y -= 8;
    const rows = [
      { id: "websites", label: copy.websitesTitle, count: live.length },
      ...groups.map((g) => ({ id: g.category, label: copy.categories[g.category], count: g.items.length })),
      { id: "contact", label: t.contactTitle, count: 0 },
    ];
    for (const row of rows) {
      put(row.label, M.x, y, regular, 10, INK);
      if (row.count) put(String(row.count), M.x + widthOf(row.label, regular, 10) + 6, y, regular, 8.5, FAINT);
      contents.push({ id: row.id, top: y });
      y -= 18;
    }
    y -= 10;
  }

  // ------------------------------------------------------------- sections
  const anchors = new Map<string, { page: PDFPage; top: number }>();

  const section = (id: string, heading: string, count: number, lede?: string) => {
    const ledeLines = lede ? lines(lede, regular, 9) : [];
    ensure(40 + ledeLines.length * 13 + 90);
    y -= 14;
    anchors.set(id, { page, top: y + 14 });
    page.drawRectangle({ x: M.x, y: y - 15, width: 4, height: 16, color: ACCENT });
    put(heading, M.x + 13, y, bold, 15);
    const c = String(count);
    put(c, M.x + W - widthOf(c, bold, 11), y + 1, bold, 11, FAINT);
    y -= 24;
    page.drawLine({ start: { x: M.x, y }, end: { x: M.x + W, y }, thickness: 0.6, color: RULE });
    y -= 10;
    for (const line of ledeLines) {
      put(line, M.x, y, regular, 9, MUTED);
      y -= 13;
    }
    y -= 6;
  };

  // Websites: a two-column grid of linked cards.
  section("websites", copy.websitesTitle, live.length, copy.websitesLede);
  {
    const gap = 10;
    const pad = 11;
    const cw = (W - gap) / 2;
    const inner = cw - pad * 2;
    const measure = (w: (typeof live)[number]) => {
      const name = lines(w.name, bold, 10, inner);
      const summary = lines(w.summary, regular, 8.5, inner);
      return { w, name, summary, h: pad * 2 + name.length * 13 + summary.length * 11.5 + 4 + 10 };
    };
    for (let i = 0; i < live.length; i += 2) {
      const row = live.slice(i, i + 2).map(measure);
      const rh = Math.max(...row.map((c) => c.h));
      ensure(rh + gap);
      row.forEach((c, col) => {
        const x = M.x + col * (cw + gap);
        page.drawRectangle({ x, y: y - rh, width: cw, height: rh, borderColor: RULE, borderWidth: 0.7 });
        let top = y - pad;
        for (const l of c.name) {
          put(l, x + pad, top, bold, 10);
          top -= 13;
        }
        for (const l of c.summary) {
          put(l, x + pad, top, regular, 8.5, MUTED);
          top -= 11.5;
        }
        put(`${domain(c.w.url)} ›`, x + pad, y - rh + pad + 8, regular, 8, ACCENT);
        linkTo({ x, y: y - rh, w: cw, h: rh }, c.w.url);
      });
      y -= rh + gap;
    }
  }

  // Projects, one section per category.
  const chips = (tags: string[]) => {
    const size = 7.5;
    const ph = 5;
    const h = 13;
    const rows: { text: string; w: number }[][] = [[]];
    let used = 0;
    for (const tag of tags) {
      const w = widthOf(tag, regular, size) + ph * 2;
      if (used && used + w > W) {
        rows.push([]);
        used = 0;
      }
      rows[rows.length - 1].push({ text: tag, w });
      used += w + 4;
    }
    return {
      height: rows.length * (h + 4),
      draw: () => {
        for (const row of rows) {
          let x = M.x;
          for (const chip of row) {
            page.drawRectangle({ x, y: y - h, width: chip.w, height: h, color: SOFT });
            put(chip.text, x + ph, y - 3, regular, size, MUTED);
            x += chip.w + 4;
          }
          y -= h + 4;
        }
      },
    };
  };

  const entry = (p: Project) => {
    const internal = p.href?.startsWith("/");
    const badge = internal ? copy.writeUp : p.status === "in-progress" ? copy.inProgress : undefined;
    const badgeW = badge ? widthOf(badge, bold, 7) + 12 : 0;
    const title = lines(p.title, bold, 11, W - (badge ? badgeW + 12 : 0));
    const summary = lines(p.summary, regular, 9.5);
    const tagRows = chips(p.tags);
    const linkLabel = p.href ? `${internal ? copy.readMore : p.video ? copy.watch : `${copy.visit} · ${domain(p.href)}`} ›` : "";
    const height = title.length * 15 + 13 + summary.length * 13.5 + 6 + tagRows.height + (p.href ? 14 : 0) + 16;

    ensure(height);
    if (badge) {
      page.drawRectangle({ x: M.x + W - badgeW, y: y - 13, width: badgeW, height: 13, color: ACCENT_SOFT });
      put(badge, M.x + W - badgeW + 6, y - 3.5, bold, 7, ACCENT);
    }
    for (const l of title) {
      put(l, M.x, y, bold, 11);
      y -= 15;
    }
    put(p.context, M.x, y, regular, 8.5, MUTED);
    y -= 13;
    for (const l of summary) {
      put(l, M.x, y, regular, 9.5, INK);
      y -= 13.5;
    }
    y -= 6;
    tagRows.draw();
    if (p.href) {
      y -= 2;
      put(linkLabel, M.x, y, bold, 8.5, ACCENT);
      linkTo({ x: M.x, y: y - 10, w: widthOf(linkLabel, bold, 8.5), h: 12 }, absolute(p.href));
      y -= 12;
    }
    y -= 16;
  };

  for (const g of groups) {
    section(g.category, copy.categories[g.category], g.items.length);
    g.items.forEach(entry);
  }

  // --------------------------------------------------------------- contact
  {
    const pad = 14;
    const body = lines(t.contactBody, regular, 9, W - pad * 2);
    const cols: { label: string; value: string; url: string }[] = [
      { label: t.email, value: site.email, url: `mailto:${site.email}` },
      { label: t.phone, value: site.phone, url: `tel:${site.phoneHref}` },
      { label: t.website, value: domain(site.url), url: site.url },
      { label: t.cv, value: `${t.cvLink} ›`, url: site.url + resumeUrlFor(locale) },
    ];
    // Label-over-value columns keep the panel short enough to share the last
    // page with the final projects instead of sitting alone on a new one.
    const colW = (W - pad * 2) / cols.length;
    const h = pad * 2 + 20 + body.length * 12.5 + 8 + 24;
    ensure(h + 6);
    y -= 6;
    anchors.set("contact", { page, top: y + 10 });
    page.drawRectangle({ x: M.x, y: y - h, width: W, height: h, color: ACCENT_SOFT });
    page.drawRectangle({ x: M.x, y: y - h, width: 4, height: h, color: ACCENT });
    let top = y - pad;
    put(t.contactTitle, M.x + pad, top, bold, 14);
    top -= 20;
    for (const l of body) {
      put(l, M.x + pad, top, regular, 9, MUTED);
      top -= 12.5;
    }
    top -= 8;
    cols.forEach((c, i) => {
      const x = M.x + pad + i * colW;
      put(c.label, x, top, bold, 7.5, MUTED);
      put(c.value, x, top - 12, regular, 9, ACCENT);
      linkTo({ x, y: top - 22, w: widthOf(c.value, regular, 9), h: 12 }, c.url);
    });
    y -= h;
  }

  // ------------------------------------------- contents page numbers, footer
  const pages = doc.getPages();
  for (const row of contents) {
    const anchor = anchors.get(row.id);
    if (!anchor) continue;
    const n = String(pages.indexOf(anchor.page) + 1);
    contentsPage.drawText(n, {
      x: M.x + W - regular.widthOfTextAtSize(n, 10),
      y: row.top - 8,
      size: 10,
      font: regular,
      color: MUTED,
    });
    annotate(contentsPage, { x: M.x, y: row.top - 12, w: W, h: 16 }, {
      Dest: [anchor.page.ref, PDFName.of("XYZ"), PDFNull, PDFNumber.of(anchor.top + 10), PDFNull],
    });
  }

  pages.forEach((p, i) => {
    const left = clean(`${site.name}  ·  ${t.title}`);
    const right = `${i + 1} / ${pages.length}`;
    p.drawLine({ start: { x: M.x, y: 42 }, end: { x: M.x + W, y: 42 }, thickness: 0.5, color: RULE });
    p.drawText(left, { x: M.x, y: 30, size: 7.5, font: regular, color: FAINT });
    p.drawText(right, { x: M.x + W - regular.widthOfTextAtSize(right, 7.5), y: 30, size: 7.5, font: regular, color: FAINT });
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
