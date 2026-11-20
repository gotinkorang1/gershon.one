import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { caseStudyOgImage, caseStudyOgSize } from "@/lib/og/case-study-card";

export const alt = "Case study";
export const size = caseStudyOgSize;
export const contentType = "image/png";

// Without this the route stays dynamic and renders once with an unresolved
// slug, so every case study would share one generic image.
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Route params are async in Next 16 — awaiting is what makes the slug real.
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return caseStudyOgImage({ label: "CASE STUDY", title: study?.title ?? "Case study" });
}
