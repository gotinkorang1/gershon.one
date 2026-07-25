"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { experience, type Job } from "@/lib/site";
import { cn } from "@/lib/utils";

function years(job: Job) {
  const start = job.start.slice(0, 4);
  const end = job.end ? job.end.slice(0, 4) : "Now";
  return start === end ? start : `${start}—${end}`;
}

function Row({ job, defaultOpen }: { job: Job; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className="row-sweep border-t border-rule">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group grid w-full grid-cols-12 items-start gap-x-6 gap-y-2 py-7 text-left md:gap-x-12"
      >
        <span className="label col-span-3 pt-1.5 md:col-span-2">{years(job)}</span>

        <span className="col-span-8 md:col-span-6">
          <span className="block text-xl font-medium tracking-tight md:text-2xl">
            {job.role}
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            {job.company}
          </span>
        </span>

        <span className="hidden text-sm text-muted-foreground md:col-span-3 md:block">
          {job.division ?? job.location}
        </span>

        <span className="col-span-1 flex justify-end pt-1.5">
          <Plus
            className={cn(
              "size-4 text-faint transition-transform duration-300 group-hover:text-foreground",
              open && "rotate-45",
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
            <div className="grid grid-cols-12 gap-x-6 pb-10 md:gap-x-12">
              <div className="col-span-12 md:col-start-3 md:col-span-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {job.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="grid grid-cols-[1.25rem_1fr] text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="label pt-1.5">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-12 mt-6 md:col-span-3 md:mt-0">
                <p className="label">Stack</p>
                <ul className="mt-3 space-y-1.5">
                  {job.stack.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-20 py-24 md:py-36">
      <SectionHeading
        index="01"
        title="Experience"
        description="Six roles across engineering, real estate, advertising and Ghana's national power utility. Expand any row for detail."
      />

      <Reveal delay={0.05}>
        <ol className="mt-16 border-b border-rule">
          {experience.map((job, i) => (
            <Row key={`${job.company}-${job.start}`} job={job} defaultOpen={i === 0} />
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
