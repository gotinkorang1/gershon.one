"use client";

import { useEffect } from "react";

/**
 * PostHog is loaded lazily and only when a key is present, so the site runs
 * fine with no analytics configured. Add NEXT_PUBLIC_POSTHOG_KEY to enable.
 */
export function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || typeof window === "undefined") return;

    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
    const script = document.createElement("script");
    script.src = `${host}/static/array.js`;
    script.async = true;
    script.onload = () => {
      const ph = (window as unknown as { posthog?: { init: (k: string, o: object) => void } })
        .posthog;
      ph?.init(key, { api_host: host, capture_pageview: true, person_profiles: "identified_only" });
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
