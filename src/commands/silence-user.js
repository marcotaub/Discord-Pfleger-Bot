const prefix = process.env.PREFIX;
const discordBot = require('../bot.js');
const logService = require('../log.js');

module.exports = {
	name: 'silence-user',
    aliases: ["silence",],
    icon: 'mdi-message-bulleted-off',
    category: 'Troll',
    webExe: true,
    args: true,
    usage: '<userid>',
	description: 'Mute an user in every chat channel!',
	execute(msg, args, client) {
        if(!args[0]){
            return msg.channel.send(`Falsche Argumente angegeben, ${msg.author}! 🤔 `+ `\nRichtig wäre: \`${prefix} ${this.name} ${this.usage}\``);
        }

        msg.delete();
        logService.log(`Added ${args[0]} to silencedusers list`);

        discordBot.addSilenceUser(args[0]);
	},
    executeAPI(msg, args, client) {
        logService.log(`Added ${args[0]} to silencedusers list`);
        discordBot.addSilenceUser(args[0]);
	},
};