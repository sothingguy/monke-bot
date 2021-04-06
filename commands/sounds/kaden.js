module.exports = {
	name: 'kaden',
	description: 'plays kaden sound maybe earape',
	execute(message, args) {
        const fs = require('fs');
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {
            // play actual sound
            if (Math.floor(Math.random() * 4) == 2) { // play ear rape one if its randomly choosen
                VoiceConnection.play("./sounds/fx/kadenLoud.mp3").on("finish", () => VoiceConnection.disconnect());
            } else { // play normal one
                VoiceConnection.play("./sounds/fx/kaden.mp3").on("finish", () => VoiceConnection.disconnect());
            };
		})
	},
};