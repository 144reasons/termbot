const Discord = require("discord.js");
const { botColour } = require("../../config.json");

module.exports = {
    name: "messages",
    description: "Check your messages! Useful for the eco!",
    category: "economy",
    async execute(message, client, args, userdata) {
      
        const msgs = await userdata.get(`author_messages_${message.author.id}_${message.guild.id}`)

        const embed = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle("Your messages")
      .setDescription(`You currently have sent: ${msgs}`)
      .setTimestamp()
      .setFooter(`${client.user.username} || ${message.guild.name}`, client.user.displayAvatarURL());

        message.channel.send(embed);

    },
  };
  