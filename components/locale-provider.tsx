"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getDictionary, defaultLocale, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Current locale plus its dictionary. Defaults to English outside a provider. */
export function useI18n() {
  const locale = useContext(LocaleContext);
  return { locale, t: getDictionary(locale) };
}
