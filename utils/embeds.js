const { EmbedBuilder } = require('discord.js');

function embedNowPlaying(song) {
    return new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('🎵 Now Playing')
        .setDescription(`[${song.name}](${song.url})`)
        .addFields(
            { name: '⏱️ Durasi', value: song.formattedDuration, inline: true },
            { name: '👤 Diminta oleh', value: song.user.username, inline: true }
        )
        .setThumbnail(song.thumbnail);
}

function embedQueue(queue) {
    const songList = queue.songs.map((song, i) => `${i+1}. **${song.name}** - \`${song.formattedDuration}\``).join('\n');
    return new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('📜 Music Queue')
        .setDescription(songList.substring(0, 4096));
}

module.exports = { embedNowPlaying, embedQueue };
