module.exports = {
	name: 'guildid',
	description: 'gives the id for the discord server',
	execute(message, args) {
		message.channel.send(message.guild.id);
	},
};