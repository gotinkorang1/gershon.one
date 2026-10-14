import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import {
  credentials,
  experience,
  roleFocusProfiles,
  skillGroups,
} from "@/lib/site";
import {
  getCaseStudies,
  getCredentials,
  getExperience,
  getRoleFocusProfiles,
  getSkillGroups,
} from "@/lib/localised-content";
import type { Locale } from "@/lib/i18n";

export type EvidenceItem = {
  id: string;
  skill: string;
  group: string;
  experience: { title: string; subtitle: string }[];
  caseStudies: { title: string; href: string }[];
  roles: { title: string; href: string }[];
  credentials: { title: string; subtitle: string }[];
};

export type ActivityItem = {
  id: string;
  type: "writing" | "caseStudy" | "credential";
  date: string;
  title: string;
  description: string;
  href?: string;
};

function tokens(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function hasRelevantToken(haystack: string, needle: string) {
  const normalized = haystack.toLowerCase();
  const relevant = tokens(needle);
  return relevant.length > 0 && relevant.some((token) => normalized.includes(token));
}

export function getEvidenceItems(locale: Locale = "en"): EvidenceItem[] {
  // Matching runs on the English source text; the output is drawn from the
  // localised records at the same positions, so French pages show French.
  const prefix = locale === "fr" ? "/fr" : "";
  const groupsL = getSkillGroups(locale);
  const jobsL = getExperience(locale);
  const studiesL = getCaseStudies(locale);
  const profilesL = getRoleFocusProfiles(locale);
  const credsL = getCredentials(locale);
  return skillGroups.flatMap((group, gi) =>
    group.skills.map((skill, si) => {
      const matchingExperience = experience
        .map((job, i) => ({ job, local: jobsL[i] }))
        .filter(({ job }) =>
          hasRelevantToken(
            `${job.role} ${job.summary} ${job.highlights.join(" ")} ${job.stack.join(" ")}`,
            skill,
          ),
        )
        .slice(0, 4)
        .map(({ local }) => ({ title: local.role, subtitle: local.company }));

      const matchingStudies = caseStudies
        .map((study, i) => ({ study, local: studiesL[i] }))
        .filter(
          ({ study }) =>
            !study.draft &&
            hasRelevantToken(
              `${study.title} ${study.summary} ${study.tags.join(" ")} ${study.sections
                .flatMap((section) => section.body)
                .join(" ")}`,
              skill,
            ),
        )
        .slice(0, 4)
        .map(({ local }) => ({ title: local.title, href: `${prefix}/work/${local.slug}` }));

      const matchingRoles = roleFocusProfiles
        .map((profile, i) => ({ profile, local: profilesL[i] }))
        .filter(
          ({ profile }) =>
            profile.skillGroups.some((title) => title === group.title) ||
            hasRelevantToken(`${profile.title} ${profile.description}`, skill),
        )
        .slice(0, 4)
        .map(({ local }) => ({ title: local.title, href: `${prefix}/for/${local.id}` }));

      const matchingCredentials = credentials
        .map((credential, i) => ({ credential, local: credsL[i] }))
        .filter(({ credential }) =>
          hasRelevantToken(
            `${credential.title} ${credential.issuer} ${credential.detail ?? ""}`,
            skill,
          ),
        )
        .slice(0, 3)
        .map(({ local }) => ({
          title: local.title,
          subtitle: local.issuer,
        }));

      return {
        id: `${group.title}-${skill}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        skill: groupsL[gi]?.skills[si] ?? skill,
        group: groupsL[gi]?.title ?? group.title,
        experience: matchingExperience,
        caseStudies: matchingStudies,
        roles: matchingRoles,
        credentials: matchingCredentials,
      };
    }),
  );
}

export function getActivityItems(locale: Locale = "en"): ActivityItem[] {
  const prefix = locale === "fr" ? "/fr" : "";
  const posts: ActivityItem[] = getPublishedPosts().map((post) => ({
    id: `post-${post.slug}`,
    type: "writing",
    date: post.date,
    title: post.title,
    description: post.summary,
    href: `/blog/${post.slug}`,
  }));

  const studies: ActivityItem[] = getCaseStudies(locale)
    .filter((study) => !study.draft)
    .map((study) => ({
      id: `study-${study.slug}`,
      type: "caseStudy",
      date: study.published,
      title: study.title,
      description: study.summary,
      href: `${prefix}/work/${study.slug}`,
    }));

  const verifiedCredentials: ActivityItem[] = getCredentials(locale).map((credential) => ({
    id: `credential-${credential.title}`,
    type: "credential",
    date: credential.date,
    title: credential.title,
    description: `${credential.issuer}${credential.detail ? ` · ${credential.detail}` : ""}`,
    href: credential.verifyUrl,
  }));

  return [...posts, ...studies, ...verifiedCredentials].toSorted((a, b) =>
    b.date.localeCompare(a.date),
  );
}
