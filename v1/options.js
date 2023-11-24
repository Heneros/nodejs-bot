module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Category 1', callback_data: '1232' }],
                [{ text: 'Category  2', callback_data: '555' }]
            ]
        })
    }
}