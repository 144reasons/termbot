const Discord = require("discord.js");
const { botColour } = require("../../config.json");

module.exports = {
  name: "status",
  description: "Set the bots status",
  ownersOnly: true,
  hidden: true,
  execute(message, client, args) {
    const status = args.join(" ");

    const embed = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle("Bot Status")
      .setDescription(`Set status as: ${status}`)
      .setTimestamp()
      .setFooter(`${client.user.username} || ${message.guild.name}`);

    client.user.setActivity(status);

    message.channel.send(embed);
  },
};
