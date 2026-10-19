import type { Metadata } from "next";
import { site } from "@/lib/site";
import { brief } from "@/lib/brief";
import { BriefView } from "@/components/brief/brief-view";

export const metadata: Metadata = {
  title: brief.page.metaTitle,
  description: brief.page.metaDescription(site.name, site.role),
  alternates: {
    canonical: "/brief",
    languages: { "en-CA": "/brief", "fr-CA": "/fr/brief", "x-default": "/brief" },
  },
  // A hiring brief is for people given the link, not for search engines.
  robots: { index: false, follow: true },
};

export default function BriefPage() {
  return <BriefView locale="en" />;
}
