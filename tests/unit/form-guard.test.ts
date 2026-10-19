import { afterEach, describe, expect, it, vi } from "vitest";
import {
  asString,
  clientIp,
  createRateLimiter,
  headerSafe,
  isEmail,
  originAllowed,
  readJsonBody,
  verifyTurnstile,
} from "@/lib/form-guard";

function req(headers: Record<string, string>, body = "") {
  return new Request("http://localhost:3000/api/contact", { method: "POST", headers, body });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("headerSafe", () => {
  it("strips CR/LF so a field cannot inject extra email headers", () => {
    expect(headerSafe("Ama\r\nBcc: victim@evil.test")).toBe("Ama Bcc: victim@evil.test");
    expect(headerSafe("  plain  ")).toBe("plain");
  });
});

describe("asString", () => {
  it("only passes real strings through", () => {
    expect(asString("x")).toBe("x");
    expect(asString(42)).toBe("");
    expect(asString({ toString: () => "x" })).toBe("");
    expect(asString(undefined)).toBe("");
  });
});

describe("isEmail", () => {
  it("accepts ordinary addresses", () => {
    expect(isEmail("ama@company.test")).toBe(true);
  });

  it("rejects malformed and oversized addresses", () => {
    expect(isEmail("ama@company")).toBe(false);
    expect(isEmail("ama company@x.test")).toBe(false);
    expect(isEmail("@x.test")).toBe(false);
    expect(isEmail(`${"a".repeat(250)}@x.test`)).toBe(false);
  });
});

describe("originAllowed", () => {
  it("allows same-site and header-less requests", () => {
    expect(originAllowed(req({ origin: "http://localhost:3000" }))).toBe(true);
    expect(originAllowed(req({}))).toBe(true);
  });

  it("rejects cross-origin requests", () => {
    expect(originAllowed(req({ origin: "https://evil.test" }))).toBe(false);
  });
});

describe("clientIp", () => {
  it("takes the first hop of x-forwarded-for", () => {
    expect(clientIp(req({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" }))).toBe("203.0.113.9");
    expect(clientIp(req({}))).toBe("unknown");
  });
});

describe("createRateLimiter", () => {
  it("allows up to the limit per key, then blocks until the window resets", () => {
    vi.useFakeTimers();
    const limited = createRateLimiter(2, 1000);

    expect(limited("a")).toBe(false);
    expect(limited("a")).toBe(false);
    expect(limited("a")).toBe(true);
    // Keys are counted independently.
    expect(limited("b")).toBe(false);

    vi.advanceTimersByTime(1001);
    expect(limited("a")).toBe(false);
  });
});

describe("readJsonBody", () => {
  it("parses a JSON body", async () => {
    const result = await readJsonBody(req({ "content-type": "application/json" }, '{"a":1}'), 100);
    expect(result).toEqual({ ok: true, body: { a: 1 } });
  });

  it("rejects non-JSON content types", async () => {
    const result = await readJsonBody(req({ "content-type": "text/plain" }, "{}"), 100);
    expect(result).toMatchObject({ ok: false, status: 415 });
  });

  it("rejects oversized bodies whether declared or not", async () => {
    const big = JSON.stringify({ a: "x".repeat(200) });
    const declared = await readJsonBody(
      req({ "content-type": "application/json", "content-length": "5000" }, "{}"),
      100,
    );
    const undeclared = await readJsonBody(req({ "content-type": "application/json" }, big), 100);
    expect(declared).toMatchObject({ ok: false, status: 413 });
    expect(undeclared).toMatchObject({ ok: false, status: 413 });
  });

  it("rejects invalid JSON", async () => {
    const result = await readJsonBody(req({ "content-type": "application/json" }, "{nope"), 100);
    expect(result).toMatchObject({ ok: false, status: 400 });
  });
});

describe("verifyTurnstile", () => {
  it("passes when no secret is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "");
    expect(await verifyTurnstile("", "1.2.3.4", "test")).toBe(true);
  });

  it("fails without a token when a secret is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await verifyTurnstile("", "1.2.3.4", "test")).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns Cloudflare's verdict", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ success: true })));
    expect(await verifyTurnstile("tok", "1.2.3.4", "test")).toBe(true);

    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ success: false })));
    expect(await verifyTurnstile("tok", "1.2.3.4", "test")).toBe(false);
  });

  it("fails closed when Cloudflare is unreachable", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "secret");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );
    expect(await verifyTurnstile("tok", "1.2.3.4", "test")).toBe(false);
  });
});
