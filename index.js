// ──────────────────────────────────────────────────────────────────── [ Start of index.js & dependencies ]

const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const { inspect } = require("util");
const { token, errorchannelID } = require("./config.json");

// ──────────────────────────────────────────────────────────────────── [ Client start ]

const client = new Discord.Client({
  ws: { properties: { $browser: "Discord iOS" } },
});
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
client.commands = new Discord.Collection();

// ──────────────────────────────────────────────────────────────────── [ Event handler ]

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// ──────────────────────────────────────────────────────────────────── [ Part of command handler ]

const { readdirSync } = require("fs");
const commandFolders = readdirSync("./commands");
commandFolders.forEach((x) => {
  const commandFiles = fs
    .readdirSync(`./commands/${x}`)
    .filter((file) => file.endsWith(".js"));
  commandFiles.forEach((d) => {
    const command = require(`./commands/${x}/${d}`);

    client.commands.set(command.name, command);
  });
});

// ──────────────────────────────────────────────────────────────────── [ Pretty exiting reminder ]

process.on("SIGINT", async () => {
  console.log(chalk.bold.red("Process ended! Exiting..."));
  process.exit();
});

// ──────────────────────────────────────────────────────────────────── [ Log errors to channel that was set ]

if (errorchannelID) {
  process.on("unhandledRejection", (reason, promise) => {
    client.channels.cache
      .get(errorchannelID)
      .send(
        `UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, {
          depth: 0,
        })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``
      );
  });
  process.on("uncaughtException", (err, origin) => {
    client.channels.cache
      .get(errorchannelID)
      .send(
        `UncaughtException\nError:\n\`\`\`\n${inspect(err, {
          depth: 0,
        })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`
      );
  });
  process.on("warning", (warn) => {
    client.channels.cache
      .get(errorchannelID)
      .send(
        `Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn.stack}\n\`\`\``
      );
  });
}
// For some reason had to make this in Index as I tried making a event using your template and it didn't work srrryy Maybe you could get it to work
client.on("guildCreate", guild => {
  // The channel Finds any channel it can talk in then posts this message
const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
const USER1 = client.users.cache.find(u => u.id === '379781622704111626').tag
const USER2 = client.users.cache.find(u => u.id === '379781622704111626').tag //While this are not needed They are great because If one of us updates are name/Tag it auto updates next time someone invites the bot
const USER3 = client.users.cache.find(u => u.id === '379781622704111626').tag
  const welcomeembed = new Discord.MessageEmbed()

      .setColor('RANDOM')
      .setTitle('Bot Info')
      .setAuthor('Thank you for Inviting me!')
      .setDescription(`I\'m ${client.user.tag}, A bot that aims to be as customizeable as possible, while can also be used to teach how discord bots work.`)
      .addFields({
          name: 'Features',
          value: 'I have A ton of commands That can Be used and Even Better I\'m [Open Sourced](https://github.com/somerandomcloud/termbot) So you can come Contribute and Make the Bot even Better'
      }, {
          name: '\u200B',
          value: '\u200B'
      }, {
          name: 'Main Dev',
          value: `${USER1}`,
          inline: true
      }, {
          name: 'Dev',
          value: `${USER2}`,
          inline: true
      }, )
      .addField('Contributor', `${USER3}`, true)
      .setTimestamp()
      .setFooter('Thx for inviting me', 'https://cdn.discordapp.com/avatars/829039991727325194/eb497491f1ef507fb0b7df25caa84ca3.png');

  channel.send(welcomeembed);
})

// ──────────────────────────────────────────────────────────────────── [ Login ]

client.login(token);