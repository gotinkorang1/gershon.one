"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { Linkedin } from "@/components/ui/brand-icons";

/**
 * Share controls for a post: X and LinkedIn intents, plus copy-to-clipboard.
 * The X mark is an inline SVG so it doesn't rely on deprecated brand icons.
 */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const xHref = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  const btn =
    "tap grid size-9 place-items-center rounded-lg border border-border text-faint transition-colors hover:border-border-strong hover:text-foreground";

  return (
    <div className="flex items-center gap-2">
      <span className="label mr-1">Share</span>
      <a href={xHref} target="_blank" rel="noreferrer noopener" aria-label="Share on X" className={btn}>
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={liHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share on LinkedIn"
        className={btn}
      >
        <Linkedin className="size-4" />
      </a>
      <button type="button" onClick={copy} aria-label="Copy link" className={btn}>
        {copied ? <Check className="size-4 text-live" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
