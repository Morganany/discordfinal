const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Lanjutkan pemutaran lagu'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Tidak ada lagu yang diputar!');
        if (!queue.paused) return interaction.reply('▶️ Musik sedang berjalan!');
        await client.distube.resume(interaction.guild);
        interaction.reply('▶️ Musik dilanjutkan.');
    }
};
