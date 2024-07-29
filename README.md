# Cryptocurrency Telegram Bot

==========================

## About

This is a Telegram bot that provides cryptocurrency-related information, including prices and market data. The bot is built using Node.js, Telegraf, and Axios, and utilizes the CryptoCompare API.

## Features

- Provides cryptocurrency prices and market data
- Supports multiple cryptocurrencies (BTC, ETH, BCH, LTC)
- Offers a user-friendly interface with inline keyboards and callback queries
- Displays bot information and credits

## Getting Started

### Prerequisites

- Telegram account
- Node.js installed on your system
- CryptoCompare API key (set as an environment variable `crypto`)

### Running the Bot

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your CryptoCompare API key: `export crypto=[YourApiKey]`
4. Run the bot: `node bot.js`

## Using the Bot

1. Search for the bot in Telegram:
2. Start a conversation with the bot: `/start`
3. Explore the bot's features using the inline keyboards and callback queries

## Commands

- `/start` - Start the conversation
- `/info` - View bot information and credits

## Callback Queries

- `cypto` - View cryptocurrency prices
- `price-btc`, `price-eth`, `price-bch`, `price-ltc` - View specific cryptocurrency prices
- `start` - Return to the main menu
- `info` - View bot information and credits

## Acknowledgments

- CryptoCompare API for providing cryptocurrency data
- Telegraf and Axios for simplifying the development process

## Code

The bot's code is written in JavaScript and uses the Telegraf library to interact with the Telegram API. The code is organized into several sections:

- `bot.js`: The main bot file that sets up the bot and handles incoming messages.
- `config.js`: A configuration file that stores the bot's API key and other settings.

## Contributing

Contributions are welcome! If you'd like to help improve the bot, please fork the repository and submit a pull request.

## Issues

If you encounter any issues with the bot, please open an issue on this repository.
