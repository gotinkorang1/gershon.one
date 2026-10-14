import type { Metadata } from "next";
import { LabView } from "@/components/lab/lab-view";
import { site } from "@/lib/site";
import { getLab } from "@/lib/localised-content";
import { defaultOgImage } from "@/lib/seo";

const lab = getLab("fr");

export const metadata: Metadata = {
  title: "Labo de dépannage informatique",
  description: lab.lede,
  alternates: {
    canonical: "/fr/lab",
    languages: { "en-CA": "/lab", "fr-CA": "/fr/lab", "x-default": "/lab" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/fr/lab",
    title: `Labo — ${site.shortName}`,
    description: lab.lede,
    locale: "fr_CA",
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

export default function FrenchSystemsLabPage() {
  return <LabView locale="fr" />;
}
