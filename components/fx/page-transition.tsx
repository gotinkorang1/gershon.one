"use client";

import { ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Route changes run through the browser's View Transitions API. App Router
 * navigations are already React transitions, so <ViewTransition> is enough:
 * the browser snapshots the outgoing page, React commits the new one, and the
 * two animate on the compositor with no JS animation loop.
 *
 * Keyed by pathname so each route is its own element: the old page exits and
 * the new one enters. Without the key both pages share one transition group,
 * and the browser stretches the old page's geometry onto the new one
 * mid-flight. Timing for `page-exit` / `page-enter` lives in globals.css.
 * Browsers without the API, and reduced-motion users, get an instant swap.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
