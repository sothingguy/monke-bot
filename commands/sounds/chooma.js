module.exports = {
	name: 'chooma',
	description: 'Plays chooma sound',
	execute(message, args) {
        const fs = require('fs');
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {
			// get list of all ape sounds
			const sounds = fs.readdirSync('./sounds/chooma').filter(file => file.endsWith('.mp3'));

			// play actual sound
			VoiceConnection.play("./sounds/chooma/" + sounds[Math.floor(Math.random() * sounds.length)]).on("finish", () => VoiceConnection.disconnect());
		})
	},
};