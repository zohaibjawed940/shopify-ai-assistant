class MCPClient {
    constructor(hostUrl) {
      this.tools = [];
      // TODO: Make this dynamic, for that first we need to allow access of mcp tools on password proteted demo stores.
      this.mcpEndpoint = `${hostUrl}/api/mcp`;

      const mcpUsername = "shopify_dev";
      const mcpPassword = "pcyWggWqxjvnkqub2CUqcWLqbAgsh8DRBaszawQKpxQzUj3CvsZa7reCgBucNZjswyAdg7oUMUW87MaPMmwb948zxCyRH3CWmeFE";
      const authString = `${mcpUsername}:${mcpPassword}`;
      const base64Auth = Buffer.from(authString).toString('base64');

      this.headers = {
        "Content-Type": "application/json",
        "Authorization": `Basic ${base64Auth}`
      };
    }

    async connectToServer() {
        try {
            console.log(`Connecting to MCP server at ${this.mcpEndpoint}`);

            // Make a direct request to get available tools
            const response = await fetch(`${this.mcpEndpoint}`, {
              method: "POST",
              headers: this.headers,
              credentials: 'include',
              body: JSON.stringify({
                jsonrpc: "2.0",
                method: "tools/list",
                id: 1,
                params: {}
              }),
            });

            if (!response.ok) {
              const error = await response.text();
              throw new Error(`Failed to list tools: ${response.status} ${error}`);
            }

            const result = await response.json();
            console.log("MCP response", result);

            // Extract tools from the JSON-RPC response format
            const toolsData = result.result && result.result.tools ? result.result.tools : [];
            this.tools = toolsData.map((tool) => {
              return {
                name: tool.name,
                description: tool.description,
                input_schema: tool.inputSchema || tool.input_schema,
              };
            });

            console.log(
              "Connected to MCP server with tools:",
              this.tools.map(({ name }) => name)
            );

            return this.tools;
        } catch (e) {
            console.error("Failed to connect to MCP server: ", e);
            throw e;
        }
    }

    async callTool(toolName, toolArgs) {
      try {
        const response = await fetch(`${this.mcpEndpoint}`, {
          method: "POST",
          headers: this.headers,
          credentials: 'include',
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
              name: toolName,
              arguments: toolArgs,
            }
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Tool call failed: ${response.status} ${error}`);
        }

        const result = await response.json();
        return result.result || result;
      } catch (error) {
        console.error(`Error calling tool ${toolName}:`, error);
        throw error;
      }
    }
  }

export default MCPClient;

