"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { site, facts } from "@/lib/site";
import { NetworkTopology } from "@/components/fx/network-topology";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 md:pt-32">
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
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07, delayChildren: 0.05 }}
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* ------------------------------------------------------ copy */}
          <div className="lg:col-span-5">
            <motion.div variants={rise} transition={{ duration: 0.6 }}>
              <Badge variant="live" className="gap-2 px-0">
                <span className="pulse-dot" />
                {site.availability}
              </Badge>
            </motion.div>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.7 }}
              className="mt-5 text-display font-semibold"
            >
              Gershon
              <br />
              Otinkorang
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.6 }}
              className="mt-5 text-lede font-medium"
            >
              {site.role}
            </motion.p>

            <motion.p
              variants={rise}
              transition={{ duration: 0.6 }}
              className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {site.headline}
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href={site.resumeUrl}>
                <Button variant="accent" size="lg" className="group">
                  Download CV
                  <ArrowDown className="transition-transform group-hover:translate-y-0.5" />
                </Button>
              </a>
              <a href={`mailto:${site.email}`}>
                <Button variant="outline" size="lg" className="group">
                  Get in touch
                  <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </a>
            </motion.div>

            <motion.p
              variants={rise}
              transition={{ duration: 0.6 }}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="size-3.5 shrink-0 text-faint" />
              {site.location} — moving to {site.relocation.to}, {site.relocation.when}
            </motion.p>
          </div>

          {/* -------------------------------------------------- topology */}
          <motion.div
            variants={rise}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <Panel className="p-5 sm:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <p className="label">Production topology · Greenhouse</p>
                <p className="label hidden sm:block">Dual-WAN failover</p>
              </div>
              <NetworkTopology className="mt-6 h-[19rem] sm:h-[21rem]" />
            </Panel>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------------- facts */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {facts.map((f) => (
            <Panel key={f.label} interactive reactive className="p-5">
              <p className="label">{f.label}</p>
              <p className="mt-2.5 text-xl font-semibold tracking-tight">{f.value}</p>
            </Panel>
          ))}
        </motion.div>

        {/* ------------------------------------------- portrait + terminal cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-4 grid gap-4 sm:grid-cols-3"
        >
          <Panel className="overflow-hidden sm:col-span-1">
            <Image
              src="/gershon.webp"
              alt={`Portrait of ${site.name}`}
              width={840}
              height={624}
              priority
              sizes="(max-width: 640px) 100vw, 300px"
              className="h-full w-full object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
            />
          </Panel>
          <Panel inset className="flex flex-col justify-center gap-2 p-6 sm:col-span-2">
            <p className="label">Summary</p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {site.summary}
            </p>
          </Panel>
        </motion.div>
      </div>
    </section>
  );
}
