module.exports = {
	name: 'minecraft',
	description: 'Gives amount of players on minecraft server.',
	usage: '~minecraft',
	op: '0',
	execute(message, args) {
		const {spawn} = require('child_process');
		const fs = require('fs');
		fs.readFile('commands/serverStatus/gameStatus.json', (err, data) => {
			if (err) throw err;
			let info = JSON.parse(data);
			for (i = 0; i < info.length; i++) {
				if(info[i].id == message.guild.id){
					if(info[i].minecraft){
						var dataToSend;
						// spawn new child process to call the python script
						const python = spawn('python3', ['./commands/serverStatus/getStatus.py', info[i].minecraft]);
						// collect data from script
						python.stdout.on('data', function (data) {
							dataToSend = data.toString();
						});
						// in close event we are sure that stream from child process is closed
						python.on('close', (code) => {
							// send data to browser
							message.channel.send(dataToSend);
						});
						python.on("error", (err) => {
							message.channel.send("An error has occurred.");
						});
					} else {
						message.channel.send("There is currently no url linked with your discord server please set one with ~minecraftarget *url*");
					};
					return
				};
				if (i == info.length - 1) {
					message.channel.send("There is currently no url linked with your discord server please set one with ~minecraftarget *url*");
				};
			};
		});
	},
};