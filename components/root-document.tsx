import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TopProgress } from "@/components/fx/top-progress";
import { PageTransition } from "@/components/fx/page-transition";
import { Analytics } from "@/components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { PostHogBoot } from "@/components/posthog-boot";
import { DeferredInteractions } from "@/components/deferred-interactions";
import { Toaster } from "@/components/toaster";
import { site } from "@/lib/site";
import "@/app/globals.css";
import { serialiseJsonLd } from "@/lib/json-ld";
import { defaultOgImage } from "@/lib/seo";

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["wdth"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const title = `${site.shortName} — ${site.role}`;

/**
 * Metadata both root layouts start from. Each language's layout spreads this
 * and overrides what differs (canonical, Open Graph locale).
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${site.shortName}` },
  description: site.metaDescription,
  // meta keywords is ignored by Google and can be read as spam by Bing, so it
  // is deliberately absent. Relevance comes from the page copy, headings and
  // structured data instead.
  applicationName: site.shortName,
  category: "technology",
  classification: "Personal portfolio",
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: {
    canonical: "/",
    languages: {
      "en-CA": `${siteUrl}/`,
      "fr-CA": `${siteUrl}/fr`,
      // Fallback for any locale not explicitly matched.
      "x-default": `${siteUrl}/`,
    },
    types: { "application/rss+xml": `${siteUrl}/feed.xml` },
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: site.name,
    title,
    description: site.metaDescription,
    locale: "en_CA",
    // Referenced explicitly: app/opengraph-image.tsx sits above both root
    // layouts, so the file convention no longer attaches it on its own.
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.metaDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a19" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: site.name,
  givenName: "Gershon",
  familyName: "Otinkorang",
  additionalName: "Adjei",
  nationality: { "@type": "Country", name: "Ghana" },
  worksFor: {
    "@type": "Organization",
    name: "SABAOTH",
  },
  url: siteUrl,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  jobTitle: site.role,
  address: {
    "@type": "PostalAddress",
        addressLocality: "St. John's",
    addressRegion: "NL",
    addressCountry: "CA",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Kwame Nkrumah University of Science and Technology",
      address: { "@type": "PostalAddress", addressCountry: "GH" },
      sameAs: "https://www.knust.edu.gh/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Takoradi Technical University",
      address: { "@type": "PostalAddress", addressCountry: "GH" },
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Memorial University of Newfoundland",
      address: { "@type": "PostalAddress", addressCountry: "CA" },
      sameAs: "https://www.mun.ca/",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Foundations of Cybersecurity",
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: "Google" },
      dateCreated: "2026-08-02",
      url: "https://www.coursera.org/account/accomplishments/verify/KVMKSBBS97UR",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "AWS Certified Cloud Practitioner",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
      validIn: { "@type": "AdministrativeArea", name: "Worldwide" },
      dateCreated: "2024-07-14",
      expires: "2027-07-14",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "BSc Information Technology",
      credentialCategory: "degree",
      educationalLevel: "Bachelor's degree",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Kwame Nkrumah University of Science and Technology",
      },
      dateCreated: "2024-11-01",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Higher National Diploma, Information & Communication Technology",
      credentialCategory: "degree",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Takoradi Technical University",
      },
      dateCreated: "2020-10-13",
    },
  ],
  knowsAbout: [
    "Network Administration",
    "MikroTik RouterOS",
    "Satellite Internet",
    "ERP Administration",
    "Systems Administration",
    "Cloud Computing",
    "Network Security",
    "Cybersecurity",
  ],
  // hasOccupation is the property search engines use to classify a person's
  // profession. The O*NET code is the standard identifier for network and
  // computer systems administrators, which removes ambiguity about the role.
  hasOccupation: {
    "@type": "Occupation",
    name: "IT Systems and Network Administrator",
    occupationalCategory: "15-1244.00",
    occupationLocation: {
      "@type": "City",
      name: "St. John's",
      address: {
        "@type": "PostalAddress",
                addressLocality: "St. John's",
        addressRegion: "NL",
        addressCountry: "CA",
      },
    },
    skills: [
      "MikroTik RouterOS",
      "Network administration",
      "ERP administration",
      "Server administration",
      "Satellite networking",
    ].join(", "),
  },
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "French", alternateName: "fr" },
  ],
  seeks: {
    "@type": "Demand",
    name: "IT and network administration roles",
    availabilityStarts: "2026-08-01",
    areaServed: {
      "@type": "Place",
      name: "St. John's, Newfoundland and Labrador, Canada",
    },
  },
  sameAs: [site.socials.github, site.socials.linkedin],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: site.name,
  url: siteUrl,
  inLanguage: ["en-CA", "fr-CA"],
  publisher: { "@id": `${siteUrl}/#person` },
};


/**
 * The document shell shared by the English and French root layouts. The site
 * has one root layout per language (app/(en)/layout.tsx and app/fr/layout.tsx)
 * so <html lang> is correct in the server-rendered HTML. Crawlers that do not
 * run JavaScript and screen readers on first paint both read it from there.
 * Moving between the two languages is a full page load, which is what lets
 * the attribute change.
 */
export function RootDocument({
  lang,
  children,
}: Readonly<{ lang: "en-CA" | "fr-CA"; children: React.ReactNode }>) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <TopProgress />
          <SiteNav />
          <DeferredInteractions />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <VercelAnalytics />
        <PostHogBoot />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(jsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(websiteLd) }}
        />
      </body>
    </html>
  );
}
