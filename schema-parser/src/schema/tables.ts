import z from "zod";

export const TableDefinitionValidator = z.object({
  name: z.string(),
  product_type_ref: z.number(),
  primary_key: z.array(z.number()),
});

export type TableDefinition = z.infer<typeof TableDefinitionValidator>;
