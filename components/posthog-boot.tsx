"use client";

import { useEffect } from "react";
import type { PostHog } from "posthog-js";

declare global {
  interface Window {
    posthog?: PostHog;
  }
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

/**
 * Initialises PostHog lazily — after the browser reports it is idle — so the
 * SDK's parse + execution cost never shows up in Total Blocking Time.
 *
 * The analytics queue in lib/analytics.ts buffers events that fire before
 * PostHog is ready and flushes them in the `loaded` callback, so no events
 * are lost.
 */
export function PostHogBoot() {
  useEffect(() => {
    if (!POSTHOG_KEY) return;

    // requestIdleCallback with a generous timeout so slow devices still get
    // PostHog eventually. Falls back to setTimeout on Safari < 16.4.
    const schedule =
      typeof requestIdleCallback !== "undefined"
        ? (fn: () => void) => requestIdleCallback(fn, { timeout: 4000 })
        : (fn: () => void) => setTimeout(fn, 500);

    schedule(async () => {
      const [{ default: posthog }, { flushAnalyticsEvents }] =
        await Promise.all([
          import("posthog-js"),
          import("@/lib/analytics"),
        ]);

      window.posthog = posthog;

      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
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
    });
  }, []);

  return null;
}
