import type { Metadata } from "next";
import { ProjectsView } from "@/components/projects/projects-view";
import { site } from "@/lib/site";
import { getProjectsContent } from "@/lib/localised-content";
import { defaultOgImage, pageTitle } from "@/lib/seo";

const { copy } = getProjectsContent("en");

export const metadata: Metadata = {
  title: pageTitle(copy.metaTitle),
  description: copy.metaDescription,
  alternates: {
    canonical: "/projects",
    languages: { "en-CA": "/projects", "fr-CA": "/fr/projects", "x-default": "/projects" },
  },
  openGraph: {
    images: [defaultOgImage],
    type: "website",
    url: "/projects",
    title: `${copy.metaTitle} — ${site.shortName}`,
    description: copy.metaDescription,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

export default function ProjectsPage() {
  return <ProjectsView locale="en" />;
}
