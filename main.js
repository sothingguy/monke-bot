const Discord = require('discord.js');
const {token} = require('./token.json');
const prefix = "!";

const client = new Discord.Client();

client.once('ready', () => {
	console.log("Learner bot is online!");
});

client.on('message', message => {
	//if(!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content === `${prefix}ping`) {
		message.channel.send('pong.');
	} else if (message.content === `${prefix}avatar`) {
		message.channel.send(message.author.displayAvatarURL());
	}
});

client.login(token);
