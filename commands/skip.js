const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Lompat ke lagu berikutnya'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Tidak ada lagu yang diputar!');
        await client.distube.skip(interaction.guild);
        interaction.reply('⏭️ Lagu **diskip**!');
    }
};
