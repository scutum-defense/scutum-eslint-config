import { describe, it, expect } from "vitest";
import { scutumConfig, scutumTestConfig } from "../src/index";
import { SCUTUM_COMPLEXITY_LIMITS } from "../src/rules";

describe("scutumConfig", () => {
  it("should export an array of config objects", () => {
    expect(Array.isArray(scutumConfig)).toBe(true);
    expect(scutumConfig.length).toBeGreaterThan(0);
  });

  it("should have named config blocks", () => {
    for (const config of scutumConfig) {
      expect(config.name).toBeDefined();
      expect(config.name).toMatch(/^scutum\//);
    }
  });

  it("should disallow console.log", () => {
    const baseConfig = scutumConfig.find((c) => c.name === "scutum/base");
    expect(baseConfig?.rules?.["no-console"]).toBeDefined();
  });

  it("should enforce strict equality", () => {
    const baseConfig = scutumConfig.find((c) => c.name === "scutum/base");
    expect(baseConfig?.rules?.eqeqeq).toBeDefined();
  });

  it("should ban eval", () => {
    const secConfig = scutumConfig.find((c) => c.name === "scutum/security");
    expect(secConfig?.rules?.["no-eval"]).toBe("error");
  });
});

describe("scutumTestConfig", () => {
  it("should relax console rule for tests", () => {
    expect(scutumTestConfig.rules?.["no-console"]).toBe("off");
  });

  it("should target test files", () => {
    expect(scutumTestConfig.files).toContain("**/*.test.ts");
  });
});

describe("SCUTUM_COMPLEXITY_LIMITS", () => {
  it("should have reasonable limits", () => {
    expect(SCUTUM_COMPLEXITY_LIMITS.maxCyclomaticComplexity).toBe(15);
    expect(SCUTUM_COMPLEXITY_LIMITS.maxFunctionLines).toBe(100);
    expect(SCUTUM_COMPLEXITY_LIMITS.maxNestingDepth).toBe(4);
  });
});
