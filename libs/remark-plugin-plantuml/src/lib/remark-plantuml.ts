import type { Node, Root } from "mdast"
import { visit } from "unist-util-visit"
import type { VFile } from "vfile"
import { processPlantUMLImage } from "./process-plantuml-image.js"
import { processPlantUMLInlineCode } from "./process-plantuml-inline-code.js"

const remarkPlantUML = () => {
  return async (tree: Root, file: VFile) => {
    const definitionTransforms: Promise<Node>[] = []
    const diagramTransforms: Promise<Node>[] = []
    const imgTransforms: Promise<Node>[] = []
    visit(tree, "code", node => {
      const { lang } = node
      if (lang === "plantuml") {
        diagramTransforms.push(processPlantUMLInlineCode(node))
      }
    })
    visit(tree, "definition", node => {
      const { cwd, path } = file
      definitionTransforms.push(
        processPlantUMLImage({
          cwd,
          node,
          path,
        }),
      )
    })
    await Promise.all(definitionTransforms)
    visit(tree, "image", node => {
      const { cwd, path } = file
      imgTransforms.push(
        processPlantUMLImage({
          cwd,
          node,
          path,
        }),
      )
    })
    visit(tree, "imageReference", node => {
      const { cwd, path } = file
      imgTransforms.push(
        processPlantUMLImage({
          cwd,
          node,
          path,
        }),
      )
    })
    await Promise.all(imgTransforms)
    await Promise.all(diagramTransforms)
    return tree
  }
}
export default remarkPlantUML
