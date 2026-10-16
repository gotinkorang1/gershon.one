import Image, { generateStaticParams } from "@/app/(en)/work/[slug]/opengraph-image";

/**
 * Stable address for a case study's share card. The card itself is the
 * opengraph-image file in app/(en)/work/[slug]; inside a route group Next
 * serves it under a hashed name, which pages pick up automatically. Links
 * shared before the per-language split cached this plain URL, so it keeps
 * answering with the same image.
 */
export { generateStaticParams };

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  return Image({ params: ctx.params });
}
