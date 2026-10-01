import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Scutum ESLint configuration for TypeScript projects.
 *
 * Enforces:
 * - Strict TypeScript with no implicit any
 * - No console.log in production code (use @scutum/safe-logging)
 * - No floating promises
 * - Explicit return types on exported functions
 * - No var declarations
 * - Consistent type imports
 * - No unused variables (with underscore exception)
 * - Maximum function complexity
 */
export const scutumConfig = tseslint.config(
  {
    name: "scutum/base",
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      // TypeScript strict
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "off",
      // Defense-grade safety
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      // Code quality
      "eqeqeq": ["error", "always"],
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",
      "no-return-await": "error",
      // Complexity limits
      "complexity": ["warn", 15],
      "max-depth": ["warn", 4],
      "max-lines-per-function": ["warn", 100],
    },
  },
  ...tseslint.configs.strict,
  {
    name: "scutum/typescript",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.ts", "*.mts", "*.cts"],
        },
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    name: "scutum/security",
    rules: {
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
    },
  }
);

/**
 * Scutum ESLint configuration for test files.
 * Relaxes some rules that are too strict for tests.
 */
export const scutumTestConfig = {
  name: "scutum/tests",
  files: ["**/*.test.ts", "**/*.spec.ts", "**/tests/**"],
  rules: {
    "no-console": "off",
    "max-lines-per-function": "off",
    "complexity": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};

export default scutumConfig;
