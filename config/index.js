const fs = require('fs')
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const classes = require('./classes')


const words = JSON.parse(fs.readFileSync('./config/words.json').toString().split('\n').join(''))


module.exports = {

    words: words,
    classes: classes,
    bot, bot
}
