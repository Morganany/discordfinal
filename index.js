require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/ytdl-core');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

// Setup DisTube
client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    savePreviousSongs: false,
    // plugins: [new YtDlpPlugin()],  // Hapus dulu jika error
    customFilters: {
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
    }
});

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
    else client.on(event.name, (...args) => event.execute(...args, client));
}

// Slash command interaction
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Terjadi kesalahan.', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
