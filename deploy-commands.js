const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

// Load all command files from commands/utility
const commandsPath = path.join(__dirname, 'commands/utility');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(path.join(commandsPath, file));
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
		console.log(`Loaded command: ${command.data.name}`);
	}
}

// Deploy commands to a specific guild (instant updates)
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`🚀 Deploying ${commands.length} command(s) to guild...`);

		// Register commands for a specific guild (instant updates)
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands }
		);

		console.log(`✅ Successfully deployed ${data.length} command(s) to guild!`);
	} catch (error) {
		console.error('❌ Error deploying commands:', error);
	}
})();