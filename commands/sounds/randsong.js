module.exports = {
	name: 'randsong',
	description: 'Plays a random song.',
	usage: '~randsong',
	op: '0',
	execute(message, args) {
        const {spawn} = require('child_process');
        const ytdl = require('ytdl-core');
		if (!message.member.voice.channel) return message.reply("It generally helps if you are in a voice channel.");

        var url;
        // spawn new child process to call the python script
        const python = spawn('python', ['./commands/sounds/randSong.py']);
        // collect data from script
        python.stdout.on('data', function (data) {
            url = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            // after python is finished play song

            const  connection = message.member.voice.channel.join();
            // use youtube download to download song
            const stream  = ytdl(url, {filter: 'audioonly'});

            message.reply('Now playing ' + url); // inform user

            message.member.voice.channel.join().then(VoiceConnection => { // join channel and play song

                // play actual audio
                VoiceConnection.play(stream, {seek: 0, volume: 1}).on("finish", () => VoiceConnection.disconnect());
            })
        });
	}
};