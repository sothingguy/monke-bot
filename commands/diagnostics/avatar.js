module.exports = {
	name: 'avatar',
	description: 'Returns authors profile picture.',
	usage: '~avatar',
	op: '0',
	execute(message, args) {
		message.channel.send(message.author.displayAvatarURL());
	},
};