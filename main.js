const Discord = require('discord.js'); // get discord js package
const {token} = require('./token.json'); // get token from external file
const prefix = "~"; // the text used at the start of comands
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js')); // for cheecking each indavidual comand folder
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);

		// set a new item in the Collection
		// with the key as the command name and the value as the exported module
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
	console.log("Monke bot is online!"); // loggin that the bot has started to console
	client.user.setActivity("with my robot cock");  // changing the status of the bot
});

client.on('message', message => {
	if (message.channel.id == "828954310972145714" && message.author.id != '777823804209889280') {message.channel.send(parseFloat(message.content) + 1);};
	if(!message.content.startsWith(prefix) || message.author.bot) return; // make sure that the message is for the bot

	const args = message.content.slice(prefix.length).trim().split(/ +/); // splits the message into seperate words
	const command = args.shift().toLowerCase(); // takes the first word which is the command

	if (!client.commands.has(command)) return; // cheeck to seee if the comand is actually a comand

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
