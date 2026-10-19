import type { Metadata } from "next";
import { site } from "@/lib/site";
import { briefFr } from "@/lib/content.fr";
import { getDictionary } from "@/lib/i18n";
import { BriefView } from "@/components/brief/brief-view";

export const metadata: Metadata = {
  title: briefFr.page.metaTitle,
  description: briefFr.page.metaDescription(site.name, getDictionary("fr").hero.role),
  alternates: {
    canonical: "/fr/brief",
    languages: { "en-CA": "/brief", "fr-CA": "/fr/brief", "x-default": "/brief" },
  },
  // A hiring brief is for people given the link, not for search engines.
  robots: { index: false, follow: true },
};

export default function BriefPage() {
  return <BriefView locale="fr" />;
}
