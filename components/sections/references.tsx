"use client";

import { ArrowUpRight, Quote } from "lucide-react";
import { references } from "@/lib/site";
import { useI18n } from "@/components/locale-provider";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { SectionDivider } from "@/components/fx/section-divider";

/**
 * References / testimonials.
 *
 * Renders nothing until `site.references` holds at least one real quote, so the
 * page never ships an empty or placeholder proof section. When it does render it
 * owns its trailing divider, keeping the section rhythm intact whether or not
 * it's present.
 */
export function References() {
  const { t } = useI18n();

  if (references.length === 0) return null;

  return (
    <>
      <section id="references" className="shell scroll-mt-24 py-14 md:py-16">
        <Reveal>
          <p className="label">{t.sections.referencesEyebrow}</p>
          <h2 className="mt-3.5 max-w-2xl text-jumbo font-semibold tracking-tight">
            {t.sections.referencesTitle}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.sections.referencesLede}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {references.map((r, i) => (
            <Reveal key={r.name} delay={0.05 * i}>
              <Panel interactive reactive className="flex h-full flex-col p-6">
                <Quote aria-hidden className="size-5 shrink-0 text-accent/70" />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.title}</p>
                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent"
                    >
                      {t.common.verify}
                      <ArrowUpRight aria-hidden className="size-3" />
                    </a>
                  )}
                </figcaption>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
