const Discord = require('discord.js')
const { botColour } = require('../../config.json')

module.exports = {
    name: "warns",
    description: "Check the warns of a user",
    category: "moderation",
    async execute(message, client, args, keyv) {
      
        const offender = message.mentions.members.first()

        var warns = await keyv.get(`warnings_${offender.id}_${message.guild.id}`)
        var linkwarns = await keyv.get(`antilink_${message.author.id}_${message.guild.id}`)
        var bans = await keyv.get(`ban_${message.author.id}_${message.guild.id}`)

        if (warns === undefined) warns = 0
        if (linkwarns === undefined) linkwarns = 0
        if (bans === undefined) bans = 0


        const embed = new Discord.MessageEmbed()
        .setColor(botColour)
        .setTitle(`${offender.user.username}s warnings`)
        .setDescription(`Helper administered warns: ${warns}\nWarnings due to posting links: ${linkwarns}\nBans: ${bans}`)
        .setTimestamp()
        .setFooter(`${client.user.username} || ${message.guild.name}`);

        message.channel.send(embed)

    },
  };
  