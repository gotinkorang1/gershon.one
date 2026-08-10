import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { TopProgress } from "@/components/fx/top-progress";
import { PageTransition } from "@/components/fx/page-transition";
import { Analytics } from "@/components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { HtmlLang } from "@/components/html-lang";
import { site } from "@/lib/site";
import "./globals.css";
import { serialiseJsonLd } from "@/lib/json-ld";

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

export const metadata: Metadata = {
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
  },
  twitter: { card: "summary_large_image", title, description: site.metaDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
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
    name: "Greenhouse International Development Group Ghana Ltd.",
  },
  url: siteUrl,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  jobTitle: site.role,
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
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
 * ProfilePage is the type Google documents for a page whose primary focus is a
 * single person. `mainEntity` points at the Person node by @id rather than
 * repeating it, so the graph has one canonical description of him.
 */
const profileLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: siteUrl,
  name: `${site.shortName} — ${site.role}`,
  dateModified: site.contentUpdated,
  inLanguage: "en-CA",
  mainEntity: { "@id": `${siteUrl}/#person` },
  isPartOf: { "@id": `${siteUrl}/#website` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <HtmlLang />
        <ThemeProvider>
          <TopProgress />
          <SiteNav />
          <CommandPalette />
          <KeyboardShortcuts />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
        <VercelAnalytics />
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(profileLd) }}
        />
      </body>
    </html>
  );
}
