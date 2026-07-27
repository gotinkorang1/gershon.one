import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * `'unsafe-inline'` on script-src is required: Next injects inline bootstrap
 * scripts, and next-themes writes an inline script in <head> to set the theme
 * class before first paint — without it every load flashes the wrong theme.
 * A nonce-based policy would need middleware and dynamic rendering on every
 * route, which would cost the static generation this site depends on. The
 * trade is deliberate; the JSON-LD sink that made inline script genuinely
 * dangerous is escaped at source in lib/json-ld.ts.
 */
const isDev = process.env.NODE_ENV === "development";

/**
 * React's development build calls eval() to reconstruct stack traces across
 * the server/client boundary, and Turbopack's HMR runtime needs it too. React
 * never calls eval() in production, so the allowance is scoped to dev rather
 * than weakening the shipped policy to make local tooling work.
 */
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : "",
  "https://us-assets.i.posthog.com",
  "https://us.i.posthog.com",
  // Cloudflare Turnstile
  "https://challenges.cloudflare.com",
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com",
  "font-src 'self' data:",
  `connect-src 'self' https://api.github.com https://us.i.posthog.com https://us-assets.i.posthog.com${
    isDev ? " ws: http://localhost:*" : ""
  }`,
  "form-action 'self'",
  // Some browsers route inline PDF rendering through a frame.
  // Turnstile renders its challenge inside a frame.
  "frame-src 'self' https://challenges.cloudflare.com",
  // 'self', not 'none': the CV viewer frames a PDF served from this origin.
  // Cross-origin framing — the clickjacking risk — is still refused.
  "frame-ancestors 'self'",
  "base-uri 'self'",
  // The CV viewer embeds a same-origin PDF via <object>; 'none' would
  // silently blank it. Restricted to 'self' rather than opened up.
  "object-src 'self'",
  isDev ? "" : "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // API responses are per-request. A shared cache holding a 429 would
        // lock out everyone behind that proxy; holding a form result is worse.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        // Static PDFs are framed by the CV viewer, so they must not carry the
        // page-level frame restrictions. Scoped tightly to these two files.
        source: "/:file(gershon-otinkorang-cv(?:-fr)?\\.pdf)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // SAMEORIGIN rather than DENY, for the same reason as
          // frame-ancestors above. Legacy browsers only; CSP supersedes it.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // Stops other origins embedding this site's assets as subresources.
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
