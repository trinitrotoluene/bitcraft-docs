import z from "zod";

export type U128Type = { U128: unknown[] };

export const U128TypeValidator: z.ZodType<U128Type> = z.object({
  U128: z.array(z.unknown()),
});

export type U256Type = { U256: unknown[] };

export const U256TypeValidator: z.ZodType<U256Type> = z.object({
  U256: z.array(z.unknown()),
});

export type U64Type = { U64: unknown[] };

export const U64TypeValidator: z.ZodType<U64Type> = z.object({
  U64: z.array(z.unknown()),
});

export type U32Type = { U32: unknown[] };

export const U32TypeValidator: z.ZodType<U32Type> = z.object({
  U32: z.array(z.unknown()),
});

export type F32Type = { F32: unknown[] };

export const F32TypeValidator: z.ZodType<F32Type> = z.object({
  F32: z.array(z.unknown()),
});

export type I32Type = { I32: unknown[] };

export const I32TypeValidator: z.ZodType<I32Type> = z.object({
  I32: z.array(z.unknown()),
});

export type StringType = { String: unknown[] };

export const StringTypeValidator: z.ZodType<StringType> = z.object({
  String: z.array(z.unknown()),
});

export type BoolType = { Bool: unknown[] };

export const BoolTypeValidator: z.ZodType<BoolType> = z.object({
  Bool: z.array(z.unknown()),
});

export type RefType = { Ref: number };

export const RefTypeValidator: z.ZodType<RefType> = z.object({
  Ref: z.number(),
});

export type ProductType = { Product: { elements: ElementType[] } };

export const ProductTypeValidator: z.ZodType<ProductType> = z.lazy(() =>
  z.object({
    Product: z.object({
      elements: z.array(ElementTypeValidator as z.ZodType<ElementType>),
    }),
  }),
);

export type SumType = { Sum: { variants: ElementType[] } };

export const SumTypeValidator: z.ZodType<SumType> = z.lazy(() =>
  z.object({
    Sum: z.object({
      variants: z.array(ElementTypeValidator as z.ZodType<ElementType>),
    }),
  }),
);

export type ArrayType = { Array: AlgebraicType };

export const ArrayTypeValidator: z.ZodType<ArrayType> = z.lazy(() =>
  z.object({
    Array: AlgebraicTypeValidator,
  }),
);

export type I8Type = { I8: unknown[] };

export const I8TypeValidator: z.ZodType<I8Type> = z.object({
  I8: z.array(z.unknown()),
});

export type U8Type = { U8: unknown[] };

export const U8TypeValidator: z.ZodType<U8Type> = z.object({
  U8: z.array(z.unknown()),
});

export type I16Type = { I16: unknown[] };

export const I16TypeValidator: z.ZodType<I16Type> = z.object({
  I16: z.array(z.unknown()),
});

export type U16Type = { U16: unknown[] };

export const U16TypeValidator: z.ZodType<U16Type> = z.object({
  U16: z.array(z.unknown()),
});

export type I64Type = { I64: unknown[] };

export const I64TypeValidator: z.ZodType<I64Type> = z.object({
  I64: z.array(z.unknown()),
});

export type I128Type = { I128: unknown[] };

export const I128TypeValidator: z.ZodType<I128Type> = z.object({
  I128: z.array(z.unknown()),
});

export type F64Type = { F64: unknown[] };

export const F64TypeValidator: z.ZodType<F64Type> = z.object({
  F64: z.array(z.unknown()),
});

export type AlgebraicType =
  | BoolType
  | I8Type
  | U8Type
  | I16Type
  | U16Type
  | I32Type
  | U32Type
  | I64Type
  | U64Type
  | I128Type
  | U128Type
  | U256Type
  | F32Type
  | F64Type
  | StringType
  | RefType
  | ProductType
  | SumType
  | ArrayType;

export const AlgebraicTypeValidator: z.ZodType<AlgebraicType> = z.union([
  U256TypeValidator,
  U128TypeValidator,
  U64TypeValidator,
  U32TypeValidator,
  F32TypeValidator,
  F64TypeValidator,
  I128TypeValidator,
  I64TypeValidator,
  I32TypeValidator,
  I16TypeValidator,
  I8TypeValidator,
  U16TypeValidator,
  U8TypeValidator,
  StringTypeValidator,
  BoolTypeValidator,
  RefTypeValidator,
  ProductTypeValidator,
  SumTypeValidator,
  ArrayTypeValidator,
]);

export type ElementType = {
  name: { some: string };
  algebraic_type: AlgebraicType;
};

export const ElementTypeValidator: z.ZodType<ElementType> = z.object({
  name: z.object({
    some: z.string(),
  }),
  algebraic_type: AlgebraicTypeValidator as z.ZodType<AlgebraicType>,
});
