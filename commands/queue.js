const { SlashCommandBuilder } = require('discord.js');
const { embedQueue } = require('../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Lihat daftar antrean lagu'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Antrean kosong!');
        const embed = embedQueue(queue);
        interaction.reply({ embeds: [embed] });
    }
};
