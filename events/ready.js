const { Client } = require("discord.js")

module.exports = {
    data: {
        name: "ready",
        once: true
    },
    /** @param {Client} client */
    execute: async (client) => {
        if (client.isReady()) {
            console.log(`${client.user?.tag} is online and ready!`)
        }
    }
}