# Project: gershon.one

Personal portfolio site. Next.js App Router + TypeScript + Tailwind CSS v4 + Motion.

## Ground rules

- **All content lives in `lib/site.ts`.** Never hardcode copy into a component.
- **Server components by default.** Add `"use client"` only when a component
  needs state, effects or event handlers.
- **Tailwind v4 is CSS-first.** There is no `tailwind.config.js` — tokens are
  defined in `app/globals.css` under `@theme inline`, and custom utilities use
  the `@utility` directive.
- **Respect `prefers-reduced-motion`** in any new animation.
- **`docs/credentials/` contains personal documents and is gitignored.** Never
  move those files into `public/` or commit them.

## Conventions

- Path alias `@/*` maps to the project root.
- UI primitives in `components/ui/` follow shadcn/ui conventions so
  `npx shadcn@latest add <component>` drops in cleanly.
- Visual effects live in `components/fx/`, page sections in
  `components/sections/`.
- Prefer `cn()` from `lib/utils` over template-literal class strings.

## Before claiming work is done

Run `npm run typecheck` and `npm run build`.
