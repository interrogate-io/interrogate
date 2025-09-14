import { exec as e, spawn } from "child_process"
import { readFile } from "fs/promises"
import { dirname, normalize } from "path"
import pixelmatch from "pixelmatch"
import { PNG } from "pngjs"
import { fileURLToPath } from "url"
import { promisify } from "util"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

const exec = promisify(e)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const runPlantUML = async ({
  assetsDirectory,
  imageId,
}: {
  assetsDirectory: string
  imageId: string
}) =>
  new Promise<void>((resolve, reject) => {
    const childProcess = spawn(
      "docker",
      ["run", "--rm", "-v", `${assetsDirectory}:/data`, "-i", imageId, "."],
      {
        stdio: "inherit",
      },
    )
    childProcess.on("exit", code => {
      if (code === 0) {
        return resolve()
      }
      return reject(new Error(`Process exited with code ${code}`))
    })
  })
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
    await runPlantUML({ assetsDirectory, imageId })
    const helloImage = PNG.sync.read(await readFile(`${assetsDirectory}/hello.png`))
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
