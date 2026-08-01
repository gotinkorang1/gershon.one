import type { Metadata } from "next";
import { Rss } from "lucide-react";
import { getPublishedPosts, getAllPostTags, toCard } from "@/lib/blog";
import { site } from "@/lib/site";
import { serialiseJsonLd } from "@/lib/json-ld";
import { BlogIndex } from "@/components/blog/blog-index";

const description =
  "Field notes on networking, systems administration, and the things I build and run.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? site.url}/blog`,
    title: `Blog — ${site.shortName}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `Blog — ${site.shortName}`, description },
};

export default function BlogIndexPage() {
  const posts = getPublishedPosts().map(toCard);
  const tags = getAllPostTags();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  // Marks the page as a Blog and lists its posts so search engines read it as a
  // listing, not a loose page. `blogPost` entries are lightweight pointers; each
  // post carries its own full BlogPosting node (with the same @id) on its page.
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${base}/blog#blog`,
    url: `${base}/blog`,
    name: `${site.shortName} — Writing`,
    description,
    inLanguage: "en-CA",
    author: { "@id": `${base}/#person` },
    publisher: { "@id": `${base}/#person` },
    isPartOf: { "@id": `${base}/#website` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${base}/blog/${p.slug}`,
      url: `${base}/blog/${p.slug}`,
      headline: p.title,
      description: p.summary,
      datePublished: p.date,
      keywords: p.tags.join(", "),
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
    ],
  };

  return (
    <div className="shell relative pb-24 pt-28 md:pt-32">
      {/* Soft accent wash behind the header — quiet visual warmth, no motion. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden"
      >
        <div
          className="absolute -left-1/4 -top-1/3 size-[34rem] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent-quiet), transparent 68%)" }}
        />
      </div>

      <header className="max-w-2xl" data-reveal-intro>
        <p className="label flex items-center gap-3">
          <span className="inline-block h-px w-6 bg-border-strong" />
          Writing
        </p>
        <h1 className="mt-4 text-jumbo font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-lede text-muted-foreground">{description}</p>
        <a
          href="/feed.xml"
          className="tap mt-6 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Rss className="size-3.5" />
          Subscribe via RSS
        </a>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No posts yet — check back soon.</p>
      ) : (
        <BlogIndex posts={posts} tags={tags} />
      )}

      {posts.length > 0 && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(blogLd) }}
        />
      )}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(breadcrumbs) }}
      />
    </div>
  );
}
