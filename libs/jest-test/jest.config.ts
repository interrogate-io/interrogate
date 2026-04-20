import type { Config } from "jest"
import { createDefaultPreset } from "ts-jest"

const config: Config = createDefaultPreset({
  tsconfig: "tsconfig.jest.json",
})
config.collectCoverageFrom = ["src/**/*.{ts,tsx}"]
config.coveragePathIgnorePatterns = ["src/index.ts"]
config.moduleNameMapper = {
  "^(\\.{1,2}/.*)\\.js$": "$1",
}
export default config
