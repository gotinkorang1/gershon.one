import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { PostView } from "@/components/blog/post-view";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts("fr").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "fr");
  if (!post) return {};

  return {
    title: post.title,
    description: post.description ?? post.summary,
    alternates: {
      canonical: `/fr/blog/${post.slug}`,
      // Only pair the two when the other language actually has this post.
      languages: Object.fromEntries(
        [
          ["en-CA", `/blog/${post.slug}`, "en"],
          ["fr-CA", `/fr/blog/${post.slug}`, "fr"],
        ]
          .filter(([, , l]) => getPost(post.slug, l as "en" | "fr"))
          .map(([k, v]) => [k, v]),
      ),
    },
    robots: post.draft ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "fr_CA",
      title: post.title,
      description: post.description ?? post.summary,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? post.summary,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getPost(slug, "fr")) notFound();
  return <PostView slug={slug} locale="fr" />;
}
