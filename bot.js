require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const express = require('express')
const cors = require('cors')

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://deft-puppy-88f707.netlify.app';
const app = express();
app.use(express.json());
app.use(cors());


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
                    [{ text: 'Fill form', web_app: { url: webAppUrl + '/form' } }]
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

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);
            await bot.sendMessage(chatId, 'Thank you');
            await bot.sendMessage(chatId, 'Your name ' + data?.name);
            await bot.sendMessage(chatId, 'Your email' + data?.email);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'All information you receive in this chat')
            }, 2500);
        } catch (e) {
            console.log(e)
        }
    }
    // bot.sendMessage(chatId, 'Received your message')
})


app.post('/web-data', async (req, res) => {
    const { queryId, products, totalPrice } = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Success buying',
            input_message_content: { message_text: 'You purchased product on price' + totalPrice }
        })
        return res.status(200).json({});
    } catch (error) {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Error during buying',
            input_message_content: { message_text: 'Er' }
        })
        return res.status(500).json({});
    }

})


const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))