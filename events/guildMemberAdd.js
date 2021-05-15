const Discord = require("discord.js");
const { botColour } = require("../config.json");

module.exports = {
    name: "guildMemberAdd",
    once: true,
    async execute(member, client) {

        const termbot = await client.guilds.fetch('830557804501794855')

        const embed = new Discord.MessageEmbed()
            .setColor(botColour)
            .setTitle("New member!")
            .setDescription(`${member.username} has joined our server! We hope you have a fun time here! Remember to check out <#830773633466105857> and <#836957737958244392>`)
            .setTimestamp()
            .setFooter(`${client.user.username} || ${termbot.name}`, client.user.displayAvatarURL());

        client.channels.fetch('830557805069074432')
        .then(channel => channel.send(embed))
    },
  };
  