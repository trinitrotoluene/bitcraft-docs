import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";

console.log("Fetching test data...");

console.log("Fetching global schema...");
const globalSchemaResponse = await fetch(
  "https://bitcraft-early-access.spacetimedb.com/v1/database/bitcraft-global/schema?version=9",
);

console.log("Fetching module schema...");
const moduleSchemaResponse = await fetch(
  "https://bitcraft-early-access.spacetimedb.com/v1/database/bitcraft-1/schema?version=9",
);

const globalSchema = await globalSchemaResponse.json();
const moduleSchema = await moduleSchemaResponse.json();

console.log("Writing files...");

if (existsSync("test-data")) {
  rmSync("test-data", { recursive: true, force: true });
}

mkdirSync("test-data");

writeFileSync(
  "test-data/schema-global.json",
  JSON.stringify(globalSchema, null, 2),
);
writeFileSync(
  "test-data/schema-module.json",
  JSON.stringify(moduleSchema, null, 2),
);

console.log("Test data fetched and saved.");
