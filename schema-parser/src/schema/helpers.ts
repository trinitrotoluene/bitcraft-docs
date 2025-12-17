import type {
  AlgebraicType,
  U256Type,
  U128Type,
  U64Type,
  U32Type,
  F32Type,
  F64Type,
  I128Type,
  I64Type,
  I32Type,
  I16Type,
  I8Type,
  U16Type,
  U8Type,
  StringType,
  BoolType,
  RefType,
  ProductType,
  SumType,
  ArrayType,
} from "./typespace";

export enum AlgebraicTypeKind {
  U256 = "U256",
  U128 = "U128",
  U64 = "U64",
  U32 = "U32",
  F32 = "F32",
  F64 = "F64",
  I128 = "I128",
  I64 = "I64",
  I32 = "I32",
  I16 = "I16",
  I8 = "I8",
  U16 = "U16",
  U8 = "U8",
  String = "String",
  Bool = "Bool",
  Ref = "Ref",
  Product = "Product",
  Sum = "Sum",
  Array = "Array",
}

export function isU256Type(v: AlgebraicType): v is U256Type {
  return !!v && typeof v === "object" && "U256" in v;
}

export function isU128Type(v: AlgebraicType): v is U128Type {
  return !!v && typeof v === "object" && "U128" in v;
}

export function isU64Type(v: AlgebraicType): v is U64Type {
  return !!v && typeof v === "object" && "U64" in v;
}

export function isU32Type(v: AlgebraicType): v is U32Type {
  return !!v && typeof v === "object" && "U32" in v;
}

export function isF32Type(v: AlgebraicType): v is F32Type {
  return !!v && typeof v === "object" && "F32" in v;
}

export function isF64Type(v: AlgebraicType): v is F64Type {
  return !!v && typeof v === "object" && "F64" in v;
}

export function isI128Type(v: AlgebraicType): v is I128Type {
  return !!v && typeof v === "object" && "I128" in v;
}

export function isI64Type(v: AlgebraicType): v is I64Type {
  return !!v && typeof v === "object" && "I64" in v;
}

export function isI32Type(v: AlgebraicType): v is I32Type {
  return !!v && typeof v === "object" && "I32" in v;
}

export function isI16Type(v: AlgebraicType): v is I16Type {
  return !!v && typeof v === "object" && "I16" in v;
}

export function isI8Type(v: AlgebraicType): v is I8Type {
  return !!v && typeof v === "object" && "I8" in v;
}

export function isU16Type(v: AlgebraicType): v is U16Type {
  return !!v && typeof v === "object" && "U16" in v;
}

export function isU8Type(v: AlgebraicType): v is U8Type {
  return !!v && typeof v === "object" && "U8" in v;
}

export function isStringType(v: AlgebraicType): v is StringType {
  return !!v && typeof v === "object" && "String" in v;
}

export function isBoolType(v: AlgebraicType): v is BoolType {
  return !!v && typeof v === "object" && "Bool" in v;
}

export function isRefType(v: AlgebraicType): v is RefType {
  return !!v && typeof v === "object" && "Ref" in v;
}

export function isProductType(v: AlgebraicType): v is ProductType {
  return !!v && typeof v === "object" && "Product" in v;
}

export function isSumType(v: AlgebraicType): v is SumType {
  return !!v && typeof v === "object" && "Sum" in v;
}

export function isArrayType(v: AlgebraicType): v is ArrayType {
  return !!v && typeof v === "object" && "Array" in v;
}

export function isComplexType(
  v: AlgebraicType,
): v is RefType | ProductType | SumType | ArrayType {
  return isRefType(v) || isProductType(v) || isSumType(v) || isArrayType(v);
}

export function getAlgebraicType(
  value: AlgebraicType,
): AlgebraicTypeKind | undefined {
  if (isU256Type(value)) return AlgebraicTypeKind.U256;
  if (isU128Type(value)) return AlgebraicTypeKind.U128;
  if (isU64Type(value)) return AlgebraicTypeKind.U64;
  if (isU32Type(value)) return AlgebraicTypeKind.U32;
  if (isF32Type(value)) return AlgebraicTypeKind.F32;
  if (isF64Type(value)) return AlgebraicTypeKind.F64;
  if (isI128Type(value)) return AlgebraicTypeKind.I128;
  if (isI64Type(value)) return AlgebraicTypeKind.I64;
  if (isI32Type(value)) return AlgebraicTypeKind.I32;
  if (isI16Type(value)) return AlgebraicTypeKind.I16;
  if (isI8Type(value)) return AlgebraicTypeKind.I8;
  if (isU16Type(value)) return AlgebraicTypeKind.U16;
  if (isU8Type(value)) return AlgebraicTypeKind.U8;
  if (isStringType(value)) return AlgebraicTypeKind.String;
  if (isBoolType(value)) return AlgebraicTypeKind.Bool;
  if (isRefType(value)) return AlgebraicTypeKind.Ref;
  if (isProductType(value)) return AlgebraicTypeKind.Product;
  if (isSumType(value)) return AlgebraicTypeKind.Sum;
  if (isArrayType(value)) return AlgebraicTypeKind.Array;
  return undefined;
}
