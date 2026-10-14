"use client";

import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { getCredentials } from "@/lib/localised-content";
import { credentials as sourceCredentials } from "@/lib/site";
import { Stagger, StaggerItem } from "@/components/fx/stagger";
import { useRoleFocus } from "@/components/role-focus-provider";
import { getRoleFocus, isTopMatch } from "@/lib/role-focus";

function monthYear(iso: string, locale: string) {
  // Dates are stored as plain ISO days, which parse as UTC midnight. Format in
  // UTC too, or a "2026-09-01" renders as Aug 2026 west of Greenwich.
  return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function Credentials() {
  const { t, locale } = useI18n();
  const credentials = getCredentials(locale);
  const focusProfile = getRoleFocus(useRoleFocus());
  // Two lists, each newest first: a recruiter scans for the latest degree and
  // the current certifications, not for the order they were earned in.
  const newestFirst = credentials
    .map((credential, sourceIndex) => ({ credential, sourceIndex }))
    .sort(
      (a, b) =>
        new Date(b.credential.date).getTime() - new Date(a.credential.date).getTime(),
    );
  const groups = [
    { label: t.ui.educationLabel, items: newestFirst.filter(({ credential }) => credential.kind === "degree") },
    { label: t.ui.certificationsLabel, items: newestFirst.filter(({ credential }) => credential.kind !== "degree") },
  ];

  return (
    <section id="credentials" className="section-band shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index={t.ui.eyebrowCredentials}
        title={t.sections.credentialsTitle}
        description={t.sections.credentialsLede}
      />

      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-x-10">
        {groups.map((group, i) => (
          // Education is the shorter list: it holds its place while the
          // certifications scroll past, instead of leaving a gap beside them.
          <div key={group.label} className={cn(i === 0 && "md:sticky md:top-24 md:self-start")}>
            <h3 className="label mb-4">{group.label}</h3>
            <Stagger as="ol" className="relative">
              {/* The spine. Fades at the end because the list keeps growing. */}
              <span
                aria-hidden
                className="absolute bottom-6 left-[15px] top-2 w-px"
                style={{
                  background:
                    "linear-gradient(180deg, var(--border-strong), var(--border) 70%, transparent)",
                }}
              />

            {group.items.map(({ credential: c, sourceIndex }) => {
              const Icon = c.kind === "degree" ? GraduationCap : Award;
              const expired = c.expires ? new Date(c.expires) < new Date() : false;
              const sourceTitle = sourceCredentials[sourceIndex]?.title ?? c.title;
              const matched = isTopMatch(sourceTitle, focusProfile?.credentials);

              return (
                <StaggerItem key={`${c.title}-${c.date}`} as="li" className="relative flex gap-4 pb-3 sm:gap-5">
                    {/* Node on the spine */}
                    <span
                      className={cn(
                        "relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full border",
                        c.upcoming
                          ? "border-accent/50 bg-accent-quiet"
                          : "border-border bg-surface-2",
                      )}
                    >
                      <Icon
                        aria-hidden
                        className={cn(
                          "size-3.5 sm:size-4",
                          c.upcoming ? "text-accent" : "text-muted-foreground",
                        )}
                      />
                    </span>

                    <Panel
                      reactive
                      className={cn(
                        "trace-panel min-w-0 flex-1 p-4",
                        matched && "focus-match",
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="label">{monthYear(c.date, locale)}</span>
                        {c.upcoming && <Badge variant="accent">{t.common.upcoming}</Badge>}
                        {matched && <Badge variant="accent">{t.ui.focusMatch}</Badge>}
                        {c.expires && (
                          <span className="label">
                            {expired ? t.common.expired : t.common.validTo} {monthYear(c.expires, locale)}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 font-medium leading-snug tracking-tight">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                      {c.detail && (
                        <p className="mt-1.5 text-xs leading-relaxed text-faint">{c.detail}</p>
                      )}

                      {c.verifyUrl && (
                        <a
                          href={c.verifyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent"
                        >
                          {t.common.verify} <ArrowUpRight aria-hidden className="size-3" />
                        </a>
                      )}
                    </Panel>
                </StaggerItem>
              );
            })}
            </Stagger>
          </div>
        ))}
      </div>
    </section>
  );
}
