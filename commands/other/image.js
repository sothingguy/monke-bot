module.exports = {
	name: 'image',
	description: 'Sends a random image of a specific size.',
	usage: '~iamge or ~image 200 300',
	op: '0',
	execute(message, args) {
        const fs = require('fs')
        const request = require('request')
        const { MessageAttachment } = require('discord.js')
        
        const download = (url, path, callback) => {
            request.head(url, (err, res, body) => {
                request(url)
                .pipe(fs.createWriteStream(path))
                .on('close', callback)
            })
        };

        const path = './commands/other/random.jpg'

        if (!args.length) {
			url = 'https://source.unsplash.com/random';
		} else if (args[0] < 25 || args[1] < 25 || args[0] > 1000 || args[1] > 1000){
            message.reply("piss off")
            return
        } else if (args.length == 2){
            url = 'https://source.unsplash.com/random/' + args[0] + 'x' + args[1];
        } else {
            url = 'https://source.unsplash.com/random/' + args[0] + 'x' + args[0];
        }
        download(url, path, () => {
            const attachment = new MessageAttachment(path);
            message.channel.send(attachment);
        })
	},
};