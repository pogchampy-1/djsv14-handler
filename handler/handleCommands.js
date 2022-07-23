const { Client } = require("discord.js");
const { connect } = require("mongoose");
const { readdirSync } = require("node:fs");

/** @param {Client} client */
module.exports = async (client) => {
    // Events 
    const eventFiles = readdirSync("./events/").filter((file) => file.endsWith(".js"));
    for (let file of eventFiles) {
        const event = require(`../events/${file}`);

        if (!event?.data?.name) return;

        if (event.data.once) {
            client.once(event.data.name, (...args) => event.execute(client, ...args))
        } else {
            client.on(event.data.name, (...args) => event.execute(client, ...args));
        }
    }

    // Slash Commands
    const slashCommands = [];
    readdirSync(`./commands/`).forEach((dir) => {
        const commandFiles = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));

        for (let file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);

            if (!command?.data?.name) return;

            client.commands.set(command?.data?.name, command);
            slashCommands.push(command?.data);
        }
    });

    client.once("ready", async (cli) => {
        await cli.guilds.cache.get("your guildId").commands.set(slashCommands);
    });

    connect(client.config.connectionString, {}, () => console.log("[MONGODB] Connection established!"))
}