module.exports = {
	name: 'rust',
	description: 'Gives amount of players on rust server inclusing queued players.',
	usage: '~rust',
	execute(message, args) {
		const fs = require('fs');
		fs.readFile('commands/serverStatus/rustStatus.json', (err, data) => {
			if (err) throw err;
			let rust = JSON.parse(data);
			for (i = 0; i < rust.length; i++) {
				if(rust[i].id == message.guild.id){
					if(rust[i].error){
						message.reply(rust[i].url + " is not a valid url please change this with ~rustarget **url**");
					} else {
						message.reply("Currently there are " + rust[i].data[0] + "/" + rust[i].data[1] + " people playing with " + rust[i].data[2] + " people waiting in the queue. This was at " + rust[i].time);
					};
					return
				};
				if (i == rust.length - 1) {
					message.reply("There is currently no url linked with your discord server please set one with ~rustarget **url**");
				};
			};
		});
	},
};