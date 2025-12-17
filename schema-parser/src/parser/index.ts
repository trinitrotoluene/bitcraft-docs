import {
  AlgebraicType,
  AlgebraicTypeKind,
  ArrayType,
  getAlgebraicType,
  isArrayType,
  isComplexType,
  isProductType,
  isRefType,
  isSumType,
  ProductType,
  RefType,
  SchemaValidator,
  SumType,
} from "../schema";
import { ParsedSchema, PrimitiveType, TypeDefinition } from "./types";

export * from "./types";

export function parseSchema(rawData: unknown): ParsedSchema {
  const parsedSchema = SchemaValidator.parse(rawData);

  const types: ParsedSchema["types"] = {};

  // Map types
  for (const type of parsedSchema.types) {
    // grab the definition from the typespace
    const typeDef = parsedSchema.typespace.types[type.ty];
    if (!typeDef) {
      console.warn(`Type definition not found for type ref ${type.ty}`);
      continue;
    }

    types[type.ty] = {
      name: type.name.name,
      type: mapType(typeDef),
    };
  }

  // Map tables
  const tables: ParsedSchema["tables"] = {};

  for (const table of parsedSchema.tables) {
    tables[table.name] = {
      name: table.name,
      type: table.product_type_ref,
    };
  }

  // Map reducers
  const reducers: ParsedSchema["reducers"] = {};

  for (const reducer of parsedSchema.reducers) {
    reducers[reducer.name] = {
      name: reducer.name,
      params: reducer.params.elements.reduce(
        (acc, param) => ({
          ...acc,
          [param.name.some]: mapType(param.algebraic_type),
        }),
        {} as Record<string, TypeDefinition>,
      ),
    };
  }

  return { types, tables, reducers };
}

function mapType(type: AlgebraicType): TypeDefinition {
  switch (true) {
    case isComplexType(type):
      return mapComplexType(type);
    default:
      const tag = getAlgebraicType(type);
      return {
        type: tag as PrimitiveType["type"],
      };
  }
}

function mapComplexType(
  type: RefType | ProductType | SumType | ArrayType,
): TypeDefinition {
  if (isRefType(type)) {
    return {
      type: AlgebraicTypeKind.Ref,
      ref: type.Ref,
    };
  } else if (isProductType(type)) {
    return {
      type: AlgebraicTypeKind.Product,
      properties: type.Product.elements.reduce(
        (acc, el) => ({ ...acc, [el.name.some]: mapType(el.algebraic_type) }),
        {} as Record<string, TypeDefinition>,
      ),
    };
  } else if (isSumType(type)) {
    return {
      type: AlgebraicTypeKind.Sum,
      variants: type.Sum.variants.reduce(
        (acc, variant) => ({
          ...acc,
          [variant.name.some]: mapType(variant.algebraic_type),
        }),
        {} as Record<string, TypeDefinition>,
      ),
    };
  } else if (isArrayType(type)) {
    return {
      type: AlgebraicTypeKind.Array,
      elementType: mapType(type.Array),
    };
  }

  throw new Error("Attempted to map unknown complex type");
}
