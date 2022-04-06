const {Telegraf , Composer , Stage , session , WizardScene} = require('micro-bot')
const mongoose = require('mongoose')
const airdropModel = require('./model/airdropModel')
const marketingModel = require('./model/marketingModel')
const ico_details = require('./module/ico_details')
const info_smlt = require('./module/info_smlt')
const new_user_welcome = require('./module/new_user_welcome')
const startMenu = require('./module/startMenu')


// const bot = new Telegraf('5111905236:AAGw-gOxgKWHxBujRAdOh5XhLvyc7k179FA')
const bot = new Composer()

mongoose.connect('mongodb+srv://rasedul20:rasedul20@telegramproject.gwtce.mongodb.net/AirdropBotforDiyarbicher', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then((d) => console.log('Database connected')).catch((e) => console.log(e))

bot.use(session())

bot.start(ctx=>{
    startMenu(ctx)
})


bot.on('new_chat_members',ctx=>{
    new_user_welcome(ctx)
})


bot.command('menu', ctx=>{
	new_user_welcome(ctx)
})

bot.command('stop',ctx=>{
	ctx.telegram.sendMessage(ctx.chat.id , "Menu removed", {
		reply_markup: {
            remove_keyboard: true
        }
	})
})

bot.action("info_smlt",ctx=>{
    info_smlt(ctx)
})


bot.action('ico_details',ctx=>{
    ico_details(ctx)
})


const airdropScene = new WizardScene('airdropScene', 

    (ctx)=>{
        ctx.session.user = {}
        ctx.reply("What’s Your Full Name Please write").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    (ctx)=>{
        ctx.session.user.name = ctx.update.message.text
        ctx.reply("Can you write Email Adress").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    (ctx)=>{
        ctx.session.user.email = ctx.update.message.text
        ctx.reply("Can you write Binance Smart Chain address").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    (ctx)=>{

        ctx.session.user.wallet = ctx.update.message.text
        
        airdropModel.find({email: ctx.session.user.email})

        .then((email)=>{
            if (email.length > 0) {
                ctx.reply("The email already exists \nPlease try again with another email").catch((e)=>console.log(e))
            } else {

                airdropModel.find({wallet: ctx.session.user.wallet})
                .then((wallet)=>{
                    if (wallet.length > 0) {
                        ctx.reply("The wallet address already exists \nPlease try again with another wallet address").catch((e)=>console.log(e))
                    } else {
                        
                        const userDetails = new airdropModel({
                            userId : ctx.from.id,
                            username: ctx.from.username,
                            name: ctx.session.user.name,
                            email: ctx.session.user.email,
                            wallet: ctx.session.user.wallet,
                            balance: 200
                        })

                        userDetails.save()
                        .then(()=>{
                            ctx.reply(`You have successfully joined the AirDrop List. \nYour Current Balance: 200 SMLT \n\nThanks`)
                            .catch((e)=>console.log(e))
                        })
                        .catch((e)=>console.log(e))
                    }
                })
                .catch((e)=>console.log(e))

            }
        })

        .catch((e)=>console.log(e))



        return ctx.scene.leave()
    }

)

const marketingScene = new WizardScene('marketingScene', 
    ctx =>{
        ctx.session.user = {}
        ctx.reply("Youtube or Twitter address ? write please").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    ctx =>{
        ctx.session.user.url = ctx.update.message.text
        ctx.reply("Total Subscribers?").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    ctx =>{
        ctx.session.user.sub = ctx.update.message.text
        ctx.reply("Your email adress?").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    ctx =>{
        ctx.session.user.email = ctx.update.message.text
        ctx.reply("Your Telegram address?").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    ctx =>{
        ctx.session.user.tg_address = ctx.update.message.text
        ctx.reply("Write your promotional fee").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    ctx =>{
        ctx.session.user.promo_fee = ctx.update.message.text
        ctx.reply("Do you accept payment as SMLT token? Yes or No").catch((e)=>console.log(e))

        return ctx.wizard.next()
    },
    ctx=>{
        ctx.session.user.smlt_payment = ctx.update.message.text

        const inputData = new marketingModel({
            userId: ctx.from.id,
            tg_name: ctx.from.first_name,
            channel_url: ctx.session.user.url,
            sub_count: ctx.session.user.sub,
            email: ctx.session.user.email,
            tg_address: ctx.session.user.tg_address,
            promotional_fee: ctx.session.user.promo_fee,
            smlt_payment: ctx.session.user.smlt_payment,
        })

        inputData.save()
        .then(()=>{
            ctx.reply("Your Data has been saved")
        })
        .catch((e)=>console.log(e))

        return ctx.scene.leave()

    }
)


const stage = new Stage([airdropScene,marketingScene])

bot.use(stage.middleware())

// airdropScene  marketingScene

bot.hears('☝ Join our Community',ctx=>{
    ctx.telegram.sendMessage(ctx.chat.id , `For join our telegram community \nTap on 'Enter' button`,{
        reply_markup: {
            inline_keyboard: [
                [{text: "Enter", url: "https://t.me/simultaneltd"}]
            ]
        }
    }).catch((e)=>console.log(e))
})

bot.hears('📌 Help',ctx=>{
    ctx.telegram.sendMessage(ctx.chat.id , `For help join our telegram community or our telegram group`).catch((e)=>console.log(e))
})

bot.hears('👥 About',ctx=>{
    ctx.telegram.sendMessage(ctx.chat.id , ` What is SMTL(SIMULTANE) ? \n\nSimultane ecosystem is offering the buying and selling of Virtual Assets, hosting events, and play- ing, watching, and enjoying games in the metaverse city. Each avatar is tokenized as a unique non-fun- gible token on the Blockchain. The core function of the platform is more one of creation and sell- ing. we are also offering virtual tours for Simultane Lovers. The virtual assets will be sold for billions of dollars, and with the increasing popularity, the po- tential return on investment in the Metaverse looks promising. The simultaneous city has Gym, Malls, Houses, Game centres as well as Night clubs for enjoying and can be put to use, like parties. Virtual assets also can be used to earn an income by rent- ing them out monthly or hosting NFT art galleries.`).catch((e)=>console.log(e))
})

bot.hears("💎 Airdrop",(ctx)=>{

    airdropModel.find({userId: ctx.from.id})
    .then((user)=>{
        if(user.length > 0){
            ctx.reply('You are already joined \nYou have balance 200 SMLT')
        }else{
            ctx.telegram.sendMessage(ctx.chat.id , `Kindly tap on "start" button to join the airdrop `,{
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Start",callback_data:"join"}]
                    ]
                }
            })
        }
    })
    .catch((e)=>console.log(e))

})

bot.hears('🔊 Marketing', (ctx)=>{
    
    ctx.telegram.sendMessage(ctx.chat.id , `Kindly tap on "start" button for marketing `,{
        reply_markup: {
            inline_keyboard: [
                [{text: "Start",callback_data:"marketing"}]
            ]
        }
    })
})


bot.action('join',Stage.enter('airdropScene'))
bot.action('marketing',Stage.enter('marketingScene'))



// bot.launch().then(()=>console.log("Bot started")).catch((e)=>console.log(e))
module.exports = bot
