module.exports = {
	name: 'rust',
	description: 'gives amount of players on rust server',
	execute(message, args) {
		const fs = require('fs');
		fs.readFile('commands/rustStatus/rustStatus.txt', (err, data) => { 
			if (err) throw err; 
			
			message.reply(data.toString());
		})
	},
};