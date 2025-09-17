import type { Element, Root } from "hast"
import { getPlantUMLCode } from "./get-plantuml-code.js"
import { getPlantUMLSVG } from "./get-plantuml-svg.js"
import { plantUMLImageToPlantUMLCodeElement } from "./plantuml-image-to-plantuml-code-element.js"
import { plantUMLImageToSVGFigure } from "./plantuml-to-svg-figure.js"

type Options = {
  cwd: string
  node: Element
  parent?: Root | Element
  path: string
  includeCodeForImages?: boolean
}
export const processImageToMarkup = async (props: Options): Promise<Root | Element | undefined> => {
  const { node, parent, includeCodeForImages = false } = props
  const {
    properties: { dataPlantumlcode, src },
  } = node
  if (typeof dataPlantumlcode === "string" || (typeof src === "string" && src.endsWith(".puml"))) {
    const value = await getPlantUMLCode(props)
    const svg = await getPlantUMLSVG({ node, value })
    if (includeCodeForImages) {
      return plantUMLImageToPlantUMLCodeElement({ svg, node, parent, value })
    }
    return plantUMLImageToSVGFigure({ svg, node, parent })
  }
  return parent
}
