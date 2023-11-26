require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://deft-puppy-88f707.netlify.app';

bot.setMyCommands([
    { command: '/start', description: 'Welcome, guest!' }
])

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Below you see button, fill the form', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Fill form', web_app: { url: webAppUrl } }]
                ]
            }
        })
        await bot.sendMessage(chatId, 'List our magazine', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Make order', web_app: { url: webAppUrl } }]
                ]
            }
        })
    }

    // bot.sendMessage(chatId, 'Received your message')
})