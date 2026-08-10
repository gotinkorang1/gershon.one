"use client";

import { CalendarClock, ArrowUpRight } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/components/locale-provider";
import { captureAnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Cal.com booking link. Renders nothing at all unless
 * NEXT_PUBLIC_CAL_LINK is set, so the contact section never shows a dead
 * control. Deliberately a link rather than an iframe embed: the embed ships
 * a third-party script on every page load for a control most visitors never
 * use, and it is the slowest thing on a page like this.
 */
export function Booking() {
  const { t } = useI18n();
  const link = process.env.NEXT_PUBLIC_CAL_LINK;
  if (!link) return null;

  const href = link.startsWith("http") ? link : `https://cal.com/${link}`;

  return (
    <Panel reactive className="p-5">
      <p className="label flex items-center gap-2">
        <CalendarClock aria-hidden className="size-3" />
        {t.ui.bookCall}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {t.ui.bookCallBody}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() =>
          captureAnalyticsEvent("booking opened", { provider: "cal.com" }, { immediate: true })
        }
        className={cn("mt-4", buttonVariants({ variant: "outline", size: "sm" }))}
      >
        {t.ui.findTime}
        <ArrowUpRight aria-hidden />
      </a>
    </Panel>
  );
}
