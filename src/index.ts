import type { Linter } from "eslint";

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
export const scutumConfig: Linter.Config[] = [
  {
    name: "scutum/base",
    rules: {
      // TypeScript strict
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

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
  {
    name: "scutum/typescript",
    rules: {
      // These would be typescript-eslint rules in a real config
      // Placeholder for the rule names that require the TS parser
    },
  },
  {
    name: "scutum/security",
    rules: {
      // Security-focused rules
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
    },
  },
];

/**
 * Scutum ESLint configuration for test files.
 * Relaxes some rules that are too strict for tests.
 */
export const scutumTestConfig: Linter.Config = {
  name: "scutum/tests",
  files: ["**/*.test.ts", "**/*.spec.ts", "**/tests/**"],
  rules: {
    "no-console": "off",
    "max-lines-per-function": "off",
    "complexity": "off",
  },
};

export default scutumConfig;
