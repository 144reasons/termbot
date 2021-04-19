const chalk = require('chalk')

module.exports = {
    name: "reboot",
    description: "Reboot",
    ownersOnly: true,
    hidden: true,
    async execute(message, client, args, keyv) {

        await message.channel.send('Rebooting...')

        console.log(chalk.red(`Reboot has been requested by: ${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})`))

        console.log('Goodbye!')

        process.exit()
      
    },
  };
  