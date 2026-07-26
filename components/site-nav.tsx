"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";
import { useI18n } from "@/components/locale-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { CvButton } from "@/components/cv-button";

export function SiteNav() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const home = locale === "fr" ? "/fr" : "/";
  // On a sub-route a bare "#experience" targets a section that does not exist
  // there, so the link silently does nothing. Prefix with the home path.
  const onHome = pathname === "/" || pathname === "/fr";
  const sectionHref = (hash: string) => (onHome ? hash : `${home}${hash}`);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.3, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-surface-0"
      >
        {t.ui.skipToContent}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-3">
        <div className="shell">
          <nav
            aria-label={t.ui.mainNav}
            className={cn(
              "flex h-14 items-center justify-between gap-4 rounded-xl px-3 transition-all duration-300 sm:px-4",
              scrolled
                ? "border border-border bg-surface-1/80 shadow-[var(--shadow-md)] backdrop-blur-xl"
                : "border border-transparent",
            )}
          >
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md bg-foreground text-[0.625rem] font-bold text-surface-0">
                {site.initials}
              </span>
              <span className="hidden text-sm font-medium tracking-tight sm:inline">
                {site.shortName}
              </span>
            </Link>

            <ul className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={sectionHref(link.href)}
                      className={cn(
                        "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-lg bg-surface-2"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      {t.nav[link.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
                aria-label={t.ui.openPalette}
                className="hidden items-center gap-2 rounded-lg border border-border bg-surface-1 py-1.5 pl-2.5 pr-2 text-xs text-faint transition-colors hover:border-border-strong hover:text-foreground lg:flex"
              >
                {t.ui.search}
                <kbd className="flex items-center gap-0.5 rounded border border-border bg-surface-2 px-1 py-0.5 font-mono text-[0.625rem]">
                  <Command className="size-2.5" />K
                </kbd>
              </button>

              <LanguageToggle />
              <ThemeToggle />

              <CvButton variant="default" size="sm" label="CV" className="hidden sm:inline-flex" />

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="tap relative grid size-9 place-items-center rounded-lg border border-border md:hidden"
              >
                <span
                  className={cn(
                    "absolute h-px w-4 bg-foreground transition-transform duration-300",
                    open ? "rotate-45" : "-translate-y-1",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-foreground transition-transform duration-300",
                    open ? "-rotate-45" : "translate-y-1",
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-surface-0/95 backdrop-blur-xl transition-[opacity,visibility] duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label={t.ui.mobileNav} className="shell flex h-full flex-col justify-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={sectionHref(link.href)}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-border py-4"
            >
              <span className="label">{link.index}</span>
              <span className="text-2xl font-medium tracking-tight">{t.nav[link.key]}</span>
            </Link>
          ))}
          <div className="mt-6" onClick={() => setOpen(false)}>
            <CvButton size="lg" className="w-full" />
          </div>
        </nav>
      </div>
    </>
  );
}
