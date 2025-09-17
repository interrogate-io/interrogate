import type { Element, Root } from "hast"
import { fromHtml } from "hast-util-from-html"
import { select } from "hast-util-select"

type Options = {
  svg: string
  node: Element
  parent?: Root | Element
}
export const plantUMLImageToSVGFigure = ({ svg, node, parent }: Options) => {
  const svgRoot = fromHtml(svg, {
    fragment: true,
    space: "svg",
  })
  const svgElement = select("svg", svgRoot)
  if (svgElement != null) {
    const title = select("title", svgElement)
    if (title == null) {
      const {
        properties: { alt },
      } = node
      svgElement.children.unshift({
        properties: {},
        children: [
          {
            type: "text",
            value: alt?.toString() ?? "",
          },
        ],
        tagName: "title",
        type: "element",
      })
    }
    const index = parent?.children.indexOf(node)
    if (index != null) {
      parent?.children.splice(index, 1, {
        children: [svgElement],
        properties: {},
        tagName: "figure",
        type: "element",
      })
    }
    return parent
  }
}
