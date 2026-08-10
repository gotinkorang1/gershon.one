import posthog, { type PostHog } from "posthog-js";
import { flushAnalyticsEvents } from "@/lib/analytics";

declare global {
  interface Window {
    posthog?: PostHog;
  }
}

const projectKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!projectKey || !host) {
  if (process.env.NODE_ENV === "development") {
    const missingVariable = projectKey
      ? "NEXT_PUBLIC_POSTHOG_HOST"
      : "NEXT_PUBLIC_POSTHOG_KEY";
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
    );
  }
} else {
  // The instrumentation entry and React app are separate Turbopack entries.
  // Share the initialized client explicitly so every event helper uses this
  // instance rather than an uninitialized duplicate of the SDK module.
  window.posthog = posthog;
  posthog.init(projectKey, {
    api_host: host,
    defaults: "2026-05-30",
    // Pageviews are captured by the existing route-aware analytics component.
    capture_pageview: false,
    capture_exceptions: true,
    loaded: () => queueMicrotask(flushAnalyticsEvents),
  });
}
