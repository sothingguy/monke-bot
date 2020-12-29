module.exports = {
	name: 'rust',
	description: 'gives amount of players on rust server',
	execute(message, args) {
        const {current, total, queue, time} = require('./rustStatus.json');
        message.reply('Currnetly there are ' + current + "/" + total + " people playing with " + queue + " people waiting in the queue. This was at " + time);
	},
};