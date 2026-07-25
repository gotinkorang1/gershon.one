import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((c) => ({
      url: `${base}/work/${c.slug}`,
      lastModified: new Date(c.published),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
