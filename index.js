const { Telegraf } = require("telegraf");
const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.get("/", (req, res) => {
  res.send("hello user");
});
const port = 3030;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const bot = new Telegraf(process.env.Bot_Token);
bot.command("start", (ctx) => {
  let message = "Welcome, this is a cyptocurrency bot";
  bot.telegram.sendMessage(ctx.chat.id, message, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Cypto prices", callback_data: "cypto" }],
        [{ text: "CoinMarketCap", url: "https://www.coinbase.com/" }],
        [{ text: "Bot Info", callback_data: "info" }],
      ],
    },
  });
});
bot.action("start", (ctx) => {
  ctx.deleteMessage();
  let message = "Welcome, this is a cyptocurrency bot";
  bot.telegram.sendMessage(ctx.chat.id, message, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Cypto prices", callback_data: "cypto" }],
        [{ text: "CoinMarketCap", url: "https://www.coinbase.com/" }],
        [{ text: "Bot Info", callback_data: "info" }],
      ],
    },
  });
});
bot.action("cypto", (ctx) => {
  let message = "Get price information. Select one of the cyptocurencies below";
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, message, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "BTC", callback_data: "price-btc" },
          { text: "ETH", callback_data: "price-eth" },
        ],
        [
          { text: "BCH", callback_data: "price-bch" },
          { text: "LTC", callback_data: "price-ltc" },
        ],
        [{ text: "Back to Menu", callback_data: "start" }],
      ],
    },
  });
});
bot.action("start", (ctx) => {
  let message = "Welcome, this is a cyptocurrency bot";
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, message, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Cypto prices", callback_data: "cypto" }],
        [{ text: "CoinMarketCap", url: "https://www.coinbase.com/" }],
      ],
    },
  });
});
let pricelist = ["price-btc", "price-eth", "price-bch", "price-ltc"];
bot.action(pricelist, async (ctx) => {
  let symbol = ctx.match[0].split("-")[1].toUpperCase();
  let api_key = process.env.crypto;
  try {
    let res = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${api_key} `
    );
    let data = res.data.DISPLAY[symbol].USD;
    let message = `
Symbol:${symbol}
Price:${data.PRICE}
Open:${data.OPENDAY}
High:${data.HIGHDAY}
Low:${data.LOWDAY}
Supply:${data.SUPPLY}
Market Cap:${data.MKTCAP}
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [[{ text: "Back to prices", callback_data: "cypto" }]],
      },
    });
  } catch (err) {
    ctx.reply("Error encountered!");
  }
});
bot.command("info", (ctx) => {
  // ctx.answerCbQuery();
  bot.telegram.sendMessage(ctx.chat.id, "Bot info", {
    reply_markup: {
      keyboard: [
        [{ text: "Credits" }, { text: "Api" }],
        [{ text: "Remove Keyboard" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});
bot.action("info", (ctx) => {
  ctx.answerCbQuery();
  bot.telegram.sendMessage(ctx.chat.id, "Bot info", {
    reply_markup: {
      keyboard: [
        [{ text: "Credits" }, { text: "Api" }],
        [{ text: "Remove Keyboard" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});
bot.hears("Credits", (ctx) => {
  ctx.deleteMessage();
  ctx.reply("This bot was developed by Charles");
});
bot.hears("Api", (ctx) => {
  ctx.deleteMessage();
  ctx.reply("The bot uses Cyptocompare API");
});
bot.hears("Remove keyboard", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Removing keyboard", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
});
bot
  .launch()
  .then((ctx) => {
    console.log("Bot is online");
  })
  .catch((err) => {
    console.log(err);
  });
