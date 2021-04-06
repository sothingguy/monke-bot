module.exports = {
	name: 'aprs-info',
	description: 'returns comand and the arguments given -used for testing',
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
	
		message.channel.send(`Arguments: ${args}`);
	},
};