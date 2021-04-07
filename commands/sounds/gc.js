module.exports = {
	name: 'gc',
	description: 'Plays good cunt compilation from The Big Lez show.',
	usage: '~gc',
	execute(message, args) {
        const fs = require('fs');
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {

			// play actual audio
			VoiceConnection.play("./sounds/gc.mp3").on("finish", () => VoiceConnection.disconnect());
		})
	},
};