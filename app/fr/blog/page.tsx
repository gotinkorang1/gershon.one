import type { Metadata } from "next";
import { defaultOgImage, pageTitle } from "@/lib/seo";
import { site } from "@/lib/site";
import { BlogIndexView } from "@/components/blog/blog-index-view";
import { getBlogCopy } from "@/lib/localised-content";

const c = getBlogCopy("fr");

export const metadata: Metadata = {
  title: pageTitle(c.metaTitle),
  description: c.description,
  alternates: {
    canonical: "/fr/blog",
    languages: { "en-CA": "/blog", "fr-CA": "/fr/blog", "x-default": "/blog" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/fr/blog",
    title: `${c.metaTitle} — ${site.shortName}`,
    description: c.description,
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url], title: `${c.metaTitle} — ${site.shortName}`, description: c.description },
};

export default function FrenchBlogIndexPage() {
  return <BlogIndexView locale="fr" />;
}
