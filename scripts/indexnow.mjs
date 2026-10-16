#!/usr/bin/env node
/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver …) which pages
 * changed, so they recrawl them within minutes instead of on their own
 * schedule.
 *
 * Reads the live sitemap and submits URLs whose <lastmod> is recent, or every
 * URL with --all. Run by .github/workflows/indexnow.yml after each successful
 * production deploy; can also be run by hand:
 *
 *   node scripts/indexnow.mjs          # pages changed in the last 7 days
 *   node scripts/indexnow.mjs --all    # every page in the sitemap
 *   node scripts/indexnow.mjs --dry-run  # list what would be sent, send nothing
 *
 * The key is public by design: IndexNow proves ownership by fetching
 * /<key>.txt from the site and checking it matches.
 */

const SITE = process.env.SITE_URL ?? "https://www.gershon.one";
const KEY = "14abe84f463d2a4c77f2c0c4b5b97c04";
const RECENT_DAYS = 7;

async function main() {
  const all = process.argv.includes("--all");
  const dryRun = process.argv.includes("--dry-run");

  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap: HTTP ${res.status}`);
  const xml = await res.text();

  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  }));
  const urlList = entries
    .filter((e) => e.loc && (all || (e.lastmod && Date.parse(e.lastmod) >= cutoff)))
    .map((e) => e.loc);

  if (urlList.length === 0) {
    console.log(`IndexNow: no pages changed in the last ${RECENT_DAYS} days; nothing to submit.`);
    return;
  }

  if (dryRun) {
    console.log(`IndexNow (dry run): would submit ${urlList.length} URL(s)`);
    for (const url of urlList) console.log(`  ${url}`);
    return;
  }

  const host = new URL(SITE).host;
  const submit = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
  });

  // 200 = accepted, 202 = accepted, key still being verified.
  console.log(`IndexNow: submitted ${urlList.length} URL(s), HTTP ${submit.status}`);
  for (const url of urlList) console.log(`  ${url}`);
  if (submit.status !== 200 && submit.status !== 202) {
    console.error(await submit.text());
    process.exitCode = 1;
  }
}

// Exit codes are set, not forced: process.exit() while fetch sockets are
// still closing trips a libuv assertion on Windows.
await main();
