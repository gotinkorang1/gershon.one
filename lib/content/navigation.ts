/** Site navigation and error-boundary copy. Re-exported from lib/site.ts. */

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { href: "#experience", label: "Experience", key: "experience", index: "01" },
  { href: "#work", label: "Case studies", key: "work", index: "02" },
  { href: "#capabilities", label: "Capabilities", key: "capabilities", index: "03" },
  { href: "#credentials", label: "Credentials", key: "credentials", index: "04" },
  { href: "#contact", label: "Contact", key: "contact", index: "05" },
] as const;

/**
 * Copy for the error boundaries (app/error.tsx, app/global-error.tsx).
 *
 * Deliberately plain strings, not locale-switched i18n: an error boundary must
 * not depend on context (locale, providers) that may be the very thing that
 * failed. English-only here is an acceptable trade for a rare, robust fallback.
 */
export const errorFallback = {
  eyebrow: "Something broke",
  title: "This page hit an unexpected error.",
  description:
    "That's on me, not you. Try again, or head back to the homepage — the rest of the site is fine.",
  retry: "Try again",
  home: "Back to homepage",
} as const;
