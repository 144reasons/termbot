const Discord = require('discord.js')
const { botColour } = require('../../config.json')

module.exports = {
  name: "eval",
  description: "Eval",
  ownerOnly: true,
  hidden: true,
  execute(message, client, args) {

    try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

          const embed = new Discord.MessageEmbed()
            .setColor(botColour)
            .setTitle('Eval')
            .setDescription(`\`\`\`${evaled}\`\`\``);
   
        message.channel.send(embed);
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      }

  },
};