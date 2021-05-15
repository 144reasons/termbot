const Discord = require("discord.js");
const { botColour } = require("../../config.json");

module.exports = {
  name: "dev",
  description: "Info on the dev",
  category: "Info",
  execute(message, client) {
    const embed = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle("Bot dev info")
      .setDescription(
        `This project was made by <@702973430449832038> as a project to attempt at better myself in javascript.\nThe project is opensource on github at \`https://github.com/somerandomcloud/termbot/\`\nIf you feel like my code is worthy enough for a donation (which it isnt) shoot me a message, and I can share either a paypal or an xmr address! \`ICodeInAssembly#7117\`. \n\nNote: I do not actually code in assembly`
      )
      .setTimestamp()
      .setFooter(
        `${client.user.username} || ${message.guild.name}`,
        client.user.displayAvatarURL()
      );

    message.channel.send(embed);
  },
};
