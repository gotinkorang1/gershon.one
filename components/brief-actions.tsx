"use client";

import { useState } from "react";
import { Check, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureAnalyticsEvent } from "@/lib/analytics";

type BriefActionsProps = {
  shareUrl: string;
  labels: {
    print: string;
    share: string;
    linkCopied: string;
    shareTitle: string;
    shareText: string;
  };
};

export function BriefActions({ shareUrl, labels }: BriefActionsProps) {
  const [copied, setCopied] = useState(false);

  function printBrief() {
    captureAnalyticsEvent(
      "candidate brief printed",
      { source: "candidate_brief" },
      { immediate: true },
    );
    window.print();
  }

  async function shareBrief() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: labels.shareTitle,
          text: labels.shareText,
          url: shareUrl,
        });
        captureAnalyticsEvent("candidate brief shared", {
          source: "candidate_brief",
          method: "native_share",
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      captureAnalyticsEvent("candidate brief shared", {
        source: "candidate_brief",
        method: "copy_link",
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // The browser may block clipboard access outside a secure context. The
      // button remains usable on a later attempt and the page stays intact.
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={printBrief}
        className="min-h-11 w-full sm:w-auto"
      >
        <Printer aria-hidden />
        {labels.print}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={shareBrief}
        className="min-h-11 w-full sm:w-auto"
        aria-live="polite"
      >
        {copied ? <Check className="text-live" aria-hidden /> : <Share2 aria-hidden />}
        {copied ? labels.linkCopied : labels.share}
      </Button>
    </>
  );
}
