import { plantUMLToSVG } from "@interrogate/plantuml-to-svg"
import { describe, expect, it, vi, type Mock } from "vitest"
import { getPlantUMLSVG } from "./get-plantuml-svg.js"

vi.mock("@interrogate/plantuml-to-svg", () => ({
  plantUMLToSVG: vi.fn(),
}))
describe("getPlantUMLSVG", () => {
  it("should return an empty svg when plantumlToSVG throws an error", async () => {
    ;(plantUMLToSVG as Mock).mockRejectedValue("An error occurred")
    const svg = await getPlantUMLSVG({
      node: { children: [], properties: {}, tagName: "img", type: "element" },
      value: "@startuml\n@enduml",
    })
    expect(svg).toBe("<svg></svg>")
  })
})
