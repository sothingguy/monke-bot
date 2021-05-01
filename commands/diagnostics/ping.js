module.exports = {
	name: 'ping',
	description: 'Sends return "pong" message.',
	usage: '~ping',
	op: '0',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};