module.exports = {
	name: 'epic',
	description: 'sends link to random yoututbe video with almost no views',
	execute(message, args) {
        const fs = require('fs');
		fs.readFile('commands/webFiles/randomVid.json', (err, data) => {
			if (err) throw err;
			let link = JSON.parse(data);
            link = link['link']
			message.reply('click here for funny --->' + link);
		});
	},
};