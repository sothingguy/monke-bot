module.exports = {
	name: 'ping',
	description: 'Sends return "pong" message.',
	usage: '~ping',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};