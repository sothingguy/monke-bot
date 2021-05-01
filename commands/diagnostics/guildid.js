module.exports = {
	name: 'guildid',
	description: 'Gives the id for the discord server.',
	usage: '~guildid',
	op: '0',
	execute(message, args) {
		message.channel.send(message.guild.id);
	},
};