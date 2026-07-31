import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  // /api serves no indexable content. /brief is kept out of search by a
  // `noindex` meta tag (see app/brief/page.tsx) rather than a Disallow:
  // blocking the crawl would stop Google reading that noindex, so a linked
  // bare URL could still surface. Allowing the crawl lets the noindex win.
  const disallow = ["/api/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        // Bing honours a named bingbot block over the wildcard, and crawl-delay
        // is only read here — Google ignores it entirely.
        userAgent: "bingbot",
        allow: "/",
        disallow,
        crawlDelay: 1,
      },
      {
        // AI crawlers split into search agents (answer live queries and can
        // cite this site) and training agents (ingest content into model
        // datasets). Both are welcome here by choice: for a portfolio built to
        // be found, being cited in an AI answer and being "known" to a model
        // are both wins. Named explicitly so the decision is deliberate and
        // survives a future wildcard change, not left to inference.
        userAgent: [
          // Search / live-answer agents
          "OAI-SearchBot",
          "Claude-SearchBot",
          "ChatGPT-User",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          // Training agents
          "GPTBot",
          "ClaudeBot",
          "anthropic-ai",
          "CCBot",
          "Applebot-Extended",
          "Bytespider",
        ],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
