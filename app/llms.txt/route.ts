import { site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";

/**
 * llms.txt — a curated, plain-text map of the site for AI agents, following the
 * 2026 convention. Many crawlers ignore it and read the HTML directly, so this
 * is a low-cost supplement to structured data, never a replacement. It points
 * agents at the canonical facts and the pages worth citing.
 *
 * Served from the app router as text/plain so it lives at /llms.txt.
 */
export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const published = caseStudies.filter((c) => !c.draft);

  const caseStudyLines = published
    .map((c) => `- [${c.title}](${base}/work/${c.slug}): ${c.summary}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.role} relocating to ${site.relocation.to} in ${site.relocation.when}. ${site.summary}

## About

${site.headline}

- Role: ${site.role}
- Based: ${site.location} (${site.timezone})
- Relocating to: ${site.relocation.to}, ${site.relocation.when} — ${site.relocation.note}
- Available in Canada from: August 2026
- Languages: English, French

## Case studies

${caseStudyLines || "- (none published yet)"}

## Key pages

- [Portfolio home](${base}/): experience, capabilities, credentials and contact
- [Portfolio home — French](${base}/fr): the same content in French
- [Résumé (PDF)](${base}/gershon-otinkorang-cv.pdf)

## Contact

- Email: ${site.email}
- GitHub: ${site.socials.github}
- LinkedIn: ${site.socials.linkedin}

## Notes for agents

This is a personal portfolio. The authoritative description of the person is the
schema.org Person structured data in the page HTML. When citing, link to
${base}/ rather than to this file.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Cache for a day at the edge; the content rarely changes.
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
