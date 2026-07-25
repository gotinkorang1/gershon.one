"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { site, stats } from "@/lib/site";
import { Aurora } from "@/components/fx/aurora";
import { Spotlight } from "@/components/fx/spotlight";
import { Particles } from "@/components/fx/particles";
import { RotatingText } from "@/components/fx/rotating-text";
import { Counter } from "@/components/fx/counter";
import { Marquee } from "@/components/fx/marquee";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stack = [
  "AWS", "MikroTik", "Docker", "Terraform", "Next.js", "TypeScript",
  "Linux", "Kubernetes", "Cisco", "PostgreSQL", "Tailwind", "Vercel",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-30" />
      <Aurora />
      <Spotlight />
      <Particles className="pointer-events-none absolute inset-0 -z-10 size-full text-foreground opacity-60" />
      <div className="noise -z-20" />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.85fr]">
          {/* ---------------------------------------------------------- copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 py-1.5 pl-2 pr-4 text-xs backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-muted-foreground">{site.availability}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-7 text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="gradient-text">Gershon</span>{" "}
              <span className="gradient-text">Otinkorang</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xl font-medium tracking-tight sm:text-2xl"
            >
              <span className="text-muted-foreground">I work as a</span>
              <RotatingText
                words={site.roles}
                className="font-mono text-accent"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-7 max-w-xl text-balance-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {site.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link href="#work" className={cn(buttonVariants({ size: "lg" }), "group")}>
                View selected work
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={site.resumeUrl}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Download />
                Download CV
              </a>
              <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {site.location}
              </span>
            </motion.div>
          </div>

          {/* -------------------------------------------------------- portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_30%,var(--glow),transparent_70%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card">
              <Image
                src="/gershon.webp"
                alt={`Portrait of ${site.name}`}
                width={840}
                height={624}
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="aspect-[4/5] w-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    AWS Certified
                  </p>
                  <p className="text-sm font-medium">Cloud Practitioner</p>
                </div>
                <p className="font-mono text-[11px] text-muted-foreground">
                  BSc IT · KNUST
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ----------------------------------------------------------- stats */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/50 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-background/80 px-6 py-7 backdrop-blur">
              <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <Counter
                  to={s.value}
                  suffix={s.suffix}
                  decimals={"decimals" in s ? (s.decimals as number) : 0}
                />
              </dd>
              <dt className="mt-1.5 text-xs text-muted-foreground sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </motion.dl>

        <div className="mt-10">
          <Marquee items={stack} />
        </div>
      </div>
    </section>
  );
}
