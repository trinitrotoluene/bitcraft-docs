import z from "zod";
import { AlgebraicTypeValidator } from "./typespace";
import { TypeDefinitionValidator } from "./types";
import { TableDefinitionValidator } from "./tables";
import { ReducerDefinitionValidator } from "./reducers";

export const SchemaValidator = z.object({
  typespace: z.object({
    types: z.array(AlgebraicTypeValidator),
  }),
  reducers: z.array(ReducerDefinitionValidator),
  tables: z.array(TableDefinitionValidator),
  types: z.array(TypeDefinitionValidator),
});

export type Schema = z.infer<typeof SchemaValidator>;

export * from "./helpers.js";
export * from "./typespace.js";
