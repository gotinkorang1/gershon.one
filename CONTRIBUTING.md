# Contributing

This is a personal portfolio site, so it isn't looking for feature
contributions the way a shared open-source project would. That said, **bug
reports and small fixes are genuinely welcome** — a broken link, a typo, a
layout glitch on some device, an accessibility problem.

## Reporting a problem

Open an issue using one of the templates. The most useful reports include:

- what you saw versus what you expected,
- the page URL, and
- your browser / device and viewport width if it's a layout or rendering bug.

## Proposing a fix

1. Fork and branch from `main`.
2. Make the change. Keep it focused — one concern per pull request.
3. Run the full quality gate locally (see below). All of it must pass.
4. Open a pull request and fill in the template.

CI runs the same gate on every pull request, and the branch must be green
before it can merge.

## Project conventions

These are enforced by review; please follow them so a change fits in cleanly.

- **All copy lives in `lib/site.ts`** (and the localised `lib/*.fr.ts`
  companions). Never hardcode user-facing text into a component.
- **Server components by default.** Add `"use client"` only when a component
  needs state, effects, or event handlers.
- **Tailwind v4 is CSS-first** — tokens live in `app/globals.css` under
  `@theme inline`; custom utilities use the `@utility` directive. There is no
  `tailwind.config.js`.
- **Respect `prefers-reduced-motion`** in any new animation.
- Prefer `cn()` from `lib/utils` over template-literal class strings.
- `docs/credentials/` holds personal documents and is gitignored — never move
  those files into `public/` or commit them.

## Local quality gate

Run all of these before opening a pull request:

```bash
npm run typecheck   # TypeScript, no emit
npm run lint        # ESLint
npm run test:unit   # Vitest — pure logic in lib/
npm run build       # Production build must succeed
npm run test:e2e    # Playwright — responsive + accessibility journeys
```

The first four are fast. `test:e2e` needs a browser; CI installs a pinned
Chromium, and local runs use your installed Chrome.

## Commit messages

Use conventional prefixes — `feat:`, `fix:`, `perf:`, `chore:`, `test:`,
`docs:` — matching the existing history.
