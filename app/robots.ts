import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /brief holds unanswered placeholders; /api serves no indexable content.
        disallow: ["/brief", "/api/"],
      },
      {
        // Bing honours a named bingbot block over the wildcard, and crawl-delay
        // is only read here — Google ignores it entirely.
        userAgent: "bingbot",
        allow: "/",
        disallow: ["/brief", "/api/"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
