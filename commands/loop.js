const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Atur mode loop')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Pilih mode loop')
                .setRequired(true)
                .addChoices(
                    { name: 'Off', value: 'off' },
                    { name: 'Track (ulang satu lagu)', value: 'track' },
                    { name: 'Queue (ulang antrean)', value: 'queue' }
                )),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply('❌ Tidak ada lagu yang diputar!');
        const mode = interaction.options.getString('mode');
        let repeatMode = 0;
        if (mode === 'track') repeatMode = 1;
        if (mode === 'queue') repeatMode = 2;
        await client.distube.setRepeatMode(interaction.guild, repeatMode);
        interaction.reply(`🔄 Mode loop: **${mode}**.`);
    }
};
