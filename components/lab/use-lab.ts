"use client";

import { useI18n } from "@/components/locale-provider";
import { getLab } from "@/lib/localised-content";

/** Systems Lab copy in the current page's language. */
export function useLab() {
  return getLab(useI18n().locale);
}
