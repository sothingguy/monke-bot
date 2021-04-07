module.exports = {
	name: 'args-info',
	description: 'Returns arguments given with the command - used for testing.',
	usage: '~args-info [args]',
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
	
		message.channel.send(`Arguments: ${args}`);
	},
};