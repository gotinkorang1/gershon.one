"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Loader2, Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { Booking } from "@/components/booking";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/locale-provider";
import { Stagger, StaggerItem } from "@/components/fx/stagger";
import { Turnstile } from "@/components/turnstile";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-surface-inset px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60 focus:bg-surface-1";

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Bumped after every attempt so the single-use Turnstile token is refreshed.
  const [captchaNonce, setCaptchaNonce] = useState(0);
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
      if (!res.ok || !data.ok) throw new Error(data.error ?? t.ui.somethingWentWrong);
      setStatus("sent");
      formEl.reset();
      setCaptchaNonce((n) => n + 1);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.ui.somethingWentWrong);
      setCaptchaNonce((n) => n + 1);
    }
  }

  return (
    <section id="contact" className="shell scroll-mt-24 py-14 md:py-16">
      <SectionHeading
        index={t.ui.eyebrowContact}
        title={t.sections.contactTitle}
        description={t.sections.contactLede(site.relocation.to, t.ui.relocationWhen)}
      />

      <div className="mt-10 grid gap-3 lg:grid-cols-12">
        {/* ------------------------------------------------------- direct */}
        <Stagger className="grid gap-3 lg:col-span-5">
          <StaggerItem>
          <Panel interactive reactive className="p-5">
            <p className="label flex items-center gap-2">
              <Mail className="size-3" /> {t.contact.email}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <a href={`mailto:${site.email}`} className="link truncate text-base font-medium">
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t.ui.copyEmail}
                className="tap grid size-8 shrink-0 place-items-center rounded-md border border-border text-faint transition-colors hover:border-border-strong hover:text-foreground"
              >
                {copied ? <Check className="size-3.5 text-live" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          </Panel>

          </StaggerItem>

          <StaggerItem>
          <Panel interactive reactive className="p-5">
            <p className="label flex items-center gap-2">
              <Phone className="size-3" /> {t.contact.phone}
            </p>
            <a
              href={`tel:${site.phoneHref}`}
              className="link mt-3 inline-block text-base font-medium"
            >
              {site.phone}
            </a>
          </Panel>

          </StaggerItem>

          <StaggerItem className="grid grid-cols-2 gap-3">
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
          </StaggerItem>

          <StaggerItem>
            <Booking />
          </StaggerItem>

          <StaggerItem>
          <Panel inset className="p-5">
            <p className="label">{t.contact.availability}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.ui.basedIn(
                site.location,
                site.timezone,
                site.relocation.to,
                t.ui.relocationWhen,
              )}
            </p>
          </Panel>
          </StaggerItem>
        </Stagger>

        {/* --------------------------------------------------------- form */}
        <Reveal className="lg:col-span-7">
          <Panel className="h-full p-5 sm:p-7">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">
                    {t.contact.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder={t.contact.namePlaceholder}
                    className={cn(inputClass, "mt-2")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    {t.contact.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.contact.emailPlaceholder}
                    className={cn(inputClass, "mt-2")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="label">
                  {t.contact.company}
                </label>
                <input
                  id="subject"
                  name="subject"
                  placeholder={t.contact.companyPlaceholder}
                  className={cn(inputClass, "mt-2")}
                />
              </div>

              <div>
                <label htmlFor="message" className="label">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  className={cn(inputClass, "mt-2 resize-none")}
                />
              </div>

              {/* Invisible for nearly all visitors; renders nothing without a key. */}
              <Turnstile resetSignal={captchaNonce} />

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
                    ? t.contact.sending
                    : status === "sent"
                      ? t.contact.sent
                      : t.contact.send}
                  {status === "idle" && <ArrowUpRight />}
                </Button>

                {status === "sent" && (
                  <p className="text-sm text-live">{t.contact.reply}</p>
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
