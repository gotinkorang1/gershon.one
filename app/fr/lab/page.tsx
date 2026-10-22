import type { Metadata } from "next";
import { LabView } from "@/components/lab/lab-view";
import { site } from "@/lib/site";
import { getLab } from "@/lib/localised-content";
import { defaultOgImage, pageTitle } from "@/lib/seo";

const lab = getLab("fr");

export const metadata: Metadata = {
  title: pageTitle(lab.metaTitle),
  description: lab.metaDescription,
  alternates: {
    canonical: "/fr/lab",
    languages: { "en-CA": "/lab", "fr-CA": "/fr/lab", "x-default": "/lab" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/fr/lab",
    title: `Labo — ${site.shortName}`,
    description: lab.metaDescription,
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

export default function FrenchSystemsLabPage() {
  return <LabView locale="fr" />;
}
