module.exports = (ctx)=>{
    ctx.telegram.sendMessage(ctx.chat.id , `👋 Welcome ${ctx.from.first_name} ` , {
        reply_markup: {
            inline_keyboard: [
                [{text: "🌐 Website" , url: "https://simultane.ltd"} , {text: "🔰 Twitter" , url:"https://twitter.com/Simultanecoin"} ],
                [{text: "📄 Info SMLT" , callback_data: "info_smlt"} , {text: "📊 ICO Details" , callback_data: "ico_details"}],
                [{text: "📋 Submit KYC" , url: "https://app.simultane.ltd/kyc-application"}, {text: "💎 Airdrop", url: "https://t.me/"+ctx.botInfo.username}],
                [{text: "🔊 Marketing", url: "https://t.me/"+ctx.botInfo.username}]
            ]
        }
    }).catch((e)=>console.log(e))
}