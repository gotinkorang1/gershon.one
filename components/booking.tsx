"use client";

import { CalendarClock, ArrowUpRight } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";

/**
 * Cal.com booking link. Renders nothing at all unless
 * NEXT_PUBLIC_CAL_LINK is set, so the contact section never shows a dead
 * control. Deliberately a link rather than an iframe embed: the embed ships
 * a third-party script on every page load for a control most visitors never
 * use, and it is the slowest thing on a page like this.
 */
export function Booking() {
  const link = process.env.NEXT_PUBLIC_CAL_LINK;
  if (!link) return null;

  const href = link.startsWith("http") ? link : `https://cal.com/${link}`;

  return (
    <Panel interactive reactive className="p-5">
      <p className="label flex items-center gap-2">
        <CalendarClock className="size-3" />
        Book a call
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Skip the back-and-forth — pick a slot that suits you and it lands in both
        our calendars.
      </p>
      <a href={href} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block">
        <Button variant="outline" size="sm">
          Find a time
          <ArrowUpRight />
        </Button>
      </a>
    </Panel>
  );
}
