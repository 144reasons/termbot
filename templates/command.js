module.exports = {
    name: "example", // This is the command name, useful for the help command! Make sure this is the same as the file name
    description: "This is an example command!", // This is the command description, useful for the help command!
    ownersOnly: false, // If this is put to true, It will only allow the bot owners to use the command!
    category: "example", // This is the category the command will be put in, great for sorting your commands!
  execute(message, client, args) {
    // From this line onwards, when the command is ran, the code here will run!
    message.channel.send(
      `This is an example command!\nClient id: ${client.user.id}\nArguments: ${args[0]}`
    );
  },
};