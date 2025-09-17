import { plantUMLToSVG as rawPlantUMLToSVG } from "@interrogate/plantuml-to-svg"
import type { Element, ElementContent, Root } from "hast"
import { fromHtml } from "hast-util-from-html"

const plantUMLToSVG = async (
  value: string,
  svgMarkup?: string | number | boolean | (string | number)[] | null,
) => {
  if (typeof svgMarkup === "string") {
    return svgMarkup
  }
  return await rawPlantUMLToSVG(value)
}
export const processPlantUMLInlineCode = async (
  node: Element,
  index?: number,
  parent?: Root | Element,
  placeDiagramFirst = false,
) => {
  const {
    children: { 0: textNode },
    properties: { dataPlantumlsvg },
  } = node
  delete node.properties.dataPlantumlsvg
  if (textNode.type === "text") {
    const { value } = textNode
    const svgMarkup = await plantUMLToSVG(value, dataPlantumlsvg)
    const svgRoot = fromHtml(svgMarkup, { fragment: true, space: "svg" })
    const svg = svgRoot.children.filter(({ type }) => type !== "doctype") as ElementContent[]
    if (parent != null && index != null) {
      ;(parent as Element).tagName = "figure"
      const preElement = fromHtml("<pre />", {
        fragment: true,
        space: "html",
      }).children.filter(({ type }) => type !== "doctype")[0] as Element
      preElement.children.push(node)
      const newMarkup = placeDiagramFirst ? [...svg, preElement] : [preElement, ...svg]
      parent.children.splice(index, 1, ...newMarkup)
    } else {
      node.children = svg
    }
  }
}
