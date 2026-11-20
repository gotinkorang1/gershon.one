import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const caseStudyOgSize = { width: 1200, height: 630 };

/**
 * The share card for a case study, in either language. Both opengraph-image
 * routes render through this so the English and French cards stay identical
 * apart from their text.
 */
export function caseStudyOgImage({ label, title }: { label: string; title: string }) {
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
          {label}
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 600, letterSpacing: -2, lineHeight: 1.1 }}>
          {title}
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
    caseStudyOgSize,
  );
}
