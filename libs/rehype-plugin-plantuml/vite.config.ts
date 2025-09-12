/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    // coverage: {
    //   provider: "v8",
    //   reporter: ["text", "json", "html"],
    // },
    environment: "node",
    globals: true,
  },
})
