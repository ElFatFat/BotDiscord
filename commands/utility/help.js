const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows all available commands'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('📚 Bot Commands')
			.setDescription('Here are all the available commands:')
			.addFields(
				{ name: '/ping', value: 'Replies with Pong! (Check bot latency)', inline: false },
				{ name: '/user', value: 'Shows information about you', inline: false },
				{ name: '/server', value: 'Shows information about this server', inline: false },
				{ name: '/setvar', value: 'Set a variable value in Home Assistant', inline: false },
				{ name: '/help', value: 'Shows this help message', inline: false }
			)
			.setTimestamp()
			.setFooter({ text: 'Use slash commands to interact with the bot' });

		await interaction.reply({ embeds: [embed] });
	},
};
