import { describe, expect, it } from "vitest"
import { getDirectory } from "./get-directory.js"

describe("getDirectory", () => {
  it("should return just the directory", () => {
    expect(getDirectory("/path/diagram.puml")).toBe("/path")
  })
  it("should return the directory when there's no file passed", () => {
    expect(getDirectory("/path/to/diagrams")).toBe("/path/to/diagrams")
  })
})
