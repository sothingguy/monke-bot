module.exports = {
	name: 'xo',
	description: 'Norts and crosses game, use ~xo to start playing. Do ~xo 2 B for a move, the bot imediatly dose its move.',
	usage: '~xo or ~xo 2 B',
	execute(message, args) {
		const fs = require('fs');
		fs.readFile('commands/games/xo.json', (err, data) => {
			let toSend = ""
			if (err) throw err;
			let info = JSON.parse(data); // get json data from file
			function doShit(args, info) {
				if ((args[0] != "1" && args[0] != "2" && args[0] != "3") || (args[1] != "A" && args[1] != "B" && args[1] != "C")){
					message.reply("Needs to be an actual coordiante");
					return
				};
				//do the user move
				if(args[1] == "A") {if(info.A[args[0]-1] == ":white_large_square:") {info.A[args[0]-1] = ":regional_indicator_x:";}else {message.reply("That spot is already filled"); return;};};
				if(args[1] == "B") {if(info.B[args[0]-1] == ":white_large_square:") {info.B[args[0]-1] = ":regional_indicator_x:";}else {message.reply("That spot is already filled"); return;};};
				if(args[1] == "C") {if(info.C[args[0]-1] == ":white_large_square:") {info.C[args[0]-1] = ":regional_indicator_x:";}else {message.reply("That spot is already filled"); return;};};

				// bit if for if somone is winning
				if((info.A[0] == ":regional_indicator_x:" && info.A[1] == ":regional_indicator_x:" && info.A[2] == ":regional_indicator_x:") || 
				(info.B[0] == ":regional_indicator_x:" && info.B[1] == ":regional_indicator_x:" && info.B[2] == ":regional_indicator_x:") || 
				(info.C[0] == ":regional_indicator_x:" && info.C[1] == ":regional_indicator_x:" && info.C[2] == ":regional_indicator_x:") || 
				(info.A[0] == ":regional_indicator_x:" && info.B[0] == ":regional_indicator_x:" && info.C[0] == ":regional_indicator_x:") || 
				(info.A[1] == ":regional_indicator_x:" && info.B[1] == ":regional_indicator_x:" && info.C[1] == ":regional_indicator_x:") || 
				(info.A[2] == ":regional_indicator_x:" && info.B[2] == ":regional_indicator_x:" && info.C[2] == ":regional_indicator_x:") || 
				(info.A[0] == ":regional_indicator_x:" && info.B[1] == ":regional_indicator_x:" && info.C[2] == ":regional_indicator_x:") || 
				(info.A[2] == ":regional_indicator_x:" && info.B[1] == ":regional_indicator_x:" && info.C[0] == ":regional_indicator_x:")) {
					message.reply("Congratulations you won!!!");
					info.A = [":white_large_square:", ":white_large_square:", ":white_large_square:"]
					info.B = [":white_large_square:", ":white_large_square:", ":white_large_square:"]
					info.C = [":white_large_square:", ":white_large_square:", ":white_large_square:"]
					return
				};

				// do teh a.i move, just a random move
				let move = true
				while (move) {
					coords = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]
					if (coords[1] == 0) {coords[1] = "A"} else if (coords[1] == 1) {coords[1] = "B"} else {coords[1] = "C"};
					if(coords[1] == "A") {if(info.A[coords[0]-1] == ":white_large_square:") {info.A[coords[0]-1] = ":regional_indicator_o:"; move = false;}};
					if(coords[1] == "B") {if(info.B[coords[0]-1] == ":white_large_square:") {info.B[coords[0]-1] = ":regional_indicator_o:"; move = false;}};
					if(coords[1] == "C") {if(info.C[coords[0]-1] == ":white_large_square:") {info.C[coords[0]-1] = ":regional_indicator_o:"; move = false;}};
				};

				// cheeck to see if the a.i has won(highly unlikely)
				if((info.A[0] == ":regional_indicator_o:" && info.A[1] == ":regional_indicator_o:" && info.A[2] == ":regional_indicator_o:") || 
				(info.B[0] == ":regional_indicator_o:" && info.B[1] == ":regional_indicator_o:" && info.B[2] == ":regional_indicator_o:") || 
				(info.C[0] == ":regional_indicator_o:" && info.C[1] == ":regional_indicator_o:" && info.C[2] == ":regional_indicator_o:") || 
				(info.A[0] == ":regional_indicator_o:" && info.B[0] == ":regional_indicator_o:" && info.C[0] == ":regional_indicator_o:") || 
				(info.A[1] == ":regional_indicator_o:" && info.B[1] == ":regional_indicator_o:" && info.C[1] == ":regional_indicator_o:") || 
				(info.A[2] == ":regional_indicator_o:" && info.B[2] == ":regional_indicator_o:" && info.C[2] == ":regional_indicator_o:") || 
				(info.A[0] == ":regional_indicator_o:" && info.B[1] == ":regional_indicator_o:" && info.C[2] == ":regional_indicator_o:") || 
				(info.A[2] == ":regional_indicator_o:" && info.B[1] == ":regional_indicator_o:" && info.C[0] == ":regional_indicator_o:")) {
					message.reply("You must be pretty bad if you let me win.");
					info.A = [":white_large_square:", ":white_large_square:", ":white_large_square:"]
					info.B = [":white_large_square:", ":white_large_square:", ":white_large_square:"]
					info.C = [":white_large_square:", ":white_large_square:", ":white_large_square:"]
					return
				};
			}
			for (x in info) { // for the amount of games currently being played
				if (info[x].id == message.author.id) { // if there is a game for this user
					if (!args.length) { // if there are no args
						game = info[x];
						message.reply("Here is our game so far:");
                        break
					}else if(args.length == 2){ // if there are args
						game = info[x];
						doShit(args, game);
                        break
					} else {
						game = info[x];
						message.reply("I may be smart but im not that smart.");
                        break
					};
				}else if (x == info.length - 1) { // if there isnt a game for this user
					if (!args.length) { // if there arnt any args
						info.push({"id" : message.author.id, "A": [":white_large_square:", ":white_large_square:", ":white_large_square:"], "B": [":white_large_square:", ":white_large_square:", ":white_large_square:"], "C": [":white_large_square:", ":white_large_square:", ":white_large_square:"]});
						game = info[parseFloat(x)+1];
						message.reply("**Game Started!**\nTo play type the same comand with a number/letter coordinate.\ni.e **~xo 2 B** to go in the centre\ndo ~xo to see the board again");
                        break
					}else if(args.length == 2){ // if there are args
						info.push({"id" : message.author.id, "A": [":white_large_square:", ":white_large_square:", ":white_large_square:"], "B": [":white_large_square:", ":white_large_square:", ":white_large_square:"], "C": [":white_large_square:", ":white_large_square:", ":white_large_square:"]});
						game = info[parseFloat(x)+1];
						doShit(args, game);
                        break
					} else {
						game = info[parseFloat(x)+1];
						message.reply("I may be smart but im not that smart.");
                        break
					};
				};
			};
			message.channel.send("\n:white_large_square::one::two::three:\n:regional_indicator_a:" + game.A[0] + game.A[1] + game.A[2] + "\n:regional_indicator_b:" + game.B[0] + game.B[1] + game.B[2] + "\n:regional_indicator_c:" + game.C[0] + game.C[1] + game.C[2]);
			var data = JSON.stringify(info);
			fs.writeFile('commands/games/xo.json', data, (error) => { 

				// In case of a error throw err exception. 
				if (error) throw err; 
			})
		});
	},
};