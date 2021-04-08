const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
	name: 'loadnew',
    description: 'tbh I hate restarting the bot so here',
    ownersOnly: true,
	execute(message, client) {
    try {
            
    client.commands = undefined
   console.log(client.commands)

    client.commands = new Discord.Collection();

        function getDirectories() {
  return fs.readdirSync("./commands").filter(function subFolders(file) {
    return fs.statSync("./commands/" + file).isDirectory();
  });
}
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const folder of getDirectories()) {
  const folderFiles = fs
    .readdirSync("./commands/" + folder)
    .filter((file) => file.endsWith(".js"));
  for (const file of folderFiles) {
    commandFiles.push([folder, file]);
  }
}
for (const file of commandFiles) {
  let command;
  if (Array.isArray(file)) {
    command = require(`../../commands/${file[0]}/${file[1]}`);
  } else {
    command = require(`./commands/${file}`);
  }

  client.commands.set(command.name, command);
  
}
    
      message.channel.send('New commands Have been added')
    }
    catch (error) {
      console.log(error)
      message.reply(`There was an error when loading the new commands, \n\n**${error}**`);
    }}
}
