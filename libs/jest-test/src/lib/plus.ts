export const plus = (...args: number[]) =>
  args.reduce((accumulator, current) => {
    if (typeof current !== "number") {
      throw new TypeError(`Expected a number but received ${typeof current}`)
    }
    return accumulator + current
  }, 0)
