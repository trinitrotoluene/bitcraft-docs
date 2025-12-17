import { ParsedSchema } from "@bitcraft-docs/schema-parser";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { renderType } from "./types.js";
import fg from "fast-glob";

export function generateReducerDocs(
  parsedSchema: ParsedSchema,
  outDir: string,
) {
  if (existsSync(outDir)) {
    console.log("clearing .md files in output directory:", outDir);
    const matches = fg.sync("*.md", { cwd: outDir, onlyFiles: true });
    for (const rel of matches) unlinkSync(path.join(outDir, rel));
  }

  mkdirSync(outDir, { recursive: true });

  for (const reducerName in parsedSchema.reducers) {
    const reducer = parsedSchema.reducers[reducerName];
    const reducerParams = Object.entries(reducer.params);

    const formatParam = (name: string, typeStr: string) => {
      if (!typeStr.includes("\n")) return `    ${name}: ${typeStr},`;
      const lines = typeStr.split("\n");
      return (
        `    ${name}: ${lines[0]}\n` +
        lines
          .slice(1)
          .map((l) => `    ${l}`)
          .join("\n") +
        ","
      );
    };

    const paramLines = reducerParams.map(([name, type]) =>
      formatParam(name, renderType(type, parsedSchema)),
    );

    const paramsBlock = paramLines.join("\n");

    const doc = `# ${reducerName}

## Signature

\`\`\`typescript
${reducerName}(
${paramsBlock}
)
\`\`\`

## Remarks
`;

    const outPath = path.join(outDir, `${reducerName}.md`);
    console.log("writing", outPath);
    writeFileSync(outPath, doc);
  }
}
