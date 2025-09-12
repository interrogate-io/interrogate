/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    coverage: {
      exclude: ["dist", "eslint.config.ts", "src/index.ts", "vite.config.ts"],
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    environment: "node",
    globals: true,
  },
})
