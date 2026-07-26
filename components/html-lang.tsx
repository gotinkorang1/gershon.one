"use client";

import { useEffect } from "react";
import { useLocale } from "@/components/locale-provider";

/**
 * The root layout is shared across locales, so <html lang> cannot be set
 * statically per page. Screen readers use it to choose a pronunciation voice —
 * French read with an English voice is close to unintelligible — so it is
 * corrected on the client as soon as the route resolves.
 */
export function HtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
  }, [locale]);

  return null;
}
