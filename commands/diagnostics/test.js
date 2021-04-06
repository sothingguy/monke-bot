module.exports = {
	name: 'test',
	description: 'used for testing',
	execute(message, args) {
		//console.log(message.guild.members);
		const list = message.guild; 
		console.log(list);

		list.members.fetch().then(members => console.log(members))
	},
};