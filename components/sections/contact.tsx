"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy, Github, Linkedin, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { GlowCard } from "@/components/fx/glow-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    // Capture the element now — React nulls out currentTarget once the
    // handler returns, and everything below this point is async.
    const formEl = e.currentTarget;
    const payload = Object.fromEntries(new FormData(formEl).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("sent");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Tell me what you're building."
          description="Cloud migration, a network that keeps dropping, or a product that needs shipping — I read everything that arrives here."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* --------------------------------------------------------- direct */}
          <div className="space-y-4">
            <GlowCard className="p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <a
                  href={`mailto:${site.email}`}
                  className="truncate text-lg font-medium tracking-tight transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition hover:text-foreground"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </GlowCard>

            <div className="grid grid-cols-2 gap-4">
              <a href={site.socials.github} target="_blank" rel="noreferrer noopener">
                <GlowCard className="flex h-full items-center gap-3 p-5 text-sm">
                  <Github className="size-4 text-muted-foreground" />
                  GitHub
                </GlowCard>
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer noopener">
                <GlowCard className="flex h-full items-center gap-3 p-5 text-sm">
                  <Linkedin className="size-4 text-muted-foreground" />
                  LinkedIn
                </GlowCard>
              </a>
            </div>

            <GlowCard className="p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Availability
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {site.availability}. Based in {site.location} ({site.timezone}), comfortable
                working across European and North American hours.
              </p>
            </GlowCard>
          </div>

          {/* ----------------------------------------------------------- form */}
          <Reveal>
            <GlowCard className="p-6 sm:p-8">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" name="subject" placeholder="What's this about?" />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    placeholder="A few sentences about the problem you're solving…"
                  />
                </div>

                {/* Honeypot — hidden from humans, catches naive bots */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={status === "sending" || status === "sent"}
                  >
                    {status === "sending" && <Loader2 className="animate-spin" />}
                    {status === "sent" && <Check />}
                    {status === "sending"
                      ? "Sending"
                      : status === "sent"
                        ? "Message sent"
                        : "Send message"}
                    {status === "idle" && <ArrowRight />}
                  </Button>

                  {status === "sent" && (
                    <p className="text-sm text-emerald-500">
                      Thanks — I&apos;ll reply within a day or two.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-500" role="alert">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
