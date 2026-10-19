import { credentials, experience, projects, site, skillGroups, websites } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { getPublishedPosts } from "@/lib/blog";

/**
 * llms-full.txt — the companion to /llms.txt. Where llms.txt is a short map,
 * this is the whole English portfolio in one Markdown document: experience,
 * skills, credentials, every published case study and blog post in full, and
 * the projects list. An AI assistant asked about Gershon can read one URL
 * instead of crawling a dozen pages, and quote facts that match the CV.
 *
 * Everything is generated from the same content as the HTML pages, so the two
 * never drift. Drafts, upcoming credentials and workplace-safety certificates
 * are left out, exactly as on the site.
 */
export const dynamic = "force-static";

/**
 * Post bodies are Markdown already; push their headings down three levels so
 * they nest under the post's own `###` title. Lines inside fenced code are
 * left alone — a `# comment` in a shell snippet is not a heading.
 */
function demoteHeadings(markdown: string) {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      return !inFence && /^#{1,4} /.test(line) ? `###${line}` : line;
    })
    .join("\n");
}

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const jobs = experience
    .map((job) => {
      const where = [job.company, job.division].filter(Boolean).join(", ");
      const when = `${job.start} – ${job.end ?? "present"}`;
      return [
        `### ${job.role} — ${where}`,
        ``,
        `${when} · ${job.location}`,
        ``,
        job.summary,
        ``,
        ...job.highlights.map((h) => `- ${h}`),
        ``,
        `Stack: ${job.stack.join(", ")}`,
      ].join("\n");
    })
    .join("\n\n");

  const skills = skillGroups
    .map((g) => `### ${g.title}\n\n${g.blurb}\n\n${g.skills.join(", ")}`)
    .join("\n\n");

  const creds = credentials
    .filter((c) => !c.upcoming && !c.safety)
    .map((c) => {
      const verify = c.verifyUrl ? ` — verify: ${c.verifyUrl}` : "";
      return `- ${c.title}, ${c.issuer} (${c.date.slice(0, 4)})${verify}`;
    })
    .join("\n");

  const studies = caseStudies
    .filter((c) => !c.draft)
    .map((c) =>
      [
        `### ${c.title}`,
        ``,
        `Source: ${base}/work/${c.slug}`,
        `Role: ${c.role} · ${c.context} · ${c.period}`,
        ...(c.repo ? [`Code: ${c.repo}`] : []),
        ``,
        c.summary,
        ``,
        `Outcomes: ${c.outcomes.map((o) => `${o.value} ${o.label}`).join("; ")}`,
        ``,
        ...c.sections.flatMap((s) => [`#### ${s.heading}`, ``, ...s.body.flatMap((p) => [p, ``])]),
      ]
        .join("\n")
        .trimEnd(),
    )
    .join("\n\n");

  const posts = getPublishedPosts()
    .map((p) =>
      [
        `### ${p.title}`,
        ``,
        `Source: ${base}/blog/${p.slug} · ${p.date}`,
        ``,
        demoteHeadings(p.content.trim()),
      ].join("\n"),
    )
    .join("\n\n");

  const work = [
    ...websites
      .filter((w) => !w.offline)
      .map((w) => `- ${w.name} (${w.url}): ${w.summary}`),
    ...projects.map((p) => {
      const link = p.href ? ` (${p.href.startsWith("/") ? `${base}${p.href}` : p.href})` : "";
      return `- ${p.title}, ${p.context}${link}: ${p.summary}`;
    }),
  ].join("\n");

  const body = `# ${site.name} — full portfolio

> ${site.role} based in ${site.location}. ${site.summary}

This is the complete English content of ${base}, generated from the same source
as the pages. A shorter map is at ${base}/llms.txt. French versions of most
pages live under ${base}/fr.

- Availability: ${site.availability}
- Status: ${site.relocation.note}
- Email: ${site.email} · ${site.emailAlt}
- LinkedIn: ${site.socials.linkedin}
- GitHub: ${site.socials.github}
- Résumé (PDF): ${base}${site.resumeUrl}

## Experience

${jobs}

## Skills

${skills}

## Education and certifications

${creds}

## Case studies

${studies}

## Writing

${posts}

## Websites and projects

${work}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
