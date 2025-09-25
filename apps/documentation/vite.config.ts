/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    coverage: {
      all: true,
      enabled: true,
      exclude: [
        "dist",
        "eslint.config.ts",
        "src/index.ts",
        "vite.config.ts",
        "*.spec.ts",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "*.test.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
      ],
      provider: "v8",
      reporter: ["lcovonly", "html"],
    },
    environment: "node",
    globals: true,
    hookTimeout: 20_000,
    passWithNoTests: true,
    testTimeout: 20_000,
  },
})
