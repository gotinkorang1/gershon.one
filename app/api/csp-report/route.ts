import { NextResponse } from "next/server";

/**
 * Sink for Content-Security-Policy violation reports.
 *
 * Browsers POST here when a resource is blocked — via the modern Reporting API
 * (`application/reports+json`, an array) or the deprecated `report-uri`
 * (`application/csp-report`, a single `{ "csp-report": {...} }`). Both are
 * accepted; the body is only logged, never persisted.
 *
 * Reports are attacker-reachable and fire-and-forget, so the endpoint is
 * deliberately cheap and defensive: it caps the body, throttles logging so a
 * flood cannot fill the logs, and always answers 204 without echoing anything.
 */

const MAX_BODY_BYTES = 8 * 1024;

// Global (not per-IP) log throttle. A crude bound is enough here: the goal is
// only to stop someone turning this endpoint into a log-flooding tool.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 60;
let windowStart = 0;
let logged = 0;

function shouldLog(): boolean {
  const now = Date.now();
  if (now - windowStart > WINDOW_MS) {
    windowStart = now;
    logged = 0;
  }
  return ++logged <= MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  if (shouldLog()) {
    try {
      const report = JSON.parse(raw);
      // Bounded slice: reports carry a full blocked-URI and source context.
      console.warn("[csp-report]", JSON.stringify(report).slice(0, 2000));
    } catch {
      // Malformed body — nothing to learn from it, drop silently.
    }
  }

  // 204: reporting is one-way. The /api/* header rule already sets no-store.
  return new NextResponse(null, { status: 204 });
}

// Reports are POST-only. Anything else is a misdirected request.
export function GET() {
  return new NextResponse(null, { status: 405 });
}
