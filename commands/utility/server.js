const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Shows information about this server'),
	async execute(interaction) {
		const { guild } = interaction;
		await interaction.reply(
			`🏠 **Server Info**\n` +
			`Name: ${guild.name}\n` +
			`Members: ${guild.memberCount}\n` +
			`Created: ${guild.createdAt.toLocaleDateString()}`
		);
	},
};
