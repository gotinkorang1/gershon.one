import { Cloud, Network, Shield, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { GlowCard } from "@/components/fx/glow-card";

const pillars = [
  {
    icon: Cloud,
    title: "Cloud that pays for itself",
    body: "Right-sized architecture on AWS with backups that have actually been restored, not just scheduled.",
  },
  {
    icon: Network,
    title: "Networks that stay up",
    body: "Multi-WAN routing, VLAN segmentation and automatic failover — designed so nobody has to be on site at 2am.",
  },
  {
    icon: Shield,
    title: "Security as a default",
    body: "Least privilege, segmented traffic and monitored edges built in from the start rather than bolted on later.",
  },
  {
    icon: Terminal,
    title: "Software that ships",
    body: "Full-stack TypeScript work — from the database schema to the animation timing — delivered end to end.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="About"
          title="Infrastructure is only interesting when someone can use it."
          description="I came into IT through networking hardware and stayed for everything built on top of it. That path means I can trace a problem from a misconfigured route all the way up to a slow React render — and fix it at whichever layer it actually lives."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <Reveal>
              <p>
                I hold a BSc in Information Technology from{" "}
                <span className="text-foreground">KNUST</span> and an HND in ICT from{" "}
                <span className="text-foreground">Takoradi Technical University</span>, and
                I&apos;m an{" "}
                <span className="text-foreground">AWS Certified Cloud Practitioner</span>.
                The formal training matters, but most of what I know came from labs I broke
                on purpose and networks I had to keep alive.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p>
                My work sits where three things meet: infrastructure that has to be reliable,
                software that has to be pleasant, and security that has to be real rather than
                performative. I like problems where all three are in tension.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                Lately I&apos;ve been building with AI as a genuine engineering tool — local
                models, agentic workflows, and the unglamorous evaluation work that tells you
                whether any of it is actually better.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.05 * i}>
                <GlowCard className="h-full p-6">
                  <p.icon className="size-5 text-accent" />
                  <h3 className="mt-4 font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
