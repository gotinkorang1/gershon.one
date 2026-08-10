import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ContactRound, Download, Mail, Phone } from "lucide-react";
import { site, experience, credentials } from "@/lib/site";
import { brief } from "@/lib/brief";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CopyDetails } from "@/components/copy-details";
import { AnalyticsLink } from "@/components/analytics-link";
import { BriefActions } from "@/components/brief-actions";

export const metadata: Metadata = {
  title: "Candidate brief",
  description: `Availability, work authorisation and core skills for ${site.name}, ${site.role}.`,
  alternates: { canonical: "/brief" },
  // A hiring brief is for people given the link, not for search engines.
  robots: { index: false, follow: true },
};

export default function BriefPage() {
  const current = experience[0];
  const certs = credentials.filter((c) => c.kind === "certification");
  const degrees = credentials.filter((c) => c.kind === "degree");
  const details = [
    site.name,
    site.role,
    "",
    `${site.briefActions.detailsLabels.email}: ${site.email}`,
    `${site.briefActions.detailsLabels.phone}: ${site.phone}`,
    `${site.briefActions.detailsLabels.linkedin}: ${site.socials.linkedin}`,
    `${site.briefActions.detailsLabels.portfolio}: ${site.url}`,
    "",
    ...brief.eligibility.map((item) => `${item.label}: ${item.value}`),
    `${site.briefActions.detailsLabels.compensation}: ${brief.compensation.value}`,
    "",
    `${site.briefActions.detailsLabels.summary}:`,
    brief.pitch,
  ].join("\n");

  return (
    <div className="candidate-brief shell max-w-4xl pb-24 pt-28 md:pt-32">
      <Link
        href="/"
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground print:hidden"
      >
        <ArrowLeft className="size-3.5" />
        Full site
      </Link>

      <header className="brief-header mt-8">
        <p className="label">Candidate brief</p>
        <h1 className="brief-title mt-4 text-jumbo font-semibold">{site.name}</h1>
        <p className="mt-3 text-lede text-muted-foreground">{site.role}</p>

        <div className="mt-7 grid w-full gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center print:hidden">
          <AnalyticsLink
            href={site.resumeUrl}
            download
            analyticsEvent="cv downloaded"
            analyticsProperties={{ source: "candidate_brief", document_locale: "en" }}
            className={buttonVariants({
              variant: "accent",
              className: "min-h-11 w-full sm:w-auto",
            })}
          >
            <Download aria-hidden />
            Download CV
          </AnalyticsLink>
          <BriefActions shareUrl={`${site.url}/brief`} labels={site.briefActions} />
          <AnalyticsLink
            href={site.contactCard.url}
            download={site.contactCard.fileName}
            analyticsEvent="contact card downloaded"
            analyticsProperties={{ source: "candidate_brief" }}
            className={buttonVariants({
              variant: "outline",
              className: "min-h-11 w-full sm:w-auto",
            })}
          >
            <ContactRound aria-hidden />
            {site.contactCard.labels.en.save}
          </AnalyticsLink>
          <CopyDetails
            content={details}
            labels={{
              idle: site.briefActions.copyDetails,
              copied: site.briefActions.detailsCopied,
              error: site.briefActions.copyFailed,
            }}
          />
          <a
            href={`mailto:${site.email}`}
            className={buttonVariants({
              variant: "outline",
              className: "min-h-11 w-full sm:w-auto",
            })}
          >
            <Mail aria-hidden />
            {site.email}
          </a>
        </div>
      </header>

      {/* ------------------------------------------------------ eligibility */}
      <section className="brief-section mt-12">
        <h2 className="label">Eligibility and availability</h2>
        <dl className="brief-grid mt-4 grid gap-3 sm:grid-cols-2">
          {brief.eligibility.map((item) => {
            const unanswered = item.value.startsWith("TODO");
            return (
              <Panel key={item.label} className="brief-panel p-5">
                <dt className="label">{item.label}</dt>
                <dd
                  className={
                    unanswered
                      ? "mt-2 text-lg font-semibold tracking-tight text-signal"
                      : "mt-2 text-lg font-semibold tracking-tight"
                  }
                >
                  {item.value}
                </dd>
                <p className="mt-1.5 text-xs text-muted-foreground">{item.note}</p>
              </Panel>
            );
          })}
        </dl>

        <Panel inset className="brief-panel mt-3 p-5">
          <p className="label">Compensation expectation</p>
          <p
            className={
              brief.compensation.value.startsWith("TODO")
                ? "mt-2 text-base font-medium text-signal"
                : "mt-2 text-base font-medium"
            }
          >
            {brief.compensation.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{brief.compensation.note}</p>
        </Panel>
      </section>

      {/* ------------------------------------------------------------ pitch */}
      <section className="brief-section mt-12">
        <h2 className="label">In one paragraph</h2>
        <p className="mt-4 text-lede leading-relaxed text-muted-foreground">
          {brief.pitch}
        </p>
      </section>

      {/* -------------------------------------------------------- strengths */}
      <section className="brief-section mt-12">
        <h2 className="label">Core skills, ranked</h2>
        <Panel className="brief-skills mt-4 divide-y divide-border">
          {brief.strengths.map((s) => (
            <div
              key={s.skill}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 p-4"
            >
              <span className="font-medium">{s.skill}</span>
              <span className="flex items-baseline gap-4">
                <span className="text-sm text-muted-foreground">{s.level}</span>
                <span className="label w-14 text-right">{s.years}</span>
              </span>
            </div>
          ))}
        </Panel>
      </section>

      {/* ------------------------------------------------------ target roles */}
      <section className="brief-section mt-12">
        <h2 className="label">Roles I&apos;m a match for</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {brief.targetRoles.map((r) => (
            <Badge key={r} variant="accent">
              {r}
            </Badge>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- current */}
      <section className="brief-section mt-12">
        <h2 className="label">Current role</h2>
        <Panel className="brief-panel mt-4 p-5">
          <p className="text-lg font-semibold tracking-tight">{current.role}</p>
          <p className="mt-1 text-sm text-muted-foreground">{current.company}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {current.summary}
          </p>
        </Panel>
      </section>

      {/* ------------------------------------------------------ credentials */}
      <section className="brief-section mt-12">
        <h2 className="label">Education and certification</h2>
        <div className="brief-grid mt-4 grid gap-3 sm:grid-cols-2">
          <Panel className="brief-panel p-5">
            <p className="label">Education</p>
            <ul className="mt-3 space-y-2.5">
              {degrees.map((d) => (
                <li key={d.title}>
                  <p className="text-sm font-medium">{d.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.issuer} · {d.date.slice(0, 4)}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="brief-panel p-5">
            <p className="label">Certifications</p>
            <ul className="mt-3 space-y-2.5">
              {certs.map((c) => (
                <li key={c.title}>
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.issuer} · {c.date.slice(0, 4)}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>

      {/* ---------------------------------------------------------- contact */}
      <section className="brief-section mt-12">
        <h2 className="label">Contact</h2>
        <Panel className="brief-panel mt-4 flex flex-wrap gap-x-10 gap-y-4 p-5">
          <a href={`mailto:${site.email}`} className="link inline-flex items-center gap-2 text-sm">
            <Mail className="size-3.5 text-faint" />
            {site.email}
          </a>
          <a href={`tel:${site.phoneHref}`} className="link inline-flex items-center gap-2 text-sm">
            <Phone className="size-3.5 text-faint" />
            {site.phone}
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="link text-sm"
          >
            LinkedIn
          </a>
        </Panel>
      </section>
    </div>
  );
}
