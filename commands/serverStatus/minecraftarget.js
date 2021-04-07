module.exports = {
	name: 'minecraftarget',
	description: 'Allows you to cheeck or change the minecraft server targeted by ~minecraft. Has to be a link to https://www.battlemetrics.com/servers/minecraft website.',
	usage: '~minecraftarget or ~minecraftarget [url]',
	execute(message, args) {
        const fs = require('fs');
        if (!args.length) {
			fs.readFile('commands/serverStatus/minecraftStatus.json', (err, data) => {
                if (err) throw err;
                let rust = JSON.parse(data);
                for (i = 0; i < rust.length; i++) {
                    if(rust[i].id == message.guild.id){
                        message.reply("the current url being targeted is " + rust[i].url);
                        return
                    };
                    if (i == rust.length - 1) {
                        message.reply("There is currently no url linked with your discord server please set one with ~rustarget **url**");
                    };
                };
            });
		} else{
			if (args.length == 1) {
                message.reply("Changing target to " + args[0]);
                fs.readFile('commands/serverStatus/minecraftStatus.json', (err, data) => {
                    if (err) throw err;
                    let rust = JSON.parse(data);
                    for (i = 0; i < rust.length; i++) {
                        if(rust[i].id == message.guild.id){
                            rust[i].url = args[0];
                            var data = JSON.stringify(rust);
                            fs.writeFile('commands/serverStatus/minecraftStatus.json', data, (error) => { 
      
                                // In case of a error throw err exception. 
                                if (error) throw err; 
                            }) 
                            return
                        };
                        if (i == rust.length - 1) {
                            blank = {"id":message.guild.id,"error":false,"url":args[0],"data":["0","0","0"],"time":"00:00"};
                            rust.push(blank);
                            var data = JSON.stringify(rust);
                            fs.writeFile('commands/serverStatus/minecraftStatus.json', data, (error) => { 
      
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