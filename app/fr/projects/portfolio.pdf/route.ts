import { portfolioPdfResponse } from "@/lib/portfolio-pdf";

// Rendered once at build time from lib/content; redeploys pick up new projects.
export const dynamic = "force-static";

export function GET() {
  return portfolioPdfResponse("fr");
}
