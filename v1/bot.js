require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const token = process.env.TOKEN;

const bot = new TelegramApi(token, { polling: true });
const gameOptions = require('./options');


const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Choose different category', callback_data: '/again' }]
        ]
    })
}





bot.setMyCommands([
    { command: '/start', description: 'Welcoming Stranger' },
    { command: '/info', description: 'Purpose to customer' },
    { command: '/categories', description: 'Choose category' }
])

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/w/warhammemer40k/warhammemer40k_001.webp')
            return bot.sendMessage(chatId, 'Welcome, Stranger');
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `What do you want to buy? ${msg.from.first_name}`);
        }
        if (text === '/categories') {
            return bot.sendMessage(chatId, 'Choose your category', gameOptions)
        }
        return bot.sendMessage(chatId, 'I dont understand you')
        // console.log(msg)
    });

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(chatId, `You choose ${data}`, gameOptions)
        console.log(msg);
    })

}

start(); return