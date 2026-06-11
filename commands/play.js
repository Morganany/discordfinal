const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Putar lagu dari YouTube')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Nama lagu atau URL YouTube')
                .setRequired(true)),
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.reply({ content: '❌ Kamu harus berada di voice channel!', ephemeral: true });

        const query = interaction.options.getString('query');
        await interaction.reply(`🔍 Mencari: **${query}**...`);

        try {
            await client.distube.play(voiceChannel, query, {
                textChannel: interaction.channel,
                member: interaction.member
            });
        } catch (error) {
            interaction.editReply(`❌ Error: ${error.message}`);
        }
    }
};
