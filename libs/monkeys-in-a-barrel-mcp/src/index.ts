import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { server } from "./lib/server.js"

let transport: StdioServerTransport | undefined
const main = async () => {
  if (transport == null) {
    transport = new StdioServerTransport()
    await server.connect(transport)
  }
}
try {
  await main()
} catch (error) {
  console.error("Error starting the server:", error)
  process.exit(1)
}
