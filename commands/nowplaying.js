const { SlashCommandBuilder } = require('discord.js');
const { embedNowPlaying } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Lihat lagu yang sedang diputar'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Tidak ada lagu yang diputar!');
        const song = queue.songs[0];
        const embed = embedNowPlaying(song);
        interaction.reply({ embeds: [embed] });
    }
};
