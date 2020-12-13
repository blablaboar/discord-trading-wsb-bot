# Stock Discord Bot
This project is a little pet project of mine since i've spending a lot more time pouring over the stock market. This bot does a bunch of cool things that help get information to make better trades. It's written using NodeJS, the DiscordJS API for writing discord bots in NodeJS, and hosted on Heroku. The stock ticker data comes from Alphavantage. In the future I want to expand the functionality, and potentially write a bot for implementing trading strategies (i.e. the theta gang wheel strategy).

# Current Functionality
## Commands
`!t ticker` or `!ticker ticker`
* Fetches useful data about a ticker from the Alphavantage API, like the % daily change, market cap, etc.

`!s ticker` or `!spac ticker`
* Fetches information about an SPAC(special purpose acquisition company), including average volume and daily volume. We've been noticing some "suspicious" trading activity related to SPACs recently, so monitoring spikes in volume may be an indicator that a merger is about to be announced (or similar catalyst).

`!spacs`
* Fetches information for all publicly available SPACs, and updates a spreadsheet with the tickers, average daily volume, and current daily volume. 

`!w` or `!watchlist` or `!watch`
* Fetches my currently stock watchlist. 

`!help`
* Provides useful help information, like available commands and usage. 

# Future Work
I want to keep expanding this bot in the future, as it's honestly pretty cool and can be more practical than it is right now. Feel free to contribute a PR if you want to work on Some things I want to contribute to this project in the future:
* Host common files on something like S3 or Sheets API
* Display top winners/losers of the trading day
* Common market information, i.e. NASDAQ/DOW/S&P 500
* Display information about popular categories of securities, i.e. ETFs, Technology, Cannabis, EVs, SPACs, etc.
* Have the ability to create alerts/reminders
* Create something like a robo-advisor
* Graphs with interesting data about stocks
* Technical analysis about tickers, i.e. important ratios like MACD, RSI, etc.
* Fundamental analysis about ticker
* Reddit scraper from r/wallstreetbets to get information from there like posts
* Create the ability to paper trade (set up a DB for this)

# Local Development
You need to install [NodeJS](https://nodejs.org/en/download/) before running this application. After that: 
```
$ git clone https://github.com/blablaboar/stock-bot.git
$ npm install
$ npm start
```
# Tests
I might want to write tests in the future...

# Deployment
The project is currently hosted on Heroku. Please ping @linglong97 for details.
