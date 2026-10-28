import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DATA_FILE, isDown, parseWebsites, setOffline } from "@/scripts/check-websites.mjs";
import { websites } from "@/lib/site";

const source = readFileSync(DATA_FILE, "utf8");

describe("parseWebsites", () => {
  it("reads every website from the real data file", () => {
    const parsed = parseWebsites(source);
    expect(parsed.map((s: { slug: string }) => s.slug)).toEqual(websites.map((w) => w.slug));
    expect(parsed.map((s: { url: string }) => s.url)).toEqual(websites.map((w) => w.url));
    expect(parsed.map((s: { offline: boolean }) => s.offline)).toEqual(websites.map((w) => !!w.offline));
  });
});

describe("isDown", () => {
  it("treats no response, 5xx and missing pages as down", () => {
    expect(isDown({ error: "ENOTFOUND" })).toBe(true);
    expect(isDown({ status: 503 })).toBe(true);
    expect(isDown({ status: 404 })).toBe(true);
  });

  it("treats success and bot refusals as up", () => {
    expect(isDown({ status: 200 })).toBe(false);
    expect(isDown({ status: 403 })).toBe(false);
    expect(isDown({ status: 429 })).toBe(false);
  });
});

describe("setOffline", () => {
  const slug = websites[0].slug;

  it("marks a site offline and back again, round-tripping the file exactly", () => {
    const off = setOffline(source, slug, true);
    expect(parseWebsites(off).find((s: { slug: string }) => s.slug === slug).offline).toBe(true);
    // Only that one line changes.
    expect(off.split("\n").filter((l: string, i: number) => l !== source.split("\n")[i])).toHaveLength(1);

    expect(setOffline(off, slug, false)).toBe(source);
  });

  it("does not duplicate the flag", () => {
    const once = setOffline(source, slug, true);
    expect(setOffline(once, slug, true)).toBe(once);
  });
});
