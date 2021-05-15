module.exports = {
  name: "prefix",
  description: "Set the bots prefix for your guild",
  async execute(message, client, args, userdata, guildconfig) {
    if (!args[0]) return message.channel.send("You need to define a prefix!");
    await guildconfig.set(`prefix_${message.guild.id}`, args[0]);

    const prefix = await guildconfig.get(`prefix_${message.guild.id}`, args[0]);

    message.channel.send(`You changed the prefix to \`${prefix}\`!`);
  },
};
