import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

// A 404 is a dead end for both the visitor and the crawler. noindex keeps it
// out of the index; the links give a person somewhere useful to go.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label text-accent">404</p>
      <h1 className="mt-4 max-w-xl text-jumbo font-semibold tracking-tight">
        This page moved, or never existed.
      </h1>
      <p className="measure mt-5 text-lede text-muted-foreground">
        The link you followed doesn&rsquo;t lead anywhere on this site. Nothing
        is broken — the address just isn&rsquo;t one I have.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface-0 transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface-1"
        >
          See the case studies
          <ArrowUpRight className="size-3.5 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
