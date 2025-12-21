import { ParsedSchema } from "@bitcraft-docs/schema-parser";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import path from "path";
import { renderType } from "./types.js";
import fg from "fast-glob";
import matter from "gray-matter";
import z from "zod";
import { markdownTable } from "markdown-table";

export function generateTableDocs(
  parsedSchema: ParsedSchema,
  outDir: string,
  typesOutDir?: string,
  manualDocsRoot?: string,
) {
  if (existsSync(outDir)) {
    console.log("clearing .md files in output directory:", outDir);
    const matches = fg.sync("*.md", { cwd: outDir, onlyFiles: true });
    for (const rel of matches) unlinkSync(path.join(outDir, rel));
  }

  const typesFolderName = typesOutDir ? path.basename(typesOutDir) : undefined;
  const manualDocsDir = manualDocsRoot
    ? path.join(manualDocsRoot, path.basename(outDir))
    : undefined;

  mkdirSync(outDir, { recursive: true });

  for (const tableName in parsedSchema.tables) {
    const table = parsedSchema.tables[tableName];
    const tableType = parsedSchema.types[table.type];

    const outFileName = `${tableName}.md`;

    const { remarks, relations } = readManualDocs(manualDocsDir, outFileName);

    const typeRef = typesFolderName
      ? `[${tableType.name}](/docs/${typesFolderName}/${tableType.name})`
      : tableType.name;

    const renderedType = renderType(tableType.type, parsedSchema);
    const doc = `# ${tableName}

## Remarks
Type name: ${typeRef}
${remarks}

## Table type
\`\`\`typescript
${renderedType}
\`\`\`

## Relations

${markdownTable([["Column", "References"], ...relations])} 
`;

    const outPath = path.join(outDir, outFileName);
    writeFileSync(outPath, doc);
  }
}

type ManualDocs = {
  remarks: string;
  relations: Array<[string, string]>;
};

const ManualDocFrontMatterValidator = z.object({
  relations: z
    .array(
      z.object({
        table: z.string(),
        column: z.string(),
        foreign_column: z.string(),
      }),
    )
    .optional(),
});

function readManualDocs(
  manualDocsDir: string | undefined,
  outFileName: string,
): ManualDocs {
  const relations: ManualDocs["relations"] = [];
  const defaultDocs = { remarks: "", relations };

  if (!manualDocsDir) {
    return defaultDocs;
  }

  const manualDocFilePath = path.join(manualDocsDir, outFileName);
  if (!existsSync(manualDocFilePath)) {
    return defaultDocs;
  }

  const { content, data } = matter(readFileSync(manualDocFilePath, "utf-8"));
  const validatedData = z.safeParse(ManualDocFrontMatterValidator, data);
  if (validatedData.error) {
    console.error(validatedData.error.issues);
    throw new Error(`Invalid front-matter in ${manualDocFilePath}`);
  }

  const frontMatter = validatedData.data;

  if (frontMatter.relations) {
    for (const relation of frontMatter.relations) {
      relations.push([
        `${relation.column}`,
        `[${relation.table}#${relation.foreign_column}](./${relation.table})`,
      ]);
    }
  }

  return { remarks: content, relations };
}
