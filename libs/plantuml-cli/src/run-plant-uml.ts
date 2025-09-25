import { spawn } from "node:child_process"
import { userInfo } from "node:os"
import { getDockerCommand } from "./get-docker-command"

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
    const dockerCommand = getDockerCommand(process.platform)
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
      png = png == null ? data : Buffer.concat([png, data])
    })
    childProcess.on("error", e => {
      reject(e)
      childProcess.kill()
    })
    childProcess.on("exit", () => {
      if (png == null) {
        reject(new Error("No svg was generated"))
      } else {
        resolve(png)
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
