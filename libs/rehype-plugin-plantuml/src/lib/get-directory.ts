import { dirname, extname } from "path"

export const getDirectory = (path: string) => {
  const ext = extname(path)
  if (ext != "") {
    return dirname(path)
  }
  return path
}
