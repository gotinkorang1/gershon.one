import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";
import { getDictionary, type Locale } from "@/lib/i18n";
import {
  blogDate,
  blogHref,
  briefHref,
  getBriefContent,
  getCredentials,
  getExperience,
  getNowCopy,
} from "@/lib/localised-content";

/**
 * The /now page. Everything below the headings is derived from existing
 * content, so it stays current without being edited by hand.
 */
export function NowView({ locale }: { locale: Locale }) {
  const copy = getNowCopy(locale);
  const t = getDictionary(locale);
  const current = getExperience(locale)[0];
  const credentials = getCredentials(locale);
  // The degree in progress: the newest one, which may not be awarded yet.
  const degree = credentials
    .filter((c) => c.kind === "degree")
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  const earned = credentials
    .filter((c) => c.kind === "certification" && !c.upcoming && !c.safety)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  const latest = getPublishedPosts(locale)[0];
  const { targetRoles } = getBriefContent(locale);

  const sections = [
    degree && {
      key: "studying",
      title: copy.sections.studying,
      body: (
        <>
          <p className="text-lg font-semibold tracking-tight">{degree.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{degree.issuer}</p>
        </>
      ),
    },
    {
      key: "working",
      title: copy.sections.working,
      body: (
        <>
          <p className="text-lg font-semibold tracking-tight">{current.role}</p>
          <p className="mt-1 text-sm text-muted-foreground">{current.company}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.summary}</p>
        </>
      ),
    },
    {
      key: "based",
      title: copy.sections.based,
      body: <p className="text-lg font-semibold tracking-tight">{t.hero.location}</p>,
    },
    {
      key: "lookingFor",
      title: copy.sections.lookingFor,
      body: (
        <>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.hero.availability}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {targetRoles.slice(0, 4).map((role) => (
              <Badge key={role} variant="accent">
                {role}
              </Badge>
            ))}
          </div>
          <Link
            href={briefHref(locale)}
            className="link mt-4 inline-flex items-center gap-1 text-sm text-accent"
          >
            {copy.briefLink} <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </>
      ),
    },
    latest && {
      key: "writing",
      title: copy.sections.writing,
      body: (
        <>
          <p className="text-lg font-semibold tracking-tight">{latest.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <time dateTime={latest.date}>{blogDate(latest.date, locale)}</time>
          </p>
          <Link
            href={blogHref(locale, latest.slug)}
            className="link mt-3 inline-flex items-center gap-1 text-sm text-accent"
          >
            {copy.readPost} <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </>
      ),
    },
    earned.length > 0 && {
      key: "earned",
      title: copy.sections.earned,
      body: (
        <ul className="space-y-2.5">
          {earned.map((c) => (
            <li key={c.title}>
              <p className="text-sm font-medium">{c.title}</p>
              <p className="text-xs text-muted-foreground">
                {c.issuer} · {c.date.slice(0, 4)}
              </p>
            </li>
          ))}
        </ul>
      ),
    },
  ].filter((s) => !!s);

  return (
    <div className="shell max-w-4xl pb-24 pt-28 md:pt-32">
      <Link
        href={locale === "fr" ? "/fr" : "/"}
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {site.shortName}
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="label">{copy.eyebrow}</p>
        <h1 className="mt-4 text-jumbo font-semibold">{copy.title}</h1>
        <p className="mt-5 text-lede text-muted-foreground">{copy.lede}</p>
        <p className="mt-4 text-sm text-faint">
          {copy.updated}{" "}
          <time dateTime={site.contentUpdated}>{blogDate(site.contentUpdated, locale)}</time>
          {" · "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noreferrer noopener"
            className="link"
          >
            {copy.about}
          </a>
        </p>
      </header>

      <dl className="mt-12 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Panel key={s.key} className="p-5">
            <dt className="label">{s.title}</dt>
            <dd className="mt-3">{s.body}</dd>
          </Panel>
        ))}
      </dl>
    </div>
  );
}
