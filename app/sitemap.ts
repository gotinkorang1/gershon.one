import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { getPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const posts = getPublishedPosts();
  const frPosts = getPublishedPosts("fr");
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
    // Role pages (/for/…) are canonicalised to the home pages and left out:
    // they are the home page re-ordered for one role, not separate content.
    // Drafts are noindex, so listing them only wastes crawl budget.
    ...caseStudies
      .filter((c) => !c.draft)
      .flatMap((c) => {
        // Each study is published at /work/… and /fr/work/…. The alternates
        // mark them as translations of one another rather than competing
        // pages, and both URLs are listed: hreflang in a sitemap only counts
        // for URLs that appear as entries themselves.
        const english = `${base}/work/${c.slug}`;
        const french = `${base}/fr/work/${c.slug}`;
        const alternates = {
          languages: { "en-CA": english, "fr-CA": french, "x-default": english },
        };
        return [english, french].map((url, i) => ({
          url,
          lastModified: new Date(c.published),
          changeFrequency: "yearly" as const,
          priority: i === 0 ? 0.7 : 0.6,
          alternates,
        }));
      }),
    // Blog index + published posts (English-only, so no hreflang alternates).
    ...[`${base}/projects`, `${base}/fr/projects`].map((url, i) => ({
      url,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: i === 0 ? 0.8 : 0.7,
      alternates: {
        languages: {
          "en-CA": `${base}/projects`,
          "fr-CA": `${base}/fr/projects`,
          "x-default": `${base}/projects`,
        },
      },
    })),
    ...[`${base}/lab`, `${base}/fr/lab`].map((url) => ({
      url,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: { "en-CA": `${base}/lab`, "fr-CA": `${base}/fr/lab`, "x-default": `${base}/lab` },
      },
    })),
    ...[`${base}/blog`, `${base}/fr/blog`].map((url) => ({
      url,
      lastModified: posts[0] ? new Date(posts[0].date) : updated,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      alternates: {
        languages: { "en-CA": `${base}/blog`, "fr-CA": `${base}/fr/blog`, "x-default": `${base}/blog` },
      },
    })),
    ...posts.flatMap((p) => {
      const fr = frPosts.find((f) => f.slug === p.slug);
      const languages = {
        "en-CA": `${base}/blog/${p.slug}`,
        ...(fr ? { "fr-CA": `${base}/fr/blog/${p.slug}` } : {}),
        "x-default": `${base}/blog/${p.slug}`,
      };
      const entry = (url: string) => ({
        url,
        lastModified: new Date(p.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates: { languages },
      });
      return fr ? [entry(`${base}/blog/${p.slug}`), entry(`${base}/fr/blog/${p.slug}`)] : [entry(`${base}/blog/${p.slug}`)];
    }),
    // Tag archives are noindex (thin, near-duplicate), so they stay out.
  ];
}
