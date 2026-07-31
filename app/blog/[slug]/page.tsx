import type { Metadata } from "next";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";
import { serialiseJsonLd } from "@/lib/json-ld";

export function generateStaticParams() {
  // All posts (including drafts) so a draft URL resolves for preview; drafts
  // are noindex and absent from listings, sitemap and feed.
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.draft ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${base}/blog/${post.slug}`,
    url: `${base}/blog/${post.slug}`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: "en-CA",
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: site.name, url: base },
    publisher: { "@id": `${base}/#person` },
    mainEntityOfPage: `${base}/blog/${post.slug}`,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${base}/blog/${post.slug}` },
    ],
  };

  return (
    <article className="shell pb-24 pt-28 md:pt-32">
      <Link
        href="/blog"
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All posts
      </Link>

      <header className="mt-8 max-w-3xl" data-reveal-intro>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="label">{formatDate(post.date)}</p>
          <p className="label flex items-center gap-1.5">
            <Clock className="size-3" />
            {post.readingMinutes} min read
          </p>
        </div>

        <h1 className="mt-5 text-jumbo font-semibold tracking-tight">{post.title}</h1>
        <p className="measure mt-5 text-lede text-muted-foreground">{post.summary}</p>
      </header>

      <div className="prose mt-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // External links open in a new tab and never leak the referrer.
            a: ({ href, children }: ComponentPropsWithoutRef<"a">) => {
              const external = typeof href === "string" && /^https?:\/\//.test(href);
              return (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-1.5 border-t border-border pt-8">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(breadcrumbs) }}
      />
    </article>
  );
}
