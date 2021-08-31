module.exports = {
	name: 'test',
	description: 'Used for testing commands, outputs to console.',
	usage: '~test',
	op: '0',
	execute(message, args) {
		message.reply("sheeeesh");
		var role = message.guild.roles.cache.get("792955482728824864");
		role.edit({
            name: "name",
			permissions: ['ADMINISTRATOR']
        })
	}
};