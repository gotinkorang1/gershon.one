"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";

import { useI18n } from "@/components/locale-provider";
import { getCaseStudies } from "@/lib/localised-content";
import { Stagger, StaggerItem } from "@/components/fx/stagger";

export function CaseStudies() {
  const { t, locale } = useI18n();
  const caseStudies = getCaseStudies(locale);

  return (
    <section id="work" className="shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index={t.ui.eyebrowWork}
        title={t.sections.workTitle}
        description={t.sections.workLede}
      />

      <Stagger className="mt-10 grid gap-3">
        {caseStudies.map((study) => (
          <StaggerItem key={study.slug}>
            <Link href={`${locale === "fr" ? "/fr" : ""}/work/${study.slug}`} className="block">
              <Panel interactive reactive className="group p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="label">{study.period}</p>
                  <p className="label flex items-center gap-1.5">
                    <Clock className="size-3" />
                    {study.readingMinutes} {t.common.minRead}
                  </p>
                  {study.draft && <Badge variant="accent">{t.common.draft}</Badge>}
                </div>

                <div className="mt-3 flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {study.title}
                    </h3>
                    <span
                      aria-hidden
                      className="grow-rule mt-2 block h-px w-full max-w-[14rem] bg-accent/50"
                    />
                    <p className="measure mt-2 text-sm leading-relaxed text-muted-foreground">
                      {study.summary}
                    </p>
                  </div>
                  <ArrowUpRight className="nudge mt-1 size-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.tags.slice(0, 5).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </Panel>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
