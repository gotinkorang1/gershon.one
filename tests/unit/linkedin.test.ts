import { describe, expect, it } from "vitest";
import { cleanCommentary, clip, parseCsv, splitHashtags, toPost } from "@/scripts/import-linkedin.mjs";
import {
  SHARE_SINCE,
  buildPayload,
  escapeLittleText,
  frontmatter,
  publishedByPush,
  shareable,
} from "@/scripts/share-to-linkedin.mjs";

const csv = [
  "Date,ShareLink,ShareCommentary,SharedUrl,MediaUrl,Visibility",
  '2026-10-20 14:03:11,https://www.linkedin.com/feed/update/urn:li:share:1,"Why your ""slow network"" is rarely the fibre',
  "",
  "Chased latency with @[Ada Mensah](urn:li:person:abc). A switch, not the ISP.",
  "",
  '{hashtag|\\#|Networking} {hashtag|\\#|ITSupport}",,,MEMBER_NETWORK',
  "2026-08-01 10:00:00,https://www.linkedin.com/feed/update/urn:li:share:2,,https://example.com,,MEMBER_NETWORK",
].join("\r\n");

describe("parseCsv", () => {
  it("keeps quoted commas, doubled quotes and line breaks inside one field", () => {
    const rows = parseCsv(csv);
    expect(rows).toHaveLength(2);
    expect(rows[0].ShareCommentary).toContain('Why your "slow network"');
    expect(rows[0].ShareCommentary.split("\n").length).toBeGreaterThan(3);
    expect(rows[1].ShareLink).toBe("https://www.linkedin.com/feed/update/urn:li:share:2");
  });
});

describe("cleanCommentary and splitHashtags", () => {
  it("turns LinkedIn's hashtag and mention markup back into text", () => {
    const text = cleanCommentary("Thanks @[Ada Mensah](urn:li:person:abc)!\n\n{hashtag|\\#|Networking}");
    expect(text).toBe("Thanks Ada Mensah!\n\n#Networking");
    expect(splitHashtags(text)).toEqual({ body: "Thanks Ada Mensah!", tags: ["Networking"] });
  });
});

describe("toPost", () => {
  const [withText, reshare] = parseCsv(csv);

  it("uses a one-line opening as the title without repeating it in the body", () => {
    const post = toPost(withText)!;
    expect(post.title).toBe('Why your "slow network" is rarely the fibre');
    expect(post.slug).toBe("why-your-slow-network-is-rarely-the-fibre");
    expect(post.file).toContain("title: Why your “slow network” is rarely the fibre");
    expect(post.file).toContain("tags: [LinkedIn, Networking, ITSupport]");
    expect(post.file).toContain("draft: true");
    expect(post.file.split("---\n").at(-1)).not.toContain("rarely the fibre");
  });

  it("writes front matter the site and the sharer both read", () => {
    const data = frontmatter(toPost(withText, { publish: true })!.file)!;
    expect(data.date).toBe("2026-10-20");
    expect(data.draft).toBe(false);
    expect(data.linkedin).toBe("https://www.linkedin.com/feed/update/urn:li:share:1");
    // Imported posts must never be shared back to LinkedIn.
    expect(shareable(data)).toBe(false);
  });

  it("keeps an opening line too long for a title in the body", () => {
    const opening = "I used to be the network admin, the help desk, the web developer, and the server guy, all in one role.";
    const post = toPost({ ...withText, ShareCommentary: `${opening}\n\nIn Ghana, many IT professionals become generalists.` })!;
    expect(post.title.endsWith("…")).toBe(true);
    expect(post.file).toContain(opening);
  });

  it("skips reshares with no text of their own", () => {
    expect(toPost(reshare)).toBeNull();
  });
});

describe("clip", () => {
  it("cuts at a word boundary", () => {
    expect(clip("one two three four", 12)).toBe("one two…");
    expect(clip("short", 12)).toBe("short");
  });
});

describe("publishedByPush", () => {
  const post = { title: "T", date: SHARE_SINCE, draft: false };

  it("shares new posts and drafts that were just published", () => {
    expect(publishedByPush(null, post)).toBe(true);
    expect(publishedByPush({ ...post, draft: true }, post)).toBe(true);
  });

  it("does not share edits, drafts, opt-outs or older posts", () => {
    expect(publishedByPush(post, { ...post, title: "Edited" })).toBe(false);
    expect(publishedByPush(null, { ...post, draft: true })).toBe(false);
    expect(publishedByPush(null, { ...post, share: false })).toBe(false);
    expect(publishedByPush(null, { ...post, date: "2026-02-07" })).toBe(false);
  });
});

describe("buildPayload", () => {
  it("escapes LinkedIn markup in text but keeps hashtags live", () => {
    expect(escapeLittleText("Ports (80) & #1 *fix*")).toBe("Ports \\(80\\) & \\#1 \\*fix\\*");
    const payload = buildPayload({
      author: "urn:li:person:x",
      url: "https://www.gershon.one/blog/a",
      title: "Two ID cards (A4)",
      summary: "How.",
      tags: ["ERPNext", "Workplace Culture"],
    });
    expect(payload.commentary).toBe("Two ID cards \\(A4\\)\n\nHow.\n\n#ERPNext #WorkplaceCulture");
    expect(payload.content.article).toEqual({
      source: "https://www.gershon.one/blog/a",
      title: "Two ID cards (A4)",
      description: "How.",
    });
  });
});
