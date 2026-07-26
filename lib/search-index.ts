import { experience, skillGroups, credentials, site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";

export type SearchDoc = {
  id: string;
  title: string;
  subtitle: string;
  group: "Experience" | "Capabilities" | "Credentials" | "Case studies" | "Pages";
  href: string;
  /** Everything matchable, lower-cased once at module load. */
  haystack: string;
};

function doc(d: Omit<SearchDoc, "haystack"> & { body: string }): SearchDoc {
  const { body, ...rest } = d;
  return {
    ...rest,
    haystack: `${rest.title} ${rest.subtitle} ${rest.group} ${body}`.toLowerCase(),
  };
}

const searchIndex: SearchDoc[] = [
  ...experience.map((j) =>
    doc({
      id: `job-${j.company}-${j.start}`,
      title: j.role,
      subtitle: j.company,
      group: "Experience",
      href: "#experience",
      body: `${j.summary} ${j.highlights.join(" ")} ${j.stack.join(" ")} ${j.division ?? ""} ${j.start} ${j.end ?? "present"}`,
    }),
  ),

  ...skillGroups.flatMap((g) =>
    g.skills.map((s) =>
      doc({
        id: `skill-${g.title}-${s}`,
        title: s,
        subtitle: g.title,
        group: "Capabilities",
        href: "#capabilities",
        body: g.blurb,
      }),
    ),
  ),

  ...credentials.map((c) =>
    doc({
      id: `cred-${c.title}`,
      title: c.title,
      subtitle: c.issuer,
      group: "Credentials",
      href: "#credentials",
      body: `${c.detail ?? ""} ${c.date} ${c.credentialId ?? ""} ${c.kind}`,
    }),
  ),

  ...caseStudies.map((c) =>
    doc({
      id: `case-${c.slug}`,
      title: c.title,
      subtitle: `${c.period} · ${c.readingMinutes} min read`,
      group: "Case studies",
      href: `/work/${c.slug}`,
      body: `${c.summary} ${c.tags.join(" ")} ${c.sections.map((s) => `${s.heading} ${s.body.join(" ")}`).join(" ")}`,
    }),
  ),

  doc({
    id: "page-brief",
    title: "Candidate brief",
    subtitle: "Availability, authorisation and core skills",
    group: "Pages",
    href: "/brief",
    body: "recruiter hiring screener availability work permit notice salary compensation",
  }),
  doc({
    id: "page-cv",
    title: "Download CV",
    subtitle: "PDF résumé",
    group: "Pages",
    href: site.resumeUrl,
    body: "cv resume pdf download curriculum vitae",
  }),
];

/**
 * Scored substring matching. Title hits outrank subtitle hits, which outrank
 * body hits, and every term must appear somewhere — so "mikrotik failover"
 * narrows rather than widens.
 */
export function searchDocs(query: string, limit = 8): SearchDoc[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return searchIndex
    .map((d) => {
      const title = d.title.toLowerCase();
      const subtitle = d.subtitle.toLowerCase();
      let score = 0;

      for (const term of terms) {
        if (!d.haystack.includes(term)) return { d, score: 0 };
        if (title.startsWith(term)) score += 12;
        else if (title.includes(term)) score += 8;
        else if (subtitle.includes(term)) score += 4;
        else score += 1;
      }
      return { d, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.d);
}
