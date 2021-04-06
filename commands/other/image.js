module.exports = {
	name: 'image',
	description: 'sends a random iamge',
	execute(message, args) {
        const { MessageAttachment } = require('discord.js')
        if (!args.length) {
			image = 'https://source.unsplash.com/random';
		} else if (args.length == 2){
            image = 'https://source.unsplash.com/random/' + args[0] + 'x' + args[1];
        } else {
            image = 'https://source.unsplash.com/random/' + args[0] + 'x' + args[0];
        }
        message.channel.send(image);
	},
};