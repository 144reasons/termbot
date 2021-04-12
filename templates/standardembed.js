const Discord = require("discord.js");

module.exports = {
  name: "example", // This is the command name, useful for the help command! Make sure this is the same as the file name
  description: "This is an example command!", // This is the command description, useful for the help command!
  execute(message, client, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(botColour)
      .setTitle("This is an example embed!")
      .setDescription(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      )
      .setTimestamp()
      .setFooter(`${client.user.username} || ${message.guild.name}`);

    message.channel.send(embed);
  },
};
