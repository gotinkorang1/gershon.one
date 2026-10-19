import {
  experience,
  skillGroups,
  credentials,
  facts,
  roleFocusProfiles,
  portfolioFeatures,
  site,
  references,
  projects,
  projectsPage,
  websites,
  type Job,
  type Project,
  type ProjectsPageCopy,
  type Reference,
  type Website,
  blogCopy,
  type BlogCopy,
  type SkillGroup,
  type Credential,
  type RoleFocusProfile,
} from "@/lib/site";
import {
  experienceFr,
  skillGroupsFr,
  credentialsFr,
  factsFr,
  issuersFr,
  termsFr,
  roleFocusFr,
  featuresFr,
  referencesFr,
  websitesFr,
  projectsFr,
  projectsPageFr,
  briefActionsFr,
  briefFr,
  eligibilityFr,
  labFr,
  blogCopyFr,
  readingFr,
} from "@/lib/content.fr";
import { brief } from "@/lib/brief";
import type { Locale } from "@/lib/i18n";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { caseStudiesFr } from "@/lib/case-studies.fr";

/**
 * Merges the locale-independent record (dates, company names, stack, IDs) with
 * the translated prose. English is the source of truth for structure, so a new
 * job appears in both languages immediately — untranslated rather than missing.
 */

export function getExperience(locale: Locale): Job[] {
  if (locale === "en") return experience;

  return experience.map((job) => {
    const fr = experienceFr[job.company];
    if (!fr) return job;
    return {
      ...job,
      role: fr.role,
      division: fr.division ?? job.division,
      summary: fr.summary,
      highlights: fr.highlights,
      stack: job.stack.map((item) => termsFr[item] ?? item),
    };
  });
}

export function getSkillGroups(locale: Locale): SkillGroup[] {
  if (locale === "en") return skillGroups;

  return skillGroups.map((group) => {
    const fr = skillGroupsFr[group.title];
    // Product names stay verbatim; descriptive terms are translated.
    const skills = group.skills.map((skill) => termsFr[skill] ?? skill);
    return fr
      ? { ...group, title: fr.title, blurb: fr.blurb, skills }
      : { ...group, skills };
  });
}

export function getCredentials(locale: Locale): Credential[] {
  if (locale === "en") return credentials;

  return credentials.map((credential) => {
    const fr = credentialsFr[credential.title];
    return {
      ...credential,
      title: fr?.title ?? credential.title,
      detail: fr?.detail ?? credential.detail,
      issuer: issuersFr[credential.issuer] ?? credential.issuer,
    };
  });
}

export function getFacts(
  locale: Locale,
): readonly { label: string; value: string; countable: boolean }[] {
  if (locale === "en") return facts;
  return facts.map((fact) => {
    const fr = factsFr[fact.label];
    return fr ? { ...fr, countable: fact.countable } : fact;
  });
}

export function getCaseStudies(locale: Locale): CaseStudy[] {
  if (locale === "en") return caseStudies;

  return caseStudies.map((study) => {
    const fr = caseStudiesFr[study.slug];
    if (!fr) return study;
    return {
      ...study,
      title: fr.title,
      summary: fr.summary,
      metaDescription: fr.metaDescription,
      role: fr.role,
      // The period is authored data; only the English word needs replacing.
      period: study.period.replace(/present/i, "aujourd'hui"),
      sections: fr.sections,
      // Outcome figures are numbers and placeholders; only the labels differ.
      outcomes: study.outcomes.map((o, i) => ({
        ...o,
        label: fr.outcomes[i] ?? o.label,
      })),
    };
  });
}

export function getCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  return getCaseStudies(locale).find((c) => c.slug === slug);
}

export function getRoleFocusProfiles(locale: Locale): RoleFocusProfile[] {
  if (locale === "en") return [...roleFocusProfiles];

  return roleFocusProfiles.map((profile) => ({
    ...profile,
    ...roleFocusFr[profile.id],
  }));
}

/** Navigation labels, Lab teaser and recruiter-pack banner copy. */
export function getFeatures(locale: Locale) {
  if (locale === "en") {
    return {
      navigation: portfolioFeatures.navigation,
      lab: portfolioFeatures.lab,
      recruiterPack: portfolioFeatures.recruiterPack,
    };
  }
  return {
    navigation: featuresFr.navigation,
    lab: labFr,
    recruiterPack: { ...portfolioFeatures.recruiterPack, ...featuresFr.recruiterPack },
  };
}

export function getReferences(locale: Locale): Reference[] {
  if (locale === "en") return references;
  return references.map((r) => ({ ...r, title: referencesFr[r.name]?.title ?? r.title }));
}

/** Everything the projects page renders, in one language. */
export function getProjectsContent(locale: Locale): {
  copy: ProjectsPageCopy;
  websites: Website[];
  projects: Project[];
} {
  if (locale === "en") return { copy: projectsPage, websites, projects };
  return {
    copy: projectsPageFr,
    websites: websites.map((w) => ({ ...w, summary: websitesFr[w.slug]?.summary ?? w.summary })),
    projects: projects.map((p) => {
      const fr = projectsFr[p.title];
      if (!fr) return p;
      return {
        ...p,
        title: fr.title,
        context: fr.context ?? p.context,
        summary: fr.summary,
        tags: fr.tags,
        // Case studies have French versions; external sites stay as they are.
        href: p.href?.startsWith("/") ? `/fr${p.href}` : p.href,
      };
    }),
  };
}

/** Path to the projects page in the given language. */
export const projectsHref = (locale: Locale) => (locale === "fr" ? "/fr/projects" : "/projects");

type BriefStrength = { skill: string; years: string; level: string };

/** Everything on the candidate brief, plus the share/print labels the recruiter packs reuse. */
export function getBriefContent(locale: Locale) {
  if (locale === "en") {
    return {
      page: brief.page,
      eligibility: brief.eligibility,
      compensation: brief.compensation,
      pitch: brief.pitch,
      strengths: brief.strengths as readonly BriefStrength[],
      targetRoles: brief.targetRoles as readonly string[],
      actions: site.briefActions,
    };
  }
  return {
    page: briefFr.page,
    eligibility: eligibilityFr,
    compensation: briefFr.compensation,
    pitch: briefFr.pitch,
    // Untranslated skills fall back to English rather than disappearing.
    strengths: brief.strengths.map((s) => briefFr.strengths[s.skill] ?? s) as readonly BriefStrength[],
    targetRoles: briefFr.targetRoles as readonly string[],
    actions: { ...site.briefActions, ...briefActionsFr },
  };
}

/** Path to the candidate brief in the given language. */
export const briefHref = (locale: Locale) => (locale === "fr" ? "/fr/brief" : "/brief");

/** Path to a recruiter pack in the given language. */
export const packHref = (locale: Locale, id: string) => (locale === "fr" ? `/fr/pack/${id}` : `/pack/${id}`);

type Widen<T> = T extends string
  ? string
  : T extends boolean
    ? boolean
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : T extends object
        ? { readonly [K in keyof T]: Widen<T[K]> }
        : T;

export type LabContent = Widen<typeof portfolioFeatures.lab>;

/** All Systems Lab copy in one language. */
export function getLab(locale: Locale): LabContent {
  return locale === "fr" ? labFr : portfolioFeatures.lab;
}

export const labHref = (locale: Locale) => (locale === "fr" ? "/fr/lab" : "/lab");

/** Blog index, post page and reading-widget labels in one language. */
export function getBlogCopy(locale: Locale): BlogCopy & { reading: typeof portfolioFeatures.reading } {
  return locale === "fr"
    ? { ...blogCopyFr, reading: readingFr as unknown as typeof portfolioFeatures.reading }
    : { ...blogCopy, reading: portfolioFeatures.reading };
}

export const blogHref = (locale: Locale, slug?: string) =>
  `${locale === "fr" ? "/fr" : ""}/blog${slug ? `/${slug}` : ""}`;

/** Date as shown on the blog: "1 August 2026" / "1 août 2026". */
export function blogDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
