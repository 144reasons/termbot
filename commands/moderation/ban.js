const { botColour, punishmentLogs } = require("../../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a user",
  category: "moderation",
  async execute(message, client, args, userdata) {
    if (!message.member.roles.cache.has("830773872244293632"))
      return message.channel.send("This command isnt for you!");

    const offender = message.mentions.members.first();

    if (!offender)
      return message.channel.send("You didnt mention anyone to ban!");

    if (offender.id == message.author.id)
      return message.channel.send("Hey you cant ban yourself!");

    var bans = await userdata.get(`ban_${offender.id}_${message.guild.id}`);

    args.shift();
    const reason = "`" + args.join(" ") + "`";

    if (!bans) bans = 1;
    else bans = bans + 1;

    await userdata.set(`ban_${offender.id}_${message.guild.id}`, bans);

    offender.ban();

    const success = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle(`${offender.user.username} got banned`)
      .setDescription(
        `${offender.user.username}#${offender.user.discriminator} (ID: ${offender.id}) was banned for: ${reason}`
      )
      .setTimestamp()
      .setFooter(
        `${client.user.username} || ${message.guild.name}`,
        client.user.displayAvatarURL()
      );

    message.channel.send(success);

    const logme = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle(`New ban`)
      .setDescription(
        `Offender: ${offender.user.username}#${offender.user.discriminator} (ID: ${offender.id})
        Issued by: ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})
        Reason: ${reason}`
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
