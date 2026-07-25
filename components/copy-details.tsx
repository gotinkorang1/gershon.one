"use client";

import { useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { brief } from "@/lib/brief";

/**
 * Screeners paste candidate details into an ATS by hand. This hands them the
 * whole block in one click, in the order those forms usually ask for it.
 */
export function CopyDetails() {
  const [copied, setCopied] = useState(false);

  const block = [
    site.name,
    site.role,
    "",
    `Email: ${site.email}`,
    `Phone: ${site.phone}`,
    `LinkedIn: ${site.socials.linkedin}`,
    `Portfolio: ${site.url}`,
    "",
    ...brief.eligibility.map((e) => `${e.label}: ${e.value}`),
    `Compensation: ${brief.compensation.value}`,
    "",
    "Summary:",
    brief.pitch,
  ].join("\n");

  async function copy() {
    await navigator.clipboard.writeText(block);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <Button variant="outline" onClick={copy} aria-live="polite">
      {copied ? <Check className="text-live" /> : <ClipboardCopy />}
      {copied ? "Copied" : "Copy all details"}
    </Button>
  );
}
