import { describe, expect, it } from "vitest"
import { plantUMLToSVG } from "./plantuml-to-svg.ts"
describe("plantUMLToSVG", () => {
  it("should convert plantuml markup to an svg", async () => {
    const value = await plantUMLToSVG("A -> B: Hello")
    expect(value).toContain('data-diagram-type="SEQUENCE"')
  })
  it("should return a Syntax Error SVG when given nonsense", async () => {
    const value = await plantUMLToSVG("foo")
    expect(value).toContain("Syntax Error?")
  })
})
