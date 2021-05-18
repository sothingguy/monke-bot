module.exports = {
	name: "4chan", // name of the command - same as file name and as command entered by end user
	description: "Replies a random threads op from the first page of a specified board, leave blank for /b/.", // brief description of teh comand
	usage: "~4chan pol", // usage example
	op: "0", // the opp level required to use this command 0-anyone 1-mods 2-admins
	execute(message, args) {
		const https = require("https");

        function printOP(thread, board) {
            toSend = "Link: https://boards.4chan.org/" + board + "/thread/" + thread["no"] + "\nBoard: " + board + "\nReplies: " + thread["replies"] + "\nTime: " + thread["now"] + "\nCountry: " + thread["country_name"] + "\nImage: https://i.4cdn.org/" + board + "/" + thread["tim"] + thread["ext"]
            if (!thread["sub"]){
                toSend = toSend + "\nTitle: No title"
            } else {
                toSend = toSend + "\nTitle: " + thread["sub"]
            };
            if (thread["com"]){
                if (thread["com"].length + toSend.length > 1990) {
                    toSend = toSend + "\nContent (This user has a fair bit to say to the content has been cut short):\n"
                }else {
                    toSend = toSend + "\nContent:\n"
                };
            }
            toSend = toSend + thread["com"]

            message.channel.send(toSend.substring(0, 1990));
        };
        function testBoard(board) { // test weather the baord is a real one or not
            https.get("https://a.4cdn.org/" + board + "/catalog.json", (resp) => {
                let data = "";

                // A chunk of data has been received.
                resp.on("data", (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on("end", () => {
                    if (!data){
                        message.channel.send("error");
                        return
                    }
                    data = JSON.parse(data)[0]["threads"];

                    for (i = 0; i < data.length; i++) {
                        if(data[i]["replies"] > 5){
                            printOP(data[i], board)
                            break
                        };
                        if (i == data.length - 1) {
                            message.channel.send("error");
                        };
                    };
                });
            }).on("error", (err) => {
                message.channel.send("error");
            });
        };

        if(!args.length) {
            board = "b"
        } else {
            board = args[0]
        };

        testBoard(board);
	}
};