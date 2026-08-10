"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  captureAnalyticsEvent,
  type AnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/analytics";

type AnalyticsLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  analyticsEvent: AnalyticsEvent;
  analyticsProperties?: AnalyticsProperties;
  children: ReactNode;
};

export function AnalyticsLink({
  analyticsEvent,
  analyticsProperties,
  children,
  onClick,
  ...props
}: AnalyticsLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        captureAnalyticsEvent(analyticsEvent, analyticsProperties, { immediate: true });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
