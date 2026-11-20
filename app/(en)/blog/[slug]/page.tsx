import type { Metadata } from "next";
import { pageTitle } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { PostView } from "@/components/blog/post-view";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "en");
  if (!post) return {};

  return {
    title: pageTitle(post.title),
    description: post.description ?? post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
      // Only pair the two when the other language actually has this post.
      languages: Object.fromEntries(
        [
          ["en-CA", `/blog/${post.slug}`, "en"],
          ["fr-CA", `/fr/blog/${post.slug}`, "fr"],
        ]
          .filter(([, , l]) => getPost(post.slug, l as "en" | "fr"))
          .map(([k, v]) => [k, v])
          // x-default is the English post when it exists, matching every other
          // page; an FR-only post has no default to point at.
          .concat(getPost(post.slug, "en") ? [["x-default", `/blog/${post.slug}`]] : []),
      ),
    },
    robots: post.draft ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
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
  if (!getPost(slug, "en")) notFound();
  return <PostView slug={slug} locale="en" />;
}
