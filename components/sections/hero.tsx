"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { useI18n } from "@/components/locale-provider";
import { getFacts } from "@/lib/localised-content";
import { NetworkTopology } from "@/components/fx/network-topology";
import { TextReveal } from "@/components/fx/text-reveal";
import { Magnetic } from "@/components/fx/magnetic";
import { CvButton } from "@/components/cv-button";
import { Counter } from "@/components/fx/counter";
import { Parallax } from "@/components/fx/parallax";
import { ImageReveal } from "@/components/fx/image-reveal";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The parent MUST carry its own `variants` to become a variant node — without
 * it Motion never propagates `animate` to children and they stay stuck in
 * `hidden`. Child timing lives inside the variant rather than in a
 * `transition` prop, which would override the stagger.
 */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export function Hero() {
  const { t, locale } = useI18n();
  const facts = getFacts(locale);

  return (
    <section className="relative overflow-hidden pb-10 pt-24 md:pt-28">
      <div className="grid-field fade-edges pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[64rem] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--accent-quiet), transparent 65%)",
        }}
      />

      <div className="shell">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
        >
          {/* ------------------------------------------------------ copy */}
          <div className="lg:col-span-6">
            <motion.div variants={rise}>
              <Badge variant="live" className="gap-2 px-0">
                <span className="pulse-dot" />
                {t.hero.availability}
              </Badge>
            </motion.div>

            <h1 className="mt-6 text-display font-semibold text-balance [overflow-wrap:anywhere]">
              <TextReveal lines={["Gershon", "Otinkorang"]} delay={0.15} />
            </h1>

            <motion.p
              variants={rise}
              className="mt-5 text-lede font-medium text-muted-foreground"
            >
              <span className="text-foreground">{t.hero.role}</span>
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {t.hero.headline}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <CvButton />
              </Magnetic>
              <Magnetic>
                <a href={`mailto:${site.email}`}>
                  <Button variant="outline" size="lg" className="group">
                    {t.hero.getInTouch}
                    <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </a>
              </Magnetic>
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="size-3.5 shrink-0 text-faint" />
              {t.hero.movingTo(site.relocation.to, site.relocation.when)}
            </motion.p>
          </div>

          {/* -------------------------------------------------- topology */}
          <motion.div
            variants={rise}
            className="lg:col-span-6"
          >
            <Parallax distance={22}>
            <Panel className="p-5 sm:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <p className="label">{t.hero.topologyLabel}</p>
                <p className="label hidden sm:block">{t.hero.topologyMode}</p>
              </div>
              <NetworkTopology className="mt-6 h-[19rem] sm:h-[21rem]" />
            </Panel>
            </Parallax>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------------- facts */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {facts.map((f, i) => (
            <Panel key={f.label} interactive reactive className="relative p-5">
              {/* A hairline of colour per card, brightest on the availability
                  fact — the one a recruiter is scanning for. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: i === 2 ? "var(--signal)" : "var(--accent)",
                  opacity: i === 2 ? 0.9 : 0.28,
                }}
              />
              <p className="label">{f.label}</p>
              <Counter
                value={f.value}
                animate={f.countable}
                className="mt-2.5 block text-xl font-semibold tracking-tight"
              />
            </Panel>
          ))}
        </motion.div>

        {/* ------------------------------------------- portrait + terminal cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-3 grid gap-3 sm:grid-cols-3"
        >
          <Panel className="portrait-frame group relative overflow-hidden sm:col-span-1">
            <ImageReveal className="h-full">
              <Image
                src="/gershon.webp"
                alt={`Portrait of ${site.name}`}
                width={840}
                height={624}
                priority
                sizes="(max-width: 640px) 100vw, 320px"
                className="portrait h-full w-full object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
              />
            </ImageReveal>
          </Panel>
          <Panel inset className="flex flex-col justify-center gap-2 p-6 sm:col-span-2">
            <p className="label">{t.common.summary}</p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t.hero.summary}
            </p>
          </Panel>
        </motion.div>
      </div>
    </section>
  );
}
