module.exports = {
	name: 'serenade',
	description: 'funny haha idek what the name is',
	execute(message, args) {
        const fs = require('fs');
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {

			// play actual audio
			VoiceConnection.play("./sounds/serenade.mp3").on("finish", () => VoiceConnection.disconnect());
		})
	},
};