import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size: value } = await params;
  const size = value === "192" ? 192 : 512;
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#171715",
          color: "#f5f2ea",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            border: `${Math.max(4, Math.round(size / 64))}px solid #b7ff4a`,
            borderRadius: `${Math.round(size * 0.23)}px ${Math.round(size * 0.08)}px`,
            display: "flex",
            fontSize: Math.round(size * 0.32),
            fontWeight: 700,
            height: "66%",
            justifyContent: "center",
            letterSpacing: "-0.08em",
            width: "66%",
          }}
        >
          {site.initials}
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
