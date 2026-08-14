import { describe, it, expect } from "vitest";
import {
  isRoleFocusId,
  prioritizeByKeys,
  isTopMatch,
} from "@/lib/role-focus";
import { roleFocusProfiles } from "@/lib/site";

describe("isRoleFocusId", () => {
  it("accepts every real profile id", () => {
    for (const profile of roleFocusProfiles) {
      expect(isRoleFocusId(profile.id)).toBe(true);
    }
  });

  it("rejects an unknown id", () => {
    expect(isRoleFocusId("not-a-real-focus")).toBe(false);
  });
});

describe("prioritizeByKeys", () => {
  const identity = (s: string) => s;

  it("returns a copy unchanged when there are no priorities", () => {
    const items = ["a", "b", "c"];
    const out = prioritizeByKeys(items, undefined, identity);
    expect(out).toEqual(items);
    expect(out).not.toBe(items); // new array, original untouched
  });

  it("moves prioritized keys to the front in priority order", () => {
    expect(prioritizeByKeys(["a", "b", "c", "d"], ["c", "a"], identity)).toEqual([
      "c",
      "a",
      "b",
      "d",
    ]);
  });

  it("keeps unprioritized items in their original relative order", () => {
    expect(prioritizeByKeys(["a", "b", "c", "d"], ["d"], identity)).toEqual([
      "d",
      "a",
      "b",
      "c",
    ]);
  });

  it("is stable (a well-behaved sort) for ties", () => {
    const items = [
      { k: "x", n: 1 },
      { k: "y", n: 2 },
      { k: "x", n: 3 },
    ];
    // no priorities → original order preserved
    expect(prioritizeByKeys(items, [], (i) => i.k).map((i) => i.n)).toEqual([
      1, 2, 3,
    ]);
  });
});

describe("isTopMatch", () => {
  it("is true only within the priority limit", () => {
    const priorities = ["a", "b", "c"];
    expect(isTopMatch("a", priorities)).toBe(true);
    expect(isTopMatch("b", priorities)).toBe(true);
    expect(isTopMatch("c", priorities)).toBe(false); // default limit is 2
  });

  it("respects a custom limit", () => {
    expect(isTopMatch("c", ["a", "b", "c"], 3)).toBe(true);
  });

  it("is false when priorities are undefined", () => {
    expect(isTopMatch("a", undefined)).toBe(false);
  });
});
