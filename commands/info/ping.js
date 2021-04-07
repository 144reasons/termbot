const Discord = require('discord.js')
const { botColour } = require('../../config.json')

module.exports = {
  name: "ping",
  description: "Ping",
  execute(message, client) {

    const embed = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle('Ping')
      .setDescription(`Pong! The bots websocket ping is ${client.ws.ping}ms!`);
      

    message.channel.send(embed)
  },
};