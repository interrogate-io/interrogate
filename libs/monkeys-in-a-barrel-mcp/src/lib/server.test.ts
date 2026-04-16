import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { server } from "./server.js"

describe("monkeys-in-a-barrel-mcp server", () => {
  let client: Client
  beforeEach(async () => {
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
    await server.connect(serverTransport)
    client = new Client({
      name: "monkeys-in-a-barrel-mcp test client",
      version: "0.0.0",
    })
    await client.connect(clientTransport)
  })
  afterEach(async () => {
    await server.close()
    await client.close()
  })
  it("should get a barrel", async () => {
    const {
      content: [{ type, text }],
    } = (await client.callTool({ name: "get_a_barrel" })) as {
      content: { type: string; text: string }[]
    }
    expect(type).toBe("text")
    expect(text).toBe("Here is a barrel for you! 🛢️")
  })
  it("should get a monkey", async () => {
    const {
      content: [{ type, text }],
    } = (await client.callTool({ name: "get_a_monkey" })) as {
      content: { type: string; text: string }[]
    }
    expect(type).toBe("text")
    expect(text).toBe("Here is a monkey for you! 🐒")
  })
})
