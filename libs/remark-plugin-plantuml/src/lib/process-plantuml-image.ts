import { plantUMLToSVG } from "@interrogate/plantuml-to-svg"
import type { Definition, Image, ImageReference, Node } from "mdast"
import { dirname, extname, normalize } from "path"
import { read } from "to-vfile"
const isDefinition = (node: Node): node is Definition => {
  return node.type === "definition"
}
const isImageReference = (node: Node): node is ImageReference => {
  return node.type === "imageReference"
}
const getDirectory = (path: string) => {
  const ext = extname(path)
  if (ext != "") {
    return dirname(path)
  }
  return path
}
const definitions = new Map<string, Definition>()
export const processPlantUMLImage = async (props: {
  cwd: string
  node: Definition | Image | ImageReference
  path: string
}) => {
  const { cwd, node, path } = props
  if (isImageReference(node)) {
    const { data, label } = node
    const definitionData = definitions.get(label ?? "")?.data
    if (definitionData != null) {
      node.data = {
        ...data,
        ...definitionData,
      }
    }
    return node
  }
  const { url } = node
  const referenceDirectory = getDirectory(path || cwd)
  if (typeof url === "string" && url.endsWith(".puml")) {
    const { value: rawValue } = await read(normalize(`${referenceDirectory}/${url}`))
    const dataPlantumlcode = typeof rawValue === "string" ? rawValue : rawValue.toString()
    const dataPlantumlsvg = await plantUMLToSVG(dataPlantumlcode)
    node.url = `data:image/svg+xml;base64,${Buffer.from(dataPlantumlsvg).toString("base64")}`
    node.data = { hProperties: { dataPlantumlcode, dataPlantumlsvg } }
    if (isDefinition(node)) {
      definitions.set(node.identifier, node)
    }
  }
  return node
}
