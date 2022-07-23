const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ],
    allowedMentions: {
        repliedUser: false,
        parse: ['users']
    }
});

client.commands = new Collection();
client.config = require("./config.json");

require("./handler/handleCommands")(client)

client.login(client.config.token);