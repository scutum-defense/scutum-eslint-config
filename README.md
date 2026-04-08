```
 ____            _                     _____ ____  _     _       _
/ ___|  ___ _   _| |_ _   _ _ __ ___  | ____/ ___|| |   (_)_ __ | |_
\___ \ / __| | | | __| | | | '_ ` _ \ |  _| \___ \| |   | | '_ \| __|
 ___) | (__| |_| | |_| |_| | | | | | || |___ ___) | |___| | | | | |_
|____/ \___|\__,_|\__|\__,_|_| |_| |_||_____|____/|_____|_|_| |_|\__|

                @scutum/eslint-config
```

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![ESLint 9](https://img.shields.io/badge/ESLint-9.x-4B32C3?logo=eslint)](https://eslint.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-@scutum/eslint--config-CB3837?logo=npm)](https://www.npmjs.com/package/@scutum/eslint-config)

**Shared ESLint configuration for Scutum TypeScript projects -- defense-grade code quality enforcement.**

Every line of code running in sovereign defense infrastructure must meet the highest standards of safety, clarity, and auditability. `@scutum/eslint-config` enforces those standards automatically across all Scutum TypeScript repositories, ensuring consistent code quality from the first commit to production deployment.

---

## What It Enforces

| Category | Rule | Severity | Rationale |
|----------|------|----------|-----------|
| **Safety** | `no-console` | Error | Console output in production is a data leak vector. Use `@scutum/safe-logging` with SafeArg/UnsafeArg instead. |
| **Safety** | `no-eval` | Error | Dynamic code execution is a code injection vector. Banned unconditionally in defense software. |
| **Safety** | `no-implied-eval` | Error | Implicit eval through `setTimeout(string)` and similar patterns is equally dangerous. |
| **Safety** | `no-new-func` | Error | Dynamic function construction from strings enables code injection. |
| **Safety** | `no-debugger` | Error | Debugger statements must never reach production deployments. |
| **Quality** | `eqeqeq` | Error | Strict equality prevents type coercion bugs that are difficult to diagnose in production. |
| **Quality** | `no-throw-literal` | Error | Only Error objects should be thrown, ensuring proper stack traces for incident investigation. |
| **Quality** | `prefer-promise-reject-errors` | Error | Promise rejections must use Error objects for consistent error handling. |
| **Quality** | `no-return-await` | Error | Unnecessary `return await` adds stack frames without value. |
| **Quality** | `prefer-const` | Error | Immutable bindings by default reduce state-related bugs. |
| **Quality** | `no-var` | Error | Block-scoped `let`/`const` prevents hoisting-related issues. |
| **Complexity** | `complexity` | Warning | Cyclomatic complexity capped at 15 to keep functions understandable during incident response. |
| **Complexity** | `max-depth` | Warning | Nesting depth capped at 4 levels to maintain readability. |
| **Complexity** | `max-lines-per-function` | Warning | Functions capped at 100 lines to encourage decomposition. |

---

## Installation

```bash
# Using pnpm (recommended)
pnpm add -D @scutum/eslint-config eslint typescript-eslint

# Using npm
npm install -D @scutum/eslint-config eslint typescript-eslint

# Using yarn
yarn add -D @scutum/eslint-config eslint typescript-eslint
```

### Requirements

- Node.js 22+
- ESLint 9.x (flat config)
- typescript-eslint 8.x

---

## Usage

Create an `eslint.config.ts` file in your project root:

```typescript
import { scutumConfig, scutumTestConfig } from "@scutum/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...scutumConfig,
  scutumTestConfig,
  {
    // Project-specific overrides go here
    ignores: ["dist/**", "node_modules/**"],
  },
);
```

Then run ESLint:

```bash
npx eslint .
```

---

## Configuration Blocks

The configuration is organized into named blocks that can be referenced individually when overriding rules.

### `scutum/base`

The foundation configuration applied to all TypeScript files. Contains the core rules for variable declarations, console usage, equality checks, and complexity limits.

**Key rules:**
- Bans `console.log` (allows `console.warn` and `console.error`)
- Enforces strict equality with `===`
- Requires `const` over `let` where possible
- Bans `var` declarations entirely
- Sets complexity thresholds for maintainability

### `scutum/typescript`

TypeScript-specific rules that require the TypeScript parser. This block handles type-aware linting rules such as:

- Explicit return types on exported functions
- Consistent type imports (`import type`)
- No floating promises
- Strict null checks awareness

### `scutum/security`

Security-focused rules that are critical for defense software:

- Bans dynamic code execution unconditionally
- Bans implicit eval through string arguments to `setTimeout`/`setInterval`
- Bans dynamic function construction from string arguments

These rules have no exceptions. In defense infrastructure, dynamic code execution from strings is an unacceptable risk vector.

### `scutum/tests`

A relaxed configuration overlay for test files (`*.test.ts`, `*.spec.ts`, `tests/**`). Disables rules that are too strict for test code:

- `no-console` is turned off (tests often need console output for debugging)
- `max-lines-per-function` is turned off (test suites can be long)
- `complexity` is turned off (test helpers may have complex setup)

---

## Complexity Limits

These limits are enforced to keep code maintainable, especially during high-pressure incident response when operators and engineers must read and understand code quickly.

| Metric | Limit | Rationale |
|--------|-------|-----------|
| Cyclomatic complexity | 15 | Functions with more than 15 branches are too complex to reason about under pressure |
| Function lines | 100 | Long functions should be decomposed into smaller, testable units |
| File lines | 500 | Files exceeding 500 lines likely contain too many responsibilities |
| Nesting depth | 4 | Deeply nested code is difficult to follow and often indicates a design issue |
| Parameters | 5 | Functions with more than 5 parameters should use an options object |

---

## Why These Rules Matter

In civilian software, a `console.log` left in production is a minor annoyance. In defense software, it is a potential data exfiltration vector. A stray dynamic code execution call in a web application is a vulnerability; in sovereign infrastructure, it is an attack surface that could compromise national security operations.

Every rule in this configuration exists for a reason grounded in the unique requirements of defense-grade software:

1. **No console output**: All logging must go through `@scutum/safe-logging`, which enforces SafeArg/UnsafeArg classification to prevent sensitive data from appearing in log streams.

2. **No dynamic code execution**: All forms of string-to-code execution are banned because defense systems must have fully auditable, statically analyzable codebases.

3. **Strict equality**: Type coercion bugs in defense software can cause incorrect sensor readings, wrong threat classifications, or missed detections.

4. **Complexity limits**: When an incident occurs at 3 AM, the on-call engineer must be able to read and understand any function in the codebase within minutes, not hours.

5. **Immutable bindings**: Using `const` by default reduces the surface area for state-related bugs that are notoriously difficult to reproduce in distributed defense systems.

---

## Banned Imports

The configuration includes a list of banned imports that must be replaced with Scutum-approved alternatives:

| Module | Alternative | Reason |
|--------|------------|--------|
| `crypto` | `@scutum/audit-chain` | Cryptographic operations must use audited, approved implementations |
| `fs` | Approved abstractions | Direct filesystem access is restricted in containerized defense deployments |

---

## Project Structure

```
scutum-eslint-config/
  src/
    index.ts          # Main configuration exports
    rules.ts          # Custom rule definitions and constants
  tests/
    config.test.ts    # Configuration validation tests
  dist/               # Compiled output (generated)
  package.json
  tsconfig.json
  LICENSE             # Apache 2.0
```

---

<details>
<summary><strong>Rules Reference</strong></summary>

### Base Rules (`scutum/base`)

```
no-var                        error
prefer-const                  error
no-unused-vars                error    (underscore-prefixed args/vars exempt)
no-console                    error    (console.warn and console.error allowed)
no-debugger                   error
no-eval                       error
no-implied-eval               error
no-new-func                   error
eqeqeq                        error    (always)
no-throw-literal              error
prefer-promise-reject-errors  error
no-return-await               error
complexity                    warn     (max 15)
max-depth                     warn     (max 4)
max-lines-per-function        warn     (max 100)
```

### Security Rules (`scutum/security`)

```
no-eval                       error
no-implied-eval               error
no-new-func                   error
```

### Test Overrides (`scutum/tests`)

```
no-console                    off
max-lines-per-function        off
complexity                    off
```

</details>

<details>
<summary><strong>Contributing</strong></summary>

### Development

```bash
# Clone the repository
git clone https://github.com/ScutumDefense/scutum-eslint-config.git
cd scutum-eslint-config

# Install dependencies
pnpm install

# Run tests
pnpm test

# Type check
pnpm typecheck

# Build
pnpm build
```

### Adding New Rules

1. Add the rule to the appropriate configuration block in `src/index.ts`
2. Document the rationale in a comment
3. Add a test case in `tests/config.test.ts`
4. Update this README with the rule details
5. Submit a PR for review by `@ScutumDefense/architecture-council`

### Rule Severity Guidelines

- **error**: Rules that prevent bugs, security issues, or data leaks. No exceptions.
- **warn**: Rules that improve code quality but may have legitimate exceptions in rare cases.

### Code Review

All changes to this configuration require approval from `@ScutumDefense/architecture-council` and `@ScutumDefense/sre-release`. Changes that weaken any security rule require additional justification and threat modeling.

</details>

<details>
<summary><strong>Versioning</strong></summary>

This package follows [Semantic Versioning](https://semver.org/):

- **Major**: Changes that make previously valid code invalid (new error-level rules)
- **Minor**: Changes that add new warning-level rules or relax existing rules
- **Patch**: Documentation updates, bug fixes, internal refactors

All version bumps are reviewed by the architecture council to assess impact across the Scutum monorepo ecosystem.

</details>

---

## Related Packages

| Package | Description |
|---------|-------------|
| `@scutum/safe-logging` | Structured logging with SafeArg/UnsafeArg classification |
| `@scutum/audit-chain` | Immutable audit trail with cryptographic verification |
| `@scutum/tsconfig` | Shared TypeScript configuration for Scutum projects |

---

## License

Apache 2.0 -- Copyright 2026 Scutum Defense

See [LICENSE](./LICENSE) for the full license text.
