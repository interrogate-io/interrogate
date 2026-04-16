import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
// import { z } from "zod"
import packageJSON from "../../package.json" with { type: "json" }

const { name, version } = packageJSON
// const monkey = z.object({
//   id: z.uuid(),
//   color: z.enum(["red", "blue", "green", "yellow"]),
// })
// const barrel = z.object({
//   color: z.enum(["red", "blue", "green", "yellow"]),
//   id: z.uuid(),
//   monkeys: z.array(monkey),
// })
export const server = new McpServer({ name, version })
server.registerTool("get_a_barrel", {}, () => ({
  content: [{ text: "Here is a barrel for you! 🛢️", type: "text" }],
}))
server.registerTool("get_a_monkey", {}, () => ({
  content: [{ text: "Here is a monkey for you! 🐒", type: "text" }],
}))
