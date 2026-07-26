import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { CaseStudies } from "@/components/sections/case-studies";
import { Skills } from "@/components/sections/skills";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SectionDivider } from "@/components/fx/section-divider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const fr = getDictionary("fr");

export const metadata: Metadata = {
  title: `${site.shortName} — ${fr.hero.role}`,
  description: fr.hero.summary,
  alternates: {
    canonical: "/fr",
    languages: { "en-CA": `${siteUrl}/`, "fr-CA": `${siteUrl}/fr` },
  },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/fr`,
    title: `${site.shortName} — ${fr.hero.role}`,
    description: fr.hero.summary,
    locale: "fr_CA",
  },
};

export default function FrenchHome() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <CaseStudies />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Credentials />
      <SectionDivider />
      <Contact />
    </>
  );
}
