const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Load commands from the commands directory
const commandsPath = path.join(__dirname, 'commands/utility');
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(path.join(commandsPath, file));
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		console.log(`Loaded command: ${command.data.name}`);
	}
}

// Handle slash command interactions
client.on(Events.InteractionCreate, async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error('Error executing command:', error);
		const reply = { content: 'There was an error executing this command!', ephemeral: true };
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(reply);
		} else {
			await interaction.reply(reply);
		}
	}
});

client.once(Events.ClientReady, () => {
	console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);