import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { site } from "@/lib/site";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16181d",
          color: "#f2f3f5",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: "#1acfdf" }}>
          CASE STUDY
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 600, letterSpacing: -2, lineHeight: 1.1 }}>
          {study?.title ?? "Case study"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a0a3a9",
            borderTop: "1px solid #33363d",
            paddingTop: 22,
          }}
        >
          <span>{site.shortName}</span>
          <span>gershon.one</span>
        </div>
      </div>
    ),
    size,
  );
}
