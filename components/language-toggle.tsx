"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";

/**
 * Swaps between / and /fr, preserving nothing else because both are
 * single-page routes. Canada is officially bilingual; employers with federal
 * or national reach notice.
 */
export function LanguageToggle() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isFrench = pathname?.startsWith("/fr") ?? false;
  const target = isFrench ? "/" : "/fr";

  return (
    <Link
      href={target}
      hrefLang={isFrench ? "en-CA" : "fr-CA"}
      aria-label={isFrench ? t.ui.switchToEnglish : t.ui.switchToFrench}
      className={cn(
        "tap grid h-9 min-w-9 place-items-center gap-1 rounded-lg border border-border px-2",
        "text-xs font-medium text-faint transition-colors hover:border-border-strong hover:text-foreground",
      )}
    >
      <span className="flex items-center gap-1.5">
        <Languages className="size-3.5" />
        {isFrench ? "EN" : "FR"}
      </span>
    </Link>
  );
}
