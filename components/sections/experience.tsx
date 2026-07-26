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
            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              {job.role}
            </span>
            {job.end === null && <Badge variant="accent">{t.common.current}</Badge>}
          </span>
          <span className="mt-1.5 block text-sm text-muted-foreground">
            {job.company}
          </span>
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
            <div className="border-t border-border px-5 pb-6 pt-5 sm:px-6 sm:pl-[3.25rem]">
              <p className="label sm:hidden">{span(job)}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-0">
                {job.summary}
              </p>

              <ul className="mt-5 grid gap-2.5">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
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
    <section id="experience" className="shell scroll-mt-24 py-16 md:py-20">
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
