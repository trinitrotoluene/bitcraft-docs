import { AlgebraicTypeKind } from "../schema";

export interface PrimitiveType {
  type:
    | AlgebraicTypeKind.U256
    | AlgebraicTypeKind.U128
    | AlgebraicTypeKind.U64
    | AlgebraicTypeKind.U32
    | AlgebraicTypeKind.F32
    | AlgebraicTypeKind.F64
    | AlgebraicTypeKind.I128
    | AlgebraicTypeKind.I64
    | AlgebraicTypeKind.I32
    | AlgebraicTypeKind.I16
    | AlgebraicTypeKind.I8
    | AlgebraicTypeKind.U16
    | AlgebraicTypeKind.U8
    | AlgebraicTypeKind.String
    | AlgebraicTypeKind.Bool;
}

export interface RefType {
  type: AlgebraicTypeKind.Ref;
  ref: number;
}

export interface ProductType {
  type: AlgebraicTypeKind.Product;
  properties: Record<string, TypeDefinition>;
}

export interface SumType {
  type: AlgebraicTypeKind.Sum;
  variants: Record<string, TypeDefinition>;
}

export interface ArrayType {
  type: AlgebraicTypeKind.Array;
  elementType: TypeDefinition;
}

export type TypeDefinition =
  | PrimitiveType
  | RefType
  | ProductType
  | SumType
  | ArrayType;

export type ParsedSchema = {
  types: Record<number, { name: string; type: TypeDefinition }>;
  tables: Record<string, { name: string; type: number }>;
  reducers: Record<
    string,
    {
      name: string;
      params: Record<string, TypeDefinition>;
    }
  >;
};
