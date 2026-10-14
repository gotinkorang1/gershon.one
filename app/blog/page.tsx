import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";
import { BlogIndexView } from "@/components/blog/blog-index-view";

const description =
  "Field notes on networking, systems administration, and the things I build and run.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
    languages: { "en-CA": "/blog", "fr-CA": "/fr/blog", "x-default": "/blog" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? site.url}/blog`,
    title: `Blog — ${site.shortName}`,
    description,
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url], title: `Blog — ${site.shortName}`, description },
};

export default function BlogIndexPage() {
  return <BlogIndexView locale="en" />;
}
