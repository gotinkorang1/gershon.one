"use client";

import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { credentials } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function Credentials() {
  const { t } = useI18n();
  // Oldest first: the point of a timeline is the direction of travel.
  const ordered = [...credentials].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <section id="credentials" className="shell scroll-mt-24 py-16 md:py-20">
      <SectionHeading
        index="04 — Credentials"
        title={t.sections.credentialsTitle}
        description={t.sections.credentialsLede}
      />

      <ol className="relative mt-10">
        {/* The spine. Fades at the end because the timeline is still running. */}
        <span
          aria-hidden
          className="absolute bottom-6 left-[15px] top-2 w-px sm:left-[19px]"
          style={{
            background:
              "linear-gradient(180deg, var(--border-strong), var(--border) 70%, transparent)",
          }}
        />

        {ordered.map((c, i) => {
          const Icon = c.kind === "degree" ? GraduationCap : Award;
          const expired = c.expires ? new Date(c.expires) < new Date() : false;

          return (
            <Reveal key={`${c.title}-${c.date}`} delay={0.04 * i}>
              <li className="relative flex gap-4 pb-3 sm:gap-6">
                {/* Node on the spine */}
                <span
                  className={cn(
                    "relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full border sm:size-10",
                    c.upcoming
                      ? "border-accent/50 bg-accent-quiet"
                      : "border-border bg-surface-2",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-3.5 sm:size-4",
                      c.upcoming ? "text-accent" : "text-muted-foreground",
                    )}
                  />
                </span>

                <Panel interactive reactive className="min-w-0 flex-1 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="label">{monthYear(c.date)}</span>
                    {c.upcoming && <Badge variant="accent">{t.common.upcoming}</Badge>}
                    {c.expires && (
                      <span className="label">
                        {expired ? t.common.expired : t.common.validTo} {monthYear(c.expires)}
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
                      {t.common.verify} <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </Panel>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
