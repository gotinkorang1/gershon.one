# Security notes

## Dependency advisories — assessed, accepted

`npm audit` reports three high-severity advisories. All are real, none are
reachable in this application, and the remediation npm proposes is worse than
the exposure. Re-assess whenever the dependency tree changes.

**Do not run `npm audit fix --force`.** It resolves to `next@9.3.3` — a 2020
release — which would remove the App Router, both locales, every API route and
all server components in order to patch code that cannot be reached.

### sharp <0.35.0 — libvips CVEs

CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591.

Memory-corruption bugs triggered by decoding a malicious image.

*Not reachable.* `sharp` runs only when `next/image` optimises a source image.
This site serves one image, `public/gershon.webp`, committed to the repository.
There are no uploads, no `images.remotePatterns`, and no query-driven image
URLs, so no attacker-supplied bytes ever reach the decoder. `sharp` is also an
optional dependency.

Revisit if the site ever accepts uploaded images or configures remote patterns.

### postcss <=8.5.17 — three advisories

XSS via unescaped `</style>`, and two source-map path-traversal issues.

*Not reachable.* The top-level `postcss` is already 8.5.23 and patched. The
vulnerable 8.4.31 is vendored inside `node_modules/next/node_modules/postcss`
for Next's own build pipeline. All three require attacker-controlled CSS; the
only CSS processed here is authored in this repository and compiled at build
time on the deployment builder, never at runtime and never from user input.

Resolved automatically when Next updates its bundled copy.

## Registry

`.npmrc` pins `registry.npmjs.org`. The lockfile previously resolved all
packages through `registry.npmmirror.com`, which does not implement the
security advisory endpoint — so `npm audit` failed and no vulnerability was
ever reported. Integrity hashes meant nothing could be silently substituted,
but the absence of advisories was a genuine blind spot. Switching registries
also reduced the tree from 443 packages to 365.

## Blocked install scripts

`sharp` and `unrs-resolver` report blocked postinstall scripts. Both ship
prebuilt platform binaries as ordinary dependencies (`@img/sharp-*`,
`@unrs/resolver-binding-*`), so the scripts are fallbacks that are not needed.
Nothing is missing.
