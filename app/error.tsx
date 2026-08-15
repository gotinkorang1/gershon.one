"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { errorFallback } from "@/lib/site";

/**
 * Route-segment error boundary. Rendered in place of the page — the nav, footer
 * and providers stay mounted — when a render throws below the root layout.
 * `reset()` re-attempts the failed render; the home link is the always-good
 * escape hatch when a retry can't succeed.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // `error.digest` correlates this with the matching server log entry.
    console.error(error);
  }, [error]);

  return (
    <main className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label text-accent">{errorFallback.eyebrow}</p>
      <h1 className="mt-4 max-w-xl text-jumbo font-semibold tracking-tight">
        {errorFallback.title}
      </h1>
      <p className="measure mt-5 text-lede text-muted-foreground">
        {errorFallback.description}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 active:scale-[0.985]"
        >
          <RotateCw className="size-3.5 transition-transform group-hover:-rotate-45" />
          {errorFallback.retry}
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface-1"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          {errorFallback.home}
        </Link>
      </div>
    </main>
  );
}
