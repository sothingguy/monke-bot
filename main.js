const Discord = require('discord.js');
const {token} = require('./token.json');
const prefix = "!";

const client = new Discord.Client();

client.once('ready', () => {
	console.log("Learner bot is online!");
});

client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content === `${prefix}ping`) {
		message.channel.send('pong.');
	} else if (message.content === `${prefix}avatar`) {
		message.channel.send(message.author.displayAvatarURL());
	} else if (message.content === `${prefix}ape`) { // make monket noises
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");
		// Checking if the bot is in a voice channel.
		if (message.guild.me.voice.channel) return message.reply("I'm already playing.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {
			// Playing the music, and, on finish, disconnecting the bot.
			const files = require('./ape/content.json');
			const file = files.files[Math.floor(Math.random() * files.files.length)];
			console.log(file);
			VoiceConnection.play(file).on("finish", () => VoiceConnection.disconnect());
			message.reply("Playing...");
		}).catch(e => console.log(e))
	} else if (message.content === `${prefix}Foff`) { // leave voice channel
		// cheek if in voice channel
		if (message.guild.me.voice.channel) return message.reply("I'm not in a voice channel.");
		
		// leave voice chanel if in one
		VoiceConnection.disconnect()
	};
});

client.login(token);
