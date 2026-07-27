"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/locale-provider";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          language?: string;
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

/**
 * Cloudflare Turnstile.
 *
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset, so the form
 * keeps working locally and in any deployment without a key. The widget writes
 * its token into a hidden input the form already submits, so no wiring changes
 * are needed in the form itself.
 *
 * `appearance: "interaction-only"` keeps it invisible for the overwhelming
 * majority of visitors — a recruiter should never see a challenge.
 */
export function Turnstile({
  onToken,
  resetSignal = 0,
}: {
  onToken?: (token: string) => void;
  /** Increment to force a fresh challenge; tokens are single-use. */
  resetSignal?: number;
}) {
  const { locale } = useI18n();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!siteKey || !ref.current) return;

    const container = ref.current;

    const render = () => {
      if (!window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(container, {
        sitekey: siteKey,
        theme: "auto",
        language: locale === "fr" ? "fr" : "en",
        appearance: "interaction-only",
        callback: (value) => {
          setToken(value);
          onToken?.(value);
        },
        // A failed or expired challenge clears the token, so the server
        // rejects the submission rather than accepting an unverified one.
        "error-callback": () => setToken(""),
        "expired-callback": () => setToken(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-turnstile="true"]',
      );
      if (!existing) {
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.dataset.turnstile = "true";
        script.onload = render;
        document.head.appendChild(script);
      } else {
        existing.addEventListener("load", render);
      }
    }

    return () => {
      const id = widgetId.current;
      if (id && window.turnstile) {
        window.turnstile.remove(id);
        widgetId.current = null;
      }
    };
  }, [siteKey, locale, onToken]);

  useEffect(() => {
    if (resetSignal === 0) return;
    const id = widgetId.current;
    if (id && window.turnstile) {
      window.turnstile.reset(id);
      setToken("");
    }
  }, [resetSignal]);

  if (!siteKey) return null;

  return (
    <div>
      <div ref={ref} className="min-h-0" />
      <input type="hidden" name="turnstileToken" value={token} readOnly />
    </div>
  );
}
