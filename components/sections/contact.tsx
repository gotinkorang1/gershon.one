"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const shared =
    "w-full border-0 border-b border-rule bg-transparent py-3 text-base outline-none transition-colors placeholder:text-faint focus:border-foreground";

  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          minLength={10}
          rows={4}
          placeholder={placeholder}
          className={`${shared} mt-1 resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`${shared} mt-1`}
        />
      )}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
    <section id="contact" className="shell scroll-mt-20 py-24 md:py-36">
      <SectionHeading
        index="04"
        title="Get in touch"
        description={`Available for IT and network administration roles in ${site.relocation.to} from ${site.relocation.when}.`}
      />

      <div className="mt-16 grid gap-x-12 gap-y-12 border-t border-rule pt-10 md:grid-cols-12">
        {/* ------------------------------------------------------- direct */}
        <div className="md:col-span-4">
          <dl className="space-y-8">
            <div>
              <dt className="label">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="link text-lg tracking-tight">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:${site.phoneHref}`} className="link text-lg tracking-tight">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Elsewhere</dt>
              <dd className="mt-2 flex flex-col items-start gap-1.5">
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link inline-flex items-center gap-1 text-base"
                >
                  LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link inline-flex items-center gap-1 text-base"
                >
                  GitHub <ArrowUpRight className="size-3.5" />
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Location</dt>
              <dd className="mt-2 text-base text-muted-foreground">
                {site.location} ({site.timezone})
                <br />
                {site.relocation.to} from {site.relocation.when}
              </dd>
            </div>
          </dl>
        </div>

        {/* --------------------------------------------------------- form */}
        <Reveal className="md:col-span-7 md:col-start-6">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Name" name="name" required placeholder="Your name" />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
              />
            </div>
            <Field label="Company" name="subject" placeholder="Organisation or role" />
            <Field
              label="Message"
              name="message"
              required
              textarea
              placeholder="A few sentences about the role or the problem."
            />

            {/* Honeypot — hidden from humans, catches naive bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="inline-flex items-center gap-2.5 bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {status === "sent" ? "Message sent" : "Send message"}
                {status === "sent" ? (
                  <Check className="size-4" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </button>

              {status === "sent" && (
                <p className="text-sm text-muted-foreground">
                  Thanks — I&apos;ll reply within a day or two.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-accent" role="alert">
                  {error}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
