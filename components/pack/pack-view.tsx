import Link from "next/link";
import { ArrowLeft, Download, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { prioritizeByKeys } from "@/lib/role-focus";
import { credentials, experience, site, skillGroups, type RoleFocusId } from "@/lib/site";
import {
  getBriefContent,
  getCaseStudies,
  getCredentials,
  getExperience,
  getFeatures,
  getRoleFocusProfiles,
  getSkillGroups,
  packHref,
} from "@/lib/localised-content";
import { resumeUrlFor, type Locale } from "@/lib/i18n";
import { AnalyticsLink } from "@/components/analytics-link";
import { BriefActions } from "@/components/brief-actions";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Panel } from "@/components/ui/panel";

export function PackView({ focus, locale }: { focus: RoleFocusId; locale: Locale }) {
  const profile = getRoleFocusProfiles(locale).find((p) => p.id === focus);
  if (!profile) notFound();
  const copy = getFeatures(locale).recruiterPack;
  const { eligibility, actions } = getBriefContent(locale);
  const prefix = locale === "fr" ? "/fr" : "";

  // Localisers keep source order, so translated items are matched to the
  // English keys the profile uses by position.
  const jobsLocal = getExperience(locale);
  const jobs = prioritizeByKeys(
    experience.map((job, i) => ({ job, local: jobsLocal[i] })),
    profile.experience,
    ({ job }) => job.company,
  )
    .slice(0, 3)
    .map(({ local }) => local);
  const groupsLocal = getSkillGroups(locale);
  const capabilities = skillGroups
    .map((group, i) => ({ group, local: groupsLocal[i] }))
    .filter(({ group }) => profile.skillGroups.includes(group.title))
    .map(({ local }) => local);
  const studiesLocal = getCaseStudies(locale);
  const studies = profile.caseStudies
    .map((slug) => studiesLocal.find((study) => study.slug === slug && !study.draft))
    .filter((study): study is NonNullable<typeof study> => Boolean(study));
  const credentialsLocal = getCredentials(locale);
  const selectedCredentials = profile.credentials
    .map((title) => credentialsLocal[credentials.findIndex((c) => c.title === title)])
    .filter((credential): credential is NonNullable<typeof credential> => Boolean(credential));

  return (
    <div className="candidate-brief shell max-w-5xl pb-24 pt-28 md:pt-32">
      <Link
        href={`${prefix}/for/${profile.id}`}
        className="link inline-flex items-center gap-2 text-sm text-muted-foreground print:hidden"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        {copy.back}
      </Link>

      <header className="brief-header mt-8">
        <p className="label text-accent">{copy.eyebrow}</p>
        <h1 className="brief-title mt-4 text-jumbo font-semibold">
          {copy.title} {profile.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lede leading-relaxed text-muted-foreground">
          {profile.description}
        </p>
        <div className="mt-7 grid gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap print:hidden">
          <AnalyticsLink
            href={resumeUrlFor(locale)}
            download
            analyticsEvent="cv downloaded"
            analyticsProperties={{ source: "recruiter_pack", role_focus: profile.id }}
            className={buttonVariants({ variant: "accent", className: "min-h-11 w-full sm:w-auto" })}
          >
            <Download aria-hidden />
            {copy.downloadCv}
          </AnalyticsLink>
          <BriefActions shareUrl={`${site.url}${packHref(locale, profile.id)}`} labels={actions} />
        </div>
      </header>

      <section className="brief-section mt-12">
        <h2 className="label">{copy.availability}</h2>
        <dl className="brief-grid mt-4 grid gap-3 sm:grid-cols-2">
          {eligibility.map((item) => (
            <Panel key={item.label} className="brief-panel p-5">
              <dt className="label">{item.label}</dt>
              <dd className="mt-2 text-lg font-semibold tracking-tight">{item.value}</dd>
              <dd className="mt-1.5 text-xs text-muted-foreground">{item.note}</dd>
            </Panel>
          ))}
        </dl>
      </section>

      <section className="brief-section mt-12">
        <h2 className="label">{copy.experience}</h2>
        <div className="mt-4 grid gap-3">
          {jobs.map((job) => (
            <Panel key={`${job.company}-${job.start}`} className="brief-panel p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold tracking-tight">{job.role}</h3>
                <p className="label">{job.start.slice(0, 4)}–{job.end?.slice(0, 4) ?? copy.present}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
            </Panel>
          ))}
        </div>
      </section>

      <section className="brief-section mt-12">
        <h2 className="label">{copy.capabilities}</h2>
        <div className="brief-grid mt-4 grid gap-3 sm:grid-cols-2">
          {capabilities.map((group, i) => (
            <Panel
              key={group.title}
              // An odd last card takes the full row rather than sitting beside a gap.
              className={cn(
                "brief-panel p-5",
                i === capabilities.length - 1 && i % 2 === 0 && "sm:col-span-2",
              )}
            >
              <h3 className="font-semibold tracking-tight">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
              </div>
            </Panel>
          ))}
        </div>
      </section>

      <section className="brief-section mt-12">
        <h2 className="label">{copy.caseStudies}</h2>
        <div className="brief-grid mt-4 grid gap-3 sm:grid-cols-2">
          {studies.map((study) => (
            <Link key={study.slug} href={`${prefix}/work/${study.slug}`}>
              <Panel interactive className="brief-panel h-full p-5">
                <h3 className="font-semibold tracking-tight">{study.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
              </Panel>
            </Link>
          ))}
        </div>
      </section>

      <section className="brief-section mt-12">
        <h2 className="label">{copy.credentials}</h2>
        <Panel className="brief-panel mt-4 divide-y divide-border">
          {selectedCredentials.map((credential) => (
            <div key={credential.title} className="p-5">
              <p className="font-medium">{credential.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {credential.issuer} · {credential.date.slice(0, 4)}
              </p>
            </div>
          ))}
        </Panel>
      </section>

      <section className="brief-section mt-12">
        <h2 className="label">{copy.contact}</h2>
        <Panel className="brief-panel mt-4 flex flex-wrap gap-x-10 gap-y-4 p-5">
          <a href={`mailto:${site.email}`} className="link inline-flex items-center gap-2 text-sm">
            <Mail className="size-3.5 text-faint" aria-hidden /> {site.email}
          </a>
          <a href={`mailto:${site.emailAlt}`} className="link inline-flex items-center gap-2 text-sm">
            <Mail className="size-3.5 text-faint" aria-hidden /> {site.emailAlt}
          </a>
          <a href={`tel:${site.phoneHref}`} className="link inline-flex items-center gap-2 text-sm">
            <Phone className="size-3.5 text-faint" aria-hidden /> {site.phone}
          </a>
          <a href={site.socials.linkedin} className="link text-sm">{copy.linkedin}</a>
        </Panel>
      </section>
    </div>
  );
}
