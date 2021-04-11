module.exports = {
	name: 'test',
	description: 'Used for testing commands, outputs to console.',
	usage: '~test',
	execute(message, args) {
		const fs = require('fs');
		fs.readFile('commands/diagnostics/xo.json', (err, data) => {
			if (err) throw err;
			let info = JSON.parse(data); // get json data from file
			if (!args.length) { // if there arnt any arguments
				for (x in info) { // for the amount of games currently being played
					if (info[x].id == message.author.id) { // if its the game for thsi user
						info = info[x];
						toSend = "Here is our game so far:"
						msS = [false, true, false] // move send Save
						break
					}else if (x == info.length - 1) { // if there isnt already a saved game for this user
						info.push({"id" : message.author.id, "A": ["  ", "  ", "  "], "B": ["  ", "  ", "  "], "C": ["  ", "  ", "  "]});
						info = info[parseFloat(x)+1];
						toSend = "**Game Started!**\nTo play type the same comand with a number/letter coordinate.\ni.e **~xo 2 B** to go in the centre\ndo ~xo to see the board again";
						msS = [false, true, true] // move send Save
						break
					};
				};
			} else if(args.length == 2){
				for (x in info) { // for the amount of games currently being played
					if (info[x].id == message.author.id) { // if its the game for thsi user
						console.log(args[0])
						console.log(args[1])
						if (args[0] != "1" || args[0] != "2" || args[0] != "3" || args[1] != "A" || args[1] != "B" || args[1] != "C"){
							message.reply("needs to be an actual coordiante");
							msS = [false, false, false] // move send Save
							break
						};
						console.log(args[1])
						console.log(info[x]);
						//info[x].args[1][parseFloat(args[0])-1] = 'X' // sets the correct location in the db to be X fro teh player
						if (args[1] == "A") {info[x].A[parseFloat(args[0])-1] = 'X'};
						console.log(info[x]);
						msS = [true, true, true] // move send Save
						break
					}else if (x == info.length - 1) { // if there isnt already a saved game for this user
						message.reply("You havnt started a game please type **~xo** to start a game");
						msS = [false, false, false] // move send Save
						break
					};
				};
			}else {
				message.reply("I may be smart but I ain't that smart")
				msS = [false, false, false] // move send Save
			};

			if(msS[0]) { //move
				// cheeck if somone has won randomly choose point to put cross then cheeck if somone has won
			};
			if(msS[1]){ //send
				toSend = toSend + "\n   |1|2|3|\nA|" + info.A[0] + "|" + info.A[1] + "|" + info.A[2] + "|\nB |" + info.B[0] + "|" + info.B[1] + "|" + info.B[2] + "|\nC|" + info.C[0] + "|" + info.C[1] + "|" + info.C[2] + "|"
				message.channel.send(toSend);
			};
			if(msS[2]){ //save
				//save to javascript file
			};
		});
	},
};
/*
 |1|2|3
--------
A| | | |
--------
B| | | |
--------
C| | | |
--------

Dose user have a game runninng
	yes:
	are there any arguments
		yes:
		cheeck argumnets
		make users move
no:

*/