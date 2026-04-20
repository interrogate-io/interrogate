import { plus } from "./plus.js"

describe("plus", () => {
  it("should sum numbers", () => {
    expect(plus(1, 2, 3)).toEqual(6)
  })
  it("should throw an error if any argument is not a number", () => {
    expect(() => plus(1, "2" as unknown as number, 3)).toThrow(
      "Expected a number but received string",
    )
  })
})
