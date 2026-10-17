import { NextResponse } from "next/server";
import { site } from "@/lib/site";
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

/**
 * Reference requests.
 *
 * Referee contact details are other people's personal data, and this repo is
 * public, so they never live in source. They come from the REFERENCES_CONTACTS
 * environment variable and leave the server only by email, to the address the
 * requester entered. Making them use a working address is the point: it ties
 * every disclosure to a reachable person. The owner gets a separate email
 * saying who asked, whether or not delivery succeeded.
 */

type Referee = {
  name: string;
  role: string;
  organisation: string;
  phone: string;
  email?: string;
  /** Year they worked with Gershon, e.g. "2021". */
  year?: string;
};

type Payload = {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  role?: unknown;
  reason?: unknown;
  company?: unknown; // honeypot
  turnstileToken?: unknown;
};

const MAX_BODY_BYTES = 8 * 1024;
const perIp = createRateLimiter(3, 60 * 60 * 1000);
const perEmail = createRateLimiter(2, 24 * 60 * 60 * 1000);

function loadReferees(): Referee[] {
  const raw = process.env.REFERENCES_CONTACTS;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is Referee =>
        typeof r?.name === "string" &&
        typeof r?.role === "string" &&
        typeof r?.organisation === "string" &&
        typeof r?.phone === "string",
    );
  } catch {
    console.error("[references] REFERENCES_CONTACTS is not valid JSON");
    return [];
  }
}

function formatReferee(r: Referee, i: number) {
  const lines = [
    `${i + 1}. ${r.name}`,
    `   ${r.role}${r.year ? ` (${r.year})` : ""}, ${r.organisation}`,
    `   Phone: ${r.phone}`,
  ];
  if (r.email) lines.push(`   Email: ${r.email}`);
  return lines.join("\n");
}

const unavailable = () =>
  NextResponse.json(
    {
      ok: false,
      error: `Reference requests aren't available right now. Please email ${site.email}.`,
    },
    { status: 503 },
  );

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return NextResponse.json({ ok: false, error: "Invalid origin." }, { status: 403 });
  }

  const ip = clientIp(request);
  if (perIp(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
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
  const verified = await verifyTurnstile(asString(body.turnstileToken), ip, "references");
  if (!verified) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please reload and try again." },
      { status: 403 },
    );
  }

  const name = asString(body.name).trim();
  const email = asString(body.email).trim();
  const organisation = asString(body.organisation).trim();
  const role = asString(body.role).trim();
  const reason = asString(body.reason).trim();

  if (!name || !email || !organisation || !role || !reason) {
    return NextResponse.json({ ok: false, error: "Every field is required." }, { status: 400 });
  }
  if (name.length > 120 || organisation.length > 160 || role.length > 120) {
    return NextResponse.json({ ok: false, error: "That field is too long." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (reason.length < 20 || reason.length > 2000) {
    return NextResponse.json(
      { ok: false, error: "Please give a reason between 20 and 2000 characters." },
      { status: 400 },
    );
  }
  if (perEmail(email.toLowerCase())) {
    return NextResponse.json(
      { ok: false, error: "References were already sent to this address today." },
      { status: 429 },
    );
  }

  const referees = loadReferees();
  const apiKey = process.env.RESEND_API_KEY;
  const ownerTo = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !ownerTo || !from || referees.length === 0) {
    // Never log referee details or the requester's reason.
    console.info("[references] Not configured; request received from", email);
    return unavailable();
  }

  const safeName = headerSafe(name);
  const safeEmail = headerSafe(email);

  let delivered = false;
  try {
    const res = await sendEmail(apiKey, {
      from,
      to: [safeEmail],
      reply_to: site.email,
      subject: headerSafe(`References for ${site.name}`),
      text: [
        `Hi ${safeName},`,
        "",
        `Thanks for your interest. Here are my professional references. Please mention that you're contacting them about ${site.name}.`,
        "",
        referees.map(formatReferee).join("\n\n"),
        "",
        "These details are shared for reference checks only. Please don't pass them on.",
        "",
        `${site.name}`,
        site.url,
      ].join("\n"),
    });
    delivered = res.ok;
    if (!res.ok) console.error("[references] Resend responded", res.status, "for requester");
  } catch (err) {
    console.error("[references] Requester email failed:", err instanceof Error ? err.message : err);
  }

  // The owner hears about every verified request, including failed deliveries.
  try {
    const res = await sendEmail(apiKey, {
      from,
      to: [ownerTo],
      reply_to: safeEmail,
      subject: headerSafe(`Reference request: ${name}, ${organisation}`),
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Organisation: ${headerSafe(organisation)}`,
        `Role: ${headerSafe(role)}`,
        "",
        "Reason:",
        reason,
        "",
        `References emailed: ${delivered ? "yes" : "no (delivery failed)"}`,
        `Time: ${new Date().toISOString()}`,
        `IP: ${ip}`,
        `Country: ${request.headers.get("x-vercel-ip-country") ?? "unknown"}`,
        `User agent: ${request.headers.get("user-agent") ?? "unknown"}`,
      ].join("\n"),
    });
    if (!res.ok) console.error("[references] Resend responded", res.status, "for owner");
  } catch (err) {
    console.error("[references] Owner email failed:", err instanceof Error ? err.message : err);
  }

  if (!delivered) {
    return NextResponse.json(
      { ok: false, error: `Couldn't send to that address. Please check it, or email ${site.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
