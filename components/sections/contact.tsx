"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Loader2, Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-surface-inset px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60 focus:bg-surface-1";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

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
    <section id="contact" className="shell scroll-mt-24 py-16 md:py-20">
      <SectionHeading
        index="05 — Contact"
        title="Tell me what you're building"
        description={`Available for IT and network administration roles in ${site.relocation.to} from ${site.relocation.when}.`}
      />

      <div className="mt-10 grid gap-3 lg:grid-cols-12">
        {/* ------------------------------------------------------- direct */}
        <div className="grid gap-3 lg:col-span-5">
          <Panel interactive reactive className="p-5">
            <p className="label flex items-center gap-2">
              <Mail className="size-3" /> Email
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <a href={`mailto:${site.email}`} className="link truncate text-base font-medium">
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-faint transition-colors hover:border-border-strong hover:text-foreground"
              >
                {copied ? <Check className="size-3.5 text-live" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          </Panel>

          <Panel interactive reactive className="p-5">
            <p className="label flex items-center gap-2">
              <Phone className="size-3" /> Phone
            </p>
            <a
              href={`tel:${site.phoneHref}`}
              className="link mt-3 inline-block text-base font-medium"
            >
              {site.phone}
            </a>
          </Panel>

          <div className="grid grid-cols-2 gap-3">
            {[
              { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: site.socials.github, label: "GitHub", Icon: Github },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer noopener">
                <Panel interactive reactive className="flex h-full items-center gap-3 p-5">
                  <Icon className="size-4 text-faint" />
                  <span className="text-sm font-medium">{label}</span>
                  <ArrowUpRight className="ml-auto size-3.5 text-faint" />
                </Panel>
              </a>
            ))}
          </div>

          <Panel inset className="p-5">
            <p className="label">Availability</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Based in {site.location} ({site.timezone}), relocating to{" "}
              {site.relocation.to} in {site.relocation.when}. Comfortable working across
              North American and European hours.
            </p>
          </Panel>
        </div>

        {/* --------------------------------------------------------- form */}
        <Reveal className="lg:col-span-7">
          <Panel className="h-full p-5 sm:p-7">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className={cn(inputClass, "mt-2")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={cn(inputClass, "mt-2")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="label">
                  Company or role
                </label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  className={cn(inputClass, "mt-2")}
                />
              </div>

              <div>
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="A few sentences about the role or the problem."
                  className={cn(inputClass, "mt-2 resize-none")}
                />
              </div>

              {/* Honeypot — hidden from humans, catches naive bots. */}
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
                  {status === "idle" && <ArrowUpRight />}
                </Button>

                {status === "sent" && (
                  <p className="text-sm text-live">I&apos;ll reply within a day or two.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-warn" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
