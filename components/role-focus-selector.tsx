"use client";

import Link from "next/link";
import { useI18n } from "@/components/locale-provider";
import { useRoleFocus } from "@/components/role-focus-provider";
import { getRoleFocusProfiles } from "@/lib/localised-content";
import { cn } from "@/lib/utils";

export function RoleFocusSelector() {
  const { t, locale } = useI18n();
  const focus = useRoleFocus();
  const profiles = getRoleFocusProfiles(locale);
  const activeProfile = profiles.find((profile) => profile.id === focus);
  const prefix = locale === "fr" ? "/fr" : "";

  return (
    <div className="mt-6 max-w-2xl">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="label">{t.ui.focusPrompt}</p>
        <p className="hidden text-xs text-faint sm:block">{t.ui.focusHint}</p>
      </div>

      <nav
        aria-label={t.ui.portfolioFocus}
        className="focus-strip -mx-5 mt-3 flex gap-1.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        <Link
          href={prefix || "/"}
          scroll={false}
          aria-current={focus === null ? "page" : undefined}
          className={cn(
            "tap shrink-0 rounded-[0.2rem_0.55rem_0.2rem_0.55rem] border px-3 py-2 text-xs font-medium transition-colors",
            focus === null
              ? "border-accent/50 bg-accent-quiet text-accent"
              : "border-border bg-surface-1/65 text-muted-foreground hover:border-border-strong hover:text-foreground",
          )}
        >
          {t.ui.focusOverview}
        </Link>

        {profiles.map((profile) => {
          const active = focus === profile.id;
          return (
            <Link
              key={profile.id}
              href={`${prefix}/for/${profile.id}`}
              scroll={false}
              aria-current={active ? "page" : undefined}
              className={cn(
                "tap shrink-0 rounded-[0.2rem_0.55rem_0.2rem_0.55rem] border px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "border-accent/50 bg-accent-quiet text-accent"
                  : "border-border bg-surface-1/65 text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              {profile.shortTitle}
            </Link>
          );
        })}
      </nav>

      {activeProfile && (
        <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-muted-foreground">
          {activeProfile.description}
        </p>
      )}
    </div>
  );
}
