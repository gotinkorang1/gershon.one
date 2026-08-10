"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
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
import { captureAnalyticsEvent } from "@/lib/analytics";

function span(job: Job, present: string) {
  const from = job.start.slice(0, 4);
  const to = job.end ? job.end.slice(0, 4) : present;
  return from === to ? from : `${from} — ${to}`;
}

function Entry({
  job,
  index,
  matched,
  open,
  onToggle,
}: {
  job: Job;
  index: number;
  matched: boolean;
  open: boolean;
  onToggle: (isOpening: boolean) => void;
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
        onClick={() => onToggle(!open)}
        aria-expanded={open}
        className="flex w-full items-start gap-5 p-5 text-left sm:p-6"
      >
        <span aria-hidden className="trace-id mt-1.5 w-8 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

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

        {/* A collapsed row was 18% empty across 1166px. Showing the leading
            technologies previews what expanding reveals, and lets someone
            scanning for "MikroTik" find the right role without opening any. */}
        <span className="hidden min-w-0 shrink items-center gap-1.5 lg:flex">
          {job.stack.slice(0, 3).map((item) => (
            <span
              key={item}
              className="truncate rounded-md border border-border bg-surface-2/60 px-2 py-1 text-[0.6875rem] text-muted-foreground"
            >
              {item}
            </span>
          ))}
          {job.stack.length > 3 && (
            <span className="text-[0.6875rem] text-faint">
              +{job.stack.length - 3}
            </span>
          )}
        </span>

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
  const orderedExperience = prioritizeByKeys(
    experience,
    focusProfile?.experience,
    (job) => job.company,
  );
  const [openCompany, setOpenCompany] = useState<string | null>(
    orderedExperience[0]?.company ?? null,
  );

  return (
    <section id="experience" className="section-band shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index={t.ui.eyebrowExperience}
        title={t.sections.experienceTitle}
        description={t.sections.experienceLede}
      />

      <div className="mt-10 grid gap-3">
        {orderedExperience.map((job, i) => (
          <Reveal key={`${job.company}-${job.start}`} delay={0.04 * i}>
            <Entry
              job={job}
              index={i}
              matched={isTopMatch(job.company, focusProfile?.experience)}
              open={openCompany === job.company}
              onToggle={(isOpening) => {
                if (isOpening) {
                  captureAnalyticsEvent("experience_expanded", { experience_index: i + 1 });
                }
                setOpenCompany(isOpening ? job.company : null);
              }}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
