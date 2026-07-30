import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

// Rendered for notFound() calls inside the French route tree, so a visitor who
// hits a dead link under /fr stays in French rather than dropping to English.
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFoundFr() {
  return (
    <main className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label text-accent">404</p>
      <h1 className="mt-4 max-w-xl text-jumbo font-semibold tracking-tight">
        Cette page a été déplacée, ou n&rsquo;a jamais existé.
      </h1>
      <p className="measure mt-5 text-lede text-muted-foreground">
        Le lien que vous avez suivi ne mène nulle part sur ce site. Rien n&rsquo;est
        cassé — c&rsquo;est simplement une adresse que je n&rsquo;ai pas.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          href="/fr"
          className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-surface-0 transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Retour à l&rsquo;accueil
        </Link>
        <Link
          href="/fr#work"
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface-1"
        >
          Voir les études de cas
          <ArrowUpRight className="size-3.5 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
