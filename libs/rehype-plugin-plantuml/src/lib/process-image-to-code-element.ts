import type { Element, ElementContent, Root } from "hast"
import { fromHtml } from "hast-util-from-html"
import { dirname, extname, normalize } from "path"
import { read } from "to-vfile"

const getDirectory = (path: string) => {
  const ext = extname(path)
  if (ext != "") {
    return dirname(path)
  }
  return path
}
export const processImageToCodeElement = async (props: {
  cwd: string
  node: Element
  parent?: Root | Element
  path: string
}) => {
  const { cwd, node, parent, path } = props
  const {
    properties: { dataPlantumlcode, dataPlantumlsvg, src },
  } = node
  delete node.properties.dataPlantumlsvg
  const referenceDirectory = getDirectory(path || cwd)
  if (typeof dataPlantumlcode === "string" || (typeof src === "string" && src.endsWith(".puml"))) {
    let value = ""
    if (typeof dataPlantumlcode === "string") {
      value = dataPlantumlcode
    } else if (typeof src === "string") {
      const { value: rawValue } = await read(normalize(`${referenceDirectory}/${src}`))
      value = typeof rawValue === "string" ? rawValue : rawValue.toString()
    }
    const plantumlSVGDataAttribute =
      typeof dataPlantumlsvg === "string" ? `data-plantumlsvg='${dataPlantumlsvg}'` : ""
    const codeRoot = fromHtml(
      `<pre><code class="language-plantuml" ${plantumlSVGDataAttribute}>${value}</code></pre>`,
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
  }
}
