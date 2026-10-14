"use client";

import { useEffect, useState } from "react";
import { ThemePortrait } from "@/components/theme-portrait";
import { useRoleFocus } from "@/components/role-focus-provider";
import { motion } from "motion/react";
import {
  Award,
  ArrowUpRight,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { site } from "@/lib/site";
import { getFacts, getRoleFocusProfiles } from "@/lib/localised-content";
import { useI18n } from "@/components/locale-provider";
import { CvButton } from "@/components/cv-button";
import { buttonVariants } from "@/components/ui/button";
import { Counter } from "@/components/fx/counter";
import { ImageReveal } from "@/components/fx/image-reveal";
import { TextReveal } from "@/components/fx/text-reveal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
let hasMountedHero = false;

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
  const focus = useRoleFocus();
  const focusProfiles = getRoleFocusProfiles(locale);
  const activeFocus = focusProfiles.find((profile) => profile.id === focus);
  const [animateIntro] = useState(() => !hasMountedHero);

  useEffect(() => {
    hasMountedHero = true;
  }, []);

  const proof = [
    { icon: ShieldCheck, title: t.ui.proofAws, sub: t.ui.proofAwsSub },
    { icon: Award, title: t.ui.proofDegree, sub: t.ui.proofDegreeSub },
    { icon: GraduationCap, title: t.ui.proofMsc, sub: t.ui.proofMscSub },
  ];

  return (
    <section className="hero-field relative overflow-hidden pb-4 pt-28 md:pb-6 md:pt-36">
      <div className="shell">
        <motion.div
          variants={container}
          initial={animateIntro ? "hidden" : false}
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* ------------------------------------------------------- copy */}
          {/* One job: who, what, and how to reach him. Everything else on the
              page has its own section. */}
          <div className="min-w-0 lg:col-span-7">
            <motion.p
              variants={rise}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-1/60 py-1.5 pl-3 pr-3.5 text-xs text-muted-foreground backdrop-blur-sm"
            >
              <span className="pulse-dot text-live" />
              {t.hero.status}
            </motion.p>

            <h1 className="mt-8 text-display font-semibold tracking-tight">
              <TextReveal
                lines={["Gershon", "Otinkorang"]}
                delay={0.12}
                animate={animateIntro}
              />
            </h1>

            <motion.p variants={rise} className="mt-6 text-lede font-medium text-accent">
              {activeFocus ? activeFocus.title : t.hero.role}
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 max-w-[34rem] text-lg leading-relaxed text-muted-foreground"
            >
              {t.hero.headline}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {/* On phones the two primary actions split the full width and the
                  social icons sit beneath them; from sm up it is one row. */}
              <div className="flex w-full gap-3 sm:w-auto">
                <CvButton className="flex-1 sm:flex-none" />
                <a
                  href={`mailto:${site.email}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "group flex-1 sm:flex-none",
                  )}
                >
                  {t.hero.getInTouch}
                  <ArrowUpRight
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              {/* Recruiters look for these immediately; keep them at hand next
                  to the primary actions rather than only in the footer. */}
              <div className="flex items-center gap-1">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="tap grid size-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-1 hover:text-foreground"
                >
                  <Github aria-hidden className="size-[1.125rem]" />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="tap grid size-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-1 hover:text-foreground"
                >
                  <Linkedin aria-hidden className="size-[1.125rem]" />
                </a>
              </div>
            </motion.div>

            <motion.p variants={rise} className="mt-8 text-sm text-faint">
              {t.hero.currently}
            </motion.p>
          </div>

          {/* --------------------------------------------------- portrait */}
          <motion.div variants={rise} className="lg:col-span-5">
            <div className="w-full max-w-[14rem] sm:mx-auto sm:max-w-[20rem] lg:ml-auto lg:mr-0">
              <ImageReveal
                animate={animateIntro}
                className="portrait-plate overflow-hidden rounded-2xl"
              >
                <ThemePortrait
                  alt={`${site.name} — ${t.hero.role}`}
                  width={840}
                  height={624}
                  priority
                  sizes="(max-width: 1024px) 76vw, 320px"
                  className="aspect-4/5 w-full"
                  imgClassName="aspect-4/5 w-full object-cover object-top"
                />
              </ImageReveal>
            </div>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------- credential strip */}
        <motion.dl
          initial={animateIntro ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8 md:mt-20 md:grid-cols-4"
        >
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={animateIntro ? { opacity: 0, y: 10 } : false}
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
          initial={animateIntro ? { opacity: 0, y: 16 } : false}
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
                  initial={animateIntro ? { opacity: 0, x: -8 } : false}
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
