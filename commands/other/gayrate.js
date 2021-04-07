module.exports = {
	name: 'gayrate',
	description: 'Rates how gay the sender or specified thing is.',
	usage: '~gayrate or ~gayrate [thing]',
	execute(message, args) {
        if (!args.length) {
			rated = message.member.user.tag;
		} else{
			rated = message.content.slice(8).trim();
			if (rated == "daniel") {
				message.reply(rated + " is " + message.author.id + "% gay! :rainbow_flag:");
				return
			}
        };
        message.reply(rated + " is " + Math.floor(Math.random() * 100) + "% gay! :rainbow_flag:");
	},
};