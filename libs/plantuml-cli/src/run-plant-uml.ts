import { spawn } from "child_process"
import { userInfo } from "os"

const getDockerCommand = () => {
  switch (process.platform) {
    case "linux":
      return "/usr/bin/docker"
    case "darwin":
      return "/usr/local/bin/docker"
    case "win32":
      return "C:/Program Files/Docker/Docker/resources/bin/docker.exe"
    default:
      throw new Error(`Unsupported platform: ${process.platform}`)
  }
}
export const runPlantUML = async ({
  assetsDirectory,
  diagram,
  imageId,
}: {
  assetsDirectory: string
  diagram: string | Buffer
  imageId: string
}) =>
  new Promise<Buffer>((resolve, reject) => {
    let png: Buffer | null = null
    const dockerCommand = getDockerCommand()
    const { gid, uid } = userInfo()
    const childProcess = spawn(dockerCommand, [
      "run",
      "--rm",
      "-v",
      `${assetsDirectory}:/data`,
      "--user",
      `${uid}:${gid}`,
      "-i",
      imageId,
      "-pipeNoStdErr",
      "-noerror",
      "-pipe",
      "-stdrpt",
    ])
    childProcess.stdout.on("data", (data: Buffer) => {
      png = png != null ? Buffer.concat([png, data]) : data
    })
    childProcess.on("error", e => {
      reject(e)
      childProcess.kill()
    })
    childProcess.on("exit", () => {
      if (png != null) {
        resolve(png)
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
    childProcess.stdin.write(diagram)
    childProcess.stdin.end()
  })
