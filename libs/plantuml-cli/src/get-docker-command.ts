export const getDockerCommand = (platform: NodeJS.Platform) => {
  switch (platform) {
    case "linux":
      return "/usr/bin/docker"
    case "darwin":
      return "/usr/local/bin/docker"
    case "win32":
      return "C:/Program Files/Docker/Docker/resources/bin/docker.exe"
    default:
      throw new Error(`Unsupported platform: ${process.platform}`)
  }
}
