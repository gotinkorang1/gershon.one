import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function missingConfiguration(variableName: string) {
  return new Error(
    `${variableName} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variableName} is configured`,
  );
}

if (!projectToken) {
  if (process.env.NODE_ENV === "development") {
    throw missingConfiguration("NEXT_PUBLIC_POSTHOG_KEY");
  }
} else if (!host) {
  if (process.env.NODE_ENV === "development") {
    throw missingConfiguration("NEXT_PUBLIC_POSTHOG_HOST");
  }
} else {
  posthog.init(projectToken, {
    api_host: host,
    defaults: "2026-01-30",
    capture_pageview: false,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
