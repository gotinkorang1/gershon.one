import Link from "next/link";
import { ArrowLeft, ContactRound, Download, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { getDictionary, resumeUrlFor, type Locale } from "@/lib/i18n";
import { briefHref, getBriefContent, getCredentials, getExperience } from "@/lib/localised-content";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CopyDetails } from "@/components/copy-details";
import { AnalyticsLink } from "@/components/analytics-link";
import { BriefActions } from "@/components/brief-actions";

/** The candidate brief at /brief and /fr/brief. */
export function BriefView({ locale }: { locale: Locale }) {
  const brief = getBriefContent(locale);
  const { page, actions } = brief;
  const role = getDictionary(locale).hero.role;
  const current = getExperience(locale)[0];
  const credentials = getCredentials(locale);
  const certs = credentials.filter((c) => c.kind === "certification");
  const degrees = credentials.filter((c) => c.kind === "degree");
  const details = [
    site.name,
    role,
    "",
    `${actions.detailsLabels.email}: ${site.email} · ${site.emailAlt}`,
    `${actions.detailsLabels.phone}: ${site.phone}`,
    `${actions.detailsLabels.linkedin}: ${site.socials.linkedin}`,
    `${actions.detailsLabels.portfolio}: ${site.url}${locale === "fr" ? "/fr" : ""}`,
    "",
    ...brief.eligibility.map((item) => `${item.label}: ${item.value}`),
    `${actions.detailsLabels.compensation}: ${brief.compensation.value}`,
    "",
    `${actions.detailsLabels.summary}:`,
    brief.pitch,
  ].join("\n");

  return (
    <div className="candidate-brief shell max-w-4xl pb-24 pt-28 md:pt-32">
      <Link
        href={locale === "fr" ? "/fr" : "/"}
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground print:hidden"
      >
        <ArrowLeft className="size-3.5" />
        {page.back}
      </Link>

      <header className="brief-header mt-8">
        <p className="label">{page.eyebrow}</p>
        <h1 className="brief-title mt-4 text-jumbo font-semibold">{site.name}</h1>
        <p className="mt-3 text-lede text-muted-foreground">{role}</p>

        <div className="mt-7 grid w-full gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center print:hidden">
          <AnalyticsLink
            href={resumeUrlFor(locale)}
            download
            analyticsEvent="cv downloaded"
            analyticsProperties={{ source: "candidate_brief", document_locale: locale }}
            className={buttonVariants({
              variant: "accent",
              className: "min-h-11 w-full sm:w-auto",
            })}
          >
            <Download aria-hidden />
            {page.downloadCv}
          </AnalyticsLink>
          <BriefActions shareUrl={`${site.url}${briefHref(locale)}`} labels={actions} />
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
            {site.contactCard.labels[locale].save}
          </AnalyticsLink>
          <CopyDetails
            content={details}
            labels={{
              idle: actions.copyDetails,
              copied: actions.detailsCopied,
              error: actions.copyFailed,
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
        <h2 className="label">{page.eligibility}</h2>
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
                <dd className="mt-1.5 text-xs text-muted-foreground">{item.note}</dd>
              </Panel>
            );
          })}
        </dl>

        <Panel inset className="brief-panel mt-3 p-5">
          <p className="label">{page.compensation}</p>
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
        <h2 className="label">{page.pitch}</h2>
        <p className="mt-4 text-lede leading-relaxed text-muted-foreground">{brief.pitch}</p>
      </section>

      {/* -------------------------------------------------------- strengths */}
      <section className="brief-section mt-12">
        <h2 className="label">{page.strengths}</h2>
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
        <h2 className="label">{page.targetRoles}</h2>
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
        <h2 className="label">{page.current}</h2>
        <Panel className="brief-panel mt-4 p-5">
          <p className="text-lg font-semibold tracking-tight">{current.role}</p>
          <p className="mt-1 text-sm text-muted-foreground">{current.company}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.summary}</p>
        </Panel>
      </section>

      {/* ------------------------------------------------------ credentials */}
      <section className="brief-section mt-12">
        <h2 className="label">{page.credentials}</h2>
        <div className="brief-grid mt-4 grid gap-3 sm:grid-cols-2">
          <Panel className="brief-panel p-5">
            <p className="label">{page.education}</p>
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
            <p className="label">{page.certifications}</p>
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
        <h2 className="label">{page.contact}</h2>
        <Panel className="brief-panel mt-4 flex flex-wrap gap-x-10 gap-y-4 p-5">
          <a href={`mailto:${site.email}`} className="link inline-flex items-center gap-2 text-sm">
            <Mail className="size-3.5 text-faint" />
            {site.email}
          </a>
          <a href={`mailto:${site.emailAlt}`} className="link inline-flex items-center gap-2 text-sm">
            <Mail className="size-3.5 text-faint" />
            {site.emailAlt}
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
