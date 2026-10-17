import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const REFEREES = [
  { name: "Jane Referee", role: "IT Manager", organisation: "Example Ltd", phone: "+233 20 000 0000", year: "2022" },
];

const valid = {
  name: "Ama Recruiter",
  email: "ama@company.test",
  organisation: "Company",
  role: "HR Lead",
  reason: "Reference check for the systems administrator role.",
};

function request(body: unknown, ip = "203.0.113.1") {
  return new Request("http://localhost:3000/api/references", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

type Sent = { to: string[]; subject: string; text: string; reply_to?: string };

describe("POST /api/references", () => {
  let sent: Sent[];

  beforeEach(() => {
    // Fresh module per test so the in-memory rate limiters start empty.
    vi.resetModules();
    sent = [];
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@site.test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "site@site.test");
    vi.stubEnv("TURNSTILE_SECRET", "");
    vi.stubEnv("REFERENCES_CONTACTS", JSON.stringify(REFEREES));
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: RequestInit) => {
        sent.push(JSON.parse(init.body as string) as Sent);
        return new Response("{}", { status: 200 });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("emails the references to the requester and tells the owner who asked", async () => {
    const { POST } = await import("@/app/api/references/route");
    const res = await POST(request(valid));
    const data = await res.json();

    expect(res.status).toBe(200);
    // Nothing sensitive comes back to the browser.
    expect(JSON.stringify(data)).not.toContain("+233");

    expect(sent).toHaveLength(2);
    expect(sent[0].to).toEqual(["ama@company.test"]);
    expect(sent[0].text).toContain("Jane Referee");
    expect(sent[0].text).toContain("+233 20 000 0000");

    expect(sent[1].to).toEqual(["owner@site.test"]);
    expect(sent[1].reply_to).toBe("ama@company.test");
    expect(sent[1].text).toContain("Ama Recruiter");
    expect(sent[1].text).toContain("HR Lead");
    expect(sent[1].text).toContain("References emailed: yes");
    expect(sent[1].text).not.toContain("+233");
  });

  it("still notifies the owner when delivery to the requester fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: RequestInit) => {
        const email = JSON.parse(init.body as string) as Sent;
        sent.push(email);
        return new Response("{}", { status: email.to[0] === "owner@site.test" ? 200 : 422 });
      }),
    );
    const { POST } = await import("@/app/api/references/route");
    const res = await POST(request(valid));

    expect(res.status).toBe(502);
    expect(sent[1].text).toContain("References emailed: no");
  });

  it("drops honeypot submissions without sending anything", async () => {
    const { POST } = await import("@/app/api/references/route");
    const res = await POST(request({ ...valid, company: "bot" }));
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("rejects incomplete requests", async () => {
    const { POST } = await import("@/app/api/references/route");
    const res = await POST(request({ ...valid, role: "" }));
    expect(res.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("refuses when referees are not configured", async () => {
    vi.stubEnv("REFERENCES_CONTACTS", "");
    const { POST } = await import("@/app/api/references/route");
    const res = await POST(request(valid));
    expect(res.status).toBe(503);
    expect(sent).toHaveLength(0);
  });

  it("limits repeat requests for the same address", async () => {
    const { POST } = await import("@/app/api/references/route");
    await POST(request(valid, "203.0.113.2"));
    await POST(request(valid, "203.0.113.3"));
    const res = await POST(request(valid, "203.0.113.4"));
    expect(res.status).toBe(429);
  });
});
