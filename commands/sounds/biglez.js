module.exports = {
	name: 'biglez',
	description: 'Plays a random sound effect from The Big Lez show.',
	usage: '~biglez',
	op: '0',
	execute(message, args) {
        const fs = require('fs');
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {
			// get list of all ape sounds
			const sounds = fs.readdirSync('./sounds/bigLez').filter(file => file.endsWith('.mp3'));

			// play actual sound
			VoiceConnection.play("./sounds/bigLez/" + sounds[Math.floor(Math.random() * sounds.length)]);
		})
	},
};