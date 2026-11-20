import { caseStudies } from "@/lib/case-studies";
import { getCaseStudy } from "@/lib/localised-content";
import { caseStudyOgImage, caseStudyOgSize } from "@/lib/og/case-study-card";

export const alt = "Étude de cas";
export const size = caseStudyOgSize;
export const contentType = "image/png";

// Pre-render one card per study, as the English route does, so each French
// link preview shows its own translated title rather than the site-wide card.
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy("fr", slug);
  return caseStudyOgImage({ label: "ÉTUDE DE CAS", title: study?.title ?? "Étude de cas" });
}
