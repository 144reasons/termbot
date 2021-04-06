const { prefix } = require("../config.json");
const chalk = require('chalk')

module.exports = {
  name: "message",
  execute(message, client) {

    // ──────────────────────────────────────────────────────────────────── [ Checks if the message uses the prefix or if the author is a bot ]

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    // ──────────────────────────────────────────────────────────────────── [ Makes it easier to define args later on in commands ]

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ──────────────────────────────────────────────────────────────────── [ Checks if the command specified after the prefix is a valid command ]

    if (!client.commands.has(command)) return;

    // ──────────────────────────────────────────────────────────────────── [ Tries to run the command, and if it encounters an error, it logs it in the console and lets the user know there was an error ]

    try {
      client.commands.get(command).execute(message, client, args);
    } catch (error) {
      console.log(
        chalk.bold.red(`There was an error executing the command "${command}": \n${error}`)
      );
      message.reply("there was an error trying to execute that command!");
    }
  },
};
