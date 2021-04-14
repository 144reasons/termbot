const { botColour, punishmentLogs } = require('../../config.json')
const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "Kick a user",
    category: "moderation",
    async execute(message, client, args, keyv) {
        if (!message.member.roles.cache.has('830773872244293632')) return message.channel.send('This command isnt for you!')

        const offender = message.mentions.members.first()

        if (!offender) return message.channel.send('You didnt mention anyone to kick!');

        if (offender.id == message.author.id) return message.channel.send('Hey you cant kick yourself!')

        var kicks = await keyv.get(`kick_${offender.id}_${message.guild.id}`)

        args.shift();
        const reason = '`' + args.join(' ') + '`';

        if (!kicks) kicks = 1;
        else kicks = kicks + 1;

        await keyv.set(`kick_${offender.id}_${message.guild.id}`, kicks)

        offender.kick()

    const success = new Discord.MessageEmbed()
    .setColor(botColour)
    .setTitle(`${offender.user.username} got kicked`)
    .setDescription(`${offender.user.username}#${offender.user.discriminator} (ID: ${offender.id}) was kicked for: ${reason}`)
    .setTimestamp()
    .setFooter(`${client.user.username} || ${message.guild.name}`);

    message.channel.send(success)

    const logme = new Discord.MessageEmbed()
    .setColor(botColour)
    .setTitle(`New kick`)
    .setDescription(
        `Offender: ${offender.user.username}#${offender.user.discriminator} (ID: ${offender.id})
        Issued by: ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})
        Reason: ${reason}`)
    .setTimestamp()
    .setFooter(`${client.user.username} || ${message.guild.name}`);

    const sendtome = client.channels.cache.get(punishmentLogs)

        sendtome.send(logme);   

    },
  };
