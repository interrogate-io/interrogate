import { isCommandAvailable } from "./is-command-available.js"

export const getCommand = async (useDocker = true): Promise<"docker" | "java" | null> => {
  let command: "docker" | "java" = useDocker ? "docker" : "java"
  let isAvailable = await isCommandAvailable(command)
  if (isAvailable) {
    return command
  }
  command = useDocker ? "java" : "docker"
  isAvailable = await isCommandAvailable(command)
  if (isAvailable) {
    return command
  }
  return null
}
