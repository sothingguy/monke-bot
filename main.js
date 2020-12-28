const Discord = require('discord.js');
const {token} = require('./token.json');
const prefix = "!";

const client = new Discord.Client();

client.once('ready', () => {
	console.log("Learner bot is online!");
	client.user.setActivity("With my robot cock"); 
});

client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content === `${prefix}ping`) {
		message.channel.send('pong.');
	} else if (message.content === `${prefix}avatar`) {
		message.channel.send(message.author.displayAvatarURL());
	} else if (message.content === `${prefix}ape`) { // make monkey noises
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {
			// get list of all sounds
			const files = require('./ape/content.json');

			// get exact fiule including path
			const file = files.files[Math.floor(Math.random() * files.files.length)];

			// play actual sound
			VoiceConnection.play(file).on("finish", () => VoiceConnection.disconnect());
		}).catch(e => console.log(e))
	}
});

client.login(token);
