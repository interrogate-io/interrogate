import type { Element, Root } from "hast"
import { visit } from "unist-util-visit"
import type { VFile } from "vfile"
import { processImageToCodeElement } from "./process-image-to-code-element.js"
import { processPlantUMLInlineCode } from "./process-plantuml-inline-code.js"

const isElement = (node: unknown): node is Element => {
  return (node as { type?: string } | undefined)?.type === "element"
}
const rehypePlantUML = () => {
  return async (tree: Root, { cwd, path }: VFile) => {
    const imgTransforms: Promise<void>[] = []
    const diagramTransforms: Promise<void>[] = []
    visit(
      tree,
      node => (node as { tagName?: string }).tagName === "img",
      (node, _index, parent) => {
        if (isElement(node)) {
          imgTransforms.push(
            processImageToCodeElement({
              cwd,
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
            diagramTransforms.push(processPlantUMLInlineCode(node, index, parent))
          }
        }
      },
    )
    await Promise.all(diagramTransforms)
    return tree
  }
}
export default rehypePlantUML
