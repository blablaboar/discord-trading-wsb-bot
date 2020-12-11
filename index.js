// Discord bot which is supposed to check for SPACs?
const Discord = require("discord.js");
// const config = require("./config.json");
const fetch = require("node-fetch");

const client = new Discord.Client();
// client.login(process.env.BOT_TOKEN);
client.login("Nzg2NzYzNjg4ODkwNTk3NDA2.X9LIyA.x8-8EjGP3yZt7O9QOUry3nIqymI");
const prefix = "!";
// Alpha Vantage API key
const API_KEY = "D4H07VYYHEWMYMQV";
//  process.env.BOT_TOKEN.API_TOKEN;

const apiEndpoint = "https://www.alphavantage.co/query?apikey=" + API_KEY;

// Current stock watchlist
const watchlist = ['GIK', 'GIX', 'GHIV', 'AQB', 'APXT', 'THCB', 'AMD', 'BFT', 'TPGY'];

client.on("message", async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    if (command === "help") {
        message.reply("try !t followed by a ticker, i.e. !t AMD.");
    }
    
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply("Welcome r/wsb autist!");
    }
    
    if (command === "t" || command === "ticker") {
        if (args.length !== 1) {
            message.reply("You must have exactly 1 argument after ticker, i.e. !ticker AMD");
        } else {
            for (let ticker of args) {
                const url = new URL(apiEndpoint);
                url.searchParams.set("function", "OVERVIEW");
                url.searchParams.set("symbol", ticker)
                fetch(url.toString()).then(async (res) => {
                    const json = await res.json();
                    if (json.Description) {
                        const quoteUrl = new URL(apiEndpoint);
                        quoteUrl.searchParams.set("function", "GLOBAL_QUOTE");
                        quoteUrl.searchParams.set("symbol", ticker);
                        fetch(quoteUrl.toString()).then(async (newres) => {
                            const newjson = await newres.json();
                            const embed = getTickerMessage(ticker.toUpperCase(), json.Description, json.Exchange, json.MarketCapitalization, json.FullTimeEmployees, json.Industry, newjson);
                            message.channel.send(embed);
                        });
                    } else {
                        message.channel.send("Failed to fetch ticker data!")
                    }
                }).catch((e) => {
                    console.log(e);
                    message.channel.send("Failed to fetch ticker data!")
                });

            }
        }

    }

    if (command === "w" || command === "watch" || command === "watchlist") {
        const embed = new Discord.MessageEmbed()     
            .setColor('#0099ff')
            .setTitle("Watch List");
        for (let ticker of watchlist) {
            const price = await getStockPrice(ticker)
            embed.addField(ticker, price);
        }
        message.channel.send(embed);
    }
});

/*
 * Returns an embedded description of a ticker.
 */
function getTickerMessage(ticker, description, exchange, marketCap, employees, industry, quote) {
    const globalQuote = quote["Global Quote"];
    const price = globalQuote["05. price"];
    const volume = globalQuote["06. volume"];
    const change = globalQuote["10. change percent"];
    let footer = description;
    if (footer.length >= 1024) {
        footer = footer.substring(0, 1021) + "...";
    } 
    const googleUrl = new URL("https://google.com/search");
    googleUrl.searchParams.set("q", ticker +"ticker");

    return new Discord.MessageEmbed()
        // Set the color of the embed
        .setColor('#0099ff')
        // Set the title of the field
        .setTitle(exchange + ': ' + ticker)
        .setURL(googleUrl.toString())
        .addFields(
            { name: 'Market Cap', value: convertMarketCapToString(marketCap), inline: true },
            { name: 'Employees', value: employees, inline: true },
            { name: 'Industry', value: industry, inline: true },
            { name: 'Price', value: '$' + price, inline: true },
            { name: 'Daily Volume', value: volume, inline: true },
            { name: 'Change', value: change, inline: true },
        )
        // Set the main content of the embed
        .setFooter(footer);
}

/*
 * Returns a formatted market cap string. 
 */
function convertMarketCapToString(marketCap) {
    const cap = parseInt(marketCap);
    if (cap < 1000000000) {
        return (cap/1000000).toFixed(3) + "M";
    } else {
        return (cap/1000000000).toFixed(3) + "B";
    }
}


/*
 * Returns the current stock price of a ticker. 
 */
function getStockPrice(ticker) {
    const quoteUrl = new URL(apiEndpoint);
    quoteUrl.searchParams.set("function", "GLOBAL_QUOTE");
    quoteUrl.searchParams.set("symbol", ticker);
    return fetch(quoteUrl.toString()).then(async (newres) => {
        const newjson = await newres.json();
        if (!newjson["Global Quote"]) {
            return "$$$";
        }
        const globalQuote = newjson["Global Quote"];
        return globalQuote["05. price"];
    });
}