/**
 * Single source of truth for every piece of English content on the site.
 * Edit the files in lib/content/ to update the portfolio — no component
 * changes needed. French translations live in lib/content.fr.ts.
 *
 * Everything is re-exported from here, so components keep importing from
 * "@/lib/site" and never reach into lib/content/ directly.
 *
 * Sourced from the CV.
 */

export * from "@/lib/content/profile";
export * from "@/lib/content/role-focus";
export * from "@/lib/content/experience";
export * from "@/lib/content/skills";
export * from "@/lib/content/credentials";
export * from "@/lib/content/references";
export * from "@/lib/content/features";
export * from "@/lib/content/navigation";
export * from "@/lib/content/projects";
export * from "@/lib/content/blog";
