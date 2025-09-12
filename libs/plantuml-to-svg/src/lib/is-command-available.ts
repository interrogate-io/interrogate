import { exec as e } from "child_process"
import { promisify } from "util"

const exec = promisify(e)
const Commands = {
  windows: {
    DOCKER: "where.exe docker",
    JAVA: "where.exe java",
  },
  otherOS: {
    DOCKER: "command -v docker",
    JAVA: "command -v java",
  },
}
export const isCommandAvailable = async (command: "java" | "docker") => {
  const commands = process.platform === "win32" ? Commands.windows : Commands.otherOS
  switch (command) {
    case "docker": {
      const dockerCommand = await exec(commands.DOCKER)
      if (dockerCommand.stdout.trim()) {
        try {
          await exec("docker info")
          return true
        } catch (e: unknown) {
          process.stderr.write((e as Error).message)
          return false
        }
      }
      return false
    }
    case "java": {
      const javaCommand = await exec(commands.JAVA)
      if (javaCommand.stdout.trim()) {
        return true
      }
      return false
    }
  }
}
