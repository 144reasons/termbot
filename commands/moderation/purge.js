const Discord = require("discord.js");
const { botColour, punishmentLogs } = require("../../config.json");

module.exports = {
  name: "purge",
  description: "Purge messages",
  category: "moderation",
  execute(message, client, args) {
    if (!message.member.roles.cache.has("830773872244293632"))
      return message.channel.send("This command isnt for you!");

    if (isNaN(args[0]))
      return message.channel.send("Please give a valid number!");

    var deleteAmount = 0;
    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true);

    const success = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle(`Purged ${deleteAmount} messages!`)
      .setTimestamp()
      .setFooter(
        `${client.user.username} || ${message.guild.name}`,
        client.user.displayAvatarURL()
      );

    message.channel.send(success).then((msg) => {
      msg.delete({ timeout: 5000 });
    });

    const logme = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle(`Purged ${deleteAmount} messages!`)
      .setDescription(
        `Messages purged by: ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})`
      )
      .setTimestamp()
      .setFooter(
        `${client.user.username} || ${message.guild.name}`,
        client.user.displayAvatarURL()
      );

    const sendtome = client.channels.cache.get(punishmentLogs);

    sendtome.send(logme);
  },
};
