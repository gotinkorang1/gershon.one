<!-- Keep it focused: one concern per pull request. -->

## What & why

<!-- What does this change, and what problem does it solve? -->

## Screenshots

<!-- For any visual change, before/after screenshots. Delete if not applicable. -->

## Quality gate

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run test:unit` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test:e2e` passes (or: not affected by this change)

## Conventions

- [ ] User-facing copy lives in `lib/site.ts` (or its `*.fr.ts` companion), not hardcoded in components
- [ ] New animations respect `prefers-reduced-motion`
- [ ] No personal documents from `docs/credentials/` were committed or moved into `public/`
