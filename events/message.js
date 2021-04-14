const { prefix, owner, helper, botColour, punishmentLogs } = require("../config.json");
const chalk = require("chalk");
const Keyv = require('keyv');
const Filter = require("badwords-filter");
const badwords = { list: ["nigger", "nigga", "fag", "faggot", "dyke", "chink", "beaner", "sperg", "tranny", "retard", "retarded", "kys", "rape", "raping", "rapist", "pedo"] };
const filter = new Filter(badwords);
const antilink = ["https", "http", "discord.gg", "discordapp.com"];
const Discord = require('discord.js')

const antisui = { list: ["suicide", "kms"] };
const filtersui = new Filter(antisui);

const keyv = new Keyv('sqlite://db.sqlite');

module.exports = {
  name: "message",
  async execute(message, client) {

    if (message.author.bot) return
    
    if (message.channel.type === 'dm') return message.channel.send('Sorry, I dont do dms!')
    
    // ──────────────────────────────────────────────────────────────────── [ Checks if the message sent is in the automoderated guild ]

    if (message.guild.id === '830557804501794855') {

      if(filter.isUnclean(message.content) == true) {
        message.delete()
        return message.channel.send('You cant say that!')
      }

        if(filtersui.isUnclean(message.content) == true) {
          message.delete()
          message.author.send('Hey, we are just checking in. You said a word that the author of this bot doesnt take too lightly, and I just wanted to make sure you are ok. If you need anyone, feel free to dm me at ICodeInAssembly#7117, or find your country in this list and call the Suicide Hotline number: https://www.opencounseling.com/suicide-hotlines')
        }
    }

    // ──────────────────────────────────────────────────────────────────── [ Anti-link ]

    if (!message.member.roles.cache.has('831607805802577960')) {

      let found = false;

    for (var i in antilink) {
      if (message.content.toLowerCase().includes(antilink[i].toLowerCase()))
        found = true;
    }

    if (found == true) {

      var linkwarns = await keyv.get(`antilink_${message.author.id}_${message.guild.id}`)

      if (!linkwarns) linkwarns = 1;
        else linkwarns = linkwarns + 1;

      message.delete()

      const success = new Discord.MessageEmbed()
    .setColor(botColour)
    .setTitle(`${message.author.username} got linkwarned`)
    .setDescription(`${message.author.username}#${message.author.discriminator} (ID: ${message.author.id}) was warned for posting links`)
    .setTimestamp()
    .setFooter(`${client.user.username} || ${message.guild.name}`);

    message.channel.send(success)
      .then(msg => {
       msg.delete({ timeout: 5000 })
      })

      await keyv.set(`antilink_${message.author.id}_${message.guild.id}`, linkwarns)
      const logme = new Discord.MessageEmbed()
        .setColor(botColour)
        .setTitle(`New link warning`)
        .setDescription(
        `Offender: ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})
        Message content: ${message.content}`)
        .setTimestamp()
        .setFooter(`${client.user.username} || ${message.guild.name}`);

        const sendtome = client.channels.cache.get(punishmentLogs)
        return sendtome.send(logme);
    }
  }
    
  

    // ──────────────────────────────────────────────────────────────────── [ Checks if the message uses the prefix or if the author is a bot ]

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot)
      return;

    // ──────────────────────────────────────────────────────────────────── [ Makes it easier to define args later on in commands ]

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ──────────────────────────────────────────────────────────────────── [ Checks if the command specified after the prefix is a valid command ]

    if (!client.commands.has(command)) return;

    // ──────────────────────────────────────────────────────────────────── [ Tries to run the command, and if it encounters an error, it logs it in the console and lets the user know there was an error ]

    try {

      const cmd = client.commands.get(command);

      if (cmd.ownersOnly && message.author.id !== owner)
        return message.channel.send("This command isnt made for you!");

      cmd.execute(message, client, args, keyv);
    } catch (error) {
      console.log(
        chalk.bold.red(
          `There was an error executing the command "${command}": \n${error}`
        )
      );
      message.reply("there was an error trying to execute that command!");
    }
  },
};
