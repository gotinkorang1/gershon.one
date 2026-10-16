import Image, { generateStaticParams } from "@/app/(en)/blog/[slug]/opengraph-image";

/**
 * Stable address for a blog post's share card. The card itself is the
 * opengraph-image file in app/(en)/blog/[slug]; inside a route group Next
 * serves it under a hashed name, which pages pick up automatically. Article
 * JSON-LD falls back to this URL for posts without a cover, and links shared
 * before the per-language split cached it, so it keeps answering with the
 * same image.
 */
export { generateStaticParams };

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  return Image({ params: ctx.params });
}
