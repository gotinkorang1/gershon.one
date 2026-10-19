/** Recommendations from people I've worked with. Re-exported from lib/site.ts. */

/* -------------------------------------------------------------------------- */
/*  References                                                                 */
/*                                                                            */
/*  Real quotes only. The section self-hides while this array is empty, so    */
/*  nothing fabricated ever ships. Add a reference by copying the shape below  */
/*  — ideally with a `link` to the person's public LinkedIn recommendation so  */
/*  a recruiter can verify it.                                                 */
/* -------------------------------------------------------------------------- */

export type Reference = {
  /** The quote, in the referee's own words. */
  quote: string;
  /** Who said it. */
  name: string;
  /** Their role and organisation, e.g. "Engineering Manager, Greenhouse Intl.". */
  title: string;
  /** Optional link to the public recommendation (LinkedIn, email screenshot, etc.). */
  link?: string;
};

export const references: Reference[] = [
  {
    quote:
      "Gershon has been a great asset to my companies in every aspect of our digital space.",
    name: "Theophilus",
    title: "CEO, Nii Plants Group",
    link: "https://www.linkedin.com/in/theo-ayitey-adjin-b1b87030/",
  },
  {
    quote:
      "Gershon has a solution to all your digital needs. He is multitalented in IT, and I have worked with him for many years.",
    name: "Michael Donkor",
    title: "IS Analyst, Avenue Living",
    link: "https://www.linkedin.com/in/michael-boansi-donkor/",
  },
  // Add more here as { quote, name, title, link? }.
];
