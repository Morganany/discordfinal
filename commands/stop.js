const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Hentikan pemutaran dan bersihkan antrean'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Tidak ada lagu yang diputar!');
        await client.distube.stop(interaction.guild);
        await client.distube.voices.leave(interaction.guild);
        interaction.reply('🛑 Musik berhenti dan antrean dibersihkan.');
    }
};
