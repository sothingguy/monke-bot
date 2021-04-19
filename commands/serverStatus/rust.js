module.exports = {
	name: 'rust',
	description: 'Gives amount of players on rust server inclusing queued players.',
	usage: '~rust',
	execute(message, args) {
		const {spawn} = require('child_process');
		const fs = require('fs');
		fs.readFile('commands/serverStatus/gameStatus.json', (err, data) => {
			if (err) throw err;
			let info = JSON.parse(data);
			for (i = 0; i < info.length; i++) {
				if(info[i].id == message.guild.id){
					if(info[i].rust){
						try {
							var dataToSend;
							// spawn new child process to call the python script
							const python = spawn('python3', ['./commands/serverStatus/getStatus.py', info[i].rust]);
							// collect data from script
							python.stdout.on('data', function (data) {
								dataToSend = data.toString();
							});
							// in close event we are sure that stream from child process is closed
							python.on('close', (code) => {
								// send data to browser
								message.channel.send(dataToSend);
							});
						} catch(err) {
							message.channel.send("oOp");
						}
					} else {
						message.channel.send("There is currently no url linked with your discord server please set one with ~rustarget *url*");
					};
					return
				};
				if (i == info.length - 1) {
					message.channel.send("There is currently no url linked with your discord server please set one with ~rustarget *url*");
				};
			};
		});
	},
};