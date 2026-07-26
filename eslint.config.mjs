import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * Flat config, loaded directly.
 *
 * The previous version bridged the legacy shareable configs through
 * `FlatCompat`. ESLint 9.39 validates bridged configs by running them through
 * JSON.stringify, and eslint-plugin-react self-references via
 * `configs.flat.plugins.react` — a circular structure, so the run threw before
 * linting a single file. eslint-config-next already ships flat configs, so the
 * bridge was never necessary.
 *
 * Those files are CommonJS, so importing them from ESM may yield either the
 * array itself or an interop wrapper with `.default`. `toFlat` accepts both
 * rather than betting on one.
 */
const toFlat = (mod) => {
  const value = mod?.default ?? mod;
  return Array.isArray(value) ? value : [value];
};

const eslintConfig = [
  ...toFlat(nextCoreWebVitals),
  ...toFlat(nextTypeScript),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
