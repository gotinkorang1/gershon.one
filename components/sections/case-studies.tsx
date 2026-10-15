"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { getProjectsContent, projectsHref } from "@/lib/localised-content";
import { SectionHeading } from "@/components/fx/section-heading";
import { CaseTitleMorph } from "@/components/fx/case-title-morph";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";

import { useI18n } from "@/components/locale-provider";
import { getCaseStudies } from "@/lib/localised-content";
import { Stagger, StaggerItem } from "@/components/fx/stagger";
import { cn } from "@/lib/utils";
import { useRoleFocus } from "@/components/role-focus-provider";
import { getRoleFocus, isTopMatch, prioritizeByKeys } from "@/lib/role-focus";

export function CaseStudies() {
  const { t, locale } = useI18n();
  const caseStudies = getCaseStudies(locale);
  const focusProfile = getRoleFocus(useRoleFocus());
  const orderedStudies = prioritizeByKeys(
    caseStudies,
    focusProfile?.caseStudies,
    (study) => study.slug,
  );

  return (
    <section id="work" className="section-band shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index={t.ui.eyebrowWork}
        title={t.sections.workTitle}
        description={t.sections.workLede}
      />

      <Stagger className="mt-10 grid gap-3 lg:grid-cols-2">
        {orderedStudies.map((study, i) => {
          const matched = isTopMatch(study.slug, focusProfile?.caseStudies);
          return (
          // With an odd count the lead study takes the full row, so the grid
          // never ends on a card sitting beside an empty cell.
          <StaggerItem
            key={study.slug}
            className={cn(i === 0 && orderedStudies.length % 2 === 1 && "lg:col-span-2")}
          >
            <Link href={`${locale === "fr" ? "/fr" : ""}/work/${study.slug}`} className="block h-full">
              <Panel
                interactive
                reactive
                className={cn("group flex h-full flex-col p-5 sm:p-6", matched && "focus-match")}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="label">{study.period}</p>
                  <p className="label flex items-center gap-1.5">
                    <Clock aria-hidden className="size-3" />
                    {study.readingMinutes} {t.common.minRead}
                  </p>
                  {study.draft && <Badge variant="accent">{t.common.draft}</Badge>}
                  {matched && <Badge variant="accent">{t.ui.focusMatch}</Badge>}
                </div>

                <div className="mt-3 flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <CaseTitleMorph slug={study.slug}>
                      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                        {study.title}
                      </h3>
                    </CaseTitleMorph>
                    <span
                      aria-hidden
                      className="grow-rule mt-2 block h-px w-full max-w-[14rem] bg-accent/50"
                    />
                    <p className="measure mt-2 text-sm leading-relaxed text-muted-foreground">
                      {study.summary}
                    </p>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="nudge mt-1 size-4 shrink-0 text-faint transition-colors group-hover:text-accent"
                  />
                </div>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {study.tags.slice(0, 5).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </Panel>
            </Link>
          </StaggerItem>
          );
        })}
      </Stagger>

      <Link
        href={projectsHref(locale)}
        className="link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
      >
        {getProjectsContent(locale).copy.homeLink} <ArrowRight aria-hidden className="size-3.5" />
      </Link>
    </section>
  );
}
