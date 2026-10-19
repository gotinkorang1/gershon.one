import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const valid = {
  name: "Ama Recruiter",
  email: "ama@company.test",
  subject: "Role at Company",
  message: "Hello, I'd like to talk about a systems role.",
};

function request(body: unknown, ip = "203.0.113.1", origin = "http://localhost:3000") {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin, "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

type Sent = { to: string[]; subject: string; text: string; reply_to?: string };

describe("POST /api/contact", () => {
  let sent: Sent[];

  beforeEach(() => {
    // Fresh module per test so the in-memory rate limiter starts empty.
    vi.resetModules();
    sent = [];
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@site.test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "site@site.test");
    vi.stubEnv("TURNSTILE_SECRET", "");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: RequestInit) => {
        sent.push(JSON.parse(init.body as string) as Sent);
        return new Response("{}", { status: 200 });
      }),
    );
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("emails the owner with the sender as reply-to", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(request(valid));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, delivered: true });
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toEqual(["owner@site.test"]);
    expect(sent[0].reply_to).toBe("ama@company.test");
    expect(sent[0].subject).toBe("Role at Company — from Ama Recruiter");
    expect(sent[0].text).toContain(valid.message);
  });

  it("cannot be used to inject email headers", async () => {
    const { POST } = await import("@/app/api/contact/route");
    await POST(request({ ...valid, name: "Ama\r\nBcc: victim@evil.test" }));
    expect(sent[0].subject).not.toMatch(/[\r\n]/);
  });

  it("rejects cross-origin posts", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(request(valid, undefined, "https://evil.test"));
    expect(res.status).toBe(403);
    expect(sent).toHaveLength(0);
  });

  it("drops honeypot submissions without sending anything", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(request({ ...valid, company: "bot" }));
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it.each([
    ["a missing field", { ...valid, name: "" }],
    ["a bad email", { ...valid, email: "not-an-email" }],
    ["a too-short message", { ...valid, message: "hi" }],
    ["an over-long name", { ...valid, name: "x".repeat(121) }],
  ])("rejects %s", async (_label, body) => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(request(body));
    expect(res.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("accepts without sending when Resend is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(request(valid));
    expect(await res.json()).toEqual({ ok: true, delivered: false });
    expect(sent).toHaveLength(0);
  });

  it("reports a provider failure as 502", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 500 })));
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
  });

  it("limits repeat messages from the same address", async () => {
    const { POST } = await import("@/app/api/contact/route");
    for (let i = 0; i < 5; i++) await POST(request(valid));
    const res = await POST(request(valid));
    expect(res.status).toBe(429);
  });
});
