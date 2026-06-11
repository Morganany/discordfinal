const { EmbedBuilder } = require('discord.js');
const { embedNowPlaying } = require('../utils/embeds');

module.exports = {
    name: 'ready',
    execute(client) {
        const distube = client.distube;

        distube.on('playSong', (queue, song) => {
            const embed = embedNowPlaying(song);
            queue.textChannel.send({ embeds: [embed] });
        });

        distube.on('addSong', (queue, song) => {
            queue.textChannel.send(`✅ **${song.name}** ditambahkan ke antrean. Posisi: ${queue.songs.length}`);
        });

        distube.on('addList', (queue, playlist) => {
            queue.textChannel.send(`📃 **${playlist.name}** (${playlist.songs.length} lagu) ditambahkan.`);
        });

        distube.on('error', (channel, error) => {
            console.error(error);
            channel.send('❌ Terjadi kesalahan saat memutar lagu.');
        });

        distube.on('empty', channel => {
            channel.send('🔇 Voice channel kosong, bot akan keluar...');
        });
    }
};
