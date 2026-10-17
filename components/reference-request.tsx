"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2, LockKeyhole } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/turnstile";
import { useI18n } from "@/components/locale-provider";
import { captureAnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "closed" | "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-surface-inset px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60 focus:bg-surface-1";

/**
 * Gated referee contact details. Nothing sensitive reaches the browser: the
 * server emails the references to the address entered, after Turnstile, and
 * tells the owner who asked. The form (and the Turnstile script) only mount
 * once the visitor opens it.
 */
export function ReferenceRequest() {
  const { t } = useI18n();
  const copy = t.referenceRequest;
  const [status, setStatus] = useState<Status>("closed");
  const [error, setError] = useState("");
  // Bumped after a failed attempt so the single-use Turnstile token is refreshed.
  const [captchaNonce, setCaptchaNonce] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/references", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? t.ui.somethingWentWrong);
      captureAnalyticsEvent("references requested");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.ui.somethingWentWrong);
      setCaptchaNonce((n) => n + 1);
    }
  }

  return (
    <Panel className="mt-3 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-sm font-medium">
            <LockKeyhole aria-hidden className="size-3.5 text-accent" />
            {copy.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{copy.lede}</p>
        </div>
        {status === "closed" && (
          <Button type="button" variant="outline" onClick={() => setStatus("idle")}>
            {copy.open}
          </Button>
        )}
      </div>

      {status !== "closed" && (
        <form onSubmit={onSubmit} className="mt-5 grid gap-4 border-t border-border pt-5">
          <fieldset disabled={status === "sending" || status === "sent"} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ref-name" className="label">
                  {copy.name}
                </label>
                <input id="ref-name" name="name" required maxLength={120} autoComplete="name" className={cn(inputClass, "mt-2")} />
              </div>
              <div>
                <label htmlFor="ref-email" className="label">
                  {copy.email}
                </label>
                <input
                  id="ref-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-describedby="ref-email-hint"
                  className={cn(inputClass, "mt-2")}
                />
                <p id="ref-email-hint" className="mt-1.5 text-xs text-faint">
                  {copy.emailHint}
                </p>
              </div>
              <div>
                <label htmlFor="ref-organisation" className="label">
                  {copy.organisation}
                </label>
                <input id="ref-organisation" name="organisation" required maxLength={160} autoComplete="organization" className={cn(inputClass, "mt-2")} />
              </div>
              <div>
                <label htmlFor="ref-role" className="label">
                  {copy.role}
                </label>
                <input id="ref-role" name="role" required maxLength={120} autoComplete="organization-title" className={cn(inputClass, "mt-2")} />
              </div>
            </div>

            <div>
              <label htmlFor="ref-reason" className="label">
                {copy.reason}
              </label>
              <textarea
                id="ref-reason"
                name="reason"
                required
                minLength={20}
                maxLength={2000}
                rows={3}
                placeholder={copy.reasonPlaceholder}
                className={cn(inputClass, "mt-2 max-h-60 min-h-24 resize-none field-sizing-content")}
              />
            </div>
          </fieldset>

          {status !== "sent" && <Turnstile resetSignal={captchaNonce} />}

          {/* Honeypot — hidden from humans, catches naive bots. */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              variant="accent"
              disabled={status === "sending" || status === "sent"}
              aria-busy={status === "sending"}
            >
              {status === "sending" && <Loader2 aria-hidden className="animate-spin" />}
              {status === "sent" && <Check aria-hidden />}
              {status === "sending" ? copy.sending : status === "sent" ? copy.sent : copy.submit}
              {(status === "idle" || status === "error") && <ArrowUpRight aria-hidden />}
            </Button>
            {status === "sent" && (
              <p className="text-sm text-live" role="status">
                {copy.sentDetail}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-warn" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      )}
    </Panel>
  );
}
