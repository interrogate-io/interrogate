import type { Element } from "hast"
import { normalize } from "node:path"
import { read } from "to-vfile"
import { getDirectory } from "./get-directory.js"

type Options = {
  cwd: string
  node: Element
  path: string
}
export const getPlantUMLCode = async ({ cwd, node, path }: Options) => {
  const {
    properties: { dataPlantumlcode, src },
  } = node
  if (typeof dataPlantumlcode === "string") {
    return dataPlantumlcode
  }
  if (typeof src === "string") {
    const referenceDirectory = getDirectory(path || cwd)
    const { value: rawValue } = await read(normalize(`${referenceDirectory}/${src}`))
    return typeof rawValue === "string" ? rawValue : rawValue.toString()
  }
  return "@startuml\n@enduml"
}
