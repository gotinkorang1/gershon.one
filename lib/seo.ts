import { getDictionary, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/**
 * The site-wide share card rendered by app/opengraph-image.tsx.
 *
 * Next.js replaces a parent's `openGraph` object wholesale when a page sets its
 * own, image included — so any page that customises its Open Graph title or
 * description must re-attach this card, or links to it share with no preview.
 */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.role}`,
};

/**
 * ProfilePage is the type Google documents for a page whose primary focus is a
 * single person, so it belongs on the two home pages only — not on every blog
 * post and case study. `mainEntity` points at the Person node declared once in
 * the root layout, by @id, rather than repeating it.
 */
export function profilePageJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const url = locale === "fr" ? `${siteUrl}/fr` : siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: `${site.shortName} — ${t.hero.role}`,
    dateModified: site.contentUpdated,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    mainEntity: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };
}
