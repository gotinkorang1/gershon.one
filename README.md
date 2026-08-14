# gershon.one

Personal portfolio of **Gershon Adjei Otinkorang** — cloud, network and software engineering.

Built with Next.js App Router, React Server Components, TypeScript, Tailwind CSS v4 and Motion.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev
```

Open http://localhost:3000.

> The site is designed to work with **zero** environment variables. Analytics,
> email delivery and the database are all optional and degrade gracefully.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run test:unit` | Vitest — pure logic in `lib/` |
| `npm run test:e2e` | Responsive + accessibility Playwright tests |

### Testing

- **Unit** (`tests/unit`, Vitest) covers the pure logic in `lib/` — slug
  generation, table-of-contents heading extraction, role-focus ranking, search
  scoring, JSON-LD escaping, and i18n dictionary resolution. Fast; no browser.
- **End-to-end** (`tests/e2e`, Playwright) runs the critical portfolio journeys
  at 320px, 768px and 1440px, plus an `@axe-core` WCAG pass. Local runs use the
  installed stable Chrome; CI installs a pinned Chromium and tests the completed
  production build.

Every push and pull request runs the full gate in CI (audit → typecheck → lint
→ unit → build → e2e). See [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## Editing content

**Everything lives in [`lib/site.ts`](lib/site.ts).** Name, roles, stats, jobs,
skills, projects and credentials are all plain data — you should never need to
touch a component to update the site.

Search that file for `TODO:` to find the placeholders that still need your real
details:

- Your city (currently "Accra, Ghana")
- GitHub / LinkedIn / X handles
- The second employer in `experience`
- Project live + repo links
- The exact title on the Google certificate

Then drop your CV at `public/gershon-otinkorang-cv.pdf` so the **Download CV**
button and command palette work.

### Verified credentials

These were read directly from the certificates in `docs/credentials/` and are
already accurate:

| Credential | Issuer | Date |
| --- | --- | --- |
| BSc Information Technology, Second Class Honours (Upper) | KNUST | Nov 2024 |
| AWS Certified Cloud Practitioner | AWS | Jul 2024 – Jul 2027 |
| LinkedIn Marketing Strategy | LinkedIn | Dec 2022 |
| LinkedIn Marketing Fundamentals | LinkedIn | May 2022 |
| HND Information & Communication Technology | Takoradi Technical University | Oct 2020 |
| Google Digital Skills | Google | Oct 2020 |

`docs/credentials/` is **gitignored** — it holds personal documents including a
birth certificate. Keep it that way.

---

## Architecture

```
app/
  layout.tsx            Root layout, fonts, metadata, JSON-LD
  page.tsx              Section composition
  globals.css           Design tokens, keyframes, custom utilities
  opengraph-image.tsx   Dynamic OG image (next/og)
  sitemap.ts robots.ts  SEO
  api/contact/route.ts  Contact endpoint — validation, honeypot, rate limit
components/
  ui/                   Primitives (shadcn-compatible)
  fx/                   Aurora, spotlight, particles, glow cards, counters
  sections/             Hero, About, Experience, Skills, Projects, Credentials, Contact
  site-nav.tsx          Sticky nav with scroll-spy pill indicator
  command-palette.tsx   ⌘K — dependency-free, keyboard navigable
lib/
  site.ts               All content
  utils.ts              cn(), date formatting
```

### Design decisions worth knowing

- **Server components by default.** Only Hero, Projects, Contact, the nav and
  the palette are client components — everything else renders on the server.
- **No animation library lock-in in the CSS.** Keyframes live in `globals.css`
  so Motion is only used where physics actually matter.
- **`prefers-reduced-motion` is respected everywhere**, including the canvas
  particle field, which also pauses when scrolled out of view.
- **The command palette has no dependencies.** No `cmdk`, no Radix — about 200
  lines, full arrow-key and Escape handling.
- **Skills are not progress bars.** Percentage bars communicate nothing; the
  three-tier system (core / working / learning) is honest and readable.

---

## Optional integrations

Each is off unless its environment variable is set.

**Resend** — contact form delivery. Without `RESEND_API_KEY`, submissions are
validated and logged server-side, and the form still reports success. Add the
key plus `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` to deliver for real.

**PostHog** — set `NEXT_PUBLIC_POSTHOG_KEY` and the script loads lazily. Absent,
`components/analytics.tsx` is a no-op and ships no third-party JS. Tracking is
anonymous and deliberately limited to custom events; DOM autocapture and
session recording are disabled. The useful conversion events are:

- `role view opened`
- `case study opened`
- `cv viewed` / `cv downloaded`
- `contact clicked` / `contact copied` / `contact form sent`
- `booking opened`
- `blog post opened` / `blog post completed`
- `language changed`

In PostHog, create a funnel using `role view opened` → `case study opened` →
`cv downloaded` → either `contact clicked` or `contact form sent`. Break down
the first step by `role_focus` to see which targeted portfolio view converts.

**Supabase** — variables reserved for future features (guestbook, view counts).
Nothing reads them yet.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new). Framework detection
   handles the build settings.
3. Add environment variables under **Settings → Environment Variables**. Set
   `NEXT_PUBLIC_SITE_URL` to `https://gershon.one`.
4. Add the domain under **Settings → Domains** and point your DNS at Vercel.

---

## Roadmap

Deliberately left out of v1 to keep the first build fast and dependency-light:

- **MDX blog** — `app/blog/[slug]`, `contentlayer` or native MDX, RSS feed, and
  per-post dynamic OG images.
- **React Three Fiber globe** in the hero. The current canvas particle network
  gives a similar impression for a fraction of the bundle; add R3F only if the
  3D is doing real work.
- **AI assistant** trained on the CV, via the Vercel AI SDK.
- **Interactive terminal** (`help`, `projects`, `skills`, `contact`).
- **Live GitHub contribution graph** — `GITHUB_USERNAME` and `GITHUB_TOKEN` are
  already in `.env.example` for this.

---

## License

© Gershon Adjei Otinkorang. All rights reserved. The source is published for
reference; the content is personal. See [`LICENSE`](LICENSE) for terms.
