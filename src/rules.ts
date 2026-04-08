/**
 * Custom rule definitions for Scutum-specific patterns.
 */

export const SCUTUM_BANNED_IMPORTS = [
  { name: "crypto", message: "Use @scutum/audit-chain for cryptographic operations" },
  { name: "fs", message: "Direct filesystem access is restricted. Use approved abstractions." },
];

export const SCUTUM_REQUIRED_PATTERNS = {
  exportedFunctions: "All exported functions must have explicit return types",
  asyncFunctions: "All async functions must handle errors explicitly",
  sensitiveData: "Never log sensitive data directly — use SafeArg/UnsafeArg from @scutum/safe-logging",
};

export const SCUTUM_COMPLEXITY_LIMITS = {
  maxCyclomaticComplexity: 15,
  maxFunctionLines: 100,
  maxFileLines: 500,
  maxNestingDepth: 4,
  maxParameters: 5,
};
