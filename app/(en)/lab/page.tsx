import type { Metadata } from "next";
import { LabView } from "@/components/lab/lab-view";
import { portfolioFeatures, site } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: portfolioFeatures.lab.metaTitle,
  description: portfolioFeatures.lab.lede,
  alternates: {
    canonical: "/lab",
    languages: { "en-CA": "/lab", "fr-CA": "/fr/lab", "x-default": "/lab" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/lab",
    title: `${portfolioFeatures.navigation.lab} — ${site.shortName}`,
    description: portfolioFeatures.lab.lede,
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

export default function SystemsLabPage() {
  return <LabView locale="en" />;
}
