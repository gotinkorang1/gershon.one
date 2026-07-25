import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { ScrollProgress } from "@/components/scroll-progress";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";
import "./globals.css";

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
  description: site.summary,
  keywords: [
    "Gershon Otinkorang",
    "IT Systems Administrator",
    "Network Administrator",
    "MikroTik RouterOS",
    "Starlink",
    "ERPNext",
    "Odoo",
    "IT jobs St. John's Newfoundland",
    "Network Administrator Canada",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${siteUrl}/feed.xml` },
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: site.name,
    title,
    description: site.summary,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", title, description: site.summary },
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
  name: site.name,
  url: siteUrl,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  jobTitle: site.role,
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Kwame Nkrumah University of Science and Technology",
    },
    { "@type": "CollegeOrUniversity", name: "Takoradi Technical University" },
    { "@type": "CollegeOrUniversity", name: "Memorial University of Newfoundland" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "AWS Certified Cloud Practitioner",
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
  },
  knowsAbout: [
    "Network Administration",
    "MikroTik RouterOS",
    "Satellite Internet",
    "ERP Administration",
    "Systems Administration",
    "Cloud Computing",
  ],
  seeks: {
    "@type": "Demand",
    availabilityStarts: "2026-08-01",
    areaServed: { "@type": "Place", name: "St. John's, Newfoundland and Labrador, Canada" },
  },
  sameAs: [site.socials.github, site.socials.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <SiteNav />
          <CommandPalette />
          <KeyboardShortcuts />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
