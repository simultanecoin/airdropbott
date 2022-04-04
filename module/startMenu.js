module.exports = (ctx)=>{
    ctx.telegram.sendMessage(ctx.chat.id , `👋 Hello ${ctx.from.first_name}, \nWelcome to ${ctx.botInfo.username}`, {
        reply_markup: {
            keyboard: [
                [{text: "☝ Join our Community"}],
                [{text: "💎 Airdrop"},{text: "🔊 Marketing"}],
                [{text: "📌 Help"},{text: "👥 About"}]
            ],
            resize_keyboard: true
        }
    }).catch((e)=>console.log(e))
}