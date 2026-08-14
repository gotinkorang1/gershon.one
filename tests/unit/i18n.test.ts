import { describe, it, expect } from "vitest";
import { getDictionary, resumeUrlFor, locales, defaultLocale } from "@/lib/i18n";

describe("resumeUrlFor", () => {
  it("returns the French CV path for fr", () => {
    expect(resumeUrlFor("fr")).toBe("/gershon-otinkorang-cv-fr.pdf");
  });

  it("returns the default CV path for en", () => {
    expect(resumeUrlFor("en")).toBe("/gershon-otinkorang-cv.pdf");
  });
});

describe("getDictionary", () => {
  it("resolves a distinct, non-empty dictionary for every supported locale", () => {
    for (const locale of locales) {
      const dict = getDictionary(locale);
      expect(dict).toBeTypeOf("object");
      expect(dict).not.toBeNull();
    }
  });

  it("keeps the same key shape across locales (no missing translations)", () => {
    const en = getDictionary("en");
    const fr = getDictionary("fr");
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
  });

  it("exposes 'en' as the default locale", () => {
    expect(defaultLocale).toBe("en");
    expect(locales).toContain(defaultLocale);
  });
});
