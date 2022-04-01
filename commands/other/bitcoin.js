module.exports = {
	name: 'bitcoin', // name of the command - same as file name and as command entered by end user
	description: 'Gives the current rate of bitcoin in USD', // brief description of teh comand
	usage: '~bitcoin', // usage example
	op: '0', // the opp level required to use this command 0-anyone 1-mods 2-admins
	execute(message, args) {
        //setup
        const { Kraken } = require('node-crypto-api');
        const kraken = new Kraken();

        //get rate and send message
        kraken.ticker('BTC', 'USD')
            .then((response) => message.channel.send(":pick: :chart_with_upwards_trend: Bitcoin is currently at: $" + response["result"]["XXBTZUSD"]["o"] + " USD :chart_with_downwards_trend: :pick:"))
	}
};