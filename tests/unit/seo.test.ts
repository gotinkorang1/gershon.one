import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd, pageTitle, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

describe("pageTitle", () => {
  it("keeps the layout suffix when the full title fits in 60 characters", () => {
    expect(pageTitle("Projects")).toBe("Projects");
  });

  it("drops the suffix rather than letting search results truncate the title", () => {
    const long = "Bringing a 1,200-acre industrial park online";
    expect(`${long} — ${site.shortName}`.length).toBeGreaterThan(60);
    expect(pageTitle(long)).toEqual({ absolute: long });
  });
});

describe("breadcrumbJsonLd", () => {
  it("starts at the home page of the page's language", () => {
    const en = breadcrumbJsonLd("en", [{ name: "Lab", path: "/lab" }]);
    const fr = breadcrumbJsonLd("fr", [{ name: "Labo", path: "/fr/lab" }]);

    expect(en.itemListElement.map((i) => [i.position, i.name, i.item])).toEqual([
      [1, "Home", site.url],
      [2, "Lab", `${site.url}/lab`],
    ]);
    expect(fr.itemListElement[0]).toMatchObject({ name: "Accueil", item: `${site.url}/fr` });
  });
});

describe("webPageJsonLd", () => {
  it("ties the page to the person and the site by @id", () => {
    const ld = webPageJsonLd("fr", { path: "/fr/lab", name: "Labo", description: "d" });
    expect(ld).toMatchObject({
      "@type": "WebPage",
      url: `${site.url}/fr/lab`,
      inLanguage: "fr-CA",
      about: { "@id": `${site.url}/#person` },
      isPartOf: { "@id": `${site.url}/#website` },
    });
  });
});
