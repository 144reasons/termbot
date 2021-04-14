const Discord = require('discord.js')

module.exports = {
    name: "purge",
    description: "Purge messages",
    category: "moderation",
    execute(message, client, args) {
        if (!message.member.roles.cache.has('830773872244293632')) return message.channel.send('This command isnt for you!')

        if(isNaN(args[0])) return message.channel.send('Please give a valid number!')

        var deleteAmount = 0;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        
    },
  };
  