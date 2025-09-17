import { plantUMLToSVG } from "@interrogate/plantuml-to-svg"
import type { Element } from "hast"

type Options = {
  node: Element
  value: string
}
export const getPlantUMLSVG = async ({ node, value }: Options) => {
  const {
    properties: { dataPlantumlsvg },
  } = node
  delete node.properties.dataPlantumlsvg
  if (typeof dataPlantumlsvg === "string") {
    return dataPlantumlsvg
  }
  try {
    return await plantUMLToSVG(value)
  } catch (e: unknown) {
    console.error(e as Error)
  }
  return "<svg></svg>"
}
