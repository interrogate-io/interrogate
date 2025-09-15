import { exec as e, spawn } from "child_process"
import { readFile } from "fs/promises"
import { userInfo } from "os"
import { dirname, normalize } from "path"
import pixelmatch from "pixelmatch"
import { PNG } from "pngjs"
import { fileURLToPath } from "url"
import { promisify } from "util"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

const exec = promisify(e)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const { PATH = "" } = process.env
const runPlantUML = async ({
  assetsDirectory,
  imageId,
}: {
  assetsDirectory: string
  imageId: string
}) => {
  const diagram = await readFile(`${assetsDirectory}/hello.puml`)
  return new Promise<Buffer>((resolve, reject) => {
    let png: Buffer | null = null
    const { gid, uid } = userInfo()
    const childProcess = spawn(
      "docker",
      [
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
      ],
      {
        env: { PATH },
      },
    )
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
}
describe("plantuml-cli Docker image", () => {
  const assetsDirectory = normalize(`${__dirname}/assets`)
  let imageId: string | null = null
  beforeAll(async () => {
    const { stderr, stdout } = await exec("docker build -q -t interrogate/plantuml-cli:test .")
    if (stderr) {
      throw new Error(stderr)
    }
    imageId = stdout.trim()
  })
  afterAll(async () => {
    if (imageId != null) {
      await exec(`docker rmi -f ${imageId}`)
    }
  })
  it("should render the correct png from the .puml file", async () => {
    if (imageId == null) {
      throw new Error("Could not create Docker image")
    }
    const helloImage = PNG.sync.read(await runPlantUML({ assetsDirectory, imageId }))
    const referenceImage = PNG.sync.read(await readFile(`${assetsDirectory}/reference-hello.png`))
    const pixelDelta = pixelmatch(
      helloImage.data,
      referenceImage.data,
      undefined,
      helloImage.width,
      helloImage.height,
      { threshold: 0.1 },
    )
    expect(pixelDelta).toBe(0)
  })
})
