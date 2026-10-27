#!/usr/bin/env node
/**
 * Turns posts from a LinkedIn data export into blog posts in content/blog/.
 *
 * LinkedIn's API no longer lets personal apps read a member's posts, so the
 * export is the sanctioned way to get them out. Request it from LinkedIn under
 * Settings → Data privacy → Get a copy of your data (pick "Posts"), unzip it,
 * then run:
 *
 *   node scripts/import-linkedin.mjs path/to/Shares.csv            # write new posts
 *   node scripts/import-linkedin.mjs path/to/export-folder --dry-run
 *   node scripts/import-linkedin.mjs path/to/Shares.csv --publish  # skip draft mode
 *
 * New posts are written as drafts so the generated title and summary can be
 * reviewed before they go live — and because the export also contains posts
 * shared with connections only. Each imported post records its LinkedIn URL in
 * front matter (`linkedin:`), which is how re-runs skip posts already imported
 * and how scripts/share-to-linkedin.mjs knows not to share them back.
 */

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const BLOG_DIR = "content/blog";
const TITLE_MAX = 70;
const SUMMARY_MAX = 160;

/** RFC 4180 CSV: quoted fields may contain commas, doubled quotes and newlines. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [header = [], ...body] = rows.filter((r) => r.some((cell) => cell.trim()));
  const keys = header.map((h) => h.replace(/^﻿/, "").trim());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}

/**
 * The export keeps LinkedIn's internal markup for hashtags and mentions
 * (`{hashtag|\#|Networking}`, `@[Ada Lovelace](urn:li:person:…)`); turn those
 * back into what the reader saw on LinkedIn.
 */
export function cleanCommentary(text) {
  return text
    .replace(/\{hashtag\|\\?#\|([^}]+)\}/g, "#$1")
    .replace(/@\[([^\]]+)\]\(urn:li:[^)]+\)/g, "$1")
    .replace(/\\([#*_~|{}[\]()<>@\\])/g, "$1")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Hashtags become tags; a trailing block of hashtag-only lines is dropped from the body. */
export function splitHashtags(text) {
  const tags = [...new Set([...text.matchAll(/(?:^|\s)#([\p{L}\p{N}_]+)/gu)].map((m) => m[1]))];
  const lines = text.split("\n");
  while (lines.length && /^(\s*#[\p{L}\p{N}_]+)+\s*$/u.test(lines.at(-1))) lines.pop();
  return { body: lines.join("\n").trim(), tags };
}

const plain = (s) =>
  s
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Cuts at a word boundary and adds an ellipsis when the text is longer than `max`. */
export function clip(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max * 0.6)).replace(/[\s,;:.–—-]+$/, "")}…`;
}

/** Same rules as slugify() in lib/blog.ts, so slugs match what the site generates. */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Front matter values are one line each and must not look like a `[list]`. */
// The site's parser also strips a quote at either end, so straight quotes there
// become typographic ones.
const scalar = (s) =>
  s
    .replace(/\s+/g, " ")
    .trim()
    .replace(/"([^"]*)"/g, "“$1”")
    .replace(/^\[/, "(")
    .replace(/\]$/, ")")
    .replace(/^["']/, "“")
    .replace(/["']$/, "”");

/** One export row → { slug, file contents }, or null for rows with no text of their own. */
export function toPost(row, { publish = false } = {}) {
  const raw = cleanCommentary(row.ShareCommentary ?? "");
  if (!raw) return null;

  const { body: text, tags } = splitHashtags(raw);
  const blocks = text.split(/\n\s*\n/);
  const firstLine = plain(text.split("\n").find((l) => plain(l)) ?? "");
  const title = clip(firstLine.replace(/[.:!?]+$/, ""), TITLE_MAX);
  // A one-line opening paragraph is the post's headline: it becomes the title
  // rather than repeating under it on the page.
  const headline = blocks.length > 1 && !blocks[0].trim().includes("\n");
  const body = headline ? blocks.slice(1).join("\n\n").trim() : text;
  const paragraphs = body.split(/\n\s*\n/).map(plain).filter(Boolean);
  const summary = clip(paragraphs.slice(0, 2).join(" "), SUMMARY_MAX);
  const date = (row.Date ?? "").slice(0, 10);
  const link = row.ShareLink?.trim();

  let content = body;
  if (row.SharedUrl?.trim()) content += `\n\n[Link shared in the original post](${row.SharedUrl.trim()})`;

  const frontmatter = [
    "---",
    `title: ${scalar(title)}`,
    `date: ${date}`,
    `summary: ${scalar(summary)}`,
    `tags: [${["LinkedIn", ...tags].map((t) => t.replace(/,/g, "")).join(", ")}]`,
    `draft: ${publish ? "false" : "true"}`,
    `linkedin: ${link}`,
    "---",
  ].join("\n");

  return {
    slug: slugify(title) || `linkedin-${date}`,
    date,
    title,
    link,
    visibility: row.Visibility ?? "",
    file: `${frontmatter}\n\n${content}\n`,
  };
}

/** LinkedIn URLs of every post already in the blog, so re-runs are idempotent. */
export function importedLinks(dir = BLOG_DIR) {
  return new Set(
    readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => readFileSync(path.join(dir, f), "utf8").match(/^linkedin:\s*(\S+)/m)?.[1])
      .filter(Boolean),
  );
}

function resolveCsv(input) {
  if (!input) throw new Error("Pass the path to Shares.csv (or the unzipped export folder).");
  if (statSync(input).isDirectory()) {
    const found = readdirSync(input, { recursive: true }).find((f) => /(^|[\\/])Shares\.csv$/i.test(String(f)));
    if (!found) throw new Error(`No Shares.csv found under ${input}`);
    return path.join(input, String(found));
  }
  return input;
}

function main(argv) {
  const dryRun = argv.includes("--dry-run");
  const publish = argv.includes("--publish");
  const csv = resolveCsv(argv.find((a) => !a.startsWith("--")));

  const rows = parseCsv(readFileSync(csv, "utf8"));
  const seen = importedLinks();
  const written = [];
  let skipped = 0;

  for (const row of rows) {
    const post = toPost(row, { publish });
    if (!post || !post.link || seen.has(post.link)) {
      skipped++;
      continue;
    }
    // A different post may already own this slug; the date keeps both.
    let slug = post.slug;
    if (existsSync(path.join(BLOG_DIR, `${slug}.md`))) slug = `${slug}-${post.date}`;
    const target = path.join(BLOG_DIR, `${slug}.md`);

    if (!dryRun) writeFileSync(target, post.file);
    seen.add(post.link);
    written.push({ ...post, target });
  }

  for (const p of written) {
    const note = /CONNECTIONS/i.test(p.visibility) ? "  (connections-only on LinkedIn)" : "";
    console.log(`${dryRun ? "would write" : "wrote"} ${p.target}  ${p.date}  ${p.title}${note}`);
  }
  console.log(
    `\n${written.length} new post${written.length === 1 ? "" : "s"}, ${skipped} skipped (already imported or no text).` +
      (written.length && !publish ? " New posts are drafts: review them, then set `draft: false`." : ""),
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
