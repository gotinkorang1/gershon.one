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

function span(job: Job) {
  const from = job.start.slice(0, 4);
  const to = job.end ? job.end.slice(0, 4) : "Present";
  return from === to ? from : `${from} — ${to}`;
}

function Entry({ job, open, onToggle }: { job: Job; open: boolean; onToggle: () => void }) {
  const { t } = useI18n();

  return (
    <Panel reactive className={cn("transition-colors", open && "border-border-strong")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-5 p-5 text-left sm:p-6"
      >
        <span
          className={cn(
            "mt-1.5 hidden size-2 shrink-0 rounded-full transition-colors sm:block",
            job.end === null ? "bg-live" : "bg-border-strong",
          )}
        />

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {/* A heading, not a span: screen reader users navigate by heading
                level, and the employment history is the most important content
                on the page to be able to jump between. */}
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
              {job.role}
            </h3>
            {job.end === null && <Badge variant="accent">{t.common.current}</Badge>}
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
          <span className="label hidden sm:block">{span(job)}</span>
          <ChevronDown
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
                <p className="label sm:hidden">{span(job)}</p>
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index="01 — Experience"
        title={t.sections.experienceTitle}
        description={t.sections.experienceLede}
      />

      <div className="mt-10 grid gap-3">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${job.start}`} delay={0.04 * i}>
            <Entry
              job={job}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
