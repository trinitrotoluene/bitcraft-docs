import {
  ParsedSchema,
  TypeDefinition,
  AlgebraicTypeKind,
} from "@bitcraft-docs/schema-parser";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import fg from "fast-glob";

export function generateTypeDocs(parsedSchema: ParsedSchema, outDir: string) {
  if (existsSync(outDir)) {
    console.log("clearing .md files in output directory:", outDir);
    const matches = fg.sync("*.md", { cwd: outDir, onlyFiles: true });
    for (const rel of matches) unlinkSync(path.join(outDir, rel));
  }

  mkdirSync(outDir, { recursive: true });

  for (const typeName in parsedSchema.types) {
    const type = parsedSchema.types[typeName];

    const doc = generateSingleTypeDoc(type.name, type.type, parsedSchema);

    const outPath = path.join(outDir, `${type.name}.md`);
    console.log("writing", outPath);
    writeFileSync(outPath, doc);
  }
}

function generateSingleTypeDoc(
  typeName: string,
  type: TypeDefinition,
  parsedSchema: ParsedSchema,
) {
  return `# ${typeName}

\`\`\`typescript
${renderType(type, parsedSchema)};
\`\`\``;
}

export function renderType(type: TypeDefinition, schema: ParsedSchema): string {
  const INDENT = "  ";

  function isMultiline(s: string) {
    return s.includes("\n");
  }

  function render(t: TypeDefinition, level = 0): string {
    switch (t.type) {
      case AlgebraicTypeKind.Ref:
        return render(schema.types[t.ref].type, level);
      case AlgebraicTypeKind.Array: {
        const elem = render(t.elementType, 0);
        if (!isMultiline(elem)) return `Array<${elem}>`;
        const indentCur = INDENT.repeat(level);
        const inner = elem
          .split("\n")
          .map((l) => INDENT.repeat(level + 1) + l)
          .join("\n");
        return `Array<\n${inner}\n${indentCur}>`;
      }
      case AlgebraicTypeKind.Product: {
        const entries = Object.entries(t.properties);
        if (entries.length === 0) return "{ }";

        const open = INDENT.repeat(level) + "{";
        const body = entries
          .map(([key, value]) => {
            const rv = render(value, 0);
            const propIndent = INDENT.repeat(level + 1);
            if (!isMultiline(rv)) {
              return `${propIndent}${key}: ${rv}`;
            }
            const rvLines = rv.split("\n");
            return (
              `${propIndent}${key}: ${rvLines[0]}\n` +
              rvLines
                .slice(1)
                .map((line) => propIndent + line)
                .join("\n")
            );
          })
          .join(",\n");
        const close = INDENT.repeat(level) + "}";
        return `${open}\n${body}\n${close}`;
      }
      case AlgebraicTypeKind.Sum: {
        const parts = Object.entries(t.variants).map(
          ([variantName, variant]) => {
            const rv = render(variant, 0);
            if (!isMultiline(rv)) return `${variantName}(${rv})`;
            const rvLines = rv.split("\n");
            return `${variantName}(${rvLines.join("\n")})`;
          },
        );
        if (parts.length === 0) return "";
        return parts.map((p, i) => (i === 0 ? p : `| ${p}`)).join("\n");
      }
      default:
        return String(t.type);
    }
  }

  return render(type, 0);
}
