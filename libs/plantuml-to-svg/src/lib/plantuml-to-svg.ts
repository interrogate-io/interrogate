import { spawn } from "node:child_process"
import { dirname, normalize } from "node:path"
import { fileURLToPath } from "node:url"
import { optimize, type PluginConfig } from "svgo"
import { getCommand } from "./get-command.js"

const getFilename = () => {
  try {
    if (__filename) {
      return __filename
    }
  } catch (e: unknown) {
    console.error(e)
  }
  return fileURLToPath(import.meta.url)
}
const __dirname = dirname(getFilename())
const DOCKER_ARGS = [
  "run",
  "--rm",
  "-i",
  "interrogate/plantuml-cli:1.2025.7",
  "-pipeNoStdErr",
  "-noerror",
  "-pipe",
  "-stdrpt",
  "-tsvg",
]
const JAVA_ARGS = [
  "-Djava.awt.headless=true",
  "-jar",
  "plantuml-mit-1.2025.7.jar",
  "-pipeNoStdErr",
  "-noerror",
  "-pipe",
  "-stdrpt",
  "-tsvg",
]
type Options = {
  excludeSVGDimensionStyle: boolean
  useDocker: boolean
}
export const plantUMLToSVG = async (plantUMLMarkup: string, options = {} as Partial<Options>) => {
  const { excludeSVGDimensionStyle = false, useDocker = true } = options
  const command = await getCommand(useDocker)
  const args = command === "docker" ? DOCKER_ARGS : JAVA_ARGS
  // svgo optimizer plugins
  const plugins = [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeDesc: false,
        },
      },
    },
  ] as PluginConfig[]
  if (excludeSVGDimensionStyle) {
    args.push("-SsvgDimensionStyle=false")
    plugins.push("removeDimensions")
  }
  return new Promise<string>((resolve, reject) => {
    try {
      let svg: string | undefined = undefined
      if (command == null) {
        throw new Error("Could not invoke docker or java")
      }
      const childProcess = spawn(command, args, {
        cwd: normalize(`${__dirname}/../../bin`),
      })
      childProcess.stdout.on("data", (data: Buffer) => {
        try {
          const rawResponse = data.toString("utf-8")
          if (!rawResponse.trim().toLowerCase().startsWith("<svg")) {
            throw new Error(rawResponse)
          }
          svg = optimize(rawResponse, {
            plugins,
          }).data
        } catch (e) {
          reject(e as Error)
          childProcess.emit("error", e)
        }
      })
      childProcess.on("error", e => {
        reject(e)
        childProcess.kill()
      })
      childProcess.on("exit", () => {
        if (svg != null) {
          resolve(svg)
        } else {
          reject(new Error("No svg was generated"))
        }
      })
      process.on("exit", () => {
        childProcess.kill()
      })
      process.on("SIGINT", () => {
        childProcess.kill()
      })
      process.on("SIGTERM", () => {
        childProcess.kill()
      })
      childProcess.stdin.write(plantUMLMarkup)
      childProcess.stdin.end()
    } catch (e) {
      reject(e as Error)
    }
  })
}
