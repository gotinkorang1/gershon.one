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
  | "contact card downloaded";

export type PostHogClient = {
  init: (key: string, options: Record<string, unknown>) => void;
  capture: (
    event: string,
    properties?: AnalyticsProperties,
    options?: { transport?: "sendBeacon"; send_instantly?: boolean },
  ) => void;
};

type PendingEvent = {
  event: AnalyticsEvent;
  properties: AnalyticsProperties;
  immediate: boolean;
};

export type AnalyticsDebugEvent = PendingEvent;

const pendingEvents: PendingEvent[] = [];
const MAX_PENDING_EVENTS = 40;
const debugListeners = new Set<(item: AnalyticsDebugEvent) => void>();

function postHogClient(): PostHogClient | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { posthog?: PostHogClient }).posthog;
}

function contextualProperties(properties: AnalyticsProperties): AnalyticsProperties {
  if (typeof window === "undefined") return properties;
  return {
    path: window.location.pathname,
    locale: window.location.pathname.startsWith("/fr") ? "fr" : "en",
    ...properties,
  };
}

function send(
  client: PostHogClient,
  event: AnalyticsEvent,
  properties: AnalyticsProperties,
  immediate: boolean,
) {
  try {
    client.capture(
      event,
      properties,
      immediate ? { transport: "sendBeacon", send_instantly: true } : undefined,
    );
  } catch {
    // Analytics must never interrupt the action being measured.
  }
}

export function captureAnalyticsEvent(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
  options: { immediate?: boolean } = {},
) {
  if (typeof window === "undefined") return;

  const client = postHogClient();
  const contextual = contextualProperties(properties);
  const immediate = options.immediate ?? false;
  if (process.env.NODE_ENV !== "production") {
    const debugEvent = { event, properties: contextual, immediate };
    debugListeners.forEach((listener) => listener(debugEvent));
  }
  if (client?.capture) {
    send(client, event, contextual, immediate);
    return;
  }

  // With no project key, analytics is intentionally disabled rather than
  // retaining an in-memory queue for the lifetime of the page.
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  if (pendingEvents.length >= MAX_PENDING_EVENTS) pendingEvents.shift();
  pendingEvents.push({ event, properties: contextual, immediate });
}

export function subscribeAnalyticsDebug(listener: (item: AnalyticsDebugEvent) => void) {
  if (process.env.NODE_ENV === "production") return () => {};
  debugListeners.add(listener);
  return () => {
    debugListeners.delete(listener);
  };
}

export function flushAnalyticsEvents() {
  const client = postHogClient();
  if (!client?.capture) return;

  for (const item of pendingEvents.splice(0)) {
    send(client, item.event, item.properties, item.immediate);
  }
}
