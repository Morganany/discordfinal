module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`✅ Bot online sebagai ${client.user.tag}`);
        client.user.setActivity('/play | Music Bot', { type: 'LISTENING' });

        const commands = [];
        const commandNames = ['play', 'skip', 'stop', 'queue', 'pause', 'resume', 'volume', 'loop', 'nowplaying'];
        for (const name of commandNames) {
            const cmd = require(`../commands/${name}`);
            commands.push(cmd.data);
        }
        client.application.commands.set(commands).then(() => {
            console.log('⚡ Slash commands registered!');
        }).catch(console.error);
    }
};
