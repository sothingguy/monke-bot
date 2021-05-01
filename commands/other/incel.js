module.exports = {
	name: 'incel',
	description: 'Rates much of an incel the sender or specified thing is.',
	usage: '~incel or ~incel [thing]',
	op: '0',
	execute(message, args) {
        if (!args.length) {
			rated = message.member.user.tag;
		} else{
			rated = message.content.slice(7).trim();
			if (rated == "daniel") {
				message.reply(rated + " is " + "110" + "% incel! :nerd:");
				return
			}
        };
        message.reply(rated + " is " + Math.floor(Math.random() * 100) + "% incel! :nerd:");
	},
};