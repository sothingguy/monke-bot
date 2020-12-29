module.exports = {
	name: 'biglez',
	description: 'plays a random sound effect from the big lez show',
	execute(message, args) {
        const fs = require('fs');
		// Checking if the message author is in a voice channel.
		if (!message.member.voice.channel) return message.reply("You must be in a voice channel.");

		// Joining the channel and creating a VoiceConnection.
		message.member.voice.channel.join().then(VoiceConnection => {
			// get list of all ape sounds
			const sounds = fs.readdirSync('./bigLez').filter(file => file.endsWith('.mp3'));

			// play actual sound
			VoiceConnection.play("./bigLez/" + sounds[Math.floor(Math.random() * sounds.length)]).on("finish", () => VoiceConnection.disconnect());;
		})
	},
};