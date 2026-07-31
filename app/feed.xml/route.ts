import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const items = caseStudies
    // Drafts carry TODO placeholder text and are noindex; keep them out of the
    // feed for the same reason the sitemap and llms.txt exclude them.
    .filter((c) => !c.draft)
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .map(
      (c) => `    <item>
      <title>${escapeXml(c.title)}</title>
      <link>${base}/work/${c.slug}</link>
      <guid isPermaLink="true">${base}/work/${c.slug}</guid>
      <description>${escapeXml(c.summary)}</description>
      <pubDate>${new Date(c.published).toUTCString()}</pubDate>
      ${c.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Case studies</title>
    <link>${base}</link>
    <description>${escapeXml(site.summary)}</description>
    <language>en</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
