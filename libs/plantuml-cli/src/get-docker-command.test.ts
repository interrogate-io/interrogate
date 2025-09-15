import { describe } from "node:test"
import { expect, it } from "vitest"
import { getDockerCommand } from "./get-docker-command"

describe("getDockerCommand", () => {
  it("should return the correct Docker command path for linux", () => {
    const command = getDockerCommand("linux")
    expect(command).toBe("/usr/bin/docker")
  })

  it("should return the correct Docker command path for darwin", () => {
    const command = getDockerCommand("darwin")
    expect(command).toBe("/usr/local/bin/docker")
  })

  it("should return the correct Docker command path for win32", () => {
    const command = getDockerCommand("win32")
    expect(command).toBe("C:/Program Files/Docker/Docker/resources/bin/docker.exe")
  })

  it("should throw an error for unsupported platforms", () => {
    expect(() => getDockerCommand("sunos")).toThrowError(/Unsupported platform/)
  })
})
