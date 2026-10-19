"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { captureAnalyticsEvent } from "@/lib/analytics";

/**
 * Swaps between / and /fr. Role-focused portfolio routes keep the selected
 * role so a recruiter never loses the view they were sent.
 */
export function LanguageToggle() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isFrench = pathname?.startsWith("/fr") ?? false;
  const rolePath = pathname?.match(/^\/(?:fr\/)?for\/[^/]+/)?.[0];
  const target = rolePath
    ? isFrench
      ? rolePath.replace(/^\/fr/, "")
      : `/fr${rolePath}`
    : isFrench
      ? "/"
      : "/fr";

  return (
    <Link
      href={target as Route}
      hrefLang={isFrench ? "en-CA" : "fr-CA"}
      onClick={() =>
        captureAnalyticsEvent(
          "language changed",
          {
            from_locale: isFrench ? "fr" : "en",
            to_locale: isFrench ? "en" : "fr",
            role_focus: rolePath?.split("/").at(-1),
          },
          { immediate: true },
        )
      }
      className={cn(
        "tap grid h-9 min-w-9 place-items-center gap-1 rounded-lg border border-border px-2",
        "text-xs font-medium text-faint transition-colors hover:border-border-strong hover:text-foreground",
      )}
    >
      <span className="flex items-center gap-1.5">
        <Languages aria-hidden className="size-3.5" />
        {isFrench ? "EN" : "FR"}
      </span>
      {/* The accessible name starts with the visible "FR"/"EN" so voice-control
          users can say what they see (WCAG 2.5.3, Label in Name). */}
      <span className="sr-only">: {isFrench ? t.ui.switchToEnglish : t.ui.switchToFrench}</span>
    </Link>
  );
}
