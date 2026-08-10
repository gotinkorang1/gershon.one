import type { Metadata } from "next";
import { PortfolioHome } from "@/components/portfolio-home";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const fr = getDictionary("fr");

export const metadata: Metadata = {
  title: `${site.shortName} — ${fr.hero.role}`,
  // The on-page bio (fr.hero.summary) runs ~460 chars; the search snippet uses
  // the purpose-authored 155-char version so the SERP doesn't truncate.
  description: fr.ui.metaDescription,
  alternates: {
    canonical: "/fr",
    languages: {
      "en-CA": `${siteUrl}/`,
      "fr-CA": `${siteUrl}/fr`,
      "x-default": `${siteUrl}/`,
    },
  },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/fr`,
    title: `${site.shortName} — ${fr.hero.role}`,
    description: fr.ui.metaDescription,
    locale: "fr_CA",
  },
  // Without this the Twitter card inherits the English values from the root
  // layout, so a shared /fr link previews in the wrong language.
  keywords: undefined,
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — ${fr.hero.role}`,
    description: fr.ui.metaDescription,
  },
};

export default function FrenchHome() {
  return (
    <PortfolioHome />
  );
}
