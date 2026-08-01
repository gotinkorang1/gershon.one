import { caseStudies } from "@/lib/case-studies";
import { getPublishedPosts } from "@/lib/blog";
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

  // One feed for both case studies and blog posts, newest first. Drafts are
  // excluded (placeholder text / noindex), matching the sitemap and llms.txt.
  type Entry = { title: string; link: string; summary: string; date: string; tags: string[] };
  const entries: Entry[] = [
    ...caseStudies
      .filter((c) => !c.draft)
      .map((c) => ({
        title: c.title,
        link: `${base}/work/${c.slug}`,
        summary: c.summary,
        date: c.published,
        tags: [...c.tags],
      })),
    ...getPublishedPosts().map((p) => ({
      title: p.title,
      link: `${base}/blog/${p.slug}`,
      summary: p.summary,
      date: p.date,
      tags: p.tags,
    })),
  ];

  const items = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${e.link}</link>
      <guid isPermaLink="true">${e.link}</guid>
      <description>${escapeXml(e.summary)}</description>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      ${e.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Writing &amp; case studies</title>
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
