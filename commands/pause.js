const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Jeda pemutaran lagu'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Tidak ada lagu yang diputar!');
        if (queue.paused) return interaction.reply('⏸️ Musik sudah dijeda!');
        await client.distube.pause(interaction.guild);
        interaction.reply('⏸️ Musik dijeda.');
    }
};
