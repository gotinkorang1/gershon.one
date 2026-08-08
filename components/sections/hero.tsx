"use client";

import { ThemePortrait } from "@/components/theme-portrait";
import { RoleRotator } from "@/components/fx/role-rotator";
import { StackTicker } from "@/components/fx/stack-ticker";
import { Tilt } from "@/components/fx/tilt";
import { motion, useReducedMotion } from "motion/react";
import {
  Award,
  ArrowUpRight,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { site } from "@/lib/site";
import { getFacts } from "@/lib/localised-content";
import { useI18n } from "@/components/locale-provider";
import { CvButton } from "@/components/cv-button";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/fx/counter";
import { ImageReveal } from "@/components/fx/image-reveal";
import { TextReveal } from "@/components/fx/text-reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Hero() {
  const { t, locale } = useI18n();
  const facts = getFacts(locale);
  const reduced = useReducedMotion();

  const proof = [
    { icon: ShieldCheck, title: t.ui.proofAws, sub: t.ui.proofAwsSub },
    { icon: Award, title: t.ui.proofDegree, sub: t.ui.proofDegreeSub },
    { icon: GraduationCap, title: t.ui.proofMsc, sub: t.ui.proofMscSub },
  ];

  return (
    <section className="relative overflow-hidden pb-4 pt-28 md:pb-6 md:pt-32">
      {/* Two slow, offset washes. Movement without anything you'd call an
          effect — the page breathes rather than performs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden"
      >
        <motion.div
          className="absolute -left-1/4 -top-1/3 size-[42rem] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent-quiet), transparent 68%)" }}
          animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 34, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-0 size-[30rem] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--signal-quiet), transparent 70%)" }}
          animate={reduced ? undefined : { x: [0, -44, 0], y: [0, 40, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="shell">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* ------------------------------------------------------- copy */}
          <div className="min-w-0 lg:col-span-7">
            <motion.p
              variants={rise}
              className="flex items-center gap-2.5 text-sm text-muted-foreground"
            >
              <span className="pulse-dot text-live" />
              {t.hero.availability}
            </motion.p>

            <h1 className="mt-7 text-display font-semibold tracking-tight">
              <TextReveal lines={["Gershon", "Otinkorang"]} delay={0.12} />
            </h1>

            <motion.div variants={rise} className="mt-6 flex items-center gap-4">
              <span className="h-px w-10 shrink-0 bg-accent/60" />
              <p className="text-lede font-medium">
                <RoleRotator roles={site.roles} />
              </p>
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
            >
              {t.hero.headline}
            </motion.p>

            <motion.div variants={rise} className="mt-7 w-full min-w-0 max-w-lg">
              <p className="label mb-2.5">{t.hero.stackLabel}</p>
              <StackTicker items={site.heroStack} />
            </motion.div>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <CvButton />
              <a href={`mailto:${site.email}`}>
                <Button variant="outline" size="lg" className="group">
                  {t.hero.getInTouch}
                  <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </a>

              {/* Recruiters look for these immediately; keep them at hand next
                  to the primary actions rather than only in the footer. */}
              <div className="flex items-center gap-1">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="tap grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <Github aria-hidden className="size-4" />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="tap grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <Linkedin aria-hidden className="size-4" />
                </a>
              </div>
            </motion.div>

            <motion.div variants={rise} className="mt-7 space-y-2.5 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="pulse-dot mt-1.5 shrink-0 text-live" />
                <span className="min-w-0">
                  <span className="label mr-2 block !text-live/90 sm:inline">
                    {t.hero.currentlyLabel}
                  </span>
                  <span>{t.hero.currently}</span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 size-3.5 shrink-0 text-faint" />
                <span className="min-w-0">
                  {t.hero.movingTo(site.relocation.to, t.ui.relocationWhen)}
                </span>
              </p>
            </motion.div>
          </div>

          {/* --------------------------------------------------- portrait */}
          <motion.div variants={rise} className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[19rem] lg:ml-auto lg:mr-0">
              {/* A hairline that traces two corners — quiet framing detail. */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="pointer-events-none absolute -right-3 -top-3 size-16 rounded-tr-xl border-r border-t border-accent/40"
              />
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.8 }}
                className="pointer-events-none absolute -bottom-3 -left-3 size-16 rounded-bl-xl border-b border-l border-accent/40"
              />

              <Tilt className="group/tilt relative">
                <ImageReveal className="portrait-plate overflow-hidden rounded-xl">
                  <ThemePortrait
                    alt={`${site.name} — ${t.hero.role}`}
                    width={840}
                    height={624}
                    priority
                    sizes="(max-width: 1024px) 76vw, 304px"
                    className="aspect-4/5 w-full"
                    imgClassName="aspect-4/5 w-full object-cover object-top"
                  />
                </ImageReveal>
              </Tilt>
            </div>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------- credential strip */}
        <motion.dl
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8 md:mt-20 md:grid-cols-4"
        >
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: EASE }}
            >
              <dt className="label">{f.label}</dt>
              <dd className="mt-2.5 text-base font-medium tracking-tight sm:text-lg">
                <Counter value={f.value} animate={f.countable} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* ------------------------------------------------ summary + proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <p className="label">{t.ui.aboutMe}</p>
            {/* An accent rule beside the paragraph gives it an anchor; a bare
                block of muted text in open space is what read as lonely. */}
            <div className="mt-5 border-l-2 border-accent/40 pl-6">
              <p className="text-lede leading-relaxed text-muted-foreground">
                {t.hero.summary}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="label">{t.ui.verified}</p>
            <ul className="mt-5 space-y-1">
              {proof.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="group flex items-start gap-3.5 rounded-lg px-3 py-3 transition-colors hover:bg-surface-1"
                >
                  <item.icon className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{item.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {item.sub}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
