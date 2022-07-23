const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: {
        name: "interactionCreate",
        once: false,
    },
    /** @param {Client} client @param {ChatInputCommandInteraction} interaction */
    execute: async (client, interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            command.execute(
                {
                    client,
                    interaction
                }
            );
        }
    }
}