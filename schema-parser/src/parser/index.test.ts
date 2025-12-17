import { describe, it, expect } from "vitest";
import { parseSchema } from ".";
const moduleSchema: unknown =
  await import("../../test-data/schema-module.json");

describe("Schema parsing", () => {
  it("parses module schema correctly", () => {
    const parsed = parseSchema(moduleSchema);

    expect(Object.keys(parsed.types).length).toBeGreaterThan(0);
    expect(Object.keys(parsed.tables).length).toBeGreaterThan(0);
    expect(Object.keys(parsed.reducers).length).toBeGreaterThan(0);
  });
});
