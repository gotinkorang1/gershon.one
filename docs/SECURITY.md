# Security notes

## Dependency audit — CI gate

CI runs `npm audit --omit=dev --audit-level=high` and fails on any high or
critical advisory in a production dependency. At the time of writing the
production tree has no known vulnerabilities.

**Do not run `npm audit fix --force`.** It resolves to `next@9.3.3` — a 2020
release — which would remove the App Router, both locales, every API route and
all server components.

### Resolved — sharp and postcss

Earlier advisories in `sharp <0.35.0` (libvips CVEs) and `postcss <=8.5.17`
are fixed by the `overrides` in `package.json`, which pin both to patched
releases across the whole tree, including the copy Next vendors.

### Accepted — dev-only lint tooling

A full `npm audit` (without `--omit=dev`) reports a high-severity
stack-exhaustion advisory in `braces`, pulled in through
`micromatch` → `fast-glob` → `@next/eslint-plugin-next` → `eslint-config-next`.

*Not reachable.* That chain runs only when ESLint lints files authored in this
repository, locally and in CI. It is never bundled or run in production and
never receives user input.

**Do not blanket-override `brace-expansion` or `braces` to fix it** — see the
`//overrides` note in `package.json`. Resolved when `eslint-config-next`
updates its dependency.

## Registry

`.npmrc` pins `registry.npmjs.org`. The lockfile previously resolved all
packages through `registry.npmmirror.com`, which does not implement the
security advisory endpoint — so `npm audit` failed and no vulnerability was
ever reported. Integrity hashes meant nothing could be silently substituted,
but the absence of advisories was a genuine blind spot. Switching registries
also reduced the tree from 443 packages to 365.

## Install scripts

npm blocks dependency install scripts unless `allowScripts` in `package.json`
allows them. Current decisions:

- `core-js` — **denied.** Its postinstall only prints a funding banner.
- `unrs-resolver` — **denied.** It ships prebuilt platform binaries as
  ordinary optional dependencies (`@unrs/resolver-binding-*`); the postinstall
  is a download fallback that is not needed.
- `sharp` — no entry needed; prebuilt binaries come from `@img/sharp-*`.

Review any new package that appears in `npm install-scripts ls` before
approving it.
