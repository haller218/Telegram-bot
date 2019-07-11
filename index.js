const config = require('./config')

console.log(config)
config.bot.start((ctx) => ctx.reply('Welcome!'))
config.bot.help((ctx) => ctx.reply('Send me a sticker'))
config.bot.on('sticker', (ctx) => ctx.reply('👍'))
config.bot.hears('hi', (ctx) => {
    console.log(ctx)
    console.log ("hi mens")
    console.log ("hey there response")
    ctx.reply('Hey there')
})

config.bot.launch()
console.log("Begin")

