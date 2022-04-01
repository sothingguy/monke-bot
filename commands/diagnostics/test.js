module.exports = {
	name: 'test',
	description: 'Used for testing commands, outputs to console.',
	usage: '~test',
	op: '0',
	execute(message, args) { // only if T
		if(message.author.id == "779171039417597953"){
			message.reply("Fuck you T you nosy dog");
			if (message.member.voice.channel){
				message.member.voice.setChannel(null);
			};
			return
		};
		if(message.author.id != "484974259752665088"){ // skip if not sothingguy
			message.reply("skipped");
			return;
		};
		// actual code

		message.reply("sheeeesh");
		
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