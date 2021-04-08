const Discord = require('discord.js')

module.exports = {
    name: "test",
    description: "this command is hidden",
    hidden: true,
    execute(message, client) {
        message.channel.send('This command is hidden on the help command yet it still works :o')
    },
};
