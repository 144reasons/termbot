const Discord = require("discord.js");
const { botColour } = require("../../config.json");

module.exports = {
  name: "ping",
  description: "Ping",
  category: "Info",
  execute(message, client) {
    const embed = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle("Bot Ping")
      .setDescription(`Pong! The bots websocket ping is ${client.ws.ping}ms!`)
      .setTimestamp()
      .setFooter(
        `${client.user.username} || ${message.guild.name}`,
        client.user.displayAvatarURL()
      );

    message.channel.send(embed);
  },
};
