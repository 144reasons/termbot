const Discord = require("discord.js");

module.exports = {
  name: "help",
  usage: "help <cmd>",
  description: "Get Help",
  category: "Info",
  execute(message, client, args) {
    try {
      if (args[0]) {
        const command = client.commands.get(args[0]);
        if (!command) {
          return message.channel.send("Unknown Command: " + args[0]);
        }
        const embed = new Discord.MessageEmbed()
          .setAuthor(command.name, client.user.displayAvatarURL())
          .addField(
            "Description",
            command.description || "No Description",
            false
          )
          .addField("Category", command.category)
          .addField("Usage", command.usage || "Not Provided", false)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(client.config.botColour)
          .setFooter(
            message.author.username,
            message.author.displayAvatarURL()
          );
        return message.channel.send(embed);
      } else {
        let helpem = new Discord.MessageEmbed()
          .setAuthor(
            client.config.botname + " Help Commands",
            client.user.displayAvatarURL()
          )
          .setColor(client.config.botColour)
          .setFooter(
            message.author.username,
            message.author.displayAvatarURL()
          );
        let commandMap = {};
        require("fs")
          .readdirSync("./commands/")
          .forEach((dir) => (commandMap[dir] = []));
        message.client.commands.forEach((command) => {
          commandMap[command.type].push(`\`${command.name}\``);
        });
        Object.keys(commandMap).forEach((category) => {
          let cmds = commandMap[category].join(", ");
          helpem.addField(
            category.toUpperCase() + ` [${commandMap[category].length}]`,
            cmds,
            false
          );
        });
        message.channel.send(helpem);
      }
    } catch (err) {
      console.log(err);
      message.reply(`There was a error when running the command`);
    }
  },
};
