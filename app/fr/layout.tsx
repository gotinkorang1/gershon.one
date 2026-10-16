import type { Metadata, Viewport } from "next";
import { RootDocument, rootMetadata, rootViewport } from "@/components/root-document";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const fr = getDictionary("fr");
const title = `${site.shortName} — ${fr.hero.role}`;

// Same base as the English layout, with French defaults so a French page that
// sets nothing of its own never falls back to an English title, description,
// canonical or Open Graph locale.
export const metadata: Metadata = {
  ...rootMetadata,
  title: { default: title, template: `%s — ${site.shortName}` },
  description: fr.ui.metaDescription,
  alternates: {
    ...rootMetadata.alternates,
    canonical: "/fr",
  },
  openGraph: {
    ...rootMetadata.openGraph,
    url: `${siteUrl}/fr`,
    title,
    description: fr.ui.metaDescription,
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
  },
  twitter: { ...rootMetadata.twitter, title, description: fr.ui.metaDescription },
};
export const viewport: Viewport = rootViewport;

export default function FrenchRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="fr-CA">{children}</RootDocument>;
}
