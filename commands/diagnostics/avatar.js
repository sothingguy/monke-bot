module.exports = {
	name: 'avatar',
	description: 'returns clients profile picture',
	execute(message, args) {
		message.channel.send(message.author.displayAvatarURL());
	},
};