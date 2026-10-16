/**
 * The site's Trusted Types `default` policy, as an inline script.
 *
 * With `require-trusted-types-for 'script'` (report-only for now; see
 * next.config.ts), DOM sinks that can run code (`innerHTML`, `script.src`,
 * `serviceWorker.register` …) flag plain strings. Code that never asks for a
 * policy falls through to `default`, which is the only one allowed to exist
 * (`trusted-types default`). Nothing this site ships needs those sinks;
 * framework and vendor code does, so the policy lets through exactly those
 * cases and refuses anything else by returning nothing. A refusal is a violation: while the header is report-only the
 * browser reports it to /api/csp-report and lets the assignment through; once
 * enforced it blocks. (Throwing would break the caller even in report-only
 * mode, so the policy never throws.)
 *
 * Allowed:
 * - script URLs on this origin under /_next/ (Next's chunk loader) and
 *   /_vercel/ (Vercel Analytics), plus /sw.js (service worker)
 * - script URLs from Cloudflare Turnstile and PostHog
 * - HTML that is React's empty `<script></script>` (how React creates script
 *   elements on the client) or a JSON-LD object (structured data that React
 *   re-renders on client-side navigation)
 *
 * It runs as an inline <script> placed first in <head>, before any external
 * script can execute. Parser-inserted inline scripts are not DOM sinks, so the
 * policy itself needs no exemption.
 */
const TRUSTED_SCRIPT_ORIGINS = [
  "https://challenges.cloudflare.com",
  "https://us-assets.i.posthog.com",
  "https://us.i.posthog.com",
];

function policy(trustedOrigins: string[]) {
  const tt = (window as unknown as { trustedTypes?: { createPolicy: (name: string, rules: object) => unknown } })
    .trustedTypes;
  if (!tt) return;

  tt.createPolicy("default", {
    createScriptURL(input: string) {
      const url = new URL(input, location.href);
      const sameOrigin = url.origin === location.origin;
      if (
        (sameOrigin &&
          (url.pathname.startsWith("/_next/") ||
            url.pathname.startsWith("/_vercel/") ||
            url.pathname === "/sw.js")) ||
        trustedOrigins.includes(url.origin)
      ) {
        return input;
      }
      return undefined;
    },
    createHTML(input: string) {
      if (input === "<script></script>") return input;
      try {
        const value: unknown = JSON.parse(input);
        if (value && typeof value === "object" && "@context" in value) return input;
      } catch {
        // Not JSON, so not structured data: fall through and refuse.
      }
      return undefined;
    },
  });
}

/**
 * Self-contained source for the inline <head> script.
 *
 * `</` is escaped to `<\/` (identical inside JS strings): the policy contains
 * the text "<script></script>", and an unescaped `</script` would end the
 * inline script element early, cutting the code off mid-statement.
 */
export const trustedTypesPolicyScript =
  `(${policy.toString()})(${JSON.stringify(TRUSTED_SCRIPT_ORIGINS)});`.replace(/<\//g, "<\\/");
