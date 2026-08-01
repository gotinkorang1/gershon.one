import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTagSlugs, getPostsByTag, toCard } from "@/lib/blog";
import { site } from "@/lib/site";
import { serialiseJsonLd } from "@/lib/json-ld";
import { PostRow } from "@/components/blog/blog-index";

export function generateStaticParams() {
  return getTagSlugs().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const entry = getTagSlugs().find((t) => t.slug === tag);
  if (!entry) return {};

  const title = `${entry.tag} — Writing`;
  const description = `Posts tagged “${entry.tag}”.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/tag/${entry.slug}` },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const entry = getTagSlugs().find((t) => t.slug === tag);
  if (!entry) notFound();

  const posts = getPostsByTag(tag).map(toCard);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const tagUrl = `${base}/blog/tag/${entry.slug}`;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": tagUrl,
    url: tagUrl,
    name: `${entry.tag} — Writing`,
    description: `Posts tagged “${entry.tag}”.`,
    inLanguage: "en-CA",
    isPartOf: { "@id": `${base}/blog#blog` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${base}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: entry.tag, item: tagUrl },
    ],
  };

  return (
    <div className="shell pb-24 pt-28 md:pt-32">
      <Link
        href="/blog"
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All posts
      </Link>

      <header className="mt-8 max-w-2xl" data-reveal-intro>
        <p className="label">Tag</p>
        <h1 className="mt-4 text-jumbo font-semibold tracking-tight">{entry.tag}</h1>
        <p className="mt-4 text-lede text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} tagged “{entry.tag}”.
        </p>
      </header>

      <div className="mt-10 grid gap-4">
        {posts.map((post, i) => (
          <PostRow key={post.slug} post={post} index={i} />
        ))}
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(collectionLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(breadcrumbs) }}
      />
    </div>
  );
}
