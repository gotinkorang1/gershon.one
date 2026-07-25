import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Cloud, Network & Software Engineer`;
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
          background: "#0b0c0e",
          color: "#fafafa",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(110,120,255,0.30), rgba(0,0,0,0) 65%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#fafafa",
              color: "#0b0c0e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <span style={{ opacity: 0.7 }}>gershon.one</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {site.shortName}
          </div>
          <div style={{ fontSize: 34, opacity: 0.75, maxWidth: 880, lineHeight: 1.3 }}>
            {site.headline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, opacity: 0.6 }}>
          {site.roles.slice(0, 3).map((r) => (
            <span
              key={r}
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
