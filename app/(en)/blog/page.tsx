import type { Metadata } from "next";
import { defaultOgImage, pageTitle } from "@/lib/seo";
import { site } from "@/lib/site";
import { BlogIndexView } from "@/components/blog/blog-index-view";
import { getBlogCopy } from "@/lib/localised-content";

const c = getBlogCopy("en");
const description = c.description;

export const metadata: Metadata = {
  title: pageTitle(c.metaTitle),
  description,
  alternates: {
    canonical: "/blog",
    languages: { "en-CA": "/blog", "fr-CA": "/fr/blog", "x-default": "/blog" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? site.url}/blog`,
    title: `${c.metaTitle} — ${site.shortName}`,
    description,
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url], title: `${c.metaTitle} — ${site.shortName}`, description },
};

export default function BlogIndexPage() {
  return <BlogIndexView locale="en" />;
}
