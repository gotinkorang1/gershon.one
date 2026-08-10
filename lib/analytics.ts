"use client";

import posthog from "posthog-js";

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

export type AnalyticsEvent =
  | "$pageview"
  | "role view opened"
  | "case study opened"
  | "blog post opened"
  | "blog post completed"
  | "cv viewed"
  | "cv downloaded"
  | "contact clicked"
  | "contact copied"
  | "contact form sent"
  | "booking opened"
  | "language changed"
  | "social profile opened"
  | "candidate brief printed"
  | "candidate brief shared"
  | "candidate details copied"
  | "contact card downloaded"
  | "blog_post_shared"
  | "blog_code_copied"
  | "experience_expanded"
  | "role_focus_selected";

export type AnalyticsDebugEvent = {
  event: AnalyticsEvent;
  properties: AnalyticsProperties;
  immediate: boolean;
};

const debugListeners = new Set<(item: AnalyticsDebugEvent) => void>();

function contextualProperties(properties: AnalyticsProperties): AnalyticsProperties {
  if (typeof window === "undefined") return properties;
  return {
    path: window.location.pathname,
    locale: window.location.pathname.startsWith("/fr") ? "fr" : "en",
    ...properties,
  };
}

export function captureAnalyticsEvent(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
  options: { immediate?: boolean } = {},
) {
  if (typeof window === "undefined") return;

  const contextual = contextualProperties(properties);
  const immediate = options.immediate ?? false;
  if (process.env.NODE_ENV !== "production") {
    const debugEvent = { event, properties: contextual, immediate };
    debugListeners.forEach((listener) => listener(debugEvent));
  }
  if (posthog.__loaded) {
    posthog.capture(
      event,
      contextual,
      immediate ? { transport: "sendBeacon", send_instantly: true } : undefined,
    );
  }
}

export function subscribeAnalyticsDebug(listener: (item: AnalyticsDebugEvent) => void) {
  if (process.env.NODE_ENV === "production") return () => {};
  debugListeners.add(listener);
  return () => {
    debugListeners.delete(listener);
  };
}

