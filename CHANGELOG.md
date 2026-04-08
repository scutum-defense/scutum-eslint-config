# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-08

### Added

- Initial release of `@scutum/eslint-config`
- Base configuration (`scutum/base`) with strict TypeScript rules
- TypeScript configuration (`scutum/typescript`) for parser-dependent rules
- Security configuration (`scutum/security`) banning eval and related unsafe patterns
- Test configuration (`scutum/tests`) relaxing rules for test files
- Complexity limits enforcement (cyclomatic complexity, function length, nesting depth)
- Banned imports list for restricted modules
- Required patterns documentation for exported functions and async error handling
