module.exports = {
	name: 'test',
	description: 'Used for testing commands, outputs to console.',
	usage: '~test',
	op: '0',
	execute(message, args) {
		message.reply("sheeeesh");
		if(message.author.id != "484974259752665088"){message.reply("skipped");return;} // skip if not sothingguy
	}
};
/*
add role
message.guild.roles.create({
	data:{
		name: 'Mob Boss',
		permissions: ['ADMINISTRATOR']
	}
	})
.then(console.log)
.catch(console.error);

add role to user
message.member.roles.add('882554906161065994')
*/