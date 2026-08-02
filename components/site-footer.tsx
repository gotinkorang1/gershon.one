"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navLinks } from "@/lib/site";
import { useI18n } from "@/components/locale-provider";
import { CvButton } from "@/components/cv-button";
import { SHORTCUTS_HELP_EVENT } from "@/components/keyboard-shortcuts";

export function SiteFooter() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const prefix = locale === "fr" ? "/fr" : "";
  // From a sub-route a bare hash targets a section that is not on the page.
  const onHome = pathname === "/" || pathname === "/fr";
  const sectionHref = (hash: string) => (onHome ? hash : `${prefix || "/"}${hash}`);

  return (
    <footer className="border-t border-border">
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-base font-semibold tracking-tight">{site.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.hero.role}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-live">
              <span className="pulse-dot" />
              {t.hero.availability}
            </p>
          </div>

          <nav aria-label={t.ui.footerNav} className="md:col-span-3">
            <p className="label">{t.ui.sections}</p>
            <ul className="mt-3.5 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={sectionHref(l.href)} className="link text-sm text-muted-foreground">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="link text-sm text-muted-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label">{t.nav.contact}</p>
            <ul className="mt-3.5 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="link">
                  {site.phone}
                </a>
              </li>
              <li>
                <CvButton variant="ghost" size="sm" className="-ml-3" respondToShortcut />
              </li>
              <li>
                <Link href="/brief" className="link">
                  {t.ui.candidateBrief}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {site.name}
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(SHORTCUTS_HELP_EVENT))}
            className="label tap inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.625rem] not-italic">
              ?
            </kbd>
            {t.ui.keyboardShortcuts}
          </button>
        </div>
      </div>
    </footer>
  );
}
