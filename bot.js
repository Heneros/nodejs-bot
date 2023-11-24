require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

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
                    [{ text: 'Fill form' }]
                ]
            }
        })
        await bot.sendMessage(chatId, 'Below you see button, fill the form', {
            reply_markup: {
                inline_keyboardkeyboard: [
                    [{ text: 'Make order' }]
                ]
            }
        })
    }

    // bot.sendMessage(chatId, 'Received your message')
})