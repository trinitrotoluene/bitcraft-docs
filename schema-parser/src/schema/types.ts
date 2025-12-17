import z from "zod";

export const TypeDefinitionValidator = z.object({
  name: z.object({
    scope: z.array(z.unknown()),
    name: z.string(),
  }),
  ty: z.number(),
  custom_ordering: z.boolean(),
});

export type TypeDefinition = z.infer<typeof TypeDefinitionValidator>;
