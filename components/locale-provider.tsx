"use client";

import { usePathname } from "next/navigation";
import { getDictionary, defaultLocale, type Locale } from "@/lib/i18n";

/**
 * Locale is derived from the URL rather than from React context.
 *
 * The previous context approach failed for anything rendered in the root
 * layout: SiteNav and SiteFooter are siblings of {children}, so a provider
 * that only wrapped the page never reached them and they always fell back to
 * English. Reading the pathname works identically at every level of the tree
 * and needs no provider at all.
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  return pathname?.startsWith("/fr") ? "fr" : defaultLocale;
}

export function useI18n() {
  const locale = useLocale();
  return { locale, t: getDictionary(locale) };
}

/**
 * Kept so pages can declare their locale explicitly for readability; it no
 * longer needs to provide anything, since useI18n reads the URL.
 */
export function LocaleProvider({ children }: { locale?: Locale; children: React.ReactNode }) {
  return <>{children}</>;
}
