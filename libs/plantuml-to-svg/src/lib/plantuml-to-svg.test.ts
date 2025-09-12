import { describe, expect, it } from "vitest"
import { plantUMLToSVG } from "./plantuml-to-svg.ts"
describe("plantUMLToSVG", () => {
  it("should convert plantuml markup to an svg", async () => {
    const value = await plantUMLToSVG("A -> B: Hello")
    expect(value).toContain('data-diagram-type="SEQUENCE"')
  })
  it("should reject when given nonsense", async () => {
    await expect(async () => plantUMLToSVG("foo")).rejects.toThrow("string:2:error:Syntax Error?")
  })
})
