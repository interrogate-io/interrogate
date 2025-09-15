/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "dist",
        "eslint.config.ts",
        "src/index.ts",
        "vite.config.ts",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/*.test.ts",
        "**/*.test.tsx",
      ],
      provider: "v8",
      reporter: ["text", "json", "lcovonly", "html"],
    },
    environment: "node",
    globals: true,
    hookTimeout: 20_000,
    testTimeout: 20_000,
  },
})
