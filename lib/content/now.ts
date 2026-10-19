/** Copy for the /now page. Re-exported from lib/site.ts. French in lib/content.fr.ts. */

/* -------------------------------------------------------------------------- */
/*  Now                                                                       */
/*                                                                            */
/*  A /now page (nownownow.com) says what someone is focused on at this point */
/*  in their life. Every fact on it is drawn from the rest of the content —   */
/*  current role, degree, latest post, newest certifications — so it updates  */
/*  itself and can never contradict the CV. Only the headings live here.      */
/* -------------------------------------------------------------------------- */

export const nowPage = {
  metaTitle: "Now",
  metaDescription: "What Gershon Otinkorang is focused on right now: study, work, writing and the roles he's looking for.",
  eyebrow: "Now",
  title: "What I'm focused on right now",
  lede: "A snapshot of where things stand, kept in step with the rest of the site.",
  updated: "Updated",
  about: "What is a now page?",
  sections: {
    studying: "Studying",
    working: "Working",
    based: "Based in",
    lookingFor: "Looking for",
    writing: "Latest writing",
    earned: "Recently earned",
  },
  briefLink: "See the candidate brief",
  readPost: "Read the post",
} as const;

export type NowPageCopy = {
  [K in keyof typeof nowPage]: (typeof nowPage)[K] extends string
    ? string
    : { [S in keyof (typeof nowPage)[K]]: string };
};
