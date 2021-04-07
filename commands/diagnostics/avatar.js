module.exports = {
	name: 'avatar',
	description: 'Returns authors profile picture.',
	usage: '~avatar',
	execute(message, args) {
		message.channel.send(message.author.displayAvatarURL());
	},
};