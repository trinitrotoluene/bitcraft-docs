import z from "zod";
import { ElementTypeValidator, ElementType } from "./typespace";

export const ReducerDefinitionValidator = z.object({
  name: z.string(),
  params: z.object({
    elements: z.array(ElementTypeValidator as z.ZodType<ElementType>),
  }),
});

export type ReducerDefinition = z.infer<typeof ReducerDefinitionValidator>;
