const config = require('./config')

console.log(config)
config.bot.use((ctx, next) => {
    const start = new Date()
    console.log(ctx)
    pro = next(ctx)
    pro.catch((err)=>{
	console.log("ERROR: ",err)
	assert.isNotOk(err,"Promisse Error")
	done()
    })
    pro.then((res) => {
	const ms = new Date() - start
	console.log('Response time %sms', ms)

    })
})
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

