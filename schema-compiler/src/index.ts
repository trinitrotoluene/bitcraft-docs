import { program } from "commander";
import { readFileSync } from "fs";
import { parseSchema } from "@bitcraft-docs/schema-parser";
import { generateReducerDocs } from "./reducers.js";
import { generateTableDocs } from "./tables.js";
import { generateTypeDocs } from "./types.js";

program
  .option("--schema <path>", "Path to the input schema file")
  .option("--output-tables <path>", "Path to write table docs to")
  .option("--output-types <path>", "Path to write type docs to")
  .option("--output-reducers <path>", "Path to write reducer docs to")
  .option(
    "--manual-docs <path>",
    "Path to reference for manual docs to merge into the output",
  );

program.parse();

const options = program.opts();

if (!options.schema) {
  console.error("Error: --schema option is required");
  process.exit(1);
}

console.log("Reading schema from:", options.schema);

const rawSchemaText = readFileSync(options.schema, "utf-8");
const rawSchemaJson = JSON.parse(rawSchemaText);

console.log("Loaded raw schema");

const parsedSchema = parseSchema(rawSchemaJson);
console.log("Parsed schema successfully");
console.log(
  `Available: ${Object.keys(parsedSchema.tables).length} tables, ${Object.keys(parsedSchema.types).length} types, ${Object.keys(parsedSchema.reducers).length} reducers`,
);

if (options.outputTables) {
  console.log("Generating table docs...");
  generateTableDocs(
    parsedSchema,
    options.outputTables,
    options.outputTypes,
    options.manualDocs,
  );
}

if (options.outputTypes) {
  console.log("Generating type docs...");
  generateTypeDocs(parsedSchema, options.outputTypes);
}

if (options.outputReducers) {
  console.log("Generating reducer docs...");
  generateReducerDocs(parsedSchema, options.outputReducers);
}

console.log("Done.");
