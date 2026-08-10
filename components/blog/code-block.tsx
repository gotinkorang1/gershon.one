"use client";

import { useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { captureAnalyticsEvent } from "@/lib/analytics";

/**
 * Wraps a rendered code block (with its syntax-highlighted children) and adds a
 * copy button that reads the block's text on click. Used as react-markdown's
 * `pre` renderer, so highlighting still happens server-side via rehype.
 */
export function CodeBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      captureAnalyticsEvent("blog_code_copied");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="group/code relative">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="tap absolute right-2 top-2 z-10 grid size-8 place-items-center rounded-md border border-border bg-surface-1/80 text-faint backdrop-blur transition-opacity hover:text-foreground focus-visible:opacity-100 md:opacity-0 md:group-hover/code:opacity-100"
      >
        {copied ? <Check className="size-3.5 text-live" /> : <Copy className="size-3.5" />}
      </button>
      <pre ref={ref}>{children}</pre>
    </div>
  );
}
