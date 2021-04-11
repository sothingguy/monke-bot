module.exports = {
	name: 'pp',
	description: 'Tells the user a pp length.',
	usage: '~pp',
	execute(message, args) {
        len = message.author.id[message.author.id[0]]
        text = "=";
        for (i = 0; i < len; i++) {
            text += "=";
        }
		message.channel.send('pp length: 8' + text + "D");
	},
};