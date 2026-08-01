import fs from "node:fs";
import path from "node:path";

/**
 * File-based blog. Each post is a Markdown file in `content/blog/` with a small
 * YAML-ish frontmatter block. Reading happens at build time (this module uses
 * `fs`, so it must only be imported from server components / route handlers),
 * which keeps every post static and adds no client JavaScript.
 *
 * Frontmatter format (all on one line each):
 *
 *   ---
 *   title: Bonding eight Starlink terminals
 *   date: 2026-08-01
 *   summary: A one-line description used on the index and in search snippets.
 *   tags: [Networking, MikroTik, Starlink]
 *   draft: false
 *   ---
 *
 *   Markdown body…
 */

export type Post = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-08-01". */
  date: string;
  summary: string;
  /** Optional cover image path under /public, e.g. "/my-cover.jpg". */
  cover?: string;
  tags: string[];
  draft: boolean;
  /** Raw Markdown body (frontmatter stripped). */
  content: string;
  readingMinutes: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** ~200 words per minute; never reports zero. */
function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Deliberately tiny frontmatter parser rather than a YAML dependency. It only
 * needs to handle the documented format above — quoted or bare scalars, a
 * `[a, b]` list for tags, and a boolean for draft.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, string | string[] | boolean>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, block, content] = match;
  const data: Record<string, string | string[] | boolean> = {};
  const unquote = (s: string) => s.replace(/^["']|["']$/g, "").trim();

  for (const line of block.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!key) continue;

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => unquote(s))
        .filter(Boolean);
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      data[key] = unquote(value);
    }
  }

  return { data, content: content.trimStart() };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = parseFrontmatter(raw);
      const asString = (v: unknown) => (typeof v === "string" ? v : "");

      return {
        slug: file.replace(/\.md$/, ""),
        title: asString(data.title) || file.replace(/\.md$/, ""),
        date: asString(data.date),
        summary: asString(data.summary),
        cover: asString(data.cover) || undefined,
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: data.draft === true,
        content,
        readingMinutes: readingMinutes(content),
      } satisfies Post;
    });

  // Newest first.
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Published posts only — drafts are noindex and kept out of listings/feeds. */
export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => !post.draft);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** Every published tag, de-duplicated. */
export function getAllPostTags(): string[] {
  return [...new Set(getPublishedPosts().flatMap((p) => p.tags))].sort();
}

/** Lightweight post shape for the index — everything but the (heavy) body. */
export type PostCard = Omit<Post, "content">;

export function toCard({ content: _content, ...rest }: Post): PostCard {
  return rest;
}

/**
 * URL-safe id from heading text. Kept deliberately simple (no dependency); the
 * same function generates the table-of-contents ids and the ids assigned to
 * the rendered headings, so they always match.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type Heading = { level: number; text: string; id: string };

/** Extract the h2/h3 headings from a post's Markdown for its table of contents. */
export function getHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*$/);
    if (match) {
      const text = match[2].replace(/[*_`]/g, "").trim();
      headings.push({ level: match[1].length, text, id: slugify(text) });
    }
  }
  return headings;
}

/**
 * Posts related to `slug`, ranked by shared tags then recency. Falls back to
 * the most recent posts when nothing shares a tag, so the section is never empty.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const published = getPublishedPosts();
  const current = published.find((p) => p.slug === slug);
  if (!current) return [];

  const ranked = published
    .filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, shared: p.tags.filter((t) => current.tags.includes(t)).length }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    );

  const withShared = ranked.filter((r) => r.shared > 0);
  return (withShared.length ? withShared : ranked).slice(0, limit).map((r) => r.post);
}
