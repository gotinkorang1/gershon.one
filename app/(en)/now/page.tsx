import type { Metadata } from "next";
import { NowView } from "@/components/now/now-view";
import { nowPage, site } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: nowPage.metaTitle,
  description: nowPage.metaDescription,
  alternates: {
    canonical: "/now",
    languages: { "en-CA": "/now", "fr-CA": "/fr/now", "x-default": "/now" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/now",
    title: `${nowPage.metaTitle} — ${site.shortName}`,
    description: nowPage.metaDescription,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

export default function NowPage() {
  return <NowView locale="en" />;
}
