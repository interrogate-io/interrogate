import type { Element, Root } from "hast"
import { visit } from "unist-util-visit"
import type { VFile } from "vfile"
import { processImageToMarkup } from "./process-image-to-markup.js"
import { processPlantUMLInlineCode } from "./process-plantuml-inline-code.js"

const isElement = (node: unknown): node is Element => {
  return (node as { type?: string } | undefined)?.type === "element"
}
type Options = {
  includeCodeForImages: boolean
  placeDiagramFirst: boolean
}
const rehypePlantUML = (
  { includeCodeForImages = false, placeDiagramFirst = false } = {} as Partial<Options>,
) => {
  return async (tree: Root, { cwd, path }: VFile) => {
    const imgTransforms: Promise<Root | Element | undefined>[] = []
    const diagramTransforms: Promise<void>[] = []
    visit(
      tree,
      node => (node as { tagName?: string }).tagName === "img",
      (node, _index, parent) => {
        if (isElement(node)) {
          imgTransforms.push(
            processImageToMarkup({
              cwd,
              includeCodeForImages,
              node,
              parent,
              path,
            }),
          )
        }
      },
    )
    await Promise.all(imgTransforms)
    visit(
      tree,
      node => (node as { tagName?: string }).tagName === "code",
      (node, index, parent) => {
        if (isElement(node)) {
          const {
            properties: { className },
          } = node
          if (Array.isArray(className) && className.includes("language-plantuml")) {
            diagramTransforms.push(
              processPlantUMLInlineCode(node, index, parent, placeDiagramFirst),
            )
          }
        }
      },
    )
    await Promise.all(diagramTransforms)
    return tree
  }
}
export default rehypePlantUML
