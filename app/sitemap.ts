import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  // A hand-bumped content date, not `new Date()`. Building at deploy time
  // stamped every page "changed today" on every deploy, so crawlers learned to
  // ignore the field. This changes only when the content actually does.
  const updated = new Date(site.contentUpdated);
  return [
    {
      url: base,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "en-CA": base,
          "fr-CA": `${base}/fr`,
          "x-default": base,
        },
      },
    },
    {
      url: `${base}/fr`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          "en-CA": base,
          "fr-CA": `${base}/fr`,
          "x-default": base,
        },
      },
    },
    // Drafts are noindex, so listing them only wastes crawl budget.
    ...caseStudies
      .filter((c) => !c.draft)
      .map((c) => ({
        url: `${base}/work/${c.slug}`,
        lastModified: new Date(c.published),
        changeFrequency: "yearly" as const,
        priority: 0.7,
        // Each study is published at /work/… and /fr/work/…. Without this the
        // two read as unrelated pages competing for the same content rather
        // than as translations of one another.
        alternates: {
          languages: {
            "en-CA": `${base}/work/${c.slug}`,
            "fr-CA": `${base}/fr/work/${c.slug}`,
            "x-default": `${base}/work/${c.slug}`,
          },
        },
      })),
  ];
}
