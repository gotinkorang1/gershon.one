import { describe, it, expect } from "vitest";
import { slugify, getHeadings } from "@/lib/blog";

describe("slugify", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips punctuation but keeps word characters", () => {
    expect(slugify("The network is slow, not the fibre!")).toBe(
      "the-network-is-slow-not-the-fibre",
    );
  });

  it("collapses repeated separators and trims edge hyphens", () => {
    expect(slugify("  --Two   ID cards--  ")).toBe("two-id-cards");
  });

  it("returns an empty string when nothing survives", () => {
    expect(slugify("!!!")).toBe("");
  });
});

describe("getHeadings", () => {
  it("extracts h2 and h3 headings with matching slug ids", () => {
    const md = [
      "# Title (h1 is ignored)",
      "",
      "## First Section",
      "some text",
      "### A Sub Point",
      "#### too deep, ignored",
    ].join("\n");

    expect(getHeadings(md)).toEqual([
      { level: 2, text: "First Section", id: "first-section" },
      { level: 3, text: "A Sub Point", id: "a-sub-point" },
    ]);
  });

  it("ignores '#' characters inside fenced code blocks", () => {
    const md = ["## Real Heading", "", "```bash", "## not a heading", "```"].join(
      "\n",
    );

    expect(getHeadings(md).map((h) => h.text)).toEqual(["Real Heading"]);
  });

  it("strips inline markdown emphasis from heading text", () => {
    expect(getHeadings("## A `code` and *bold* word")[0]).toEqual({
      level: 2,
      text: "A code and bold word",
      id: "a-code-and-bold-word",
    });
  });
});
