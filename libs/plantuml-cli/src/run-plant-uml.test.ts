import { exec as e } from "child_process"
import { readFile } from "fs/promises"
import { dirname, normalize } from "path"
import pixelmatch from "pixelmatch"
import { PNG } from "pngjs"
import { fileURLToPath } from "url"
import { promisify } from "util"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { runPlantUML } from "./run-plant-uml"

const exec = promisify(e)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe("plantuml-cli Docker image", () => {
  const assetsDirectory = normalize(`${__dirname}/../assets`)
  let imageId: string | null = null
  beforeAll(async () => {
    const { stderr, stdout } = await exec("docker build -q -t interrogate/plantuml-cli:test .", {
      cwd: normalize(`${__dirname}/../`),
    })
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
    const diagram = await readFile(`${assetsDirectory}/hello.puml`)
    const helloImage = PNG.sync.read(await runPlantUML({ assetsDirectory, diagram, imageId }))
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
