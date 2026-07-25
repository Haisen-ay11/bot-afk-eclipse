/**
 * modules/commands.js
 *
 * Basic bot commands
 */

const logger = require('../logger');

class CommandsModule {
  constructor(bot, modules = {}) {
    this.bot = bot;
    this.modules = modules;
  }

  start() {
    this.bot.on('chat', (username, message) => {
      if (username === this.bot.username) return;

      if (!message.startsWith('!')) return;

      const args = message.slice(1).split(' ');
      const command = args.shift().toLowerCase();

      switch (command) {
        case 'pos':
        case 'position':
          this.position(username);
          break;

        case 'follow':
          this.follow(args[0]);
          break;

        case 'stop':
          this.stop();
          break;

        case 'come':
          this.come();
          break;

        case 'help':
          this.help();
          break;

        default:
          break;
      }
    });

    logger.info('[Commands] Module started.');
  }

  position(username) {
    const pos = this.bot.entity.position;
    this.bot.chat(
      `${username}, my position is ${pos.x.toFixed(0)} ${pos.y.toFixed(0)} ${pos.z.toFixed(0)}`
    );
  }

  follow(player) {
    if (!player) return;
    if (this.modules.movement) {
      this.modules.movement.followPlayer(player);
      this.bot.chat(`Following ${player}`);
    }
  }

  stop() {
    if (this.modules.movement) {
      this.modules.movement.followPlayer(null);
      this.bot.chat('Stopped.');
    }
  }

  come() {
    this.bot.chat('Coming soon.');
  }

  help() {
    this.bot.chat(
      '!pos !follow <player> !stop !help'
    );
  }

  stop() {}
}

module.exports = CommandsModule;
