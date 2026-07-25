import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfbfa",
          color: "#1c1c1a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 21,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#8a8a84",
            borderBottom: "1px solid #d8d8d2",
            paddingBottom: 20,
          }}
        >
          <span>Accra, Ghana / St. John&apos;s, NL</span>
          <span>Available Aug 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 118, fontWeight: 600, letterSpacing: -5, lineHeight: 0.92 }}>
            Gershon
          </div>
          <div style={{ fontSize: 118, fontWeight: 600, letterSpacing: -5, lineHeight: 0.92 }}>
            Otinkorang
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #d8d8d2",
            paddingTop: 20,
            fontSize: 27,
          }}
        >
          <span style={{ fontWeight: 500 }}>{site.role}</span>
          <span style={{ color: "#6a6a64" }}>gershon.one</span>
        </div>
      </div>
    ),
    size,
  );
}
