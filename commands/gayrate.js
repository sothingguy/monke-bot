module.exports = {
	name: 'gayrate',
	description: 'rates how gay the person or thing is',
	execute(message, args) {
        if (!args.length) {
			rated = message.member.user.tag;
		} else{
            rated = message.content.slice(8).trim();
        };
        message.reply(rated + " is " + Math.floor(Math.random() * 100) + "% gay! :rainbow_flag:");
	},
};