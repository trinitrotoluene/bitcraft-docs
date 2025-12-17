const globalSchema: unknown =
  await import("../../test-data/schema-global.json");
const moduleSchema: unknown =
  await import("../../test-data/schema-module.json");

import { SchemaValidator } from "./index";
import { describe, it, expect } from "vitest";

describe("Schema validator", () => {
  it("successfully parses global schema", () => {
    const parseResult = SchemaValidator.safeParse(globalSchema);

    if (parseResult.success) {
      return;
    }

    expect(parseResult.error.issues).toEqual([]);
  });

  it("successfully parses module schema", () => {
    const parseResult = SchemaValidator.safeParse(moduleSchema);

    if (parseResult.success) {
      return;
    }

    expect(parseResult.error.issues).toEqual([]);
  });
});
