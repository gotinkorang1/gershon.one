import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { buildPortfolioPdf, portfolioPdfResponse } from "@/lib/portfolio-pdf";
import { getProjectsContent } from "@/lib/localised-content";

describe("buildPortfolioPdf", () => {
  // The standard fonts only cover WinAnsi, so a stray character in new content
  // would otherwise surface as a failed build rather than a failed test.
  it.each(["en", "fr"] as const)("renders every project in %s without throwing", async (locale) => {
    const bytes = await buildPortfolioPdf(locale);
    const doc = await PDFDocument.load(bytes);

    expect(doc.getPageCount()).toBeGreaterThanOrEqual(2);
    expect(doc.getTitle()).toContain("Gershon Adjei Otinkorang");
    expect(doc.getSubject()).toBe(getProjectsContent(locale).copy.metaDescription);
  });

  it("is served as a named download", async () => {
    const res = await portfolioPdfResponse("fr");

    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toBe(
      'attachment; filename="gershon-otinkorang-portfolio-fr.pdf"',
    );
  });
});
