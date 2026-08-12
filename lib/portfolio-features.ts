import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import {
  credentials,
  experience,
  roleFocusProfiles,
  skillGroups,
} from "@/lib/site";

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

export function getEvidenceItems(): EvidenceItem[] {
  return skillGroups.flatMap((group) =>
    group.skills.map((skill) => {
      const matchingExperience = experience
        .filter((job) =>
          hasRelevantToken(
            `${job.role} ${job.summary} ${job.highlights.join(" ")} ${job.stack.join(" ")}`,
            skill,
          ),
        )
        .slice(0, 4)
        .map((job) => ({ title: job.role, subtitle: job.company }));

      const matchingStudies = caseStudies
        .filter(
          (study) =>
            !study.draft &&
            hasRelevantToken(
              `${study.title} ${study.summary} ${study.tags.join(" ")} ${study.sections
                .flatMap((section) => section.body)
                .join(" ")}`,
              skill,
            ),
        )
        .slice(0, 4)
        .map((study) => ({ title: study.title, href: `/work/${study.slug}` }));

      const matchingRoles = roleFocusProfiles
        .filter(
          (profile) =>
            profile.skillGroups.some((title) => title === group.title) ||
            hasRelevantToken(`${profile.title} ${profile.description}`, skill),
        )
        .slice(0, 4)
        .map((profile) => ({ title: profile.title, href: `/for/${profile.id}` }));

      const matchingCredentials = credentials
        .filter((credential) =>
          hasRelevantToken(
            `${credential.title} ${credential.issuer} ${credential.detail ?? ""}`,
            skill,
          ),
        )
        .slice(0, 3)
        .map((credential) => ({
          title: credential.title,
          subtitle: credential.issuer,
        }));

      return {
        id: `${group.title}-${skill}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        skill,
        group: group.title,
        experience: matchingExperience,
        caseStudies: matchingStudies,
        roles: matchingRoles,
        credentials: matchingCredentials,
      };
    }),
  );
}

export function getActivityItems(): ActivityItem[] {
  const posts: ActivityItem[] = getPublishedPosts().map((post) => ({
    id: `post-${post.slug}`,
    type: "writing",
    date: post.date,
    title: post.title,
    description: post.summary,
    href: `/blog/${post.slug}`,
  }));

  const studies: ActivityItem[] = caseStudies
    .filter((study) => !study.draft)
    .map((study) => ({
      id: `study-${study.slug}`,
      type: "caseStudy",
      date: study.published,
      title: study.title,
      description: study.summary,
      href: `/work/${study.slug}`,
    }));

  const verifiedCredentials: ActivityItem[] = credentials.map((credential) => ({
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
