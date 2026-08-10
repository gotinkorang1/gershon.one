"use client";

import { useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureAnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Screeners paste candidate details into an ATS by hand. This hands them the
 * whole block in one click, in the order those forms usually ask for it.
 */
type CopyDetailsProps = {
  className?: string;
  content: string;
  labels: {
    idle: string;
    copied: string;
    error: string;
  };
};

export function CopyDetails({ className, content, labels }: CopyDetailsProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
      captureAnalyticsEvent("candidate details copied", { source: "candidate_brief" });
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2200);
  }

  return (
    <Button
      variant="outline"
      onClick={copy}
      aria-live="polite"
      className={cn("min-h-11 w-full sm:w-auto", className)}
    >
      {status === "copied" ? <Check className="text-live" /> : <ClipboardCopy />}
      {status === "copied"
        ? labels.copied
        : status === "error"
          ? labels.error
          : labels.idle}
    </Button>
  );
}
