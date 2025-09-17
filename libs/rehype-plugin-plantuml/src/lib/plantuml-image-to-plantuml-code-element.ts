import type { Element, ElementContent, Root } from "hast"
import { fromHtml } from "hast-util-from-html"

type Options = {
  svg: string
  node: Element
  parent?: Root | Element
  value: string
}
export const plantUMLImageToPlantUMLCodeElement = ({ svg, node, parent, value }: Options) => {
  const codeRoot = fromHtml(
    `<pre><code class="language-plantuml" data-plantumlsvg='${svg}'>${value}</code></pre>`,
    {
      fragment: true,
      space: "html",
    },
  )
  const code = (codeRoot.children.filter(({ type }) => type !== "doctype") as ElementContent[])[0]
  const index = parent?.children.indexOf(node)
  if (index != null) {
    parent?.children.splice(index, 1, code)
  }
  return parent
}
