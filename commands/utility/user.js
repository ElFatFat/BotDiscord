const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Shows information about you'),
	async execute(interaction) {
		const joinDate = interaction.member.joinedAt.toLocaleDateString();
		const accountCreated = interaction.user.createdAt.toLocaleDateString();
		await interaction.reply(
			`👤 **User Info**\n` +
			`Username: ${interaction.user.username}\n` +
			`Joined server: ${joinDate}\n` +
			`Account created: ${accountCreated}`
		);
	},
};