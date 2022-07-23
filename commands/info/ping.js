const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: {
        name: 'ping',
        description: 'Get API ping',
    },
    /** @param {{ client: Client; interaction: ChatInputCommandInteraction; }} */
    execute: async ({ interaction, client }) => {
        interaction.reply({
            content: `${client.ws.ping}ms`,
            ephemeral: true
        });
    }
}