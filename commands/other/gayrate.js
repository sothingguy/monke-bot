module.exports = {
	name: 'gayrate',
	description: 'rates how gay the person or thing is',
	execute(message, args) {
        if (!args.length) {
			rated = message.member.user.tag;
		} else{
			rated = message.content.slice(8).trim();
			if (rated == "daniel") {
				message.reply(rated + " is " + "110" + "% gay! :rainbow_flag:");
				return
			}
        };
        message.reply(rated + " is " + Math.floor(Math.random() * 100) + "% gay! :rainbow_flag:");
	},
};