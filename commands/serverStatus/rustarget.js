module.exports = {
	name: 'rustarget',
	description: 'Allows you to cheeck or change the rust server targeted by ~rust. Has to be a link to https://www.battlemetrics.com/servers/rust website.',
	usage: '~rustarget or ~rustarget [url]',
	execute(message, args) {
        const fs = require('fs');
        if (!args.length) {
			fs.readFile('commands/serverStatus/gameStatus.json', (err, data) => {
                if (err) throw err;
                let info = JSON.parse(data);
                for (i = 0; i < info.length; i++) {
                    if(info[i].id == message.guild.id){
                        message.reply("the current url being targeted is " + info[i].rust);
                        return
                    };
                    if (i == info.length - 1) {
                        message.reply("There is currently no url linked with your discord server please set one with ~rustarget **url**");
                    };
                };
            });
		} else{
			if (args.length == 1) {
                message.reply("Changing target to " + args[0]);
                fs.readFile('commands/serverStatus/gameStatus.json', (err, data) => {
                    if (err) throw err;
                    let info = JSON.parse(data);
                    for (i = 0; i < info.length; i++) {
                        if(info[i].id == message.guild.id){
                            info[i].rust = args[0];
                            var data = JSON.stringify(info);
                            fs.writeFile('commands/serverStatus/gameStatus.json', data, (error) => { 
      
                                // In case of a error throw err exception. 
                                if (error) throw err; 
                            }) 
                            return
                        };
                        if (i == info.length - 1) {
                            blank = {"id":message.guild.id,"rust":args[0]};
                            info.push(blank);
                            var data = JSON.stringify(info);
                            fs.writeFile('commands/serverStatus/gameStatus.json', data, (error) => { 
      
                                // In case of a error throw err exception. 
                                if (error) throw err; 
                            }) 
                            return
                        };
                    };
                });
            } else if (args.length != 1) {
                message.reply("There are too many urls I cannot handle your power :BushMaori:");
            };
        };
	},
};