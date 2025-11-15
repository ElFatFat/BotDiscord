# Discord Bot

A simple Discord bot with basic slash commands.

## Commands

- `/ping` - Check bot latency
- `/user` - Get information about yourself
- `/server` - Get information about the server
- `/help` - Show all available commands

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Fill in your Discord bot credentials in `.env`:
   - `DISCORD_TOKEN` - Your bot token from [Discord Developer Portal](https://discord.com/developers/applications)
   - `CLIENT_ID` - Your application's client ID

4. Deploy commands globally (takes ~1 hour to propagate):
   ```bash
   node deploy-commands.js
   ```

5. Start the bot:
   ```bash
   node index.ts
   ```

## Project Structure

```
├── commands/
│   └── utility/         # Bot commands
│       ├── ping.js
│       ├── user.js
│       ├── server.js
│       └── help.js
├── deploy-commands.js   # Deploy slash commands globally
├── index.ts             # Bot entry point
└── .env                 # Environment variables (create from .env.example)
```

## Troubleshooting

- **Bot offline**: Check your token and ensure the bot is invited to your server
- **Commands not showing**: Global commands take up to 1 hour to appear. For instant testing during development, you can modify `deploy-commands.js` to use guild-specific commands instead
- **Missing permissions**: Ensure the bot has proper permissions when inviting it to your server