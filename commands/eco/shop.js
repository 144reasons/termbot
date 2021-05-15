const Discord = require("discord.js");
const { botColour } = require("../../config.json");

module.exports = {
    name: "shop",
    description: "View the available purchaseable roles",
    async execute(message, client, args, userdata) {

        const msgs = await userdata.get(
            `author_messages_${message.author.id}_${message.guild.id}`
          );
      
        const page1 = new Discord.MessageEmbed()
            .setColor(botColour)
            .setTitle("Shop: Page 1")
            .setDescription(`You currently have sent: ${msgs}`)
            .setTimestamp()
            .setFooter(`${client.user.username} || ${message.guild.name}`, client.user.displayAvatarURL());

    },
  };
  