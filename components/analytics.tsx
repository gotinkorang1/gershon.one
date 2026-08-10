"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  captureAnalyticsEvent,
  flushAnalyticsEvents,
  subscribeAnalyticsDebug,
  type AnalyticsDebugEvent,
  type PostHogClient,
} from "@/lib/analytics";

/**
 * PostHog is loaded lazily and only when a key is present, so the site runs
 * fine with no analytics configured. Add NEXT_PUBLIC_POSTHOG_KEY to enable.
 */
export function Analytics() {
  const pathname = usePathname();
  const completedBlogPath = useRef<string | null>(null);
  const [debugEvents, setDebugEvents] = useState<AnalyticsDebugEvent[]>([]);

  useEffect(
    () =>
      subscribeAnalyticsDebug((item) => {
        setDebugEvents((current) => [...current.slice(-24), item]);
      }),
    [],
  );

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || typeof window === "undefined") return;

    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
    const script = document.createElement("script");
    script.src = `${host}/static/array.js`;
    script.async = true;
    script.onload = () => {
      const ph = (window as unknown as { posthog?: PostHogClient }).posthog;
      ph?.init(key, {
        api_host: host,
        capture_pageview: false,
        autocapture: false,
        disable_session_recording: true,
        person_profiles: "identified_only",
      });
      flushAnalyticsEvents();
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    captureAnalyticsEvent("$pageview", { $current_url: window.location.href });

    const role = pathname.match(/^\/(?:fr\/)?for\/([^/]+)$/)?.[1];
    if (role) captureAnalyticsEvent("role view opened", { role_focus: role });

    const caseStudy = pathname.match(/^\/(?:fr\/)?work\/([^/]+)$/)?.[1];
    if (caseStudy) captureAnalyticsEvent("case study opened", { case_study: caseStudy });

    const blogPost = pathname.match(/^\/blog\/([^/]+)$/)?.[1];
    if (blogPost) captureAnalyticsEvent("blog post opened", { post_slug: blogPost });
  }, [pathname]);

  useEffect(() => {
    const blogPost = pathname.match(/^\/blog\/([^/]+)$/)?.[1];
    if (!blogPost) return;

    let frame: number | null = null;
    const checkProgress = () => {
      frame = null;
      if (completedBlogPath.current === pathname) return;

      const article = document.querySelector("article");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      const progress = (viewportBottom - articleTop) / Math.max(rect.height, 1);
      if (progress < 0.9) return;

      completedBlogPath.current = pathname;
      captureAnalyticsEvent("blog post completed", {
        post_slug: blogPost,
        completion_threshold: 90,
      });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(checkProgress);
    };

    checkProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const trackOutboundContact = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const section = anchor.closest("section")?.id;
      const location = section || (anchor.closest("footer") ? "footer" : "site");
      const accessibleLabel = (anchor.getAttribute("aria-label") || anchor.textContent || "")
        .trim()
        .toLowerCase();
      if (href.startsWith("mailto:")) {
        captureAnalyticsEvent("contact clicked", { channel: "email", location }, { immediate: true });
      } else if (href.startsWith("tel:")) {
        captureAnalyticsEvent("contact clicked", { channel: "phone", location }, { immediate: true });
      } else if (href.includes("linkedin.com") && accessibleLabel === "linkedin") {
        captureAnalyticsEvent(
          "social profile opened",
          { network: "linkedin", location },
          { immediate: true },
        );
      } else if (href.includes("github.com") && accessibleLabel === "github") {
        captureAnalyticsEvent(
          "social profile opened",
          { network: "github", location },
          { immediate: true },
        );
      }
    };

    document.addEventListener("click", trackOutboundContact);
    return () => document.removeEventListener("click", trackOutboundContact);
  }, []);

  if (process.env.NODE_ENV === "production") return null;
  return (
    <output
      id="analytics-debug"
      hidden
      data-events={JSON.stringify(debugEvents)}
      aria-hidden
    />
  );
}
