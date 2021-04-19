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
    // automate command categories
    command.type = x;
    client.commands.set(command.name, command);
  });
});

// ──────────────────────────────────────────────────────────────────── [ Pretty exiting reminder ]

process.on("SIGINT", async () => {
  console.log(chalk.bold.red("Process ended! Exiting..."));
  process.exit();
});

// ──────────────────────────────────────────────────────────────────── [ Log errors to channel that was set ]

// if (errorchannelID) {
//   process.on("unhandledRejection", (reason, promise) => {
//     client.channels.cache
//       .get(errorchannelID)
//       .send(
//         `UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, {
//           depth: 0,
//         })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``
//       );
//   });
//   process.on("uncaughtException", (err, origin) => {
//     client.channels.cache
//       .get(errorchannelID)
//       .send(
//         `UncaughtException\nError:\n\`\`\`\n${inspect(err, {
//           depth: 0,
//         })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`
//       );
//   });
//   process.on("warning", (warn) => {
//     client.channels.cache
//       .get(errorchannelID)
//       .send(
//         `Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn.stack}\n\`\`\``
//       );
//   });
// }

// ──────────────────────────────────────────────────────────────────── [ Login ]

client.login(token);
