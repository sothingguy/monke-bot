module.exports = {
	name: 'test',
	description: 'Used for testing commands, outputs to console.',
	usage: '~test',
	op: '0',
	execute(message, args) {
		message.reply("sheeeesh");
	}
};