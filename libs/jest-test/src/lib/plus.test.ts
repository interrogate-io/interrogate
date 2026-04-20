import { plus } from "./plus.js"

describe("plus", () => {
  it("should sum numbers", () => {
    expect(plus(1, 2, 3)).toEqual(6)
  })
})
