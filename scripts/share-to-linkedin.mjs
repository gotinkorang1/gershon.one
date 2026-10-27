#!/usr/bin/env node
/**
 * Shares newly published blog posts to LinkedIn, through LinkedIn's official
 * Posts API and the self-serve `w_member_social` permission.
 *
 * Run by .github/workflows/share-to-linkedin.yml on every push to main. A post
 * is shared when the push publishes it — the file is new, or `draft: true`
 * became `draft: false` — and it is not:
 *   - an import from LinkedIn (front matter `linkedin:`), which would loop;
 *   - opted out with `share: false`;
 *   - dated before SHARE_SINCE, so older articles are never re-announced.
 *
 *   node scripts/share-to-linkedin.mjs --before <sha> --after <sha>
 *   node scripts/share-to-linkedin.mjs --slug my-post        # share one post
 *   add --dry-run to print what would be posted without calling LinkedIn
 *
 * Environment: LINKEDIN_ACCESS_TOKEN (required unless --dry-run),
 * LINKEDIN_PERSON_URN (optional; looked up from the token when absent),
 * SITE_URL (defaults to https://www.gershon.one).
 */

import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const BLOG_DIR = "content/blog";
/** Posts dated before the day sharing was switched on stay off LinkedIn. */
export const SHARE_SINCE = "2026-10-27";
const LINKEDIN_VERSION = process.env.LINKEDIN_VERSION ?? "202609";
const LIVE_TIMEOUT_MS = 15 * 60_000;
const LIVE_POLL_MS = 20_000;

/** The subset of lib/blog.ts's front matter rules this script needs. */
export function frontmatter(raw) {
  const block = raw?.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (!block) return null;
  /** @type {Record<string, string | string[] | boolean>} */
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value.slice(1, -1).split(",").map((s) => s.replace(/^["']|["']$/g, "").trim()).filter(Boolean);
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      data[key] = value.replace(/^["']|["']$/g, "").trim();
    }
  }
  return data;
}

/** Whether this post may go to LinkedIn at all, whatever the push did. */
export function shareable(data) {
  return Boolean(
    data &&
      data.draft !== true &&
      !data.linkedin &&
      data.share !== false &&
      typeof data.date === "string" &&
      data.date >= SHARE_SINCE,
  );
}

/** True when the push took a post from absent or draft to published. */
export function publishedByPush(before, after) {
  return shareable(after) && (!before || before.draft === true);
}

/** LinkedIn's "little text" format treats these as markup unless escaped. */
export function escapeLittleText(text) {
  return text.replace(/[\\|{}@[\]()<>#*_~]/g, (ch) => `\\${ch}`);
}

const hashtag = (tag) => tag.replace(/[^\p{L}\p{N}]+/gu, "");

export function buildPayload({ author, url, title, summary, tags }) {
  const hashtags = tags.map(hashtag).filter(Boolean).map((t) => `#${t}`).join(" ");
  // Hashtags are left unescaped on purpose so LinkedIn links them.
  const commentary = `${escapeLittleText(title)}\n\n${escapeLittleText(summary)}${hashtags ? `\n\n${hashtags}` : ""}`;
  return {
    author,
    commentary,
    visibility: "PUBLIC",
    distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] },
    content: { article: { source: url, title, description: summary } },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8" });
const isZeroSha = (sha) => !sha || /^0+$/.test(sha);

function showAt(sha, file) {
  try {
    return git("show", `${sha}:${file}`);
  } catch {
    return null; // not in that commit
  }
}

/** Slugs of English posts this push published. Translations in fr/ are never shared. */
export function postsPublishedBetween(before, after) {
  const range = isZeroSha(before) ? [after] : [before, after];
  const changed = (isZeroSha(before)
    ? git("show", "--name-only", "--format=", after)
    : git("diff", "--name-only", ...range, "--", `${BLOG_DIR}/*.md`)
  )
    .split("\n")
    .filter((f) => /^content\/blog\/[^/]+\.md$/.test(f));

  return changed
    .filter((file) => {
      const was = isZeroSha(before) ? null : frontmatter(showAt(before, file));
      const now = frontmatter(showAt(after, file));
      return publishedByPush(was, now);
    })
    .map((file) => file.slice(`${BLOG_DIR}/`.length, -".md".length));
}

async function waitUntilLive(url) {
  const deadline = Date.now() + LIVE_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" }).catch(() => null);
    if (res?.ok) return;
    await new Promise((r) => setTimeout(r, LIVE_POLL_MS));
  }
  throw new Error(`${url} was not live after ${LIVE_TIMEOUT_MS / 60_000} minutes; not sharing a broken link.`);
}

async function linkedin(path, token, init = {}) {
  const res = await fetch(`https://api.linkedin.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "LinkedIn-Version": LINKEDIN_VERSION,
      "X-Restli-Protocol-Version": "2.0.0",
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (res.status === 401) {
    throw new Error(
      "LinkedIn rejected the access token (401). Tokens expire after 60 days — generate a new one and update the LINKEDIN_ACCESS_TOKEN secret.",
    );
  }
  if (!res.ok) throw new Error(`LinkedIn ${init.method ?? "GET"} ${path} failed: ${res.status} ${await res.text()}`);
  return res;
}

async function personUrn(token) {
  if (process.env.LINKEDIN_PERSON_URN) return process.env.LINKEDIN_PERSON_URN;
  const res = await linkedin("/v2/userinfo", token);
  const { sub } = await res.json();
  return `urn:li:person:${sub}`;
}

function summaryLine(text) {
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`);
}

async function main(argv) {
  const arg = (name) => argv[argv.indexOf(name) + 1];
  const dryRun = argv.includes("--dry-run");
  const site = (process.env.SITE_URL ?? "https://www.gershon.one").replace(/\/$/, "");

  let slugs;
  if (argv.includes("--slug")) {
    const slug = arg("--slug");
    const file = `${BLOG_DIR}/${slug}.md`;
    if (!existsSync(file)) throw new Error(`No post at ${file}`);
    const data = frontmatter(readFileSync(file, "utf8"));
    // A manual run skips the date cutoff but never shares drafts or imports.
    if (!data || data.draft === true || data.linkedin) throw new Error(`${slug} is a draft or came from LinkedIn; not sharing it.`);
    slugs = [slug];
  } else {
    slugs = postsPublishedBetween(arg("--before"), arg("--after") ?? "HEAD");
  }

  if (!slugs.length) {
    summaryLine("No newly published posts to share.");
    return;
  }

  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token && !dryRun) {
    summaryLine("LINKEDIN_ACCESS_TOKEN is not set; skipping. See docs/linkedin.md to set it up.");
    return;
  }
  const author = dryRun && !token ? "urn:li:person:DRY_RUN" : await personUrn(token);

  for (const slug of slugs) {
    const data = frontmatter(readFileSync(`${BLOG_DIR}/${slug}.md`, "utf8"));
    const url = `${site}/blog/${slug}`;
    const payload = buildPayload({
      author,
      url,
      title: data.title,
      summary: data.description || data.summary,
      tags: Array.isArray(data.tags) ? data.tags : [],
    });

    if (dryRun) {
      console.log(JSON.stringify(payload, null, 2));
      continue;
    }
    await waitUntilLive(url);
    const res = await linkedin("/rest/posts", token, { method: "POST", body: JSON.stringify(payload) });
    const id = res.headers.get("x-restli-id");
    summaryLine(`Shared “${data.title}” to LinkedIn${id ? `: https://www.linkedin.com/feed/update/${id}` : ""}`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
