/**
 * Shared protections for the public form endpoints (contact, reference
 * requests). Server-only: imported from route handlers, never from components.
 */

import { site } from "@/lib/site";

/**
 * Verifies a Turnstile token with Cloudflare.
 *
 * The widget on its own proves nothing — anyone can POST directly to an
 * endpoint and skip the browser entirely. Server-side verification is the
 * control; the widget is only how a real visitor obtains a token.
 *
 * Returns true when no secret is configured, so forms keep working in
 * development and in deployments without Turnstile set up.
 */
export async function verifyTurnstile(token: string, ip: string, tag: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;

  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          // Binding the token to the requesting IP stops a token harvested
          // elsewhere being replayed from another host.
          remoteip: ip,
        }),
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!res.ok) {
      console.error(`[${tag}] Turnstile siteverify returned`, res.status);
      return false;
    }

    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn(`[${tag}] Turnstile rejected:`, data["error-codes"]?.join(", "));
    }
    return data.success === true;
  } catch (err) {
    // A Cloudflare outage should not silently disable the check.
    console.error(`[${tag}] Turnstile verification failed:`, err);
    return false;
  }
}

/**
 * Small in-memory limiter. Adequate for a personal site on a single region;
 * swap for Upstash if this ever runs across several instances, since each
 * would otherwise keep its own count.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; reset: number }>();

  return function rateLimited(key: string) {
    const now = Date.now();

    // Opportunistic sweep so the map cannot grow without bound.
    if (hits.size > 5000) {
      for (const [k, entry] of hits) if (now > entry.reset) hits.delete(k);
    }

    const entry = hits.get(key);
    if (!entry || now > entry.reset) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return false;
    }
    entry.count += 1;
    return entry.count > limit;
  };
}

/**
 * Strip CR/LF from anything interpolated into an email header. Without this a
 * crafted name or subject can inject extra headers — a Bcc to an arbitrary
 * address, for instance — and turn the form into an open relay.
 */
export function headerSafe(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/**
 * Only accept submissions originating from this site. Not a defence against a
 * determined attacker (headers are forgeable outside a browser) but it stops
 * drive-by cross-origin abuse cheaply.
 */
export function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = [process.env.NEXT_PUBLIC_SITE_URL, site.url, "http://localhost:3000"]
    .filter(Boolean)
    .map((u) => new URL(u as string).origin);
  return allowed.includes(origin);
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

/**
 * Reads a JSON body with a size cap. Rejects oversized bodies before reading
 * them when the client declares a length, and again after reading in case it
 * lied or streamed.
 */
export async function readJsonBody<T>(
  request: Request,
  maxBytes: number,
): Promise<{ ok: true; body: T } | { ok: false; status: number; error: string }> {
  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return { ok: false, status: 415, error: "Invalid request." };
  }
  const declared = Number(request.headers.get("content-length"));
  if (declared > maxBytes) return { ok: false, status: 413, error: "Message too large." };
  const raw = await request.text();
  if (raw.length > maxBytes) return { ok: false, status: 413, error: "Message too large." };
  try {
    return { ok: true, body: JSON.parse(raw) as T };
  } catch {
    return { ok: false, status: 400, error: "Invalid request." };
  }
}

/** Sends a plain-text email through Resend. Plain text only: no HTML injection surface. */
export async function sendEmail(
  apiKey: string,
  email: { from: string; to: string[]; subject: string; text: string; reply_to?: string },
) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(10_000),
  });
}
