import { ParsedSchema } from "@bitcraft-docs/schema-parser";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { renderType } from "./types.js";
import fg from "fast-glob";

export function generateTableDocs(
  parsedSchema: ParsedSchema,
  outDir: string,
  typesOutDir?: string,
) {
  if (existsSync(outDir)) {
    console.log("clearing .md files in output directory:", outDir);
    const matches = fg.sync("*.md", { cwd: outDir, onlyFiles: true });
    for (const rel of matches) unlinkSync(path.join(outDir, rel));
  }

  const typesFolderName = typesOutDir ? path.basename(typesOutDir) : undefined;

  mkdirSync(outDir, { recursive: true });

  for (const tableName in parsedSchema.tables) {
    const table = parsedSchema.tables[tableName];
    const tableType = parsedSchema.types[table.type];

    const typeRef = typesFolderName
      ? `[${tableType.name}](/docs/${typesFolderName}/${tableType.name})`
      : tableType.name;

    const renderedType = renderType(tableType.type, parsedSchema);
    const doc = `# ${tableName}

${typeRef}

\`\`\`typescript
${renderedType}
\`\`\`

## Remarks
`;

    const outPath = path.join(outDir, `${tableName}.md`);
    console.log("writing", outPath);
    writeFileSync(outPath, doc);
  }
}
