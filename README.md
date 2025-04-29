# Shop Chat Agent

A Shopify app that provides an AI-powered chat interface for online stores, enabling customers to ask questions about products, shipping, returns, and more.

## Features

- 🤖 **AI-Powered Chat**: Embedded chat bubble for real-time customer assistance
- 🧰 **Tool Usage**: Support for MCP tools to enhance AI capabilities
- 🔄 **Conversation Memory**: Maintains context throughout customer interactions
- 📱 **Custom Chat UI**: Shopify theme extension for seamless store integration
- 📊 **Streaming Responses**: Real-time message streaming for natural conversation flow

## Architecture

This app consists of two main components:

1. **Backend API**: A Remix app server that handles communication with Claude and processes chat messages
2. **Chat Bubble UI**: A Shopify theme extension that provides the customer-facing chat interface

### API Endpoints

- `/chat`: Main endpoint for streaming chat messages, supports both GET and POST requests

## Prerequisites

1. **Node.js**: v18.20 or higher
2. **Shopify Partner Account**: Required for app development and deployment
3. **Claude API Key**: Required for AI functionality
4. **Shopify Development Store**: For testing and development

## Getting Started

### Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/Shopify/shop-chat-agent.git
   cd shop-chat-agent
   ```

2. Install dependencies:
   ```shell
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file with the following:
     ```
     CLAUDE_API_KEY=your_claude_api_key
     ```

### Deploy Your App

```shell
shopify app deploy
```

### Development

Start the development server:

```shell
shopify app dev
```

This will:
- Start Remix in development mode
- Tunnel the local server to make it accessible by Shopify
- Provide a URL to install the app on your development store

### Install The App

Head to the url provided in your shell to install the app on your demo store

### Enable Chat Extension

Enable the chat extension from theme editor (Online store > Themes > Customize > App embeds)

## Chat Interface

The chat bubble extension is located in `extensions/chat-bubble/`. It connects to the `/chat` endpoint of the app server to stream messages.

## MCP Tools Integration

The app integrates with Model Control Plane (MCP) tools, which allows the AI to access additional functionality. These tools are initialized in the `app/mcp-client.js` file.


## Deployment

Follow standard Shopify app deployment procedures as outlined in the [Shopify documentation](https://shopify.dev/docs/apps/deployment/web).

## Tech Stack

- **Framework**: [Remix](https://remix.run/)
- **AI**: [Claude by Anthropic](https://www.anthropic.com/claude)
- **Shopify Integration**: [@shopify/shopify-app-remix](https://www.npmjs.com/package/@shopify/shopify-app-remix)
- **Database**: SQLite (via Prisma) for session storage

## Contributing

Please follow the standard Shopify contribution guidelines when making changes to this project.
