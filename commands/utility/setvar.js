const { SlashCommandBuilder } = require('discord.js');

// Map variable names to Home Assistant entity IDs
const ENTITY_MAP = {
	temperature_objectif: 'input_number.temperature_objectif',
	valeur_x: 'input_number.valeur_x',
	valeur_xjaj: 'input_number.valeur_xjaj'
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setvar')
		.setDescription('Set a variable value in Home Assistant')
		.addStringOption(option =>
			option.setName('variable')
				.setDescription('The variable to set')
				.setRequired(true)
				.addChoices(
					{ name: 'Température', value: 'temperature_objectif' },
					{ name: 'Valeur X', value: 'valeur_x' },
					{ name: 'Valeur XJAJ', value: 'valeur_xjaj' }
				))
		.addNumberOption(option =>
			option.setName('value')
				.setDescription('The value to set')
				.setRequired(true)),
	async execute(interaction) {
		const variable = interaction.options.getString('variable');
		const value = interaction.options.getNumber('value');
		const entityId = ENTITY_MAP[variable];

		await interaction.deferReply();

		try {
			// Call Home Assistant API to set the input_number value
			const response = await fetch(`${process.env.HA_URL}/api/services/input_number/set_value`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${process.env.HA_TOKEN}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					entity_id: entityId,
					value: value
				})
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Home Assistant API error: ${response.status} - ${errorText}`);
			}

			await interaction.editReply(
				`✅ Successfully set **${variable}** to **${value}** in Home Assistant!`
			);
		} catch (error) {
			console.error('Error setting Home Assistant value:', error);
			await interaction.editReply(
				`❌ Failed to set variable: ${error.message}`
			);
		}
	},
};
