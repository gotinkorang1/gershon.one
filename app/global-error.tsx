"use client";

import { useEffect } from "react";
import Link from "next/link";
import { errorFallback } from "@/lib/site";
import "./globals.css";

/**
 * Last-resort boundary: catches errors thrown by the root layout itself, so it
 * must render its own <html>/<body> and cannot rely on the theme provider or
 * the injected fonts. Forcing `.dark` matches the site's default appearance.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-dvh antialiased">
        <main className="shell flex min-h-dvh flex-col justify-center py-24">
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
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 active:scale-[0.985]"
            >
              {errorFallback.retry}
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface-1"
            >
              {errorFallback.home}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
