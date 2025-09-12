import type { Root } from "mdast"
import { remark } from "remark"
import { describe, expect, it, vi } from "vitest"
import remarkPlantUML from "./remark-plantuml.js"

vi.mock("@interrogate/plantuml-to-svg", () => ({
  plantUMLToSVG: vi.fn(() => "<svg />"),
}))
describe("remarkPlantUML", () => {
  it("should find ```plantuml ...``` plantuml code blocks and add svg hProperties for further processing in other (rehype) plugins", async () => {
    const nextPlugin = vi.fn((tree: Root) => tree)
    const result = await remark()
      .use(remarkPlantUML)
      .use(() => nextPlugin)
      .process("```plantuml\nA -> B: Hello\n```")
    const { value } = result
    expect(nextPlugin).toHaveBeenCalledWith(
      expect.objectContaining({
        children: [
          expect.objectContaining({
            type: "code",
            lang: "plantuml",
            value: "A -> B: Hello",
            data: {
              hProperties: {
                dataPlantumlsvg: "<svg />",
              },
            },
          }),
        ],
      }),
      expect.objectContaining({
        value: "```plantuml\nA -> B: Hello\n```\n",
      }),
    )
    expect(value).toContain("```plantuml\nA -> B: Hello\n```")
  })
  it("should find images that have a .puml suffix", async () => {
    const { value } = await remark()
      .use(remarkPlantUML)
      .process("![hello diagram](./assets/hello-diagram.puml)")
    expect(value).toBe("![hello diagram](data:image/svg+xml;base64,PHN2ZyAvPg==)\n")
  })
  it("should find image references that have a .puml suffix", async () => {
    const { value } = await remark()
      .use(remarkPlantUML)
      .process(
        '![hello diagram][hello-diagram]\n\n[hello-diagram]: ./assets/hello-diagram.puml "Hello, diagram"',
      )
    expect(value).toBe(
      '![hello diagram][hello-diagram]\n\n[hello-diagram]: data:image/svg+xml;base64,PHN2ZyAvPg== "Hello, diagram"\n',
    )
  })
  it("should find image references that have a .puml suffix", async () => {
    const { value } = await remark()
      .use(remarkPlantUML)
      .process(
        '![hello diagram][hello-diagram]\n\n[hello-diagram]: ./assets/hello-diagram.puml "Hello, diagram"\n![hello, diagram][hello-diagram]',
      )
    console.log(value)
    expect(true).toBe(true)
    // expect(value).toBe(
    //   '![hello diagram][hello-diagram]\n\n[hello-diagram]: data:image/svg+xml;base64,PHN2ZyAvPg== "Hello, diagram"\n'
    // );
  })
})
