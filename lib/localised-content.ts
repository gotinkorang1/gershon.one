import { experience, skillGroups, credentials, facts, type Job, type SkillGroup, type Credential } from "@/lib/site";
import {
  experienceFr,
  skillGroupsFr,
  credentialsFr,
  factsFr,
  issuersFr,
  termsFr,
} from "@/lib/content.fr";
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
