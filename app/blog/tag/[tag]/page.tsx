import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTagSlugs, getPostsByTag, toCard } from "@/lib/blog";
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
    </div>
  );
}
