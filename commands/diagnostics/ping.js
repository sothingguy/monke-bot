module.exports = {
	name: 'ping',
	description: 'bot tester',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};