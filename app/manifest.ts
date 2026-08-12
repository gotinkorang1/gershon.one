import type { MetadataRoute } from "next";
import { portfolioFeatures, site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.shortName,
    description: site.summary,
    start_url: "/",
    id: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0e1013",
    theme_color: "#0e1013",
    lang: "en-CA",
    categories: ["business", "productivity"],
    shortcuts: [
      { name: portfolioFeatures.pwa.shortcuts.lab, url: "/lab", icons: [{ src: "/pwa-icon/192", sizes: "192x192", type: "image/png" }] },
      { name: portfolioFeatures.pwa.shortcuts.brief, url: "/brief", icons: [{ src: "/pwa-icon/192", sizes: "192x192", type: "image/png" }] },
      { name: portfolioFeatures.pwa.shortcuts.blog, url: "/blog", icons: [{ src: "/pwa-icon/192", sizes: "192x192", type: "image/png" }] },
    ],
    icons: [
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
