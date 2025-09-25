import remarkPlantUML from "@interrogate/remark-plugin-plantuml"
import { dirname, normalize } from "node:path"
import { fileURLToPath } from "node:url"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { read } from "to-vfile"
import { unified } from "unified"
import { describe, expect, it, vi } from "vitest"
import rehypePlantUML from "./rehype-plantuml.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
vi.mock("@interrogate/plantuml-to-svg", () => ({
  plantUMLToSVG: vi.fn(() => "<svg />"),
}))
describe("rehypePlantUML", () => {
  it("should find ```plantuml ...``` plantuml code blocks and add svg image nodes before them without the remarkPlantUML plugin", async () => {
    const { value } = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePlantUML)
      .use(rehypeStringify)
      .process("```plantuml\nA -> B: Hello\n```")
    expect(value).toBe(
      '<figure><pre><code class="language-plantuml">A -> B: Hello\n</code></pre><svg></svg></figure>',
    )
  })
  it("should find ```plantuml ...``` plantuml code blocks and add svg image nodes before them with the remarkPlantUML plugin", async () => {
    const { value } = await unified()
      .use(remarkParse)
      .use(remarkPlantUML)
      .use(remarkRehype)
      .use(rehypePlantUML)
      .use(rehypeStringify)
      .process("```plantuml\nA -> B: Hello\n```")
    expect(value).toBe(
      '<figure><pre><code class="language-plantuml">A -> B: Hello\n</code></pre><svg></svg></figure>',
    )
  })
  it("should put the svg first if the option is set to true", async () => {
    const { value } = await unified()
      .use(remarkParse)
      .use(remarkPlantUML)
      .use(remarkRehype)
      .use(rehypePlantUML, { placeDiagramFirst: true })
      .use(rehypeStringify)
      .process("```plantuml\nA -> B: Hello\n```")
    expect(value).toBe(
      '<figure><svg></svg><pre><code class="language-plantuml">A -> B: Hello\n</code></pre></figure>',
    )
  })
  it("should inline external diagrams as svgs", async () => {
    const { value } = await unified()
      .use(remarkParse)
      .use(remarkPlantUML)
      .use(remarkRehype)
      .use(rehypePlantUML)
      .use(rehypeStringify)
      .process(await read(normalize(`${__dirname}/../../assets/markdown.md`)))
    expect(value).toBe(`<p><figure><svg><title>hello diagram</title></svg></figure></p>`)
  })
  it("should inline external diagrams as svgs with the code if the option is set", async () => {
    const { value } = await unified()
      .use(remarkParse)
      .use(remarkPlantUML)
      .use(remarkRehype)
      .use(rehypePlantUML, { includeCodeForImages: true })
      .use(rehypeStringify)
      .process(await read(normalize(`${__dirname}/../../assets/markdown.md`)))
    expect(value).toBe(`<p><figure><pre><code class="language-plantuml">@startuml "hello diagram"
A -> B: Hello
@enduml
</code></pre><svg></svg></figure></p>`)
  })
  it("should find throw an error for invalid links", async () => {
    await expect(async () =>
      unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePlantUML)
        .use(rehypeStringify)
        .process(await read(normalize(`${__dirname}/../../assets/markdown-error.md`))),
    ).rejects.toThrow()
  })
})
