const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Atur volume (0-100)')
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Volume 0-100')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(100)),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Tidak ada lagu yang diputar!');
        const volume = interaction.options.getInteger('level');
        await client.distube.setVolume(interaction.guild, volume);
        interaction.reply(`🔊 Volume diubah menjadi **${volume}%**.`);
    }
};
