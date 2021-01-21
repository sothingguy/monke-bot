module.exports = {
	name: 'test',
	description: 'used for testing',
	execute(message, args) {
		message.channel.send(message.guild.id);
	},
};