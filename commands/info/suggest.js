module.exports = {
    name: "suggest",
    description: "Send a suggestion!",
    execute(message, client, args) {

        const suggestion = args.join(" ")

        message.reply("thanks for submitting a suggestion! Please submit valid suggestions, and not just spam! If caught sending spammy or inappropriate suggestions, you will be banned");
        
        const content = `${message.author.username} (ID: ${message.author.id}) suggested something!\n\`${suggestion}\``;
        
        message.client.channels.fetch('830793899638259762')
        .then(channel => channel.send(content))
    },
  };
  