import type { Metadata } from "next";
import { NowView } from "@/components/now/now-view";
import { site } from "@/lib/site";
import { nowPageFr } from "@/lib/content.fr";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: nowPageFr.metaTitle,
  description: nowPageFr.metaDescription,
  alternates: {
    canonical: "/fr/now",
    languages: { "en-CA": "/now", "fr-CA": "/fr/now", "x-default": "/now" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/fr/now",
    title: `${nowPageFr.metaTitle} — ${site.shortName}`,
    description: nowPageFr.metaDescription,
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

export default function NowPage() {
  return <NowView locale="fr" />;
}
