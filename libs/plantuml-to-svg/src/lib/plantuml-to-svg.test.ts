import { parse, type ElementNode, type Node } from "svg-parser"
import { describe, expect, it, vi } from "vitest"
import { plantUMLToSVG } from "./plantuml-to-svg.ts"

const isElementNode = (node: Node): node is ElementNode => node.type === "element"
describe("plantUMLToSVG", () => {
  it("should convert plantuml markup to an svg", async () => {
    const value = await plantUMLToSVG("A -> B: Hello")
    const svg = parse(value).children.find(node => {
      if (isElementNode(node)) {
        return node.tagName === "svg"
      }
      return false
      // tagName === 'svg'
    }) as ElementNode | undefined
    expect(value).toContain('data-diagram-type="SEQUENCE"')
    expect(svg?.properties?.height).not.toBeUndefined()
    expect(svg?.properties?.width).not.toBeUndefined()
  })
  it("should return a Syntax Error SVG when given nonsense", async () => {
    const value = await plantUMLToSVG("foo")
    expect(value).toContain("Syntax Error?")
  })
  it("should reject when given an empty string", async () => {
    await expect(() => plantUMLToSVG("")).rejects.toEqual(
      expect.objectContaining({
        message: "No svg was generated",
      }),
    )
  })
  it("should convert plantuml markup to an svg without dimensions", async () => {
    const value = await plantUMLToSVG("A -> B: Hello", { excludeSVGDimensionStyle: true })
    const svg = parse(value).children.find(node => {
      if (isElementNode(node)) {
        return node.tagName === "svg"
      }
      return false
    }) as ElementNode | undefined
    expect(svg?.properties?.height).toBeUndefined()
    expect(svg?.properties?.width).toBeUndefined()
  })
  it("should throw an error when getCommand does not return", async () => {
    vi.resetModules()
    vi.doMock("./get-command.js", () => ({
      getCommand: vi.fn(() => null),
    }))
    const { plantUMLToSVG } = await import("./plantuml-to-svg.ts")
    await expect(() => plantUMLToSVG("A -> B: Hello")).rejects.toEqual(
      expect.objectContaining({
        message: "Could not invoke docker or java",
      }),
    )
    vi.unmock("./get-command.js")
  })
})
