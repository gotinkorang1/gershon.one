"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { type Job } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { getExperience } from "@/lib/localised-content";
import { useRoleFocus } from "@/components/role-focus-provider";
import { getRoleFocus, isTopMatch, prioritizeByKeys } from "@/lib/role-focus";

const VISIBLE_ROLES = 5;

function span(job: Job, present: string) {
  const from = job.start.slice(0, 4);
  const to = job.end ? job.end.slice(0, 4) : present;
  return from === to ? from : `${from} — ${to}`;
}

function Entry({
  job,
  matched,
  open,
  onToggle,
}: {
  job: Job;
  matched: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();

  return (
    <Panel
      reactive
      className={cn(
        "trace-panel transition-colors",
        open && "border-border-strong",
        matched && "focus-match",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-5 p-5 text-left sm:p-6"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {/* A heading, not a span: screen reader users navigate by heading
                level, and the employment history is the most important content
                on the page to be able to jump between. */}
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
              {job.role}
            </h3>
            {job.end === null && <Badge variant="accent">{t.common.current}</Badge>}
            {matched && <Badge variant="accent">{t.ui.focusMatch}</Badge>}
          </span>
          <span className="mt-1.5 block text-sm text-muted-foreground">
            {job.company}
          </span>
        </span>

        {/* Collapsed rows stay quiet — role, company, dates. Nine rows of tool
            chips made the list read as noise; the stack is one click away. */}
        <span className="flex shrink-0 items-center gap-4">
          <span className="label hidden sm:block">{span(job, t.ui.present)}</span>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 text-faint transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Two columns: the constrained measure leaves the right half of a
                wide card empty, so the stack moves alongside rather than below. */}
            <div className="grid gap-8 border-t border-border px-5 pb-7 pt-6 sm:px-6 sm:pl-[3.25rem] lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12">
              <div>
                <p className="label sm:hidden">{span(job, t.ui.present)}</p>
                <p className="measure mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-0">
                  {job.summary}
                </p>

                <ul className="mt-5 grid gap-2.5">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="measure flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:border-l lg:border-border lg:pl-8">
                <p className="label">{t.common.stack}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>

                {job.division && (
                  <div className="mt-6 hidden lg:block">
                    <p className="label">{job.location}</p>
                    <p className="mt-2 text-sm leading-snug text-muted-foreground">
                      {job.division}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  );
}

export function Experience() {
  const { t, locale } = useI18n();
  const experience = getExperience(locale);
  const focusProfile = getRoleFocus(useRoleFocus());
  // IT roles first (stable, so each group stays newest-first), then the
  // focus view pulls its best matches to the top.
  const itFirst = [...experience].sort(
    (a, b) => Number(Boolean(a.secondary)) - Number(Boolean(b.secondary)),
  );
  const orderedExperience = prioritizeByKeys(
    itFirst,
    focusProfile?.experience,
    (job) => job.company,
  );
  const [openCompany, setOpenCompany] = useState<string | null>(
    orderedExperience[0]?.company ?? null,
  );
  // The five most relevant roles carry the section; earlier ones stay in the
  // DOM (for crawlers and find-in-page) but fold away until asked for.
  const [showAll, setShowAll] = useState(false);
  const earlierCount = Math.max(0, orderedExperience.length - VISIBLE_ROLES);

  return (
    <section id="experience" className="section-band shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index={t.ui.eyebrowExperience}
        title={t.sections.experienceTitle}
        description={t.sections.experienceLede}
      />

      <div className="mt-10 grid gap-3">
        {orderedExperience.slice(0, VISIBLE_ROLES).map((job, i) => (
          <Reveal key={`${job.company}-${job.start}`} delay={0.04 * i}>
            <Entry
              job={job}
              matched={isTopMatch(job.company, focusProfile?.experience)}
              open={openCompany === job.company}
              onToggle={() => setOpenCompany(openCompany === job.company ? null : job.company)}
            />
          </Reveal>
        ))}
      </div>

      {earlierCount > 0 && (
        <>
          <div id="earlier-roles" hidden={!showAll} className="mt-3 grid gap-3">
            {orderedExperience.slice(VISIBLE_ROLES).map((job) => (
              <Entry
                key={`${job.company}-${job.start}`}
                job={job}
                matched={isTopMatch(job.company, focusProfile?.experience)}
                open={openCompany === job.company}
                onToggle={() => setOpenCompany(openCompany === job.company ? null : job.company)}
              />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              aria-expanded={showAll}
              aria-controls="earlier-roles"
              onClick={() => setShowAll((v) => !v)}
              className={cn(buttonVariants({ variant: "ghost" }), "group text-muted-foreground")}
            >
              {showAll ? t.ui.showFewerRoles : t.ui.showEarlierRoles(earlierCount)}
              <ChevronDown
                aria-hidden
                className={cn("size-4 transition-transform duration-300", showAll && "rotate-180")}
              />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
