import { getDictionary, type Locale } from "@/lib/i18n";
import { blogCopy, site } from "@/lib/site";
import { blogCopyFr } from "@/lib/content.fr";

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

/** What the root layouts' title template appends to every page title. */
const TITLE_SUFFIX = ` — ${site.shortName}`;

/**
 * Search results show roughly the first 60 characters of a title. Short
 * titles keep the " — Gershon Otinkorang" suffix from the layout template;
 * a title that would run past 60 with it drops the suffix instead of having
 * its own last words cut off. The name is still in the page's structured
 * data and og:site_name.
 */
export function pageTitle(title: string): string | { absolute: string } {
  return `${title}${TITLE_SUFFIX}`.length <= 60 ? title : { absolute: title };
}

/** BreadcrumbList from the home page down to `trail`, in the page's language. */
export function breadcrumbJsonLd(locale: Locale, trail: { name: string; path: string }[]) {
  const home = locale === "fr" ? "/fr" : "";
  const homeName = locale === "fr" ? blogCopyFr.home : blogCopy.home;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: homeName, path: home }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

/**
 * A page that belongs to this site and is about the person — the shape for
 * section pages (projects, lab, now) that aren't articles or listings of posts.
 */
export function webPageJsonLd(
  locale: Locale,
  page: { type?: "WebPage" | "CollectionPage"; path: string; name: string; description: string },
  extra: Record<string, unknown> = {},
) {
  const url = `${siteUrl}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@type": page.type ?? "WebPage",
    "@id": url,
    url,
    name: page.name,
    description: page.description,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    dateModified: site.contentUpdated,
    about: { "@id": `${siteUrl}/#person` },
    author: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    ...extra,
  };
}
