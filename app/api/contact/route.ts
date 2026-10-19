import { NextResponse } from "next/server";
import {
  asString,
  clientIp,
  createRateLimiter,
  headerSafe,
  isEmail,
  originAllowed,
  readJsonBody,
  sendEmail,
  verifyTurnstile,
} from "@/lib/form-guard";

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
  turnstileToken?: unknown;
};

const MAX_BODY_BYTES = 16 * 1024;
const rateLimited = createRateLimiter(5, 60 * 60 * 1000);

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return NextResponse.json({ ok: false, error: "Invalid origin." }, { status: 403 });
  }

  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 415 });
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Try again later." },
      { status: 429 },
    );
  }

  const parsed = await readJsonBody<Payload>(request, MAX_BODY_BYTES);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.body;

  // Bot filled the hidden field — report success and drop it silently.
  if (asString(body.company)) return NextResponse.json({ ok: true });

  // Checked before validation so a bot learns nothing about field rules.
  const verified = await verifyTurnstile(asString(body.turnstileToken), ip, "contact");
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
  if (!isEmail(email)) {
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
    const res = await sendEmail(apiKey, {
      from,
      to: [to],
      reply_to: headerSafe(email),
      subject: headerSafe(`${subject} — from ${name}`),
      text: `From: ${headerSafe(name)} <${headerSafe(email)}>\n\n${message}`,
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
