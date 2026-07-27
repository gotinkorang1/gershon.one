import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Verifies a Turnstile token with Cloudflare.
 *
 * The widget on its own proves nothing — anyone can POST directly to this
 * endpoint and skip the browser entirely. Server-side verification is the
 * control; the widget is only how a real visitor obtains a token.
 *
 * Returns true when no secret is configured, so the form keeps working in
 * development and in deployments without Turnstile set up.
 */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
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
      console.error("[contact] Turnstile siteverify returned", res.status);
      return false;
    }

    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("[contact] Turnstile rejected:", data["error-codes"]?.join(", "));
    }
    return data.success === true;
  } catch (err) {
    // A Cloudflare outage should not silently disable the check.
    console.error("[contact] Turnstile verification failed:", err);
    return false;
  }
}

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
  turnstileToken?: unknown;
};

const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;

// Small in-memory limiter. Adequate for a personal site on a single region;
// swap for Upstash if this ever runs across several instances, since each
// would otherwise keep its own count.
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, entry] of hits) if (now > entry.reset) hits.delete(key);
  }

  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

/**
 * Strip CR/LF from anything interpolated into an email header. Without this a
 * crafted name or subject can inject extra headers — a Bcc to an arbitrary
 * address, for instance — and turn the form into an open relay.
 */
function headerSafe(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  // Only accept submissions originating from this site. Not a defence against
  // a determined attacker (headers are forgeable outside a browser) but it
  // stops drive-by cross-origin abuse cheaply.
  const origin = request.headers.get("origin");
  const allowed = [process.env.NEXT_PUBLIC_SITE_URL, site.url, "http://localhost:3000"]
    .filter(Boolean)
    .map((u) => new URL(u as string).origin);

  if (origin && !allowed.includes(origin)) {
    return NextResponse.json({ ok: false, error: "Invalid origin." }, { status: 403 });
  }

  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 415 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Try again later." },
      { status: 429 },
    );
  }

  // Reject oversized bodies before parsing them.
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Message too large." }, { status: 413 });
  }

  let body: Payload;
  try {
    body = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bot filled the hidden field — report success and drop it silently.
  if (asString(body.company)) return NextResponse.json({ ok: true });

  // Checked before validation so a bot learns nothing about field rules.
  const verified = await verifyTurnstile(asString(body.turnstileToken), ip);
  if (!verified) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please reload and try again." },
      { status: 403 },
    );
  }

  const name = asString(body.name).trim();
  const email = asString(body.email).trim();
  const message = asString(body.message).trim();
  const subject = asString(body.subject).trim() || "New message from gershon.one";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are all required." },
      { status: 400 },
    );
  }
  if (name.length > 120 || subject.length > 200) {
    return NextResponse.json({ ok: false, error: "That field is too long." }, { status: 400 });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message must be between 10 and 5000 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Never log the message body — it is someone else's personal data.
    console.info("[contact] Resend not configured; submission received from", email);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: headerSafe(email),
        subject: headerSafe(`${subject} — from ${name}`),
        // Plain text only: no HTML body means no HTML injection surface.
        text: `From: ${headerSafe(name)} <${headerSafe(email)}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("[contact] Resend responded", res.status);
      return NextResponse.json(
        { ok: false, error: "Couldn't send right now. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { ok: false, error: "Couldn't send right now. Please email me directly." },
      { status: 500 },
    );
  }
}
