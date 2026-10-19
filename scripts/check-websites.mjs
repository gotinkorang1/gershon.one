#!/usr/bin/env node
/**
 * Checks every live site listed on the Projects page and flags the ones whose
 * `offline` marker no longer matches reality — a site that went down, or one
 * that came back (as Autism Destigma did in October 2026).
 *
 * Run daily by .github/workflows/website-status.yml, which turns any change
 * into a pull request. Can also be run by hand:
 *
 *   node scripts/check-websites.mjs           # report only
 *   node scripts/check-websites.mjs --write   # also flip `offline` in the data file
 *
 * Reads lib/content/projects.ts as text rather than importing it, so it needs
 * no TypeScript tooling. Each website is one line in that file; the parser
 * fails loudly if that ever stops being true.
 */

import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const DATA_FILE = "lib/content/projects.ts";
const ATTEMPTS = 3;
const RETRY_DELAY_MS = 10_000;
const TIMEOUT_MS = 20_000;

/** Pulls { slug, url, offline } out of each one-line entry in `websites`. */
export function parseWebsites(source) {
  const block = source.match(/export const websites: Website\[\] = \[\r?\n([\s\S]*?)\r?\n\];/)?.[1];
  if (!block) throw new Error(`Could not find the websites array in ${DATA_FILE}`);

  return block
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith("//"))
    .map((line) => {
      const slug = line.match(/slug: "([^"]+)"/)?.[1];
      const url = line.match(/url: "([^"]+)"/)?.[1];
      if (!slug || !url) {
        throw new Error(`Expected one website per line in ${DATA_FILE}, got:\n${line}`);
      }
      return { slug, url, offline: /offline: true/.test(line) };
    });
}

/**
 * Down means the site is gone or broken for visitors: no response, a 5xx, or
 * a missing page. 401/403/429 mean a server answered but refused a bot — the
 * site is up for people, so those count as up.
 */
export function isDown(result) {
  if (result.error) return true;
  return result.status >= 500 || result.status === 404 || result.status === 410;
}

/** Adds or removes `offline: true` on one website's line. */
export function setOffline(source, slug, offline) {
  const lines = source.split("\n");
  const index = lines.findIndex((line) => line.includes(`slug: "${slug}"`));
  if (index === -1) throw new Error(`No website with slug "${slug}"`);

  let line = lines[index].replace(/, offline: true/, "");
  if (offline) line = line.replace(/ \},?(\r?)$/, (end) => `, offline: true${end}`);
  lines[index] = line;
  return lines.join("\n");
}

async function probe(url) {
  for (let attempt = 1; ; attempt++) {
    let result;
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: {
          // Some hosts reject requests without a browser-like agent.
          "user-agent": "Mozilla/5.0 (compatible; gershon.one-status/1.0; +https://www.gershon.one/projects)",
          accept: "text/html,*/*",
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      result = { status: res.status };
    } catch (err) {
      result = { error: err instanceof Error ? err.message : String(err) };
    }
    // Retry before calling a site down, so one slow response doesn't flip it.
    if (!isDown(result) || attempt === ATTEMPTS) return result;
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  }
}

function describe(result) {
  return result.error ? `error: ${result.error}` : `HTTP ${result.status}`;
}

async function main() {
  const write = process.argv.includes("--write");
  let source = readFileSync(DATA_FILE, "utf8");
  const sites = parseWebsites(source);

  const results = await Promise.all(sites.map(async (site) => ({ site, result: await probe(site.url) })));

  const changes = [];
  const rows = [];
  for (const { site, result } of results) {
    const down = isDown(result);
    rows.push(`| ${site.slug} | ${describe(result)} | ${down ? "down" : "up"} | ${site.offline ? "offline" : "live"} |`);
    if (down !== site.offline) {
      changes.push({ ...site, down, detail: describe(result) });
      if (write) source = setOffline(source, site.slug, down);
    }
  }

  const report = [
    `| Site | Response | Status | Listed as |`,
    `| --- | --- | --- | --- |`,
    ...rows,
  ].join("\n");
  console.log(report);

  if (write && changes.length) writeFileSync(DATA_FILE, source);

  const body = changes.length
    ? [
        "The daily website check found sites whose `offline` flag no longer matches reality:",
        "",
        ...changes.map((c) =>
          c.down
            ? `- **${c.slug}** went down (${c.detail}). Marked \`offline\`, so its card stops linking to it.`
            : `- **${c.slug}** is back (${c.detail}). Removed \`offline\`. If it has no \`image\`, add a 960×600 screenshot to \`public/projects/\`.`,
        ),
        "",
        "Each site is checked up to three times before it counts as down. Close this PR if a change looks like a false alarm.",
        "",
        "<details><summary>Full report</summary>",
        "",
        report,
        "",
        "</details>",
      ].join("\n")
    : "";

  console.log(changes.length ? `\n${changes.length} change(s).` : "\nAll flags match.");

  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changes.length > 0}\n`);
    if (body) writeFileSync("website-status.md", body);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
