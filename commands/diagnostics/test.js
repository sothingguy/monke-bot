module.exports = {
	name: 'test',
	description: 'Used for testing commands, outputs to console.',
	usage: '~test',
	execute(message, args) {
		message.reply("sheeeesh");
	}
};