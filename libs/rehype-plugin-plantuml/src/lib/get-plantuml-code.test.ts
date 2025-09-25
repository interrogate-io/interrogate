import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { getPlantUMLCode } from "./get-plantuml-code"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
describe("getPlantUMLCode", () => {
  it("should return the PlantUML markup from the data attribute", async () => {
    const plantUMLCode = await getPlantUMLCode({
      cwd: __dirname,
      node: {
        children: [],
        properties: {
          dataPlantumlcode: "A -> B: Hello",
          src: "../../assets/hello-diagram.puml",
        },
        tagName: "img",
        type: "element",
      },
      path: __dirname,
    })
    expect(plantUMLCode).toBe("A -> B: Hello")
  })
  it("should get the PlantUML markup from the source", async () => {
    const plantUMLCode = await getPlantUMLCode({
      cwd: __dirname,
      node: {
        children: [],
        properties: {
          src: "../../assets/hello-diagram.puml",
        },
        tagName: "img",
        type: "element",
      },
      path: __dirname,
    })
    expect(plantUMLCode).toBe('@startuml "hello diagram"\nA -> B: Hello\n@enduml\n')
  })
  it("should return an empty diagram when no source or data attribute is present", async () => {
    const plantUMLCode = await getPlantUMLCode({
      cwd: __dirname,
      node: {
        children: [],
        properties: {},
        tagName: "img",
        type: "element",
      },
      path: __dirname,
    })
    expect(plantUMLCode).toBe("@startuml\n@enduml")
  })
})
