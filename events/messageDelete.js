const Discord = require("discord.js");
const { botColour } = require("../config.json");

module.exports = {
    name: "messageDelete",
    once: true,
    async execute(message, client) {
        const termbot = await client.guilds.fetch('830557804501794855')

        const embed = new Discord.MessageEmbed()
            .setColor(botColour)
            .setTitle("Message Deleted")
            .setDescription(`Message author: ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})\nMessage content: \`${message.content}\``)
            .setTimestamp()
            .setFooter(`${client.user.username} || ${termbot.name}`, client.user.displayAvatarURL());

        client.channels.fetch('839524830134796310')
        .then(channel => channel.send(embed))
    },
  };
  