import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.shortName} — Cloud, Network & Software Engineer`,
    template: `%s — ${site.shortName}`,
  },
  description: site.summary,
  keywords: [
    "Gershon Otinkorang",
    "Cloud Engineer Ghana",
    "Network Engineer",
    "AWS Certified",
    "MikroTik",
    "Next.js Developer",
    "IT Professional Ghana",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.shortName} — Cloud, Network & Software Engineer`,
    description: site.summary,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — Cloud, Network & Software Engineer`,
    description: site.summary,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  email: `mailto:${site.email}`,
  jobTitle: "Cloud & Network Engineer",
  address: { "@type": "PostalAddress", addressCountry: "GH" },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Kwame Nkrumah University of Science and Technology",
    },
    { "@type": "CollegeOrUniversity", name: "Takoradi Technical University" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "AWS Certified Cloud Practitioner",
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
  },
  knowsAbout: [
    "Cloud Computing",
    "Network Architecture",
    "Cybersecurity",
    "Software Development",
  ],
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.x],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="relative min-h-dvh antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <SiteNav />
          <CommandPalette />
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
