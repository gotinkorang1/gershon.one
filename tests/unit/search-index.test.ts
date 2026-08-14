import { describe, it, expect } from "vitest";
import { searchDocs } from "@/lib/search-index";

describe("searchDocs", () => {
  it("returns nothing for an empty or whitespace query", () => {
    expect(searchDocs("")).toEqual([]);
    expect(searchDocs("   ")).toEqual([]);
  });

  it("requires every term to match (AND, not OR)", () => {
    // A term that appears nowhere in the index should collapse the result set.
    const results = searchDocs("cv zzzzznevermatches");
    expect(results).toEqual([]);
  });

  it("finds the CV page by a body keyword", () => {
    const results = searchDocs("resume");
    expect(results.some((d) => d.href.includes(".pdf"))).toBe(true);
  });

  it("respects the result limit", () => {
    const results = searchDocs("a", 2); // 'a' is a common substring
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("ranks a title-prefix hit above a body-only hit", () => {
    // 'download' is the CV page title prefix; assert it outranks pages that
    // only mention the term in their body, when both match.
    const results = searchDocs("download");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title.toLowerCase().startsWith("download")).toBe(true);
  });
});
