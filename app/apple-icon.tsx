import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e1013",
          color: "#f2f3f5",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -3,
          fontFamily: "sans-serif",
        }}
      >
        {site.initials}
      </div>
    ),
    size,
  );
}
