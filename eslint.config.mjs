import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone Vite prototype workspace — separate package.json/tsconfig,
    // not part of this Next.js app. Its dist/ build output is minified JS
    // and was being linted as source, and its src/ has its own lint profile.
    "thedesign/**",
  ]),
]);

export default eslintConfig;
