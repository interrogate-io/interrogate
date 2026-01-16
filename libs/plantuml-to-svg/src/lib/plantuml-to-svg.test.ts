import { parse, type ElementNode, type Node } from "svg-parser"
import { optimize } from "svgo"
import { afterEach, describe, expect, it, vi, type Mock } from "vitest"
import { getCommand } from "./get-command.ts"
import { plantUMLToSVG } from "./plantuml-to-svg.ts"

vi.mock("svgo", async importOriginal => {
  const { optimize, ...rest } = await importOriginal<typeof import("svgo")>()
  return {
    ...rest,
    optimize: vi.fn(optimize),
  }
})
vi.mock("./get-command.js", async importOriginal => {
  const { getCommand } = await importOriginal<typeof import("./get-command.js")>()
  return {
    getCommand: vi.fn(getCommand),
  }
})
const isElementNode = (node: Node): node is ElementNode => node.type === "element"
describe("plantUMLToSVG", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
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
    ;(getCommand as Mock).mockResolvedValue(null)
    await expect(() => plantUMLToSVG("A -> B: Hello")).rejects.toEqual(
      expect.objectContaining({
        message: "Could not invoke docker or java",
      }),
    )
  })
  it("should return an svg when the command returns an svg", async () => {
    ;(getCommand as Mock).mockResolvedValue("./test.sh")
    const value = await plantUMLToSVG("<svg/>")
    expect(value).toEqual("<svg/>")
  })
  it("should throw an error when the command returns junk", async () => {
    ;(getCommand as Mock).mockResolvedValue("./test-junk.sh")
    await expect(() => plantUMLToSVG("A -> B: Hello")).rejects.toEqual(
      expect.objectContaining({
        message: "junk\n",
      }),
    )
  })
  it("should throw an error when svgo fails", async () => {
    ;(optimize as Mock).mockImplementation(() => {
      throw new Error("error")
    })
    await expect(() => plantUMLToSVG("A -> B: Hello")).rejects.toEqual(
      expect.objectContaining({
        message: "error",
      }),
    )
  })
})
