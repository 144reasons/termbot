const chalk = require("chalk");
const { textSync } = require("figlet");
const config = require("../config.json");
const chalkAnimation = require("chalk-animation");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // ──────────────────────────────────────────────────────────────────── [ Prints the bot name in console ]
    console.log(
      chalk.hex(config.botColour)(
        textSync(`${config.botname}!`, {
          font: "Slant",
          horizontalLayout: "fitted",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
      )
    );

    // ──────────────────────────────────────────────────────────────────── [ Sets the bots activity ]

    var interval = setInterval(function () {
      var p = Math.floor(Math.random() * 6);

      console.log(p)

      if (p == 0) {
        client.user.setActivity(`the Owner`, { type: 'WATCHING' });
      }
      if (p == 1) {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
      }
      if (p == 2) {
        client.user.setActivity(`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members`, { type: 'WATCHING' });
      }
      if (p == 3) {
        client.user.setActivity(config.activity.game1, { type: 'WATCHING' });
      }
      if (p == 4) {
        client.user.setActivity(config.activity.game2, { type: 'COMPETING' });
      }
      if (p == 5) {
        client.user.setActivity(config.activity.game3, { type: 'PLAYING' });
      }
      if (p == 6) {
        client.user.setActivity(config.activity.game4, { type: 'PLAYING' });
      }
    }, 1 * 40000);

    // ────────────────────────────────────────────────────────────────────  [ Adds a little indicator to indicate the client is ready! (Runs for 30 seconds) ]

    const rainbow = chalkAnimation.pulse(
      `The client is nice and set! Logged in as: ${client.user.tag}`
    );

    setTimeout(() => {
      rainbow.stop();
    }, 30000);

    // ────────────────────────────────────────────────────────────────────
  },
};
