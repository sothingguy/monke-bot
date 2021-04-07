module.exports = {
	name: 'help',
	description: 'Sends list of commands or infomation about a specific command.',
	usage: '~help or ~help [command]',
	execute(message, args) {
        const fs = require('fs'); // fs library

        if (!args.length) {

            const commandFolders = fs.readdirSync('./commands'); // reading folders
            toSend = "A list off all commands and thier cattagory\nSend ~help [command] for help with a specific command"; // start of the message to send

            for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js')); // for cheecking each indavidual comand folder
                toSend = toSend + "\n**" + folder + "**:"; // add each individual folder to message to send
                for (const file of commandFiles) {
                    const command = require(`../${folder}/${file}`); // do each individual command
                    toSend = toSend + "    " + command.name;
                }
            }
            message.reply(toSend);

        } else if (args.length == 1) {
            const commandFolders = fs.readdirSync('./commands'); // reading folders
            for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js')); // for cheecking each indavidual comand folder
                for (const file of commandFiles) {
                    const command = require(`../${folder}/${file}`); // do each individual command
                    if (command.name == args[0]) { // see if the command found is the one the user is requesting details about
                        message.reply(command.name + "\n" + command.description + "\nUsage: " + command.usage);
                        return
                    }
                }
            }
            message.reply("The command " + args[0] + " wasnt found.");
        } else {
            message.reply("I can only do one command at a time");
        }
	},
};