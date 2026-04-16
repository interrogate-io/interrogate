import eslint from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ["coverage", "dist", "node_modules"],
  },
])
