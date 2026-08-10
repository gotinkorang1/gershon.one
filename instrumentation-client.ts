import posthog, { type PostHog } from "posthog-js";
import { flushAnalyticsEvents } from "@/lib/analytics";

declare global {
  interface Window {
    posthog?: PostHog;
  }
}

const projectKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (projectKey) {
  // The instrumentation entry and React app are separate Turbopack entries.
  // Share the initialized client explicitly so every event helper uses this
  // instance rather than an uninitialized duplicate of the SDK module.
  window.posthog = posthog;
  posthog.init(projectKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-05-30",
    capture_pageview: false,
    capture_pageleave: true,
    request_batching: false,
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_product_tours: true,
    disable_conversations: true,
    disable_external_dependency_loading: true,
    advanced_disable_flags: true,
    person_profiles: "identified_only",
    loaded: () => queueMicrotask(flushAnalyticsEvents),
  });
}
