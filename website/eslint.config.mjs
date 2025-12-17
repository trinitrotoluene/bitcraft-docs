// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["build/**", ".docusaurus/**"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
