module.exports = {
	name: 'rustarget',
	description: 'alows teh user to view and change the server to get the status off',
	execute(message, args) {
        const fs = require('fs');
        if (!args.length) {
			fs.readFile('commands/rustStatus/url.txt', (err, data) => { 
                if (err) throw err; 
                
                message.reply("The current server being targeted is " + data.toString());
            })
		} else{
			if (args.length == 1) {
                message.reply("Changing target to " + args[0]);
                fs.writeFile('commands/rustStatus/url.txt', args[0], (error) => { 
      
                    // In case of a error throw err exception. 
                    if (error) throw err; 
                }) 
            } else if (args.length != 1) {
                message.reply("There are too many urls I cannot handle your power :BushMaori:");
            };
        };
	},
};