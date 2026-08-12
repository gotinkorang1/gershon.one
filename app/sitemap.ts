import type { MetadataRoute } from "next";
import { roleFocusProfiles, site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { getPublishedPosts, getTagSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const posts = getPublishedPosts();
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
    ...roleFocusProfiles.flatMap((profile) => {
      const english = `${base}/for/${profile.id}`;
      const french = `${base}/fr/for/${profile.id}`;
      const alternates = {
        languages: { "en-CA": english, "fr-CA": french, "x-default": english },
      };
      return [
        {
          url: english,
          lastModified: updated,
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates,
        },
        {
          url: french,
          lastModified: updated,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates,
        },
      ];
    }),
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
    // Blog index + published posts (English-only, so no hreflang alternates).
    {
      url: `${base}/lab`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: posts[0] ? new Date(posts[0].date) : updated,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    // Tag archive pages.
    ...getTagSlugs().map(({ slug }) => ({
      url: `${base}/blog/tag/${slug}`,
      lastModified: posts[0] ? new Date(posts[0].date) : updated,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ];
}
