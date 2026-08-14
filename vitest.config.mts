import { defineConfig } from "vitest/config";

// Unit tests cover the pure logic in `lib/` — slugs, headings, ranking,
// search scoring and JSON-LD escaping. Component and journey coverage lives
// in the Playwright e2e suite (`tests/e2e`), which this config excludes so the
// two runners never trip over each other.
//
// `resolve.tsconfigPaths` is Vite's native reader for the `@/*` alias defined
// in tsconfig.json, so no extra plugin is needed. The `.mts` extension loads
// this config as ESM.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    globals: false,
  },
});
