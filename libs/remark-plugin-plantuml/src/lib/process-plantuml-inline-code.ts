import { plantUMLToSVG } from "@interrogate/plantuml-to-svg"
import type { Literal } from "mdast"

export const processPlantUMLInlineCode = async (node: Literal) => {
  const { value } = node
  const dataPlantumlsvg = await plantUMLToSVG(value)
  node.data = { hProperties: { dataPlantumlsvg } }
  return node
}
